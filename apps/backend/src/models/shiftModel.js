const ShiftSchema = {
    type: "object",
    properties: {
      shift_id: { type: "integer", example: 1 },
      employee_id: { type: "integer", example: 3 },
      shift_start: { type: "string", format: "date-time", example: "2025-03-10T09:00:00Z" },
      shift_end: { type: "string", format: "date-time", example: "2025-03-10T17:00:00Z" },
      is_up_for_trade: { type: "boolean", example: true },
    },
  };
  
  export default ShiftSchema;
  