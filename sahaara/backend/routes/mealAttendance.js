const express = require("express");
const router = express.Router();
const Joi = require("joi");
const anonymizationService = require("../utils/anonymization");
const patternDetectionService = require("../services/patternDetection");
const checkInService = require("../services/checkInService");
const Student = require("../models/Student");
const MealAttendance = require("../models/MealAttendance");

// Validation schemas
const mealAttendanceSchema = Joi.object({
  collegeToken: Joi.string().required(),
  collegeId: Joi.string().required(),
  mealData: Joi.object({
    date: Joi.date().required(),
    mealType: Joi.string().valid("breakfast", "lunch", "dinner").required(),
    attended: Joi.boolean().required(),
    timestamp: Joi.date().optional(),
  }).required(),
  source: Joi.object({
    collegeSystem: Joi.string().required(),
    syncTimestamp: Joi.date().optional(),
  }).required(),
});

const batchMealAttendanceSchema = Joi.object({
  collegeToken: Joi.string().required(),
  collegeId: Joi.string().required(),
  mealData: Joi.array()
    .items(
      Joi.object({
        date: Joi.date().required(),
        mealType: Joi.string().valid("breakfast", "lunch", "dinner").required(),
        attended: Joi.boolean().required(),
        timestamp: Joi.date().optional(),
      })
    )
    .min(1)
    .max(100)
    .required(), // Limit batch size for performance
  source: Joi.object({
    collegeSystem: Joi.string().required(),
    syncTimestamp: Joi.date().optional(),
  }).required(),
});

/**
 * POST /api/meal-attendance
 * Receive anonymized meal attendance data from college systems
 */
router.post("/", async (req, res) => {
  try {
    // Validate request
    const { error, value } = mealAttendanceSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        error: "Validation error",
        details: error.details[0].message,
      });
    }

    const { collegeToken, collegeId, mealData, source } = value;

    // Verify college token
    if (!anonymizationService.verifyCollegeToken(collegeToken, collegeId)) {
      return res.status(401).json({
        success: false,
        error: "Invalid college token",
      });
    }

    // Create or get anonymized student
    const anonymizedId = anonymizationService.createAnonymizedId({
      collegeId,
      enrollmentYear: new Date().getFullYear(), // You might get this from college system
      department: "unknown", // You might get this from college system
    });

    let student = await Student.findOne({ anonymizedId });
    if (!student) {
      // Create new anonymized student record
      student = new Student({
        anonymizedId,
        collegeToken: anonymizationService.createCollegeToken({ collegeId }),
        dataExpiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days default
      });
      await student.save();
    }

    // Check if student has opted out
    if (student.privacySettings.optOut) {
      return res.status(200).json({
        success: true,
        message: "Data received but student has opted out",
        anonymizedId: anonymizationService.sanitizeForAPI({ anonymizedId }),
      });
    }

    // Create meal attendance record
    const attendance = new MealAttendance({
      studentAnonymizedId: anonymizedId,
      mealData: {
        ...mealData,
        timestamp: mealData.timestamp || new Date(),
      },
      source: {
        ...source,
        syncTimestamp: source.syncTimestamp || new Date(),
      },
    });

    await attendance.save();

    // Trigger pattern analysis
    const patternAnalysis = await patternDetectionService.analyzePatterns(
      anonymizedId
    );

    // Update attendance record with analysis
    attendance.patternAnalysis = {
      isAnomaly: patternAnalysis.isAnomaly,
      anomalyScore: patternAnalysis.score,
      reason: patternAnalysis.reason,
      lastAnalyzed: new Date(),
    };
    await attendance.save();

    // Trigger check-in if anomaly detected
    let checkInResult = null;
    if (patternAnalysis.isAnomaly) {
      checkInResult = await checkInService.triggerCheckIn(
        anonymizedId,
        patternAnalysis
      );
    }

    res.status(201).json({
      success: true,
      message: "Meal attendance data processed successfully",
      anonymizedId: anonymizationService.sanitizeForAPI({ anonymizedId }),
      patternAnalysis: {
        isAnomaly: patternAnalysis.isAnomaly,
        reason: patternAnalysis.reason,
        score: patternAnalysis.score,
      },
      checkInTriggered: checkInResult ? checkInResult.success : false,
    });
  } catch (error) {
    console.error("Meal attendance processing error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
      message: "Failed to process meal attendance data",
    });
  }
});

/**
 * POST /api/meal-attendance/batch
 * Receive batch meal attendance data from college systems
 */
router.post("/batch", async (req, res) => {
  try {
    // Validate request
    const { error, value } = batchMealAttendanceSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        error: "Validation error",
        details: error.details[0].message,
      });
    }

    const { collegeToken, collegeId, mealData, source } = value;

    // Verify college token
    if (!anonymizationService.verifyCollegeToken(collegeToken, collegeId)) {
      return res.status(401).json({
        success: false,
        error: "Invalid college token",
      });
    }

    // Create or get anonymized student
    const anonymizedId = anonymizationService.createAnonymizedId({
      collegeId,
      enrollmentYear: new Date().getFullYear(),
      department: "unknown",
    });

    let student = await Student.findOne({ anonymizedId });
    if (!student) {
      student = new Student({
        anonymizedId,
        collegeToken: anonymizationService.createCollegeToken({ collegeId }),
        dataExpiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      });
      await student.save();
    }

    // Check if student has opted out
    if (student.privacySettings.optOut) {
      return res.status(200).json({
        success: true,
        message: "Batch data received but student has opted out",
        anonymizedId: anonymizationService.sanitizeForAPI({ anonymizedId }),
      });
    }

    // Process batch data
    const attendanceRecords = mealData.map((meal) => ({
      studentAnonymizedId: anonymizedId,
      mealData: {
        ...meal,
        timestamp: meal.timestamp || new Date(),
      },
      source: {
        ...source,
        syncTimestamp: source.syncTimestamp || new Date(),
      },
    }));

    await MealAttendance.insertMany(attendanceRecords);

    // Trigger pattern analysis after batch processing
    const patternAnalysis = await patternDetectionService.analyzePatterns(
      anonymizedId
    );

    // Trigger check-in if anomaly detected
    let checkInResult = null;
    if (patternAnalysis.isAnomaly) {
      checkInResult = await checkInService.triggerCheckIn(
        anonymizedId,
        patternAnalysis
      );
    }

    res.status(201).json({
      success: true,
      message: `Batch processed: ${mealData.length} meal records`,
      anonymizedId: anonymizationService.sanitizeForAPI({ anonymizedId }),
      recordsProcessed: mealData.length,
      patternAnalysis: {
        isAnomaly: patternAnalysis.isAnomaly,
        reason: patternAnalysis.reason,
        score: patternAnalysis.score,
      },
      checkInTriggered: checkInResult ? checkInResult.success : false,
    });
  } catch (error) {
    console.error("Batch meal attendance processing error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
      message: "Failed to process batch meal attendance data",
    });
  }
});

/**
 * GET /api/meal-attendance/:anonymizedId/patterns
 * Get pattern analysis for a student (privacy-safe)
 */
router.get("/:anonymizedId/patterns", async (req, res) => {
  try {
    const { anonymizedId } = req.params;

    // Verify anonymized ID format
    if (!/^[a-f0-9]{16}$/.test(anonymizedId)) {
      return res.status(400).json({
        success: false,
        error: "Invalid anonymized ID format",
      });
    }

    const student = await Student.findOne({ anonymizedId });
    if (!student) {
      return res.status(404).json({
        success: false,
        error: "Student not found",
      });
    }

    // Get recent pattern analysis
    const patternAnalysis = await patternDetectionService.analyzePatterns(
      anonymizedId
    );

    // Get check-in history
    const checkInHistory = await checkInService.getCheckInHistory(
      anonymizedId,
      5
    );

    res.json({
      success: true,
      data: {
        anonymizedId: anonymizationService.sanitizeForAPI({ anonymizedId }),
        patternAnalysis: {
          isAnomaly: patternAnalysis.isAnomaly,
          reason: patternAnalysis.reason,
          score: patternAnalysis.score,
          lastAnalyzed: new Date(),
        },
        baselinePattern: {
          averageMealsPerWeek: student.baselinePattern.averageMealsPerWeek,
          lastUpdated: student.baselinePattern.lastUpdated,
        },
        recentCheckIns: checkInHistory.map((checkIn) => ({
          type: checkIn.checkInData.type,
          message: checkIn.checkInData.message,
          tone: checkIn.checkInData.tone,
          createdAt: checkIn.createdAt,
          responseReceived: checkIn.response.received,
        })),
        privacySettings: {
          optOut: student.privacySettings.optOut,
          allowCheckIns: student.privacySettings.allowCheckIns,
          dataRetentionDays: student.privacySettings.dataRetentionDays,
        },
      },
    });
  } catch (error) {
    console.error("Pattern analysis retrieval error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

/**
 * PUT /api/meal-attendance/:anonymizedId/privacy
 * Update privacy preferences
 */
router.put("/:anonymizedId/privacy", async (req, res) => {
  try {
    const { anonymizedId } = req.params;
    const { optOut, allowCheckIns, dataRetentionDays } = req.body;

    // Verify anonymized ID format
    if (!/^[a-f0-9]{16}$/.test(anonymizedId)) {
      return res.status(400).json({
        success: false,
        error: "Invalid anonymized ID format",
      });
    }

    const student = await Student.findOne({ anonymizedId });
    if (!student) {
      return res.status(404).json({
        success: false,
        error: "Student not found",
      });
    }

    // Update privacy preferences
    const updateResult = await checkInService.updatePrivacyPreferences(
      anonymizedId,
      {
        optOut,
        allowCheckIns,
        dataRetentionDays,
      }
    );

    if (updateResult.modifiedCount === 0) {
      return res.status(400).json({
        success: false,
        error: "Failed to update privacy preferences",
      });
    }

    res.json({
      success: true,
      message: "Privacy preferences updated successfully",
      data: {
        anonymizedId: anonymizationService.sanitizeForAPI({ anonymizedId }),
        privacySettings: {
          optOut:
            optOut !== undefined ? optOut : student.privacySettings.optOut,
          allowCheckIns:
            allowCheckIns !== undefined
              ? allowCheckIns
              : student.privacySettings.allowCheckIns,
          dataRetentionDays:
            dataRetentionDays || student.privacySettings.dataRetentionDays,
          lastUpdated: new Date(),
        },
      },
    });
  } catch (error) {
    console.error("Privacy preferences update error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

/**
 * POST /api/meal-attendance/:anonymizedId/check-in/:checkInId/response
 * Handle student response to check-in
 */
router.post("/:anonymizedId/check-in/:checkInId/response", async (req, res) => {
  try {
    const { anonymizedId, checkInId } = req.params;
    const { responseType, responseText } = req.body;

    // Validate response type
    const validResponseTypes = [
      "acknowledged",
      "needs_help",
      "doing_fine",
      "no_response",
    ];
    if (!validResponseTypes.includes(responseType)) {
      return res.status(400).json({
        success: false,
        error: "Invalid response type",
      });
    }

    // Verify anonymized ID format
    if (!/^[a-f0-9]{16}$/.test(anonymizedId)) {
      return res.status(400).json({
        success: false,
        error: "Invalid anonymized ID format",
      });
    }

    const result = await checkInService.handleCheckInResponse(
      checkInId,
      responseType,
      responseText
    );

    if (!result.success) {
      return res.status(400).json({
        success: false,
        error: result.reason || "Failed to process response",
      });
    }

    res.json({
      success: true,
      message: "Response processed successfully",
    });
  } catch (error) {
    console.error("Check-in response processing error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

module.exports = router;
