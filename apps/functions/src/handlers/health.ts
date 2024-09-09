import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { arrayIsEmpty } from '@core/utils';
import { readFileSync } from 'fs';

export async function health(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);
  try {
    const commitMsg = readFileSync('./git_commit_msg.txt', 'utf8');
    return {
      jsonBody: {
        message: `we're good, healthy. Test false  ${arrayIsEmpty.name}([1]) -> ${arrayIsEmpty([1])} \n commitMsg:\n\n${commitMsg}`,
      },
    };
  } catch (_) {
    return {
      jsonBody: {
        message: `we're good, healthy. Test false  ${arrayIsEmpty.name}([1]) -> ${arrayIsEmpty([1])}`,
      },
    };
  }
}

app.http('health', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  handler: health,
});
