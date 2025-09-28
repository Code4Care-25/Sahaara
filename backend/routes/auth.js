const express = require("express");
const {
  validateUserRegistration,
  validateUserLogin,
  validateCounsellorRegistration,
} = require("../middleware/validation");
const {
  authLimiter,
  passwordResetLimiter,
} = require("../middleware/rateLimiting");
const { authenticateToken } = require("../middleware/auth");
const {
  registerUser,
  loginUser,
  registerCounsellor,
  refreshToken,
  verifyEmail,
  forgotPassword,
  resetPassword,
  getInstitutions,
  getDepartments,
  verifyToken,
} = require("../controllers/authController");

const router = express.Router();

// User Registration
router.post("/register", authLimiter, validateUserRegistration, registerUser);

// User Login
router.post("/login", authLimiter, validateUserLogin, loginUser);

// Counsellor Registration
router.post(
  "/register-counsellor",
  authLimiter,
  validateCounsellorRegistration,
  registerCounsellor
);

// Token Refresh
router.post("/refresh-token", refreshToken);

// Email Verification
router.get("/verify-email/:token", verifyEmail);

// Password Reset Request
router.post("/forgot-password", passwordResetLimiter, forgotPassword);

// Password Reset
router.post("/reset-password", passwordResetLimiter, resetPassword);

// Get Institutions
router.get("/institutions", getInstitutions);

// Get Departments
router.get("/departments/:institutionId", getDepartments);

// Verify Token (for frontend to check if user is logged in)
router.get("/verify", authenticateToken, verifyToken);

module.exports = router;
