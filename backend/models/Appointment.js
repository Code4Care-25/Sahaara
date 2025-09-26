const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    counsellorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    counsellorName: {
      type: String,
      required: true,
    },
    dateTime: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      default: 60, // minutes
    },
    type: {
      type: String,
      enum: ["individual", "group", "emergency"],
      default: "individual",
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled", "no-show"],
      default: "pending",
    },
    notes: {
      type: String,
      maxlength: 1000,
    },
    sessionNotes: {
      type: String,
      maxlength: 2000,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    feedback: String,
    payment: {
      amount: Number,
      currency: { type: String, default: "INR" },
      status: {
        type: String,
        enum: ["pending", "paid", "refunded"],
        default: "pending",
      },
      paymentMethod: String,
      transactionId: String,
    },
    reminders: [
      {
        type: {
          type: String,
          enum: ["email", "sms", "push"],
        },
        sentAt: Date,
        status: { type: String, enum: ["sent", "delivered", "failed"] },
      },
    ],
    rescheduledFrom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
    cancellationReason: String,
    cancelledAt: Date,
    cancelledBy: {
      type: String,
      enum: ["user", "counsellor", "admin"],
    },
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
appointmentSchema.index({ userId: 1, dateTime: -1 });
appointmentSchema.index({ counsellorId: 1, dateTime: -1 });
appointmentSchema.index({ status: 1 });
appointmentSchema.index({ dateTime: 1 });

// Virtual for appointment status
appointmentSchema.virtual("isUpcoming").get(function () {
  return this.dateTime > new Date() && this.status === "confirmed";
});

// Virtual for appointment duration in hours
appointmentSchema.virtual("durationHours").get(function () {
  return this.duration / 60;
});

module.exports = mongoose.model("Appointment", appointmentSchema);
