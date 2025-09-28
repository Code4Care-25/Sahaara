const mongoose = require('mongoose');

const chatSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  personality: {
    type: String,
    enum: ['supportive', 'professional', 'friendly', 'analytical'],
    default: 'supportive'
  },
  messages: [{
    role: {
      type: String,
      enum: ['user', 'assistant'],
      required: true
    },
    content: {
      type: String,
      required: true,
      maxlength: 2000
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    metadata: {
      sentiment: String,
      keywords: [String],
      responseTime: Number
    }
  }],
  isCompleted: {
    type: Boolean,
    default: false
  },
  completedAt: Date,
  flagged: {
    type: Boolean,
    default: false
  },
  flaggedReason: String,
  flaggedAt: Date,
  analytics: {
    sessionDuration: Number, // in minutes
    messageCount: { type: Number, default: 0 },
    userSatisfaction: Number, // 1-5 rating
    topicsDiscussed: [String],
    moodChange: String, // improved, same, worse
    followUpNeeded: Boolean
  }
}, {
  timestamps: true
});

// Index for better query performance
chatSessionSchema.index({ userId: 1, createdAt: -1 });
chatSessionSchema.index({ isCompleted: 1 });
chatSessionSchema.index({ flagged: 1 });

// Update message count before saving
chatSessionSchema.pre('save', function(next) {
  this.analytics.messageCount = this.messages.length;
  next();
});

// Virtual for session duration
chatSessionSchema.virtual('duration').get(function() {
  if (this.completedAt && this.createdAt) {
    return Math.round((this.completedAt - this.createdAt) / 1000 / 60); // minutes
  }
  return null;
});

module.exports = mongoose.model('ChatSession', chatSessionSchema);