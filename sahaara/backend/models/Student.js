const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const studentSchema = new mongoose.Schema({
  // Anonymized identifier - never stores real student ID
  anonymizedId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },

  // Tokenized reference for college system integration
  collegeToken: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },

  // Privacy preferences
  privacySettings: {
    optOut: {
      type: Boolean,
      default: false,
    },
    dataRetentionDays: {
      type: Number,
      default: 90,
    },
    allowCheckIns: {
      type: Boolean,
      default: true,
    },
    lastOptOutUpdate: {
      type: Date,
      default: Date.now,
    },
  },

  // Baseline meal patterns (anonymized)
  baselinePattern: {
    averageMealsPerWeek: {
      type: Number,
      default: 0,
    },
    preferredMealTimes: [
      {
        mealType: {
          type: String,
          enum: ["breakfast", "lunch", "dinner"],
        },
        timeRange: {
          start: String,
          end: String,
        },
      },
    ],
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },

  // Data expiration
  dataExpiryDate: {
    type: Date,
    required: true,
    index: { expireAfterSeconds: 0 }, // MongoDB TTL index
  },

  // Audit trail
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastActivity: {
    type: Date,
    default: Date.now,
  },
});

// Update data expiry when privacy settings change
studentSchema.pre("save", function (next) {
  if (this.isModified("privacySettings.dataRetentionDays")) {
    this.dataExpiryDate = new Date(
      Date.now() + this.privacySettings.dataRetentionDays * 24 * 60 * 60 * 1000
    );
  }
  next();
});

// Ensure data expires automatically
studentSchema.index({ dataExpiryDate: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("Student", studentSchema);
