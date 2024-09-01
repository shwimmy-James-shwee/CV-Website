import { BusinessUnitType, Feature, Prisma } from '@prisma/client';

export const seedBusinessUnitData: Prisma.BusinessUnitCreateInput = {
  name: 'Business Unit 1',
  description: 'Business Unit 1 Description',
  type: BusinessUnitType.TEAM,
  features: [Feature.BASIC]
};

export const seedParentBusinessUnitData: Prisma.BusinessUnitCreateInput = {
  name: 'Parent Business Unit 1',
  description: 'Parent Business Unit 1 Description',
  type: BusinessUnitType.TEAM,
  features: [Feature.BASIC, Feature.BASIC_REPORTING]
};
