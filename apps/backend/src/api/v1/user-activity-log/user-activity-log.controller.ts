import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { UserActivityLogService } from './user-activity-log.service';
import { Feature, Prisma, User } from '@prisma/client';
import { AzureADGuard } from '../../../guard/auth/azuread.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { createDTOExample } from './user-activity-log.dto.sample';
import { Request } from 'express';
import { FeatureGuard } from '../../../guard/feature/feature.guard';
import { Features } from '../../../guard/feature/feature.decorator';
import { PREFIX, ROUTE } from '../../../shared/endpoints';

@ApiTags('User Activity Log')
@UseGuards(AzureADGuard, FeatureGuard)
@Controller(PREFIX.userActivityLog)
export class UserActivityLogController {
  constructor(private readonly userActivityLogService: UserActivityLogService) {}

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Successful response',
    content: {
      'application/json': {
        examples: {
          createDTO: { value: createDTOExample },
        },
      },
    },
  })
  async record(@Req() req: Request, @Body() recordUserActivityLogDto: Prisma.UserActivityLogCreateInput) {
    const user = req.user as User;

    const userId = user.id;

    const findLog = await this.userActivityLogService.findOne(
      {
        userId: userId,
        sessionIdentifier: recordUserActivityLogDto.sessionIdentifier,
        eventUrl: recordUserActivityLogDto.eventUrl,
      },
      {},
    );
    if (findLog) {
      await this.userActivityLogService.update(findLog.id, {
        eventParam: recordUserActivityLogDto.eventParam,
        eventEndTime: new Date(),
        eventDuration: findLog.eventDuration + recordUserActivityLogDto.eventDuration,
      });
      return;
    } else {
      await this.userActivityLogService.create({
        eventUrl: recordUserActivityLogDto.eventUrl,
        eventParam: recordUserActivityLogDto.eventParam,
        sessionIdentifier: recordUserActivityLogDto.sessionIdentifier,
        eventStartTime: recordUserActivityLogDto.eventStartTime,
        eventDuration: recordUserActivityLogDto.eventDuration,
        eventEndTime: new Date(),
        User: { connect: { id: userId } },
      });
      return;
    }
  }

  @Get(ROUTE.userActivityLog.featuredLog)
  @Features(Feature.BASIC_REPORTING)
  getActivityLogs() {
    return this.userActivityLogService.findAll({ id: 'desc' });
  }

  @Get()
  // @Features(Feature.BASIC_REPORTING)
  async findAll(@Query('by') by?: string) {
    if (by) {
      if (Prisma.UserActivityLogScalarFieldEnum[by] !== undefined) {
        return {
          data: await this.userActivityLogService.findAllAggregateBy(Prisma.UserActivityLogScalarFieldEnum[by]),
          attributes: {
            users: await this.userActivityLogService.findAllUniqueUserIdEmails(),
          },
        };
      }
    } else {
      return {
        data: await this.userActivityLogService.findAll({ id: 'desc' }),
        attributes: {
          users: await this.userActivityLogService.findAllUniqueUserIdEmails(),
        },
      };
    }
  }
}
