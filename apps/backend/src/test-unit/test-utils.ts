// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
export function mockFunction<T>(o: T, p: PropertyKey, overrideTo: PropertyKey | object | Function) {
  if (typeof overrideTo !== 'function') {
    Object.defineProperty(o, p, {
      value: jest.fn().mockReturnValue(overrideTo),
      configurable: true,
      writable: true,
    });
  } else {
    Object.defineProperty(o, p, {
      value: overrideTo,
      configurable: true,
      writable: true,
    });
  }
}
