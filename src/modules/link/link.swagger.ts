export const linkSwagger = {
  "/api/v1/links": {
    post: {
      tags: ["Links"],
      summary: "Create a new short link",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                originalUrl: { type: "string" },
                advertisementLink: { type: "string" },
                expirationDate: { type: "string", format: "date-time" },
              },
              required: ["originalUrl"],
            },
          },
        },
      },
      responses: {
        201: { description: "Link created" },
        400: { description: "Validation error" },
        401: { description: "Unauthorized" },
      },
    },

    get: {
      tags: ["Links"],
      summary: "Get all links of the authenticated user",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "page",
          in: "query",
          schema: { type: "integer", minimum: 1, default: 1 },
          required: false,
          description: "Page number for pagination",
        },
        {
          name: "pageSize",
          in: "query",
          schema: { type: "integer", minimum: 1, maximum: 20, default: 10 },
          required: false,
          description: "Number of items per page",
        },
        {
          name: "isActive",
          in: "query",
          schema: { type: "boolean" },
          required: false,
          description: "Filter links by active status",
        },
      ],
      responses: {
        200: { description: "Links retrieved successfully" },
        401: { description: "Unauthorized" },
        500: { description: "Internal server error" },
      },
    },
  },

  "/api/v1/links/{id}": {
    patch: {
      tags: ["Links"],
      summary: "Update a short link",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "integer" },
          description: "ID of the link to update",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                advertisementLink: { type: "string" },
                expirationDate: { type: "string", format: "date-time" },
                isActive: { type: "boolean" },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Link updated successfully" },
        400: { description: "Validation error" },
        401: { description: "Unauthorized" },
        404: { description: "Link not found" },
      },
    },

    delete: {
      tags: ["Links"],
      summary: "Delete a short link",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "integer" },
          description: "ID of the link to delete",
        },
      ],
      responses: {
        204: { description: "Link deleted successfully" },
        401: { description: "Unauthorized" },
        404: { description: "Link not found" },
      },
    },
  },
};
