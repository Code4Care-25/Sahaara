const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const counsellorSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  specialization: {
    type: String,
    required: true,
    enum: [
      'Anxiety & Depression', 'Academic Stress', 'Relationship Issues',
      'Career Counseling', 'Family Therapy', 'Trauma Recovery',
      'Substance Abuse', 'Eating Disorders', 'LGBTQ+ Support', 'Grief Counseling'
    ]
  },
  credentials: {
    degree: String,
    license: String,
    certifications: [String],
    yearsOfExperience: {
      type: Number,
      min: 0
    }
  },
  bio: {
    type: String,
    maxlength: 1000
  },
  profilePicture: {
    type: String,
    default: '/images/default-counsellor.jpg'
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  workingHours: {
    start: {
      type: Number,
      min: 0,
      max: 23,
      default: 9
    },
    end: {
      type: Number,
      min: 0,
      max: 23,
      default: 17
    },
    timezone: {
      type: String,
      default: 'UTC'
    }
  },
  languages: [{
    type: String,
    default: ['English']
  }],
  // Ratings and reviews
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  reviews: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    review: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  // Availability
  availability: {
    monday: [{ start: String, end: String }],
    tuesday: [{ start: String, end: String }],
    wednesday: [{ start: String, end: String }],
    thursday: [{ start: String, end: String }],
    friday: [{ start: String, end: String }],
    saturday: [{ start: String, end: String }],
    sunday: [{ start: String, end: String }]
  },
  // Session preferences
  sessionPreferences: {
    duration: {
      type: Number,
      default: 60, // minutes
      min: 30,
      max: 120
    },
    maxClientsPerDay: {
      type: Number,
      default: 8,
      min: 1,
      max: 20
    },
    communicationMethods: [{
      type: String,
      enum: ['video', 'phone', 'in-person']
    }]
  },
  // Statistics
  statistics: {
    totalSessions: {
      type: Number,
      default: 0
    },
    totalClients: {
      type: Number,
      default: 0
    },
    averageSessionRating: {
      type: Number,
      default: 0
    },
    responseTime: {
      type: Number, // in hours
      default: 24
    }
  },
  // Verification
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationDocuments: [{
    type: {
      type: String,
      enum: ['license', 'degree', 'certification', 'id']
    },
    url: String,
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  lastLogin: {
    type: Date
  }
}, {
  timestamps: true
});

// Indexes
counsellorSchema.index({ email: 1 });
counsellorSchema.index({ specialization: 1 });
counsellorSchema.index({ isAvailable: 1 });
counsellorSchema.index({ 'rating.average': -1 });
counsellorSchema.index({ isVerified: 1 });

// Virtual for counsellor's full profile
counsellorSchema.virtual('fullProfile').get(function() {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    specialization: this.specialization,
    credentials: this.credentials,
    bio: this.bio,
    profilePicture: this.profilePicture,
    rating: this.rating,
    isAvailable: this.isAvailable,
    workingHours: this.workingHours,
    languages: this.languages,
    isVerified: this.isVerified
  };
});

// Pre-save middleware to hash password
counsellorSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
counsellorSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Method to update rating
counsellorSchema.methods.updateRating = function(newRating) {
  const totalRating = this.rating.average * this.rating.count + newRating;
  this.rating.count += 1;
  this.rating.average = totalRating / this.rating.count;
  return this.save();
};

// Method to add review
counsellorSchema.methods.addReview = function(userId, rating, review) {
  // Remove existing review from this user
  this.reviews = this.reviews.filter(r => !r.userId.equals(userId));
  
  // Add new review
  this.reviews.push({
    userId,
    rating,
    review
  });
  
  // Update rating
  this.updateRating(rating);
  
  return this.save();
};

// Method to check availability for specific time
counsellorSchema.methods.isAvailableAt = function(dateTime) {
  if (!this.isAvailable) return false;
  
  const appointmentDate = new Date(dateTime);
  const dayOfWeek = appointmentDate.toLocaleLowerCase().slice(0, 3);
  const hour = appointmentDate.getHours();
  
  // Check if within working hours
  if (hour < this.workingHours.start || hour >= this.workingHours.end) {
    return false;
  }
  
  // Check specific day availability
  const dayAvailability = this.availability[dayOfWeek];
  if (!dayAvailability || dayAvailability.length === 0) {
    return false;
  }
  
  // Check if time falls within available slots
  const timeString = appointmentDate.toTimeString().slice(0, 5);
  return dayAvailability.some(slot => 
    timeString >= slot.start && timeString < slot.end
  );
};

// Method to get available time slots for a date
counsellorSchema.methods.getAvailableSlots = function(date) {
  const appointmentDate = new Date(date);
  const dayOfWeek = appointmentDate.toLocaleLowerCase().slice(0, 3);
  const dayAvailability = this.availability[dayOfWeek];
  
  if (!dayAvailability || dayAvailability.length === 0) {
    return [];
  }
  
  const slots = [];
  dayAvailability.forEach(slot => {
    const startHour = parseInt(slot.start.split(':')[0]);
    const endHour = parseInt(slot.end.split(':')[0]);
    
    for (let hour = startHour; hour < endHour; hour++) {
      const slotTime = new Date(appointmentDate);
      slotTime.setHours(hour, 0, 0, 0);
      
      if (slotTime > new Date()) { // Only future slots
        slots.push({
          time: slotTime.toISOString(),
          displayTime: slotTime.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          })
        });
      }
    }
  });
  
  return slots;
};

// Static method to get counsellors by specialization
counsellorSchema.statics.getBySpecialization = function(specialization) {
  return this.find({
    specialization,
    isAvailable: true,
    isVerified: true
  }).sort({ 'rating.average': -1 });
};

// Static method to get top rated counsellors
counsellorSchema.statics.getTopRated = function(limit = 10) {
  return this.find({
    isAvailable: true,
    isVerified: true,
    'rating.count': { $gte: 5 } // At least 5 reviews
  }).sort({ 'rating.average': -1 }).limit(limit);
};

module.exports = mongoose.model('Counsellor', counsellorSchema);
