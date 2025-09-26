const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    institution: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    academicYear: {
      type: String,
      required: true,
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
userSchema.index({ email: 1 });
userSchema.index({ institution: 1, department: 1 });

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

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
