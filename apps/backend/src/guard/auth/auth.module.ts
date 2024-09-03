import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AzureADStrategy } from './azuread.strategy';
import { UserService } from '../../api/admin/user/user.service';
import { DatabaseModule } from '../../database/database.module';
import { LoggerModule } from '../../utilities/logger/logger.module';
import { FileLoggerService } from '../../utilities/logger/file-logger.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'azure-ad' }),
    LoggerModule,
    CacheModule.register(),
  ],
  providers: [AzureADStrategy, UserService, FileLoggerService],
})
export class AuthModule {}
