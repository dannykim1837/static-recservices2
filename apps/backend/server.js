/*
    Sets up Express server for database security

*/

// Set up supabase connection
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "./.env") });

import express from "express";
import cors from "cors";
import redoc from "redoc-express";

// Swagger UI setup
import swaggerUi from "swagger-ui-express";
import fs from "fs";

// Add routers
import employeeRouter from "./src/routes/employees.js";
import positionRouter from "./src/routes/positions.js";
import locationRouter from "./src/routes/locations.js";
import shiftRouter from "./src/routes/shifts.js";
import authRouter from "./src/routes/authentication.js";

const app = express(); // Initialize express
const PORT = process.env.PORT || 3000;

app.use(cors()); //allow requests from front-end
app.use(express.json()); //parse JSON request bodies

//add routes; use routers
app.use("/employees", employeeRouter);
app.use("/positions", positionRouter);
app.use("/locations", locationRouter);
app.use("/shifts", shiftRouter);
app.use("/authentication", authRouter);

// Serve OpenAPI JSON at /openapi.json
app.get("/openapi.json", (req, res) => {
  const openApiPath = path.join(__dirname, "openapi.json");
  res.sendFile(openApiPath);
});

// Swagger UI at /docs
const openApiSpec = JSON.parse(
  fs.readFileSync(path.join(__dirname, "openapi.json"), "utf8")
);
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(openApiSpec, {
    customSiteTitle: "Rec Services API Docs",
    customfavIcon: "/favicon.ico",
    customCss: ".swagger-ui .topbar { display: none }",
  })
);

// Serve API Docs using Redoc
app.get(
  "/redoc",
  redoc({
    title: "Rec Services API Docs",
    specUrl: "/openapi.json",
  })
);

app.listen(PORT, () => {
  // starts the server
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`\n📖 API Docs (Swagger UI):    http://localhost:${PORT}/docs`);
  console.log(`📖 API Docs (Redoc):         http://localhost:${PORT}/redoc`);
  console.log(
    `📖 OpenAPI JSON:             http://localhost:${PORT}/openapi.json`
  );
  console.log(`\nTo quit server.js use "Ctrl + C"\n`);
});
