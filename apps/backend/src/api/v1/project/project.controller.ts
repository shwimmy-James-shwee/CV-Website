import { BadRequestException, Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
// import { Request } from 'express';
import { PREFIX, ROUTE } from '@core/routes';
import { Project } from '@core/db';
import { ProjectService } from './project.service';

@ApiTags('project')
@Controller(PREFIX.project)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get(ROUTE.project.getAll)
  @ApiOperation({ summary: 'Get all projects, unprotected endpoint for the public' })
  @ApiResponse({
    status: 200,
    description: 'Projects retrieved',
  })
  //   async getAllProjects(@Req() req: Request): Promise<Project[]> {
  async getAllProjects(): Promise<Project[]> {
    // const userBusinessUnits = await this.userService.findUserBusinessUnits(user.id);
    // return { ...user, InBusinessUnits: userBusinessUnits };
    const projects = await this.projectService.findAll();
    if (!projects) {
      throw new BadRequestException('No projects found');
    } else {
      return projects;
    }
  }
}
