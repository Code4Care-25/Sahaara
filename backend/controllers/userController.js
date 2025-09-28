const User = require("../models/User");
const ChatSession = require("../models/ChatSession");
const Appointment = require("../models/Appointment");
const Resource = require("../models/Resource");

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    res.json({
      success: true,
      data: req.user.getPublicProfile(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: "Failed to fetch profile" },
    });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  try {
    const { name, phone, preferences, wellnessProfile } = req.body;
    const user = req.user;

    // Update allowed fields
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (preferences) user.preferences = { ...user.preferences, ...preferences };
    if (wellnessProfile)
      user.wellnessProfile = { ...user.wellnessProfile, ...wellnessProfile };

    await user.save();

    res.json({
      success: true,
      data: user.getPublicProfile(),
      message: "Profile updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: "Failed to update profile" },
    });
  }
};

// Change password
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        error: { message: "Current password and new password are required" },
      });
    }

    // Verify current password
    const user = await User.findById(req.user._id).select("+password");
    const isCurrentPasswordValid = await user.comparePassword(currentPassword);

    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        success: false,
        error: { message: "Current password is incorrect" },
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: "Failed to change password" },
    });
  }
};

// Wellness check-in
const wellnessCheckIn = async (req, res) => {
  try {
    const { mood, energy, stress, sleep, social } = req.body;

    const user = req.user;
    user.wellnessProfile = {
      currentMood: mood,
      stressLevel: stress,
      sleepQuality: sleep,
      energyLevel: energy,
      socialActivity: social,
      lastCheckIn: new Date(),
    };

    await user.save();

    // Generate recommendations based on wellness data
    const recommendations = [];
    if (stress > 7) recommendations.push("Try a 10-minute meditation session");
    if (energy < 4)
      recommendations.push("Consider taking a short walk outside");
    if (sleep < 5) recommendations.push("Review your sleep hygiene routine");
    if (social < 3)
      recommendations.push("Connect with a friend or family member");
    if (mood === "anxious")
      recommendations.push("Practice deep breathing exercises");

    res.json({
      success: true,
      data: {
        checkIn: user.wellnessProfile,
        recommendations,
      },
      message: "Wellness check-in completed successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: "Failed to complete wellness check-in" },
    });
  }
};

// Get user statistics
const getUserStatistics = async (req, res) => {
  try {
    const userId = req.user._id;

    // Get counts from different collections
    const [
      chatSessions,
      appointments,
      journalEntries,
      mealEntries,
      resourcesViewed,
    ] = await Promise.all([
      ChatSession.countDocuments({ userId }),
      Appointment.countDocuments({ userId }),
      // These would be from Journal and MealMonitoring models when implemented
      Promise.resolve(25), // Mock journal entries
      Promise.resolve(45), // Mock meal entries
      Promise.resolve(8), // Mock resources viewed
    ]);

    // Get mood trends from chat sessions
    const moodTrends = await ChatSession.aggregate([
      { $match: { userId } },
      { $unwind: "$analytics" },
      { $group: { _id: "$analytics.moodChange", count: { $sum: 1 } } },
    ]);

    // Get weekly activity
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const weeklyChatSessions = await ChatSession.countDocuments({
      userId,
      createdAt: { $gte: oneWeekAgo },
    });

    res.json({
      success: true,
      data: {
        totalChatSessions: chatSessions,
        totalAppointments: appointments,
        totalJournalEntries: journalEntries,
        totalMealEntries: mealEntries,
        totalResourcesViewed: resourcesViewed,
        moodTrends: moodTrends.reduce((acc, item) => {
          acc[item._id || "unknown"] = item.count;
          return acc;
        }, {}),
        weeklyActivity: {
          chat: weeklyChatSessions,
          journal: 5, // Mock
          meals: 7, // Mock
          resources: 2, // Mock
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: "Failed to fetch statistics" },
    });
  }
};

// Get activity summary
const getActivitySummary = async (req, res) => {
  try {
    const userId = req.user._id;
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Today's activity
    const todayChatSessions = await ChatSession.countDocuments({
      userId,
      createdAt: { $gte: today },
    });

    // This week's activity
    const weeklyChatSessions = await ChatSession.countDocuments({
      userId,
      createdAt: { $gte: oneWeekAgo },
    });

    // This month's activity
    const monthlyChatSessions = await ChatSession.countDocuments({
      userId,
      createdAt: { $gte: oneMonthAgo },
    });

    // Calculate streaks
    const recentSessions = await ChatSession.find({ userId })
      .sort({ createdAt: -1 })
      .limit(10);

    let journalStreak = 0;
    let mealStreak = 0;
    let chatStreak = 0;

    // Simple streak calculation (in real app, this would be more sophisticated)
    if (recentSessions.length > 0) {
      chatStreak = Math.min(recentSessions.length, 7);
    }

    res.json({
      success: true,
      data: {
        today: {
          chatSessions: todayChatSessions,
          journalEntries: 1, // Mock
          mealEntries: 2, // Mock
          resourcesViewed: 1, // Mock
          forumPosts: 0, // Mock
        },
        thisWeek: {
          chatSessions: weeklyChatSessions,
          journalEntries: 4, // Mock
          mealEntries: 12, // Mock
          resourcesViewed: 5, // Mock
          forumPosts: 2, // Mock
        },
        thisMonth: {
          chatSessions: monthlyChatSessions,
          journalEntries: 18, // Mock
          mealEntries: 45, // Mock
          resourcesViewed: 15, // Mock
          forumPosts: 5, // Mock
        },
        streaks: {
          journal: journalStreak,
          mealTracking: mealStreak,
          chatSessions: chatStreak,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: "Failed to fetch activity summary" },
    });
  }
};

// Delete user account
const deleteUserAccount = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        error: { message: "Password is required to delete account" },
      });
    }

    // Verify password
    const user = await User.findById(req.user._id).select("+password");
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        error: { message: "Incorrect password" },
      });
    }

    // Delete user and related data
    await Promise.all([
      User.findByIdAndDelete(req.user._id),
      ChatSession.deleteMany({ userId: req.user._id }),
      Appointment.deleteMany({ userId: req.user._id }),
    ]);

    res.json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: "Failed to delete account" },
    });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  changePassword,
  wellnessCheckIn,
  getUserStatistics,
  getActivitySummary,
  deleteUserAccount,
};
