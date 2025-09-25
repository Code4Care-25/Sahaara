const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
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
    sentiment: {
      type: String,
      enum: ['positive', 'negative', 'neutral']
    },
    urgency: {
      type: String,
      enum: ['low', 'medium', 'high']
    },
    topics: [String]
  }
});

const chatSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  personality: {
    type: String,
    enum: ['supportive', 'professional', 'friendly'],
    default: 'supportive'
  },
  messages: [messageSchema],
  isCompleted: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Date
  },
  flagged: {
    type: Boolean,
    default: false
  },
  flaggedAt: {
    type: Date
  },
  flagReason: {
    type: String
  },
  analytics: {
    messageCount: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number, // in minutes
      default: 0
    },
    sentiment: {
      type: String,
      enum: ['positive', 'negative', 'neutral']
    },
    topics: [String],
    userSatisfaction: {
      type: Number,
      min: 1,
      max: 5
    }
  },
  metadata: {
    userAgent: String,
    ipAddress: String,
    deviceType: {
      type: String,
      enum: ['mobile', 'tablet', 'desktop']
    }
  }
}, {
  timestamps: true
});

// Indexes
chatSessionSchema.index({ userId: 1, createdAt: -1 });
chatSessionSchema.index({ isCompleted: 1 });
chatSessionSchema.index({ flagged: 1 });
chatSessionSchema.index({ 'analytics.sentiment': 1 });

// Virtual for session duration
chatSessionSchema.virtual('sessionDuration').get(function() {
  if (!this.completedAt) return null;
  return Math.round((this.completedAt - this.createdAt) / (1000 * 60)); // minutes
});

// Virtual for message count
chatSessionSchema.virtual('messageCount').get(function() {
  return this.messages.length;
});

// Pre-save middleware to update analytics
chatSessionSchema.pre('save', function(next) {
  if (this.isModified('messages')) {
    this.analytics.messageCount = this.messages.length;
  }
  
  if (this.isModified('isCompleted') && this.isCompleted && this.completedAt) {
    this.analytics.duration = this.sessionDuration;
  }
  
  next();
});

// Method to add message
chatSessionSchema.methods.addMessage = function(role, content, metadata = {}) {
  this.messages.push({
    role,
    content,
    metadata
  });
  return this.save();
};

// Method to complete session
chatSessionSchema.methods.completeSession = function() {
  this.isCompleted = true;
  this.completedAt = new Date();
  this.analytics.duration = this.sessionDuration;
  return this.save();
};

// Method to flag session
chatSessionSchema.methods.flagSession = function(reason) {
  this.flagged = true;
  this.flaggedAt = new Date();
  this.flagReason = reason;
  return this.save();
};

// Static method to get user analytics
chatSessionSchema.statics.getUserAnalytics = async function(userId, period = '30d') {
  const days = period === '7d' ? 7 : period === '30d' ? 30 : 90;
  const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  
  const sessions = await this.find({
    userId,
    createdAt: { $gte: startDate }
  });
  
  const totalSessions = sessions.length;
  const completedSessions = sessions.filter(s => s.isCompleted).length;
  const averageDuration = sessions.reduce((sum, s) => sum + (s.analytics.duration || 0), 0) / totalSessions || 0;
  
  const personalityCounts = sessions.reduce((acc, s) => {
    acc[s.personality] = (acc[s.personality] || 0) + 1;
    return acc;
  }, {});
  
  const mostUsedPersonality = Object.keys(personalityCounts).reduce((a, b) => 
    personalityCounts[a] > personalityCounts[b] ? a : b, 'supportive'
  );
  
  return {
    totalSessions,
    completedSessions,
    averageDuration: Math.round(averageDuration),
    mostUsedPersonality,
    personalityDistribution: personalityCounts,
    completionRate: totalSessions > 0 ? Math.round((completedSessions / totalSessions) * 100) : 0
  };
};

module.exports = mongoose.model('ChatSession', chatSessionSchema);
