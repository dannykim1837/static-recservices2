//TODO: Make sure this file is set up correctly for supabase

import Joi from "joi";

// Define validation schemas for different database collections
const validationSchemas = {
  employees: Joi.object({
    // MATCH WITH EMPLOYEE TABLE COLUMNS
    id: Joi.number().integer().optional(), // Primary Key (auto-increment)
    firstName: Joi.string().trim().min(1).max(50).required(),
    lastName: Joi.string().trim().min(1).max(50).required(),
    email: Joi.string().trim().min(1).max(50).required(),
    position: Joi.number().integer().optional().allow(null),
    location: Joi.number().integer().optional().allow(null),
    active: Joi.boolean().required(),
  }),

  Location: Joi.object({
    // MATCH WITH LOCATION TABLE COLUMNS
    id: Joi.number().integer().optional(), // Primary Key (auto-increment)
    name: Joi.string().trim().min(1).max(100).required(),
    count: Joi.number().integer().optional().allow(null),
    address: Joi.string().trim().max(255).optional().allow(null, ""),
  }),
// Changes to Position to match Supabase Table
  Position: Joi.object({
  id: Joi.number().integer().optional(), // bigint, auto-generated
  name: Joi.string().trim().min(1).required(), // character varying NOT NULL
  count: Joi.number().integer().optional().allow(null), // bigint NULL
}),
// Changes to Shift to match Supabase Table

Shift: Joi.object({
  id: Joi.number().integer().required(), // bigint NOT NULL, primary key
  employeeID: Joi.number().integer().optional().allow(null), // Employee id that has this shift
  created_at: Joi.date().iso().optional(), // timestamp with time zone, default now()
  start_time: Joi.date().iso().optional().allow(null), // timestamp w/o time zone
  end_time: Joi.date().iso().optional().allow(null),
  up_for_trade: Joi.boolean().optional().allow(null),
  duration: Joi.number().integer().optional().allow(null),
  clock_in_time: Joi.date().iso().optional().allow(null),
  clock_out_time: Joi.date().iso().optional().allow(null),
  clocked_duration: Joi.number().integer().optional().allow(null),
}),
};

// Function to validate data dynamically based on `dbTitle`
export const validateData = (dbTitle, data) => {
  const schema = validationSchemas[dbTitle];
  if (!schema) {
    throw new Error(`No validation schema found for '${dbTitle}'`);
  }
  return schema.validate(data, { abortEarly: false });
};
