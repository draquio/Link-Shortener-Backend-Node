export const visitSwagger = {
  "/api/v1/visit/{shortcode}": {
    get: {
      tags: ["Visit"],
      summary: "Redirect to the original URL using a shortcode and register a visit",
      description: "Returns the original URL associated with the shortcode and records a visit for analytics.",
      parameters: [
        {
          name: "shortcode",
          in: "path",
          required: true,
          schema: { type: "string", minLength: 4 },
          description: "The shortcode identifying the original URL",
        },
      ],
      responses: {
        200: {
          description: "Original URL retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  message: { type: "string", example: "URL retrieved successfully" },
                  data: { type: "string", example: "https://example.com" },
                },
              },
            },
          },
        },
        400: {
          description: "Invalid shortcode format",
        },
        404: {
          description: "Shortcode not found",
        },
        500: {
          description: "Internal server error",
        },
      },
    },
  },
};
