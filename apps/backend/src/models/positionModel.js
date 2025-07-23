const PositionSchema = {
    type: "object",
    properties: {
      position_id: { type: "integer", example: 1 },
      position_name: { type: "string", example: "Manager" },
      position_count: { type: "integer", example: 5 },
    },
  };
  
  export default PositionSchema;
  