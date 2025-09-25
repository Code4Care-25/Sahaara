const crypto = require("crypto");

class AnonymizationService {
  constructor() {
    this.anonymizationKey =
      process.env.ANONYMIZATION_KEY || "default-key-change-in-production";
    this.tokenizationSalt =
      process.env.TOKENIZATION_SALT || "default-salt-change";
  }

  /**
   * Create anonymized ID from student data
   * This ensures the same student always gets the same anonymized ID
   * but the ID reveals no information about the student
   */
  createAnonymizedId(studentData) {
    const dataString = JSON.stringify({
      collegeId: studentData.collegeId,
      enrollmentYear: studentData.enrollmentYear,
      department: studentData.department,
    });

    return crypto
      .createHmac("sha256", this.anonymizationKey)
      .update(dataString)
      .digest("hex")
      .substring(0, 16); // Use first 16 characters for shorter IDs
  }

  /**
   * Create tokenized reference for college system
   * This allows college systems to send data without knowing our internal IDs
   */
  createCollegeToken(studentData) {
    const dataString = JSON.stringify({
      collegeId: studentData.collegeId,
      timestamp: Math.floor(Date.now() / (24 * 60 * 60 * 1000)), // Daily rotation
    });

    return crypto
      .createHmac("sha256", this.tokenizationSalt)
      .update(dataString)
      .digest("hex")
      .substring(0, 24);
  }

  /**
   * Verify college token and extract student info
   */
  verifyCollegeToken(token, collegeId) {
    const expectedToken = this.createCollegeToken({ collegeId });
    return token === expectedToken;
  }

  /**
   * Hash sensitive data for storage
   */
  hashSensitiveData(data) {
    return crypto
      .createHash("sha256")
      .update(data + this.anonymizationKey)
      .digest("hex");
  }

  /**
   * Generate random session token for temporary operations
   */
  generateSessionToken() {
    return crypto.randomBytes(32).toString("hex");
  }

  /**
   * Create privacy-safe data summary
   */
  createDataSummary(attendanceData) {
    return {
      totalMeals: attendanceData.length,
      attendanceRate:
        attendanceData.filter((m) => m.attended).length / attendanceData.length,
      patterns: this.extractPatterns(attendanceData),
      // No personal identifiers included
    };
  }

  /**
   * Extract patterns without revealing identity
   */
  extractPatterns(attendanceData) {
    const patterns = {
      mealTypes: {},
      timeSlots: {},
      weeklyPattern: {},
    };

    attendanceData.forEach((meal) => {
      // Count meal types
      patterns.mealTypes[meal.mealType] =
        (patterns.mealTypes[meal.mealType] || 0) + 1;

      // Extract time patterns (hour only, no specific times)
      const hour = new Date(meal.timestamp).getHours();
      const timeSlot = this.getTimeSlot(hour);
      patterns.timeSlots[timeSlot] = (patterns.timeSlots[timeSlot] || 0) + 1;

      // Weekly patterns (day of week)
      const dayOfWeek = new Date(meal.timestamp).getDay();
      patterns.weeklyPattern[dayOfWeek] =
        (patterns.weeklyPattern[dayOfWeek] || 0) + 1;
    });

    return patterns;
  }

  /**
   * Convert hour to time slot for privacy
   */
  getTimeSlot(hour) {
    if (hour >= 6 && hour < 11) return "morning";
    if (hour >= 11 && hour < 15) return "afternoon";
    if (hour >= 15 && hour < 20) return "evening";
    return "night";
  }

  /**
   * Sanitize data for external API responses
   */
  sanitizeForAPI(data) {
    const sanitized = { ...data };

    // Remove any potential identifiers
    delete sanitized.collegeId;
    delete sanitized.studentId;
    delete sanitized.email;
    delete sanitized.phone;

    // Ensure only anonymized IDs are present
    if (sanitized.id) {
      sanitized.id = sanitized.anonymizedId || sanitized.id;
    }

    return sanitized;
  }
}

module.exports = new AnonymizationService();
