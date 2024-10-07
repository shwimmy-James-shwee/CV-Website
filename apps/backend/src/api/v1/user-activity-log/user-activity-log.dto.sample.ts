// import { Prisma } from '@core/db';

// // if you need to define the any data transfer object, below is an example
// // basically the object need to be a partial of the Prisma model and any additional value are then added to the object to support the business logic
// export type createDTO = Partial<Prisma.UserActivityLogCreateInput>;

// export const createDTOExample: createDTO = {
//   sessionIdentifier: 'string|null',
//   eventStartTime: new Date('2024-01-02T00:00:00.000Z'),
//   eventEndTime: new Date('2024-01-02T00:00:10.000Z'),
//   eventDuration: 100,
//   eventParam: 'string|null',
//   eventUrl: '/landing-page/example',
//   // User: null, user come from req.user
// };
