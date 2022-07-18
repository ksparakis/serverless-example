import middy from '@middy/core';

/**
 * Wraps a handler function and returns a middy-wrapped function.
 * Should be used as the first middleware in the chain.
 * @param handler {function(respond, event, context)|function(event, context)}
 * @returns {middy}
 */
export const middleware = handler => middy(async (event, context) => {
  const result = await handler(event, context);

  return result ?? '';
});
