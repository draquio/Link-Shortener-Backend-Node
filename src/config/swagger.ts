import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Link Shortener API',
    version: '1.0.0',
    description: 'API documentation for Link Shortener',
  },
  servers: [
    {
      url: 'http://localhost:3000',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/modules/**/*.ts'], // acá va a escanear los comentarios JSDoc de tus routes/controllers
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
