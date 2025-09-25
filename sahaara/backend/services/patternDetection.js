const moment = require("moment");
const Student = require("../models/Student");
const MealAttendance = require("../models/MealAttendance");

class PatternDetectionService {
  constructor() {
    this.threshold = parseFloat(process.env.PATTERN_DETECTION_THRESHOLD) || 0.7;
    this.lookbackDays = 14; // Analyze last 14 days
    this.baselineDays = 30; // Use 30 days for baseline
  }

  /**
   * Analyze meal attendance patterns for anomalies
   */
  async analyzePatterns(studentAnonymizedId) {
    try {
      const student = await Student.findOne({
        anonymizedId: studentAnonymizedId,
      });
      if (!student || student.privacySettings.optOut) {
        return { isAnomaly: false, reason: "student_opted_out" };
      }

      // Get recent attendance data
      const recentData = await this.getRecentAttendanceData(
        studentAnonymizedId
      );
      if (recentData.length < 7) {
        return { isAnomaly: false, reason: "insufficient_data" };
      }

      // Get baseline data
      const baselineData = await this.getBaselineData(studentAnonymizedId);

      // Perform pattern analysis
      const analysis = await this.performPatternAnalysis(
        recentData,
        baselineData
      );

      // Update student's baseline if needed
      await this.updateBaselineIfNeeded(student, recentData);

      return analysis;
    } catch (error) {
      console.error("Pattern analysis error:", error);
      return { isAnomaly: false, reason: "analysis_error" };
    }
  }

  /**
   * Get recent attendance data for analysis
   */
  async getRecentAttendanceData(studentAnonymizedId) {
    const startDate = moment()
      .subtract(this.lookbackDays, "days")
      .startOf("day");

    return await MealAttendance.find({
      studentAnonymizedId,
      "mealData.date": { $gte: startDate.toDate() },
    }).sort({ "mealData.date": 1 });
  }

  /**
   * Get baseline data for comparison
   */
  async getBaselineData(studentAnonymizedId) {
    const startDate = moment()
      .subtract(this.baselineDays, "days")
      .startOf("day");
    const endDate = moment().subtract(this.lookbackDays, "days").endOf("day");

    return await MealAttendance.find({
      studentAnonymizedId,
      "mealData.date": {
        $gte: startDate.toDate(),
        $lte: endDate.toDate(),
      },
    });
  }

  /**
   * Perform comprehensive pattern analysis
   */
  async performPatternAnalysis(recentData, baselineData) {
    const analyses = [
      this.analyzeConsecutiveMisses(recentData),
      this.analyzeFrequencyDrop(recentData, baselineData),
      this.analyzePatternChange(recentData, baselineData),
      this.analyzeMealTypePatterns(recentData, baselineData),
    ];

    // Find the most significant anomaly
    const significantAnomalies = analyses.filter(
      (a) => a.isAnomaly && a.score >= this.threshold
    );

    if (significantAnomalies.length === 0) {
      return { isAnomaly: false, reason: "none", score: 0 };
    }

    // Return the highest scoring anomaly
    const topAnomaly = significantAnomalies.reduce((prev, current) =>
      current.score > prev.score ? current : prev
    );

    return topAnomaly;
  }

  /**
   * Analyze consecutive meal misses
   */
  analyzeConsecutiveMisses(data) {
    let maxConsecutiveMisses = 0;
    let currentConsecutiveMisses = 0;

    data.forEach((meal) => {
      if (!meal.mealData.attended) {
        currentConsecutiveMisses++;
        maxConsecutiveMisses = Math.max(
          maxConsecutiveMisses,
          currentConsecutiveMisses
        );
      } else {
        currentConsecutiveMisses = 0;
      }
    });

    // Score based on consecutive misses
    let score = 0;
    let reason = "none";

    if (maxConsecutiveMisses >= 3) {
      score = Math.min(maxConsecutiveMisses / 5, 1); // Cap at 1.0
      reason = "missed_consecutive";
    }

    return {
      isAnomaly: score >= this.threshold,
      score,
      reason,
      details: { maxConsecutiveMisses },
    };
  }

  /**
   * Analyze frequency drop compared to baseline
   */
  analyzeFrequencyDrop(recentData, baselineData) {
    if (baselineData.length === 0) {
      return { isAnomaly: false, reason: "no_baseline", score: 0 };
    }

    const recentAttendanceRate =
      recentData.filter((m) => m.mealData.attended).length / recentData.length;
    const baselineAttendanceRate =
      baselineData.filter((m) => m.mealData.attended).length /
      baselineData.length;

    const dropPercentage =
      (baselineAttendanceRate - recentAttendanceRate) / baselineAttendanceRate;

    let score = 0;
    let reason = "none";

    if (dropPercentage >= 0.3) {
      // 30% or more drop
      score = Math.min(dropPercentage, 1);
      reason = "frequency_drop";
    }

    return {
      isAnomaly: score >= this.threshold,
      score,
      reason,
      details: {
        recentRate: recentAttendanceRate,
        baselineRate: baselineAttendanceRate,
        dropPercentage,
      },
    };
  }

  /**
   * Analyze changes in meal timing patterns
   */
  analyzePatternChange(recentData, baselineData) {
    if (baselineData.length === 0) {
      return { isAnomaly: false, reason: "no_baseline", score: 0 };
    }

    const recentPatterns = this.extractMealPatterns(recentData);
    const baselinePatterns = this.extractMealPatterns(baselineData);

    // Calculate pattern similarity
    const similarity = this.calculatePatternSimilarity(
      recentPatterns,
      baselinePatterns
    );
    const changeScore = 1 - similarity;

    let reason = "none";
    if (changeScore >= 0.5) {
      reason = "pattern_change";
    }

    return {
      isAnomaly: changeScore >= this.threshold,
      score: changeScore,
      reason,
      details: { similarity, changeScore },
    };
  }

  /**
   * Analyze meal type preferences
   */
  analyzeMealTypePatterns(recentData, baselineData) {
    if (baselineData.length === 0) {
      return { isAnomaly: false, reason: "no_baseline", score: 0 };
    }

    const recentMealTypes = this.getMealTypeDistribution(recentData);
    const baselineMealTypes = this.getMealTypeDistribution(baselineData);

    // Check for significant changes in meal type preferences
    const changes = [];
    ["breakfast", "lunch", "dinner"].forEach((mealType) => {
      const recentRate = recentMealTypes[mealType] || 0;
      const baselineRate = baselineMealTypes[mealType] || 0;
      const change = Math.abs(recentRate - baselineRate);
      changes.push(change);
    });

    const maxChange = Math.max(...changes);
    const score = maxChange;

    return {
      isAnomaly: score >= this.threshold,
      score,
      reason: score >= this.threshold ? "pattern_change" : "none",
      details: { maxChange, changes },
    };
  }

  /**
   * Extract meal patterns from data
   */
  extractMealPatterns(data) {
    const patterns = {
      mealTypes: {},
      timeSlots: {},
      daysOfWeek: {},
    };

    data.forEach((meal) => {
      const date = moment(meal.mealData.date);

      // Meal type distribution
      patterns.mealTypes[meal.mealType] =
        (patterns.mealTypes[meal.mealType] || 0) + 1;

      // Time slot distribution (if timestamp available)
      if (meal.mealData.timestamp) {
        const hour = moment(meal.mealData.timestamp).hour();
        const timeSlot = this.getTimeSlot(hour);
        patterns.timeSlots[timeSlot] = (patterns.timeSlots[timeSlot] || 0) + 1;
      }

      // Day of week distribution
      const dayOfWeek = date.day();
      patterns.daysOfWeek[dayOfWeek] =
        (patterns.daysOfWeek[dayOfWeek] || 0) + 1;
    });

    return patterns;
  }

  /**
   * Get meal type distribution
   */
  getMealTypeDistribution(data) {
    const total = data.length;
    const distribution = {};

    ["breakfast", "lunch", "dinner"].forEach((mealType) => {
      const count = data.filter((m) => m.mealData.mealType === mealType).length;
      distribution[mealType] = count / total;
    });

    return distribution;
  }

  /**
   * Calculate pattern similarity
   */
  calculatePatternSimilarity(pattern1, pattern2) {
    const keys = [
      ...new Set([...Object.keys(pattern1), ...Object.keys(pattern2)]),
    ];
    let similarity = 0;
    let totalWeight = 0;

    keys.forEach((key) => {
      const val1 = pattern1[key] || {};
      const val2 = pattern2[key] || {};

      if (typeof val1 === "object" && typeof val2 === "object") {
        const subKeys = [
          ...new Set([...Object.keys(val1), ...Object.keys(val2)]),
        ];
        let subSimilarity = 0;

        subKeys.forEach((subKey) => {
          const v1 = val1[subKey] || 0;
          const v2 = val2[subKey] || 0;
          subSimilarity += 1 - Math.abs(v1 - v2);
        });

        similarity += subSimilarity / subKeys.length;
      } else {
        similarity += 1 - Math.abs((val1 || 0) - (val2 || 0));
      }

      totalWeight++;
    });

    return totalWeight > 0 ? similarity / totalWeight : 0;
  }

  /**
   * Get time slot from hour
   */
  getTimeSlot(hour) {
    if (hour >= 6 && hour < 11) return "morning";
    if (hour >= 11 && hour < 15) return "afternoon";
    if (hour >= 15 && hour < 20) return "evening";
    return "night";
  }

  /**
   * Update baseline if enough new data is available
   */
  async updateBaselineIfNeeded(student, recentData) {
    const daysSinceUpdate = moment().diff(
      moment(student.baselinePattern.lastUpdated),
      "days"
    );

    if (daysSinceUpdate >= 7 && recentData.length >= 14) {
      const newBaseline = this.calculateBaseline(recentData);

      await Student.updateOne(
        { anonymizedId: student.anonymizedId },
        {
          $set: {
            "baselinePattern.averageMealsPerWeek":
              newBaseline.averageMealsPerWeek,
            "baselinePattern.preferredMealTimes":
              newBaseline.preferredMealTimes,
            "baselinePattern.lastUpdated": new Date(),
          },
        }
      );
    }
  }

  /**
   * Calculate baseline from data
   */
  calculateBaseline(data) {
    const mealTypeCounts = {};
    const timeSlots = {};

    data.forEach((meal) => {
      mealTypeCounts[meal.mealData.mealType] =
        (mealTypeCounts[meal.mealData.mealType] || 0) + 1;

      if (meal.mealData.timestamp) {
        const hour = moment(meal.mealData.timestamp).hour();
        const timeSlot = this.getTimeSlot(hour);
        timeSlots[timeSlot] = (timeSlots[timeSlot] || 0) + 1;
      }
    });

    const totalMeals = data.length;
    const weeks = Math.max(
      1,
      moment().diff(moment(data[0].mealData.date), "weeks")
    );

    return {
      averageMealsPerWeek: totalMeals / weeks,
      preferredMealTimes: Object.keys(timeSlots).map((slot) => ({
        mealType: this.getMealTypeForTimeSlot(slot),
        timeRange: this.getTimeRangeForSlot(slot),
      })),
    };
  }

  /**
   * Get meal type for time slot
   */
  getMealTypeForTimeSlot(slot) {
    switch (slot) {
      case "morning":
        return "breakfast";
      case "afternoon":
        return "lunch";
      case "evening":
        return "dinner";
      default:
        return "breakfast";
    }
  }

  /**
   * Get time range for slot
   */
  getTimeRangeForSlot(slot) {
    switch (slot) {
      case "morning":
        return { start: "06:00", end: "11:00" };
      case "afternoon":
        return { start: "11:00", end: "15:00" };
      case "evening":
        return { start: "15:00", end: "20:00" };
      default:
        return { start: "06:00", end: "11:00" };
    }
  }
}

module.exports = new PatternDetectionService();
