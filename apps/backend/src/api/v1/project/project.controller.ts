// import { BadRequestException, Controller, Get, Param, Req } from '@nestjs/common';
// import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
// import { Request } from 'express';
// import { PREFIX, ROUTE } from '@core/routes';
// import { Project } from '@core/db';

// @ApiTags('project')
// @Controller(PREFIX.user)
// export class UserController {
//   constructor(private readonly projectService: ProjectService) {}

//   // This is a key endpoint for creating the user if they don't exist in the database
//   @Get(ROUTE.project.getAll)
//   @ApiOperation({ summary: 'Get the current user, also act as the main entry point to handle user creation logic' })
//   @ApiResponse({
//     status: 200,
//     description: 'found user record',
//   })
//   async getCurrentUser(@Req() req: Request): Promise<Project> {
//     // const userBusinessUnits = await this.userService.findUserBusinessUnits(user.id);
//     // return { ...user, InBusinessUnits: userBusinessUnits };
//   }
// }
