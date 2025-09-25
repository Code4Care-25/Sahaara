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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institution",
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
    academicYear: {
      type: String,
      enum: ["1st", "2nd", "3rd", "4th", "PG", "PhD"],
    },
    role: {
      type: String,
      enum: ["student", "counsellor", "admin"],
      default: "student",
    },
    profilePicture: {
      type: String,
      default: "/images/default-avatar.jpg",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
    },
    wellnessProfile: {
      mood: {
        type: String,
        enum: ["happy", "neutral", "sad", "anxious", "stressed"],
      },
      energy: {
        type: Number,
        min: 1,
        max: 10,
      },
      stress: {
        type: Number,
        min: 1,
        max: 10,
      },
      sleep: {
        type: Number,
        min: 1,
        max: 10,
      },
      social: {
        type: Number,
        min: 1,
        max: 10,
      },
    },
    preferences: {
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
        dataSharing: { type: Boolean, default: false },
      },
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ institution: 1 });
userSchema.index({ role: 1 });

// Virtual for user's full profile
userSchema.virtual("fullProfile").get(function () {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    role: this.role,
    institution: this.institution,
    department: this.department,
    academicYear: this.academicYear,
    profilePicture: this.profilePicture,
    isVerified: this.isVerified,
    lastLogin: this.lastLogin,
  };
});

// Pre-save middleware to hash password
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

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Method to get public profile
userSchema.methods.getPublicProfile = function () {
  return {
    id: this._id,
    name: this.name,
    profilePicture: this.profilePicture,
    role: this.role,
    institution: this.institution,
    department: this.department,
    academicYear: this.academicYear,
  };
};

// Method to update wellness profile
userSchema.methods.updateWellnessProfile = function (wellnessData) {
  this.wellnessProfile = { ...this.wellnessProfile, ...wellnessData };
  return this.save();
};

// Method to check if user needs wellness check-in
userSchema.methods.needsWellnessCheckin = function () {
  const lastCheckin = this.wellnessProfile?.lastUpdated;
  if (!lastCheckin) return true;

  const daysSinceCheckin =
    (Date.now() - new Date(lastCheckin)) / (1000 * 60 * 60 * 24);
  return daysSinceCheckin >= 1; // Check-in needed if more than 1 day
};

module.exports = mongoose.model("User", userSchema);
