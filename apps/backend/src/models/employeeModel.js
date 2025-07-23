const EmployeeSchema = {
  type: "object",
  properties: {
    employee_id: { type: "integer", example: 1 },
    user_id: { type: "string", format: "uuid", example: "6e18acb5-fc9c-11ef-a6dc-0242ac110002" },
    first_name: { type: "string", example: "Alice" },
    last_name: { type: "string", example: "Williams" },
    phone_number: { type: "string", example: "901-234-5678" },
    email: { type: "string", example: "alice.williams@example.com" },
    position_id: { type: "integer", example: 2 }, //from positions
    location_id: { type: "integer", example: 1 }, //from locations
    is_hourly: { type: "boolean", example: true },
    is_salaried: { type: "boolean", example: false },
    is_active: { type: "boolean", example: true }
  }
};

export default EmployeeSchema;
