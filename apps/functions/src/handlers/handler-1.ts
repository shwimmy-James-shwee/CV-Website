import { app, HttpHandler, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import * as utils from "@core/utils";

const handler: HttpHandler = async (request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> => {
  const message = `Http function processed the following request:  ${request?.method} ${request?.url}`;
  context.log(message);

  const utilsPackageTestMessage = `Testing usage of function from @core/utils in this app: ${utils.arrayIsEmpty.name}([1]) -> ${utils.arrayIsEmpty([1])}`;

  const body: string = JSON.stringify({ message, utilsPackageTestMessage });

  return { status: 200, body };
};

app.http(`handler-1`, {
  methods: [`GET`, `POST`],
  authLevel: `anonymous`,
  handler
});
