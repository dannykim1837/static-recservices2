import swaggerJSDoc from "swagger-jsdoc";

// ✅ Define OpenAPI 3.0 Options
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Rec Services API",
      description: "API for managing employees and schedules",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:8080",
        description: "Local Development Server",
      },
    ],
    components: {
      schemas: {
        Employee: {
          type: "object",
          properties: {
            Employee_ID: { type: "string", example: "E009" },
            First: { type: "string", example: "Alice" },
            Last: { type: "string", example: "Williams" },
            Position: { type: "string", example: "Accountant" },
            Location: { type: "string", example: "Boston" },
            Email: { type: "string", format: "email", example: "alice.williams@example.com" },
            Phone: { type: "string", example: "901-234-5678" },
            Wage: { type: "number", example: 27 },
            Salary: { type: "number", example: 58000 },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"], // ✅ Reads all route files dynamically
};

// ✅ Generate OpenAPI JSON in memory
const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
