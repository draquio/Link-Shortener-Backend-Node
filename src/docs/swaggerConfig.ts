import { ENV } from "@/utils/constants";
import { userSwagger } from "@/modules/user/user.swagger";
import { authSwagger } from "@/modules/auth/auth.swagger";
import { linkSwagger } from "@/modules/link/link.swagger";
const PORT = ENV.PORT;

export const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "Link Shortener API",
    version: "1.0.0",
    description: "API documentation for Link Shortener Backend",
  },
  servers: [
    {
      url: `http://localhost:${PORT}`,
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },

  security: [
    {
      bearerAuth: [],
    },
  ],
  paths: {
    ...linkSwagger,
    ...authSwagger,
    ...userSwagger,
  },
};
