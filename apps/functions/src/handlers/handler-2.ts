import { app, HttpHandler, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

const handler: HttpHandler = async (request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> => {
  const message = `Http function processed the following request:  ${request?.method} ${request?.url}`;
  context.log(message);

  const body: string = JSON.stringify({ message });

  return { status: 200, body };
};

app.http(`handler-2`, {
  methods: [`GET`, `POST`],
  authLevel: `anonymous`,
  handler
});
