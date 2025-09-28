const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      unique: true,
      sparse: true, // Allows multiple null values
    },
    email: {
      type: String,
      required: function () {
        return !this.userId; // Required only if userId is not provided (not anonymous)
      },
      unique: true,
      sparse: true, // Allows multiple null values
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: function () {
        return !this.userId; // Required only if userId is not provided (not anonymous)
      },
      minlength: 6,
    },
    name: {
      type: String,
      required: function () {
        return !this.userId; // Required only if userId is not provided (not anonymous)
      },
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    institution: {
      type: String,
      required: function () {
        return !this.userId; // Required only if userId is not provided (not anonymous)
      },
    },
    department: {
      type: String,
      required: function () {
        return !this.userId; // Required only if userId is not provided (not anonymous)
      },
    },
    academicYear: {
      type: String,
      required: function () {
        return !this.userId; // Required only if userId is not provided (not anonymous)
      },
    },
    profilePicture: {
      type: String,
      default: "/images/default-avatar.jpg",
    },
    role: {
      type: String,
      enum: ["student", "counsellor", "admin"],
      default: "student",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: String,
    passwordResetToken: String,
    passwordResetExpires: Date,
    lastLogin: Date,
    preferences: {
      theme: {
        type: String,
        enum: ["light", "dark"],
        default: "light",
      },
      notifications: {
        email: { type: Boolean, default: true },
        push: { type: Boolean, default: true },
        sms: { type: Boolean, default: false },
      },
      privacy: {
        profileVisibility: {
          type: String,
          enum: ["public", "private"],
          default: "private",
        },
        allowMessages: { type: Boolean, default: true },
      },
    },
    wellnessProfile: {
      currentMood: String,
      stressLevel: Number,
      sleepQuality: Number,
      energyLevel: Number,
      socialActivity: Number,
      lastCheckIn: Date,
    },
    statistics: {
      totalChatSessions: { type: Number, default: 0 },
      totalAppointments: { type: Number, default: 0 },
      totalJournalEntries: { type: Number, default: 0 },
      totalMealEntries: { type: Number, default: 0 },
      totalResourcesViewed: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
userSchema.index({ userId: 1 });
userSchema.index({ email: 1 });
userSchema.index({ institution: 1, department: 1 });

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  if (!this.password) return false; // Anonymous users don't have passwords
  return bcrypt.compare(candidatePassword, this.password);
};

// Get public profile (without sensitive data)
userSchema.methods.getPublicProfile = function () {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.emailVerificationToken;
  delete userObject.passwordResetToken;
  delete userObject.passwordResetExpires;
  return userObject;
};

// Virtual for full name
userSchema.virtual("fullName").get(function () {
  return this.name;
});

module.exports = mongoose.model("User", userSchema);
