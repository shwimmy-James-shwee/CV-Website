import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma, UserRole } from '@prisma/client';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AzureADGuard } from '../../../guard/auth/azuread.guard';
import { RoleGuard } from '../../../guard/role/role.guard';
import { Roles } from '../../../guard/role/role.decorator';
import { PREFIX } from '../../../shared/endpoints';
@ApiTags('User (Admin)')
@Controller(PREFIX.user)
// !important, AzureADGuard must be first in the list of guards, it provide the user object to the request
@UseGuards(AzureADGuard, RoleGuard)
@Roles(UserRole.ADMINISTRATOR)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: 201,
    description: 'user created',
  })
  create(@Body() createUserDto: Prisma.UserCreateInput) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all user' })
  @ApiResponse({
    status: 200,
    description: 'list of user',
  })
  findAll(@Query('role') role?: UserRole) {
    return this.userService.findAll(role);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one user by id' })
  @ApiResponse({
    status: 200,
    description: 'return a user',
  })
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({
    status: 200,
    description: 'user updated',
  })
  update(@Param('id') id: string, @Body() updateUserDto: Prisma.UserUpdateInput) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({
    status: 201,
    description: 'user deleted',
  })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
