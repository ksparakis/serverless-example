
// Notice that in the handler you only added base business logic (no deserialization,
// validation or error handler), we will add the rest with middlewares

export const helloSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        hello: { type: 'string', minLength: 3, maxLength: 200},
      },
      required: ['hello'] // Insert here all required event properties
    }
  }
};