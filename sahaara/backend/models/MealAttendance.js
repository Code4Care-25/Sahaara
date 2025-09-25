const mongoose = require("mongoose");

const mealAttendanceSchema = new mongoose.Schema({
  // Reference to anonymized student
  studentAnonymizedId: {
    type: String,
    required: true,
    index: true,
  },

  // Meal details (no personal info)
  mealData: {
    date: {
      type: Date,
      required: true,
      index: true,
    },
    mealType: {
      type: String,
      required: true,
      enum: ["breakfast", "lunch", "dinner"],
    },
    attended: {
      type: Boolean,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },

  // Pattern analysis (computed fields)
  patternAnalysis: {
    isAnomaly: {
      type: Boolean,
      default: false,
    },
    anomalyScore: {
      type: Number,
      min: 0,
      max: 1,
      default: 0,
    },
    reason: {
      type: String,
      enum: ["missed_consecutive", "frequency_drop", "pattern_change", "none"],
    },
    lastAnalyzed: {
      type: Date,
      default: Date.now,
    },
  },

  // Data source tracking
  source: {
    collegeSystem: {
      type: String,
      required: true,
    },
    syncTimestamp: {
      type: Date,
      default: Date.now,
    },
  },

  // Auto-expiry
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Compound indexes for efficient queries
mealAttendanceSchema.index({
  studentAnonymizedId: 1,
  "mealData.date": -1,
});

mealAttendanceSchema.index({
  "mealData.date": -1,
  "patternAnalysis.isAnomaly": 1,
});

// TTL index for automatic data cleanup
mealAttendanceSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 90 * 24 * 60 * 60 }
); // 90 days

module.exports = mongoose.model("MealAttendance", mealAttendanceSchema);
