import jsonBodyParser from '@middy/http-json-body-parser';
import httpErrorHandler from '@middy/http-error-handler';
import validator from '@middy/validator';
import { helloSchema } from '../schemas/helloSchema';
import { middleware as middy } from '../common/middleware';

// This is your common handler, in no way different than what you are used to doing every day in AWS Lambda
const helloWorld = async (event, context) => {
  // we don't need to deserialize the body ourself as a middleware will be used to do that
  console.log(event, context);

  const { hello } = event?.body || undefined;
  console.log(hello);

  const response = { message: hello };
  return { statusCode: 200, body: JSON.stringify(response) };
};

// Let's "middyfy" our handler, then we will be able to attach middlewares to it
export const handler = middy(helloWorld)
  .use(jsonBodyParser()) // parses the request body when it's a JSON and converts it to an object
  .use(validator( { inputSchema: helloSchema })) // validates the input
  .use(httpErrorHandler()); // handles common http errors and returns proper responses
