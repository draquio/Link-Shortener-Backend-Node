export const userSwagger = {
  '/api/v1/users': {
    get: {
      tags: ['Users'],
      summary: 'Get all users',
      parameters: [
        {
          in: 'query',
          name: 'page',
          schema: { type: 'integer' },
          description: 'Page number',
        },
        {
          in: 'query',
          name: 'pageSize',
          schema: { type: 'integer' },
          description: 'Page size',
        },
        {
          in: 'query',
          name: 'isDeleted',
          schema: { type: 'boolean' },
          description: 'Filter deleted users',
        },
      ],
      responses: {
        200: { description: 'A list of users.' },
      },
    },

    post: {
      tags: ['Users'],
      summary: 'Create a new user',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email: { type: 'string', example: 'user@example.com' },
                username: { type: 'string', example: 'johndoe' },
                password: { type: 'string', example: 'StrongPassword123' },
                membershipId: { type: 'integer', nullable: true, example: 1 },
              },
            },
          },
        },
      },
      responses: {
        201: { description: 'User created successfully' },
        500: { description: 'Internal server error' },
      },
    },
  },

  '/api/v1/users/{id}': {
    get: {
      tags: ['Users'],
      summary: 'Get user by ID',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'integer' },
          description: 'ID of the user',
        },
      ],
      responses: {
        200: { description: 'A single user object' },
        404: { description: 'User not found' },
        500: { description: 'Internal server error' },
      },
    },

    put: {
      tags: ['Users'],
      summary: 'Update a user',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'integer' },
          description: 'ID of the user to update',
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                username: { type: 'string', example: 'updated_username' },
                email: { type: 'string', example: 'updated@example.com' },
                isActive: { type: 'boolean', example: true },
                membershipId: { type: 'integer', nullable: true, example: 2 },
              },
            },
          },
        },
      },
      responses: {
        200: { description: 'User updated successfully' },
        404: { description: 'User not found' },
        500: { description: 'Internal server error' },
      },
    },

    patch: {
      tags: ['Users'],
      summary: 'Set a new user password',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'integer' },
          description: 'ID of the user to set new password',
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                password: { type: 'string', example: 'newpassword' },
                repeatPassword: { type: 'string', example: 'repeatPassword' },
              },
            },
          },
        },
      },
      responses: {
        200: { description: 'Password updated successfully' },
        404: { description: 'User not found' },
        500: { description: 'Internal server error' },
      },
    },

    delete: {
      tags: ['Users'],
      summary: 'Delete a user (soft delete)',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'integer' },
          description: 'ID of the user to delete',
        },
      ],
      responses: {
        204: { description: 'User deleted successfully' },
        404: { description: 'User not found' },
        500: { description: 'Internal server error' },
      },
    },
  },
};
