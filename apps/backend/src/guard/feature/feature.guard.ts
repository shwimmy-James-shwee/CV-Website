import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { User, Feature } from '@core/db';
import { FEATURES_KEY } from './feature.decorator';
import { Request } from 'express';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class FeatureGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(DatabaseService) private databaseService: DatabaseService
  ) {}

  // async getChildFeatures(childBusinessUnitId: number) {
  //   if (!childBusinessUnitId) return [];

  //   const childBusinessUnit = await this.databaseService.businessUnit.findUnique({
  //     where: { id: childBusinessUnitId },
  //     include: { ChildBusinessUnits: true },
  //   });
  //   const childFeatures = childBusinessUnit?.features;
  //   for (const grandChildBusinessUnit of childBusinessUnit?.ChildBusinessUnits) {
  //     const grandChildFeatures = await this.getChildFeatures(grandChildBusinessUnit.id);
  //     childFeatures.push(...grandChildFeatures);
  //   }
  //   return childFeatures;
  // }

  async getParentFeatures(parentBusinessId: string | null): Promise<Feature[]> {
    if (!parentBusinessId) return [];

    const parentBusinessUnit = await this.databaseService.businessUnit.findUnique({
      where: { id: parentBusinessId }
    });

    if (parentBusinessUnit) {
      return [
        ...(parentBusinessUnit?.features ?? []),
        ...(await this.getParentFeatures(parentBusinessUnit.parentBusinessUnitId))
      ];
    } else {
      return [];
    }
  }

  async validateFeature(userId: string, requiredFeatures: Feature[]) {
    const userBusinessUnitFeature = await this.databaseService.businessUnit.findMany({
      where: { Members: { some: { User: { id: userId } } } },
      include: { ChildBusinessUnits: true }
    });

    // child can have parent's features
    for (const businessUnit of userBusinessUnitFeature) {
      const parentFeatures = await this.getParentFeatures(businessUnit.parentBusinessUnitId);
      businessUnit.features = [...businessUnit.features, ...parentFeatures];
    }

    // DANGER: this is a recursive function that can cause deep search into the child tree, can cause performance issue if the tree is too deep
    // parent can have child's features
    // for (const businessUnit of userBusinessUnitFeature) {
    //   for (const childBusinessUnit of businessUnit.ChildBusinessUnits) {
    //     const childFeatures = await this.getChildFeatures(childBusinessUnit.id);
    //     businessUnit.features = [...businessUnit.features, ...childFeatures];
    //   }
    // }

    const combinedFeatures = userBusinessUnitFeature.flatMap((businessUnit) => {
      return [...businessUnit.features];
    });

    return requiredFeatures.some((feature) => combinedFeatures?.includes(feature));
  }
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const requiredFeatures = this.reflector.getAllAndOverride<Feature[]>(FEATURES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);
    if (!requiredFeatures) {
      return true;
    }
    const user = req.user as User;

    return this.validateFeature(user.id, requiredFeatures); // requiredFeatures.some((feature) => user.roles?.includes(`${feature}`));
  }
}
