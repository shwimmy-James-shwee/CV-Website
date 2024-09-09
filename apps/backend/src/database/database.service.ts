import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
// import { PrismaClient } from '@core/db';
import { ExtendedPrismaClient } from './database.extended';
@Injectable()
export class DatabaseService extends ExtendedPrismaClient implements OnModuleInit, OnModuleDestroy {
  private static instance: DatabaseService | undefined;

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  async onModuleInit() {
    try {
      await this.$connect();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
