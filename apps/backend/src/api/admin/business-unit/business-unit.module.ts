import { Module } from '@nestjs/common';
import { BusinessUnitService } from './business-unit.service';
import { BusinessUnitController } from './business-unit.controller';
import { DatabaseModule } from '../../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [BusinessUnitController],
  providers: [BusinessUnitService],
})
export class BusinessUnitModule {}
