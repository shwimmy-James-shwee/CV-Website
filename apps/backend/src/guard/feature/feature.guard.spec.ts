import { Reflector } from '@nestjs/core';
import { FeatureGuard } from './feature.guard';
import { DatabaseService } from '../../database/database.service';

describe('FeatureGuard', () => {
  it('should be defined', () => {
    expect(new FeatureGuard(null as unknown as Reflector, null as unknown as DatabaseService)).toBeDefined();
  });
});
