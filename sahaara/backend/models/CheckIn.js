const mongoose = require("mongoose");

const checkInSchema = new mongoose.Schema({
  // Reference to anonymized student
  studentAnonymizedId: {
    type: String,
    required: true,
    index: true,
  },

  // Check-in details
  checkInData: {
    type: {
      type: String,
      required: true,
      enum: ["meal_concern", "wellness_check", "support_offer"],
    },
    message: {
      type: String,
      required: true,
    },
    tone: {
      type: String,
      enum: ["gentle", "supportive", "encouraging"],
      default: "supportive",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
  },

  // Delivery tracking
  delivery: {
    status: {
      type: String,
      enum: ["pending", "sent", "delivered", "failed"],
      default: "pending",
    },
    method: {
      type: String,
      enum: ["app_notification", "email", "sms"],
      default: "app_notification",
    },
    sentAt: Date,
    deliveredAt: Date,
    responseReceived: {
      type: Boolean,
      default: false,
    },
  },

  // Response tracking
  response: {
    received: {
      type: Boolean,
      default: false,
    },
    responseType: {
      type: String,
      enum: ["acknowledged", "needs_help", "doing_fine", "no_response"],
    },
    responseText: String,
    respondedAt: Date,
  },

  // Cooldown management
  cooldown: {
    nextAllowedCheckIn: {
      type: Date,
      required: true,
    },
    reason: {
      type: String,
      enum: ["recent_check_in", "user_requested_pause", "system_cooldown"],
    },
  },

  // Privacy compliance
  privacyCompliant: {
    type: Boolean,
    default: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Indexes for efficient queries
checkInSchema.index({ studentAnonymizedId: 1, createdAt: -1 });
checkInSchema.index({ "delivery.status": 1, createdAt: -1 });
checkInSchema.index({ "cooldown.nextAllowedCheckIn": 1 });

module.exports = mongoose.model("CheckIn", checkInSchema);
