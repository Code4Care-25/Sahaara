const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "anxiety",
        "depression",
        "stress",
        "mindfulness",
        "sleep",
        "relationships",
        "academic",
        "career",
        "resilience",
        "wellness",
      ],
    },
    type: {
      type: String,
      required: true,
      enum: ["article", "video", "audio", "interactive", "worksheet"],
    },
    difficulty: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    thumbnailUrl: String,
    contentUrl: String,
    duration: Number, // in minutes for videos/audio
    author: {
      name: String,
      credentials: String,
      bio: String,
    },
    metadata: {
      language: { type: String, default: "en" },
      lastUpdated: Date,
      version: { type: String, default: "1.0" },
      accessibility: {
        hasSubtitles: Boolean,
        hasTranscript: Boolean,
        hasAudioDescription: Boolean,
      },
    },
    accessControl: {
      isPublic: { type: Boolean, default: true },
      requiresAuth: { type: Boolean, default: false },
      allowedRoles: [String],
      ageRestriction: Number,
    },
    engagement: {
      viewCount: { type: Number, default: 0 },
      likeCount: { type: Number, default: 0 },
      shareCount: { type: Number, default: 0 },
      averageRating: { type: Number, default: 0 },
      totalRatings: { type: Number, default: 0 },
      completionRate: { type: Number, default: 0 },
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    featuredAt: Date,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
resourceSchema.index({ category: 1, type: 1 });
resourceSchema.index({ tags: 1 });
resourceSchema.index({ isFeatured: 1, featuredAt: -1 });
resourceSchema.index({ "engagement.averageRating": -1 });
resourceSchema.index({ "engagement.viewCount": -1 });

// Text search index
resourceSchema.index({
  title: "text",
  description: "text",
  content: "text",
  tags: "text",
});

module.exports = mongoose.model("Resource", resourceSchema);
