require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/database");
const mealAttendanceRoutes = require("./routes/mealAttendance");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Security middleware
app.use(helmet());
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? ["https://yourdomain.com"]
        : ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: "Too many requests from this IP, please try again later.",
  },
});
app.use("/api/", limiter);

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Sahaara Meal Monitoring API is running",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

// API routes
app.use("/api/meal-attendance", mealAttendanceRoutes);

// Privacy policy endpoint
app.get("/privacy", (req, res) => {
  res.json({
    success: true,
    privacyPolicy: {
      dataCollection: {
        purpose: "Mental health support through meal pattern monitoring",
        dataTypes: [
          "Anonymized meal attendance data",
          "Pattern analysis results",
        ],
        retention: "90 days (configurable by user)",
        anonymization: "All personal identifiers are tokenized and anonymized",
      },
      userRights: {
        optOut: "Users can opt out at any time",
        dataAccess: "Users can request their anonymized data",
        dataDeletion: "Data automatically expires based on retention settings",
        consent: "Explicit consent required for data collection",
      },
      security: {
        encryption: "All data encrypted in transit and at rest",
        access: "Limited access with audit trails",
        monitoring: "System access is logged and monitored",
      },
      contact: {
        email: "privacy@sahaara.com",
        phone: "+1-800-SAHAARA",
      },
    },
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);

  // Don't leak error details in production
  const isDevelopment = process.env.NODE_ENV === "development";

  res.status(err.status || 500).json({
    success: false,
    error: isDevelopment ? err.message : "Internal server error",
    ...(isDevelopment && { stack: err.stack }),
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    error: "API endpoint not found",
    availableEndpoints: [
      "GET /health",
      "GET /privacy",
      "POST /api/meal-attendance",
      "POST /api/meal-attendance/batch",
      "GET /api/meal-attendance/:anonymizedId/patterns",
      "PUT /api/meal-attendance/:anonymizedId/privacy",
      "POST /api/meal-attendance/:anonymizedId/check-in/:checkInId/response",
    ],
  });
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("SIGINT received, shutting down gracefully");
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`🚀 Sahaara Meal Monitoring API running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`🔒 Privacy-focused meal attendance monitoring enabled`);
  console.log(`💙 Caring support, not surveillance`);
});
