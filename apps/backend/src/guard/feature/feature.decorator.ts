import { SetMetadata } from '@nestjs/common';
import { Feature } from '@core/db';

export const FEATURES_KEY = 'features';

export const Features = (...features: Feature[]) => SetMetadata(FEATURES_KEY, features);
