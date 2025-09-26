const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { validatePagination } = require('../middleware/validation');
const {
  getUserProfile,
  updateUserProfile,
  changePassword,
  wellnessCheckIn,
  getUserStatistics,
  getActivitySummary,
  deleteUserAccount
} = require('../controllers/userController');

const router = express.Router();

// Get user profile
router.get('/profile', authenticateToken, getUserProfile);

// Update user profile
router.put('/profile', authenticateToken, updateUserProfile);

// Change password
router.put('/change-password', authenticateToken, changePassword);

// Wellness check-in
router.post('/wellness-checkin', authenticateToken, wellnessCheckIn);

// Get user statistics
router.get('/statistics', authenticateToken, getUserStatistics);

// Get activity summary
router.get('/activity-summary', authenticateToken, getActivitySummary);

// Delete user account
router.delete('/account', authenticateToken, deleteUserAccount);

module.exports = router;