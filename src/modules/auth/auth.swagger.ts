export const authSwagger = {
  "/api/v1/auth/login": {
    post: {
      tags: ["Auth"],
      summary: "Login",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: { type: "string", example: "user@example.com" },
                password: { type: "string", example: "StrongPassword123" },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "User created successfully" },
        401: { description: "Invalid credentials" },
        404: { description: "User not found" },
        500: { description: "Internal server error" },
      },
    },
  },

  "/api/v1/auth/register": {
    post: {
      tags: ["Auth"],
      summary: "Register a new user",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: { type: "string", example: "newuser@example.com" },
                username: { type: "string", example: "newuser123" },
                password: { type: "string", example: "StrongPassword123" },
                repeatPassword: {
                  type: "string",
                  example: "StrongPassword123",
                },
              },
              required: ["email", "username", "password", "repeatPassword"],
            },
          },
        },
      },
      responses: {
        201: { description: "User registered successfully" },
        400: { description: "Validation error or passwords do not match" },
        409: { description: "Email already in use" },
        500: { description: "Internal server error" },
      },
    },
  },

  "/api/v1/auth/verify-email": {
    get: {
    tags: ["Auth"],
    summary: "Verify email using token",
    parameters: [
      {
        name: "token",
        in: "query",
        required: true,
        schema: {
          type: "string",
          example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        },
        description: "Token sent via email to verify user",
      },
    ],
    responses: {
      200: {
        description: "Email successfully verified",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                success: { type: "boolean", example: true },
                message: { type: "string", example: "Email verified successfully" },
                data: { type: "string", example: "Email verified successfully" },
              },
            },
          },
        },
      },
      400: { description: "Invalid or missing token" },
      404: { description: "User or token not found" },
    },
  },
  },

  "/api/v1/auth/forgot-password": {
    post: {
      tags: ["Auth"],
      summary: "Request password reset",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: { type: "string", example: "user@example.com" },
              },
              required: ["email"],
            },
          },
        },
      },
      responses: {
        200: { description: "Password reset email sent" },
        404: { description: "User not found" },
      },
    },
  },
  "/api/v1/auth/reset-password": {
    post: {
      tags: ["Auth"],
      summary: "Reset password using token",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                token: { type: "string" },
                password: { type: "string" },
                repeatPassword: { type: "string" },
              },
              required: ["token", "password", "repeatPassword"],
            },
          },
        },
      },
      responses: {
        200: { description: "Password has been reset" },
        400: { description: "Invalid token or mismatched passwords" },
      },
    },
  },
  "/api/v1/auth/refresh-token": {
    post: {
      tags: ["Auth"],
      summary: "Refresh access token",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                refreshToken: {
                  type: "string",
                  example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                },
              },
              required: ["refreshToken"],
            },
          },
        },
      },
      responses: {
        200: {
          description: "Tokens refreshed successfully",
        },
        401: {
          description: "Invalid or expired refresh token",
        },
      },
    },
  },
  "/api/v1/auth/logout": {
    post: {
      tags: ["Auth"],
      summary: "Logout user (invalidate refresh token)",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                refreshToken: {
                  type: "string",
                  example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                },
              },
              required: ["refreshToken"],
            },
          },
        },
      },
      responses: {
        200: { description: "Logout successful" },
        404: { description: "Refresh token or user not found" },
        500: { description: "Internal server error" },
      },
    },
  },
  '/api/v1/auth/me': {
  get: {
    tags: ['Auth'],
    summary: 'Get current logged-in user profile',
    security: [{ bearerAuth: [] }],
    responses: {
      200: { description: 'User profile returned' },
      401: { description: 'Unauthorized' },
      404: { description: 'User not found' },
    },
  },
}
};
