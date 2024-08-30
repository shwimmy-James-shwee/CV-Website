import { SetMetadata } from '@nestjs/common';
import { Feature } from '@prisma/client';

export const FEATURES_KEY = 'features';

export const Features = (...features: Feature[]) => SetMetadata(FEATURES_KEY, features);
