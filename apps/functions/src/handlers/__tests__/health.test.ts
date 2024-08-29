import { HttpRequest, InvocationContext } from "@azure/functions";
import { health } from "../health";

describe("health function", () => {
  const request: HttpRequest = {
    url: "https://example.com/health",
    method: "GET",
    params: {},
    body: null,
    headers: {
      append: jest.fn(),
      delete: jest.fn(),
      get: jest.fn(),
      has: jest.fn(),
      set: jest.fn(),
      getSetCookie: jest.fn(),
      forEach: jest.fn(),
      keys: jest.fn(),
      values: jest.fn(),
      entries: jest.fn(),
      [Symbol.iterator]: jest.fn()
    },
    query: new URLSearchParams(),
    user: null,
    bodyUsed: false,
    arrayBuffer: jest.fn(),
    blob: jest.fn(),
    formData: jest.fn(),
    json: jest.fn(),
    text: jest.fn(),
    clone: jest.fn()
  };

  const context: InvocationContext = {
    invocationId: "123",
    functionName: "health",
    extraInputs: {
      get: jest.fn(),
      set: jest.fn()
    },
    extraOutputs: {
      get: jest.fn(),
      set: jest.fn()
    },
    log: jest.fn(),
    trace: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    options: {
      trigger: {
        type: "http",
        name: "req"
      },
      return: undefined,
      extraInputs: [{ type: "http", name: "req" }],
      extraOutputs: []
    }
  };
  beforeAll(() => {});
  it("should return a JSON response with a message", async () => {
    // Arrange
    // Act
    const response = await health(request, context);

    // Assert
    expect(response).toEqual({
      jsonBody: { message: "we're good, healthy" }
    });
    expect(context.log).toHaveBeenCalledWith(`Http function processed request for url "${request.url}"`);
  });
});
