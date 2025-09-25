const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: [
      'anxiety', 'depression', 'stress', 'mindfulness', 'sleep',
      'relationships', 'academic', 'career', 'resilience', 'wellness'
    ]
  },
  type: {
    type: String,
    required: true,
    enum: ['article', 'video', 'audio', 'exercise', 'worksheet', 'book']
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  tags: [{
    type: String,
    trim: true
  }],
  thumbnailUrl: {
    type: String,
    default: '/images/default-resource.jpg'
  },
  contentUrl: {
    type: String
  },
  duration: {
    type: Number, // in minutes
    default: 0
  },
  author: {
    name: {
      type: String,
      required: true
    },
    credentials: String,
    bio: String
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  featuredAt: {
    type: Date
  },
  // Engagement metrics
  viewCount: {
    type: Number,
    default: 0
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  ratings: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    review: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  shares: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    platform: {
      type: String,
      enum: ['facebook', 'twitter', 'linkedin', 'whatsapp', 'email']
    },
    message: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  completions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  // SEO
  slug: {
    type: String,
    unique: true
  },
  metaDescription: String,
  keywords: [String]
}, {
  timestamps: true
});

// Indexes
resourceSchema.index({ category: 1, isPublished: 1 });
resourceSchema.index({ tags: 1 });
resourceSchema.index({ isFeatured: 1, featuredAt: -1 });
resourceSchema.index({ slug: 1 });
resourceSchema.index({ 'ratings.rating': 1 });
resourceSchema.index({ viewCount: -1 });

// Virtual for average rating
resourceSchema.virtual('averageRating').get(function() {
  if (this.ratings.length === 0) return 0;
  const sum = this.ratings.reduce((acc, rating) => acc + rating.rating, 0);
  return Math.round((sum / this.ratings.length) * 10) / 10;
});

// Virtual for like count
resourceSchema.virtual('likeCount').get(function() {
  return this.likes.length;
});

// Virtual for completion count
resourceSchema.virtual('completionCount').get(function() {
  return this.completions.length;
});

// Pre-save middleware to generate slug
resourceSchema.pre('save', function(next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

// Method to track view
resourceSchema.methods.trackView = function(userId) {
  this.viewCount += 1;
  return this.save();
};

// Method to like/unlike resource
resourceSchema.methods.toggleLike = function(userId) {
  const likeIndex = this.likes.indexOf(userId);
  if (likeIndex > -1) {
    this.likes.splice(likeIndex, 1);
  } else {
    this.likes.push(userId);
  }
  return this.save();
};

// Method to add rating
resourceSchema.methods.addRating = function(userId, rating, review = '') {
  // Remove existing rating from this user
  this.ratings = this.ratings.filter(r => !r.userId.equals(userId));
  
  // Add new rating
  this.ratings.push({
    userId,
    rating,
    review
  });
  
  return this.save();
};

// Method to track share
resourceSchema.methods.trackShare = function(userId, platform, message = '') {
  this.shares.push({
    userId,
    platform,
    message
  });
  return this.save();
};

// Method to mark as completed
resourceSchema.methods.markCompleted = function(userId) {
  if (!this.completions.includes(userId)) {
    this.completions.push(userId);
  }
  return this.save();
};

// Static method to search resources
resourceSchema.statics.searchResources = function(query, filters = {}) {
  const searchQuery = { isPublished: true };
  
  if (query) {
    searchQuery.$or = [
      { title: { $regex: query, $options: 'i' } },
      { description: { $regex: query, $options: 'i' } },
      { tags: { $in: [new RegExp(query, 'i')] } }
    ];
  }
  
  if (filters.category) {
    searchQuery.category = filters.category;
  }
  
  if (filters.type) {
    searchQuery.type = filters.type;
  }
  
  if (filters.difficulty) {
    searchQuery.difficulty = filters.difficulty;
  }
  
  if (filters.tags && filters.tags.length > 0) {
    searchQuery.tags = { $in: filters.tags };
  }
  
  if (filters.minRating) {
    searchQuery['ratings.rating'] = { $gte: filters.minRating };
  }
  
  return this.find(searchQuery);
};

module.exports = mongoose.model('Resource', resourceSchema);
