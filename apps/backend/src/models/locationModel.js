const LocationSchema = {
    type: "object",
    properties: {
      location_id: { type: "integer", example: 1 },
      location_name: { type: "string", example: "Main Office" },
      employee_count: { type: "integer", example: 25 },
      physical_address: { type: "string", example: "123 University Blvd, City, ST 12345" },
    },
  };
  
  export default LocationSchema;
  