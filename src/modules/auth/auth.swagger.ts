export const authSwagger = {
  '/api/v1/auth/login': {
    post: {
      tags: ['Auth'],
      summary: 'Login',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email: { type: 'string', example: 'user@example.com' },
                password: { type: 'string', example: 'StrongPassword123' },
              },
            },
          },
        },
      },
      responses: {
        200: { description: 'User created successfully' },
        401: { description: 'Invalid credentials' },
        404: { description: 'User not found' },
        500: { description: 'Internal server error' },
      },
    },
  }
}
