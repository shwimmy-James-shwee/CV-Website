import { BadRequestException, Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { User } from '@core/db';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AzureADGuard } from '../../../guard/auth/azuread.guard';
import { Request } from 'express';
import { RoleGuard } from '../../../guard/role/role.guard';
import { PREFIX, ROUTE } from '../../../shared/endpoints';
import { CurrentUserBusinessUnitsType, UserService } from './user.service';

interface CurrentUser extends User {
  InBusinessUnits: CurrentUserBusinessUnitsType[];
}

@ApiTags('User')
@Controller(PREFIX.user)
// !important, AzureADGuard must be first in the list of guards, it provide the user object to the request
@UseGuards(AzureADGuard, RoleGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  // This is a key endpoint for creating the user if they don't exist in the database
  @Get(ROUTE.user.currentUser)
  @ApiOperation({ summary: 'Get the current user, also act as the main entry point to handle user creation logic' })
  @ApiResponse({
    status: 200,
    description: 'found user record',
  })
  async getCurrentUser(@Req() req: Request): Promise<CurrentUser> {
    const user = req.user as User;
    const userBusinessUnits = await this.userService.findUserBusinessUnits(user.id);
    return { ...user, InBusinessUnits: userBusinessUnits };
  }

  @Get(ROUTE.user.adminUsers + ':businessUnitId')
  @ApiOperation({ summary: 'Get all admin users of a business unit' })
  @ApiResponse({
    status: 200,
    description: 'found all admin users',
  })
  async getAdminUsersByBusinessUnitId(@Req() req: Request, @Param('businessUnitId') businessUnitId: string) {
    const user = req.user as User;
    const businessUnits = this.userService.findUserBusinessUnits(user.id);
    const userBusinessUnitIds = (await businessUnits).map((businessUnit) => businessUnit.id);

    if (!userBusinessUnitIds.includes(businessUnitId)) {
      throw new BadRequestException('The user does not belong to the specified business unit.');
    }

    return await this.userService.getAdminUsers(businessUnitId);
  }
}
