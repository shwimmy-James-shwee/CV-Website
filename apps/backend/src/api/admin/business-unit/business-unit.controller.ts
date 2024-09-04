import { Controller, Get, Param, UseGuards, NotFoundException } from '@nestjs/common';
import { BusinessUnitService } from './business-unit.service';
import { UserRole } from '@core/db';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AzureADGuard } from '../../../guard/auth/azuread.guard';
import { RoleGuard } from '../../../guard/role/role.guard';
import { Roles } from '../../../guard/role/role.decorator';
import { PREFIX } from '@core/routes';
@ApiTags('Business Unit (Admin)')
@Controller(PREFIX.businessUnit)
// !important, AzureADGuard must be first in the list of guards, it provide the user object to the request
@UseGuards(AzureADGuard, RoleGuard)
@Roles(UserRole.ADMINISTRATOR)
export class BusinessUnitController {
  constructor(private readonly businessUnitService: BusinessUnitService) {}

  @Get()
  @ApiOperation({ summary: 'Get all user' })
  @ApiResponse({
    status: 200,
    description: 'list of user',
  })
  @Roles(UserRole.ADMINISTRATOR)
  findAll() {
    return this.businessUnitService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one user by id' })
  @ApiResponse({
    status: 200,
    description: 'return a user',
  })
  @Roles(UserRole.ADMINISTRATOR)
  async findOne(@Param('id') id: string) {
    const businessUnit = await this.businessUnitService.findOne(id);
    if (!businessUnit) {
      throw new NotFoundException('Business Unit not found');
    }
    return businessUnit;
  }
}
