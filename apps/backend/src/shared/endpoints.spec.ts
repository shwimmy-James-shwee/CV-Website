import { ROUTE, API } from './endpoints';

describe('endpoints file', () => {
  it('Each ROUTE should also have matching API', () => {
    for (const [_, routes] of Object.entries(ROUTE)) {
      for (const [_, routeValue] of Object.entries(routes)) {
        expect(JSON.stringify(API)).toContain(routeValue);
      }
    }
  });
});
