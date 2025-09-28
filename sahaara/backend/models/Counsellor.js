const mongoose = require("mongoose");

const counsellorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    licenseNumber: {
      type: String,
      required: true,
      unique: true,
    },
    specialization: [
      {
        type: String,
        enum: [
          "Anxiety & Depression",
          "Academic Stress",
          "Relationship Issues",
          "Career Counseling",
          "Family Therapy",
          "Trauma Recovery",
          "Substance Abuse",
          "Eating Disorders",
          "LGBTQ+ Support",
          "Grief Counseling",
          "Addiction Recovery",
          "PTSD Treatment",
        ],
      },
    ],
    experience: {
      years: { type: Number, required: true },
      description: String,
    },
    education: [
      {
        degree: String,
        institution: String,
        year: Number,
        specialization: String,
      },
    ],
    certifications: [
      {
        name: String,
        issuer: String,
        date: Date,
        expiryDate: Date,
      },
    ],
    bio: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    profilePicture: String,
    languages: [String],
    availability: {
      workingDays: [
        {
          type: String,
          enum: [
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
            "sunday",
          ],
        },
      ],
      workingHours: {
        start: { type: String, required: true }, // HH:MM format
        end: { type: String, required: true },
      },
      timezone: { type: String, default: "Asia/Kolkata" },
      breaks: [
        {
          start: String,
          end: String,
          reason: String,
        },
      ],
    },
    pricing: {
      individualSession: { type: Number, required: true },
      groupSession: Number,
      emergencySession: Number,
      currency: { type: String, default: "INR" },
    },
    ratings: {
      average: { type: Number, default: 0 },
      total: { type: Number, default: 0 },
      breakdown: {
        5: { type: Number, default: 0 },
        4: { type: Number, default: 0 },
        3: { type: Number, default: 0 },
        2: { type: Number, default: 0 },
        1: { type: Number, default: 0 },
      },
    },
    statistics: {
      totalSessions: { type: Number, default: 0 },
      totalClients: { type: Number, default: 0 },
      averageSessionDuration: { type: Number, default: 60 },
      completionRate: { type: Number, default: 0 },
      noShowRate: { type: Number, default: 0 },
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationDocuments: [
      {
        type: String,
        url: String,
        status: { type: String, enum: ["pending", "approved", "rejected"] },
        uploadedAt: Date,
        reviewedAt: Date,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
counsellorSchema.index({ specialization: 1 });
counsellorSchema.index({ "ratings.average": -1 });
counsellorSchema.index({ isActive: 1, isAvailable: 1 });
counsellorSchema.index({ "availability.workingDays": 1 });

// Virtual for counsellor rating
counsellorSchema.virtual("rating").get(function () {
  return this.ratings.average;
});

// Method to update rating
counsellorSchema.methods.updateRating = function (newRating) {
  this.ratings.total += 1;
  this.ratings.breakdown[newRating] += 1;

  // Calculate new average
  let total = 0;
  let count = 0;
  for (let i = 1; i <= 5; i++) {
    total += i * this.ratings.breakdown[i];
    count += this.ratings.breakdown[i];
  }
  this.ratings.average = count > 0 ? total / count : 0;
};

module.exports = mongoose.model("Counsellor", counsellorSchema);
