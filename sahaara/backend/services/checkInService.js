const moment = require("moment");
const Student = require("../models/Student");
const CheckIn = require("../models/CheckIn");
const MealAttendance = require("../models/MealAttendance");

class CheckInService {
  constructor() {
    this.cooldownHours = parseInt(process.env.CHECK_IN_COOLDOWN_HOURS) || 24;
    this.messageTemplates = this.initializeMessageTemplates();
  }

  /**
   * Initialize gentle, supportive message templates
   */
  initializeMessageTemplates() {
    return {
      meal_concern: {
        gentle: [
          "Hi! We noticed you might have missed a few meals recently. Just checking in - how are you feeling? 💙",
          "Hey there! We care about your wellbeing. If you're having trouble with meals, we're here to help. 🌟",
          "Just wanted to check in - we noticed some changes in your meal patterns. Everything okay? 💚",
        ],
        supportive: [
          "We're here for you! If meal times are feeling challenging right now, remember you're not alone. 💪",
          "Your wellbeing matters to us. If you'd like to talk about anything, including meal concerns, we're listening. 🤗",
          "Sometimes life gets busy and meals get skipped. If you need support, we're just a message away. 💙",
        ],
        encouraging: [
          "You've got this! If meal planning feels overwhelming, we have resources that might help. 🌱",
          "Remember, taking care of yourself includes nourishing your body. We're here to support you! ✨",
          "Every small step counts! If you're working on building healthy meal habits, we're cheering you on! 🎉",
        ],
      },
      wellness_check: {
        gentle: [
          "Just checking in - how has your week been? We're here if you need to chat. 💙",
          "Hi! Wanted to see how you're doing. Sometimes a friendly check-in can make all the difference. 🌟",
          "Hey there! How are you feeling today? Remember, it's okay to not be okay sometimes. 💚",
        ],
        supportive: [
          "We care about you! If you're going through a tough time, remember that support is available. 💪",
          "Your mental health matters. If you need someone to talk to, we're here to listen. 🤗",
          "Life can be challenging, but you don't have to face it alone. We're here for you. 💙",
        ],
        encouraging: [
          "You're doing great! Remember to be kind to yourself today. 🌱",
          "Every day is a new opportunity to take care of yourself. We believe in you! ✨",
          "You're stronger than you know! If you need encouragement, we're here to remind you of that. 🎉",
        ],
      },
      support_offer: {
        gentle: [
          "We're thinking of you! If you need any support or resources, just let us know. 💙",
          "Hi! We have some helpful resources available if you're interested. No pressure at all! 🌟",
          "Hey! We're here if you need anything - whether it's resources, support, or just someone to listen. 💚",
        ],
        supportive: [
          "You're not alone in this! We have resources and support available whenever you're ready. 💪",
          "We believe in you! If you'd like to explore support options, we're here to help. 🤗",
          "Remember, asking for help is a sign of strength. We're here whenever you need us. 💙",
        ],
        encouraging: [
          "You've got this! And we've got your back. Support is available whenever you need it. 🌱",
          "You're doing amazing! If you want to explore ways to feel even better, we're here. ✨",
          "Keep going! And remember, we're cheering you on every step of the way. 🎉",
        ],
      },
    };
  }

  /**
   * Trigger a check-in if patterns indicate concern
   */
  async triggerCheckIn(studentAnonymizedId, patternAnalysis) {
    try {
      // Check if student has opted out
      const student = await Student.findOne({
        anonymizedId: studentAnonymizedId,
      });
      if (
        !student ||
        student.privacySettings.optOut ||
        !student.privacySettings.allowCheckIns
      ) {
        return { success: false, reason: "student_opted_out" };
      }

      // Check cooldown period
      const canSendCheckIn = await this.checkCooldownPeriod(
        studentAnonymizedId
      );
      if (!canSendCheckIn.allowed) {
        return {
          success: false,
          reason: "cooldown_active",
          nextAllowed: canSendCheckIn.nextAllowed,
        };
      }

      // Determine check-in type and tone
      const checkInType = this.determineCheckInType(patternAnalysis);
      const tone = this.determineTone(patternAnalysis);
      const priority = this.determinePriority(patternAnalysis);

      // Generate personalized message
      const message = this.generatePersonalizedMessage(
        checkInType,
        tone,
        patternAnalysis
      );

      // Create check-in record
      const checkIn = new CheckIn({
        studentAnonymizedId,
        checkInData: {
          type: checkInType,
          message,
          tone,
          priority,
        },
        cooldown: {
          nextAllowedCheckIn: moment()
            .add(this.cooldownHours, "hours")
            .toDate(),
          reason: "system_cooldown",
        },
      });

      await checkIn.save();

      // Send the check-in (integrate with your notification system)
      await this.sendCheckIn(checkIn);

      return {
        success: true,
        checkInId: checkIn._id,
        message,
        nextAllowedCheckIn: checkIn.cooldown.nextAllowedCheckIn,
      };
    } catch (error) {
      console.error("Check-in trigger error:", error);
      return { success: false, reason: "system_error" };
    }
  }

  /**
   * Check if cooldown period has passed
   */
  async checkCooldownPeriod(studentAnonymizedId) {
    const lastCheckIn = await CheckIn.findOne({
      studentAnonymizedId,
      "delivery.status": { $in: ["sent", "delivered"] },
    }).sort({ createdAt: -1 });

    if (!lastCheckIn) {
      return { allowed: true };
    }

    const cooldownEnd = moment(lastCheckIn.cooldown.nextAllowedCheckIn);
    const now = moment();

    if (now.isAfter(cooldownEnd)) {
      return { allowed: true };
    }

    return {
      allowed: false,
      nextAllowed: cooldownEnd.toDate(),
      reason: "cooldown_active",
    };
  }

  /**
   * Determine check-in type based on pattern analysis
   */
  determineCheckInType(patternAnalysis) {
    switch (patternAnalysis.reason) {
      case "missed_consecutive":
      case "frequency_drop":
        return "meal_concern";
      case "pattern_change":
        return "wellness_check";
      default:
        return "support_offer";
    }
  }

  /**
   * Determine tone based on severity and pattern
   */
  determineTone(patternAnalysis) {
    if (patternAnalysis.score >= 0.8) {
      return "gentle"; // High concern - be extra gentle
    } else if (patternAnalysis.score >= 0.6) {
      return "supportive"; // Medium concern - be supportive
    } else {
      return "encouraging"; // Low concern - be encouraging
    }
  }

  /**
   * Determine priority based on pattern analysis
   */
  determinePriority(patternAnalysis) {
    if (patternAnalysis.score >= 0.8) {
      return "high";
    } else if (patternAnalysis.score >= 0.6) {
      return "medium";
    } else {
      return "low";
    }
  }

  /**
   * Generate personalized message
   */
  generatePersonalizedMessage(checkInType, tone, patternAnalysis) {
    const templates = this.messageTemplates[checkInType][tone];
    const randomTemplate =
      templates[Math.floor(Math.random() * templates.length)];

    // Add context if available
    let contextualMessage = randomTemplate;

    if (patternAnalysis.details) {
      if (
        patternAnalysis.reason === "missed_consecutive" &&
        patternAnalysis.details.maxConsecutiveMisses
      ) {
        contextualMessage += ` We noticed you've missed ${patternAnalysis.details.maxConsecutiveMisses} meals in a row.`;
      } else if (
        patternAnalysis.reason === "frequency_drop" &&
        patternAnalysis.details.dropPercentage
      ) {
        const dropPercent = Math.round(
          patternAnalysis.details.dropPercentage * 100
        );
        contextualMessage += ` We noticed your meal attendance has dropped by about ${dropPercent}%.`;
      }
    }

    return contextualMessage;
  }

  /**
   * Send check-in notification
   */
  async sendCheckIn(checkIn) {
    try {
      // Update delivery status
      checkIn.delivery.status = "sent";
      checkIn.delivery.sentAt = new Date();
      await checkIn.save();

      // Here you would integrate with your notification system
      // For example: push notifications, email, SMS, etc.

      // Mock implementation - replace with actual notification service
      console.log(
        `Sending check-in to student ${checkIn.studentAnonymizedId}: ${checkIn.checkInData.message}`
      );

      // Simulate delivery
      setTimeout(async () => {
        checkIn.delivery.status = "delivered";
        checkIn.delivery.deliveredAt = new Date();
        await checkIn.save();
      }, 1000);

      return { success: true };
    } catch (error) {
      console.error("Send check-in error:", error);
      checkIn.delivery.status = "failed";
      await checkIn.save();
      return { success: false, error: error.message };
    }
  }

  /**
   * Handle student response to check-in
   */
  async handleCheckInResponse(checkInId, responseType, responseText = "") {
    try {
      const checkIn = await CheckIn.findById(checkInId);
      if (!checkIn) {
        return { success: false, reason: "check_in_not_found" };
      }

      checkIn.response.received = true;
      checkIn.response.responseType = responseType;
      checkIn.response.responseText = responseText;
      checkIn.response.respondedAt = new Date();

      await checkIn.save();

      // Handle different response types
      switch (responseType) {
        case "needs_help":
          await this.handleNeedsHelpResponse(checkIn);
          break;
        case "doing_fine":
          await this.handleDoingFineResponse(checkIn);
          break;
        case "acknowledged":
          await this.handleAcknowledgedResponse(checkIn);
          break;
      }

      return { success: true };
    } catch (error) {
      console.error("Handle response error:", error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Handle "needs help" response
   */
  async handleNeedsHelpResponse(checkIn) {
    // Create follow-up check-in with resources
    const followUpMessage =
      "Thank you for reaching out! Here are some resources that might help: [Link to resources]. Would you like to speak with a counselor?";

    const followUpCheckIn = new CheckIn({
      studentAnonymizedId: checkIn.studentAnonymizedId,
      checkInData: {
        type: "support_offer",
        message: followUpMessage,
        tone: "supportive",
        priority: "high",
      },
      cooldown: {
        nextAllowedCheckIn: moment().add(2, "hours").toDate(), // Shorter cooldown for follow-up
        reason: "follow_up_response",
      },
    });

    await followUpCheckIn.save();
    await this.sendCheckIn(followUpCheckIn);
  }

  /**
   * Handle "doing fine" response
   */
  async handleDoingFineResponse(checkIn) {
    // Extend cooldown period since student is doing well
    const student = await Student.findOne({
      anonymizedId: checkIn.studentAnonymizedId,
    });
    if (student) {
      // Update cooldown to be longer since they're doing fine
      await CheckIn.updateOne(
        { _id: checkIn._id },
        {
          $set: {
            "cooldown.nextAllowedCheckIn": moment()
              .add(this.cooldownHours * 2, "hours")
              .toDate(),
            "cooldown.reason": "student_doing_well",
          },
        }
      );
    }
  }

  /**
   * Handle "acknowledged" response
   */
  async handleAcknowledgedResponse(checkIn) {
    // Standard cooldown period
    // No special action needed
  }

  /**
   * Get check-in history for a student
   */
  async getCheckInHistory(studentAnonymizedId, limit = 10) {
    return await CheckIn.find({ studentAnonymizedId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .select("-studentAnonymizedId"); // Remove identifier for privacy
  }

  /**
   * Update student privacy preferences
   */
  async updatePrivacyPreferences(studentAnonymizedId, preferences) {
    const updateData = {
      "privacySettings.optOut": preferences.optOut || false,
      "privacySettings.allowCheckIns":
        preferences.allowCheckIns !== undefined
          ? preferences.allowCheckIns
          : true,
      "privacySettings.dataRetentionDays": preferences.dataRetentionDays || 90,
      "privacySettings.lastOptOutUpdate": new Date(),
    };

    // Update data expiry if retention period changed
    if (preferences.dataRetentionDays) {
      updateData.dataExpiryDate = moment()
        .add(preferences.dataRetentionDays, "days")
        .toDate();
    }

    return await Student.updateOne(
      { anonymizedId: studentAnonymizedId },
      { $set: updateData }
    );
  }
}

module.exports = new CheckInService();
