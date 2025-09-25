const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  counsellorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Counsellor',
    required: true
  },
  dateTime: {
    type: Date,
    required: true
  },
  type: {
    type: String,
    enum: ['individual', 'group', 'emergency', 'follow_up'],
    default: 'individual'
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed', 'rescheduled'],
    default: 'pending'
  },
  notes: {
    type: String,
    maxlength: 1000
  },
  preferences: {
    communicationMethod: {
      type: String,
      enum: ['video', 'phone', 'in-person'],
      default: 'video'
    },
    language: {
      type: String,
      default: 'english'
    },
    specialRequirements: String
  },
  // Session details
  sessionNotes: {
    counsellorNotes: String,
    sessionSummary: String,
    recommendations: [String],
    followUpRequired: {
      type: Boolean,
      default: false
    },
    followUpDate: Date
  },
  // Feedback
  feedback: {
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    review: String,
    wouldRecommend: Boolean,
    submittedAt: Date
  },
  // Cancellation details
  cancellationReason: String,
  cancelledAt: Date,
  cancelledBy: {
    type: String,
    enum: ['user', 'counsellor', 'system']
  },
  // Rescheduling details
  rescheduledFrom: Date,
  rescheduledAt: Date,
  rescheduleReason: String,
  // Reminders
  remindersSent: [{
    type: {
      type: String,
      enum: ['email', 'sms', 'push']
    },
    sentAt: Date,
    status: {
      type: String,
      enum: ['sent', 'delivered', 'failed']
    }
  }]
}, {
  timestamps: true
});

// Indexes
appointmentSchema.index({ userId: 1, dateTime: -1 });
appointmentSchema.index({ counsellorId: 1, dateTime: 1 });
appointmentSchema.index({ status: 1 });
appointmentSchema.index({ dateTime: 1 });

// Virtual for appointment ID
appointmentSchema.virtual('appointmentId').get(function() {
  return `APT-${this._id.toString().slice(-8).toUpperCase()}`;
});

// Virtual for time until appointment
appointmentSchema.virtual('timeUntilAppointment').get(function() {
  const now = new Date();
  const appointmentTime = new Date(this.dateTime);
  const diffMs = appointmentTime - now;
  
  if (diffMs < 0) return 'Past';
  
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  
  if (diffDays > 0) return `${diffDays} days`;
  if (diffHours > 0) return `${diffHours} hours`;
  return `${diffMinutes} minutes`;
});

// Pre-save middleware to validate appointment time
appointmentSchema.pre('save', function(next) {
  if (this.isNew && this.dateTime <= new Date()) {
    return next(new Error('Appointment time must be in the future'));
  }
  next();
});

// Method to confirm appointment
appointmentSchema.methods.confirm = function() {
  this.status = 'confirmed';
  return this.save();
};

// Method to cancel appointment
appointmentSchema.methods.cancel = function(reason, cancelledBy = 'user') {
  this.status = 'cancelled';
  this.cancellationReason = reason;
  this.cancelledAt = new Date();
  this.cancelledBy = cancelledBy;
  return this.save();
};

// Method to reschedule appointment
appointmentSchema.methods.reschedule = function(newDateTime, reason) {
  this.rescheduledFrom = this.dateTime;
  this.dateTime = newDateTime;
  this.rescheduleReason = reason;
  this.rescheduledAt = new Date();
  this.status = 'rescheduled';
  return this.save();
};

// Method to add session notes
appointmentSchema.methods.addSessionNotes = function(notes) {
  this.sessionNotes = { ...this.sessionNotes, ...notes };
  this.status = 'completed';
  return this.save();
};

// Method to add feedback
appointmentSchema.methods.addFeedback = function(rating, review, wouldRecommend) {
  this.feedback = {
    rating,
    review,
    wouldRecommend,
    submittedAt: new Date()
  };
  return this.save();
};

// Static method to get user statistics
appointmentSchema.statics.getUserStatistics = async function(userId) {
  const stats = await this.aggregate([
    { $match: { userId: mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: null,
        totalAppointments: { $sum: 1 },
        completedAppointments: {
          $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
        },
        cancelledAppointments: {
          $sum: { $cond: [{ $eq: ['$status', 'cancelled'] }, 1, 0] }
        },
        upcomingAppointments: {
          $sum: { $cond: [{ $eq: ['$status', 'confirmed'] }, 1, 0] }
        },
        averageRating: { $avg: '$feedback.rating' }
      }
    }
  ]);
  
  return stats[0] || {
    totalAppointments: 0,
    completedAppointments: 0,
    cancelledAppointments: 0,
    upcomingAppointments: 0,
    averageRating: 0
  };
};

// Static method to check availability
appointmentSchema.statics.checkAvailability = async function(counsellorId, dateTime) {
  const existingAppointment = await this.findOne({
    counsellorId,
    dateTime,
    status: { $in: ['confirmed', 'pending'] }
  });
  
  return !existingAppointment;
};

module.exports = mongoose.model('Appointment', appointmentSchema);
