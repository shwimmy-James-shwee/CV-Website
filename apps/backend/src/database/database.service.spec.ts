import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from './database.service';
describe('DatabaseService', () => {
  let service: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseService]
    }).compile();

    service = module.get<DatabaseService>(DatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be connect when onModuleInit', async () => {
    service.$connect = jest.fn();
    await service.onModuleInit();
    expect(service.$connect).toHaveBeenCalledTimes(1);
  });

  it('should be disconnect when onModuleDestroy', async () => {
    service.$disconnect = jest.fn();
    await service.onModuleDestroy();
    expect(service.$disconnect).toHaveBeenCalledTimes(1);
  });
});
