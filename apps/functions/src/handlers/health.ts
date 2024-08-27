import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

export async function health(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  return { jsonBody: { message: "we're good, healthy" } };
}

app.http("health", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: health
});
