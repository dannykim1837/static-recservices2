/*

OUT OF DATE





==============================================
  ✅ EXPRESS SERVER CONFIGURATION (server.js)
  - Initializes Express and API routes
  - Integrates middleware for security & logging
==============================================
*/

import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import dotenv from "dotenv";
import redoc from "redoc-express";
import swaggerSpec from "./config/swagger.js"; // Import OpenAPI JSON
import routes from "./routes/index.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

// ✅ CORS Configuration
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept",
    credentials: true,
  })
);

// ✅ Enable JSON request parsing
app.use(express.json());

// ✅ Secure API with Helmet
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "https://unpkg.com",
          "'unsafe-inline'",
          "'unsafe-eval'",
        ],
        styleSrc: ["'self'", "https://fonts.googleapis.com", "'unsafe-inline'"],
        imgSrc: [
          "'self'",
          "data:",
          "https://unpkg.com",
          "https://cdn.redoc.ly",
        ],
        fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
        connectSrc: ["'self'", "https://unpkg.com", "http://localhost:8080"],
        frameAncestors: ["'self'"],
        workerSrc: ["'self'", "blob:"],
        objectSrc: ["'none'"],
      },
    },
  })
);

// ✅ Enable Compression & Logging
app.use(compression());
app.use(morgan("dev"));

// ✅ Serve OpenAPI JSON dynamically from `swagger.js`
app.get("/openapi.json", (req, res) => {
  res.json(swaggerSpec);
});

// ✅ Serve API Docs using Redoc
app.get(
  "/docs",
  redoc({
    title: "Rec Services API Docs",
    specUrl: "/openapi.json",
  })
);

// ✅ Mount API Routes
app.use("/", routes);

// ✅ Error Handling Middleware
app.use(errorHandler);

// ✅ Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📖 API Docs available at http://localhost:${PORT}/docs`);
  console.log(`\nTo quit server.js use "Ctrl + C"\n`);
});
