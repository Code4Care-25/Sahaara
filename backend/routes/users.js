const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { authenticateToken, checkOwnership } = require('../middleware/auth');
const { validatePagination } = require('../middleware/validation');

// Get user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Failed to fetch profile', details: error.message }
    });
  }
});

// Update user profile
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { name, phone, institution, department, academicYear } = req.body;
    
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: { message: 'User not found' }
      });
    }

    // Update fields
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (institution) user.institution = institution;
    if (department) user.department = department;
    if (academicYear) user.academicYear = academicYear;

    await user.save();

    res.json({
      success: true,
      data: user.getPublicProfile(),
      message: 'Profile updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Failed to update profile', details: error.message }
    });
  }
});

// Change password
router.put('/change-password', authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: { message: 'User not found' }
      });
    }

    // Verify current password
    const isCurrentPasswordValid = await user.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        success: false,
        error: { message: 'Current password is incorrect' }
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Failed to change password', details: error.message }
    });
  }
});

// Get wellness profile
router.get('/wellness-profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('wellnessProfile');
    res.json({
      success: true,
      data: user.wellnessProfile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Failed to fetch wellness profile', details: error.message }
    });
  }
});

// Update wellness profile
router.put('/wellness-profile', authenticateToken, async (req, res) => {
  try {
    const { mood, energy, stress, sleep, social } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: { message: 'User not found' }
      });
    }

    await user.updateWellnessProfile({
      mood,
      energy,
      stress,
      sleep,
      social,
      lastUpdated: new Date()
    });

    res.json({
      success: true,
      data: user.wellnessProfile,
      message: 'Wellness profile updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Failed to update wellness profile', details: error.message }
    });
  }
});

// Wellness check-in
router.post('/wellness-checkin', authenticateToken, async (req, res) => {
  try {
    const { mood, energy, stress, sleep, social } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: { message: 'User not found' }
      });
    }

    await user.updateWellnessProfile({
      mood,
      energy,
      stress,
      sleep,
      social,
      lastUpdated: new Date()
    });

    // Generate recommendations based on wellness data
    const recommendations = [];
    if (energy < 5) recommendations.push('Try a 10-minute meditation session');
    if (stress > 7) recommendations.push('Take a short walk outside');
    if (social < 5) recommendations.push('Connect with a friend or family member');
    if (sleep < 5) recommendations.push('Practice good sleep hygiene');
    if (mood === 'sad' || mood === 'anxious') recommendations.push('Consider talking to a counsellor');

    res.json({
      success: true,
      data: {
        wellnessProfile: user.wellnessProfile,
        recommendations
      },
      message: 'Wellness check-in completed successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Failed to complete wellness check-in', details: error.message }
    });
  }
});

// Get activity summary
router.get('/activity-summary', authenticateToken, async (req, res) => {
  try {
    // Mock data - in real implementation, calculate from actual data
    const activitySummary = {
      today: {
        chatSessions: 1,
        journalEntries: 1,
        mealEntries: 2,
        resourcesViewed: 1,
        forumPosts: 0
      },
      thisWeek: {
        chatSessions: 3,
        journalEntries: 4,
        mealEntries: 12,
        resourcesViewed: 5,
        forumPosts: 2
      },
      thisMonth: {
        chatSessions: 12,
        journalEntries: 18,
        mealEntries: 45,
        resourcesViewed: 15,
        forumPosts: 5
      },
      streaks: {
        journal: 7,
        mealTracking: 5,
        chatSessions: 3
      }
    };

    res.json({
      success: true,
      data: activitySummary
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Failed to fetch activity summary', details: error.message }
    });
  }
});

// Get user statistics
router.get('/statistics', authenticateToken, async (req, res) => {
  try {
    // Mock data - in real implementation, calculate from actual data
    const statistics = {
      totalChatSessions: 12,
      totalAppointments: 3,
      totalJournalEntries: 25,
      totalMealEntries: 45,
      totalResourcesViewed: 8,
      moodTrends: {
        happy: 15,
        neutral: 8,
        sad: 2
      },
      weeklyActivity: {
        chat: 3,
        journal: 5,
        meals: 7,
        resources: 2
      }
    };

    res.json({
      success: true,
      data: statistics
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Failed to fetch statistics', details: error.message }
    });
  }
});

// Delete account
router.delete('/account', authenticateToken, async (req, res) => {
  try {
    const { password } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: { message: 'User not found' }
      });
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        error: { message: 'Password is incorrect' }
      });
    }

    // Delete user (in real implementation, you might want to soft delete)
    await User.findByIdAndDelete(req.user._id);

    res.json({
      success: true,
      message: 'Account deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Failed to delete account', details: error.message }
    });
  }
});

module.exports = router;
