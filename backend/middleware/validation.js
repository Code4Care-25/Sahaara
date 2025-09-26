const { body, param, query, validationResult } = require('express-validator');

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Validation failed',
        details: errors.array()
      }
    });
  }
  next();
};

// User registration validation
const validateUserRegistration = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('phone')
    .optional()
    .isMobilePhone('en-IN')
    .withMessage('Please provide a valid Indian mobile number'),
  body('institution')
    .trim()
    .notEmpty()
    .withMessage('Institution is required'),
  body('department')
    .trim()
    .notEmpty()
    .withMessage('Department is required'),
  body('academicYear')
    .trim()
    .notEmpty()
    .withMessage('Academic year is required'),
  handleValidationErrors
];

// User login validation
const validateUserLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  handleValidationErrors
];

// Counsellor registration validation
const validateCounsellorRegistration = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('licenseNumber')
    .trim()
    .notEmpty()
    .withMessage('License number is required'),
  body('specialization')
    .isArray({ min: 1 })
    .withMessage('At least one specialization is required'),
  body('experience.years')
    .isInt({ min: 0 })
    .withMessage('Experience years must be a positive number'),
  body('bio')
    .trim()
    .isLength({ min: 50, max: 1000 })
    .withMessage('Bio must be between 50 and 1000 characters'),
  handleValidationErrors
];

// Chat message validation
const validateChatMessage = [
  body('content')
    .trim()
    .isLength({ min: 1, max: 2000 })
    .withMessage('Message content must be between 1 and 2000 characters'),
  body('sessionId')
    .isMongoId()
    .withMessage('Valid session ID is required'),
  handleValidationErrors
];

// Appointment booking validation
const validateAppointmentBooking = [
  body('counsellorId')
    .isMongoId()
    .withMessage('Valid counsellor ID is required'),
  body('dateTime')
    .isISO8601()
    .withMessage('Valid date and time is required')
    .custom((value) => {
      const appointmentDate = new Date(value);
      const now = new Date();
      const minDate = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours from now
      
      if (appointmentDate < minDate) {
        throw new Error('Appointment must be at least 24 hours in advance');
      }
      
      return true;
    }),
  body('type')
    .optional()
    .isIn(['individual', 'group', 'emergency'])
    .withMessage('Invalid appointment type'),
  body('notes')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Notes cannot exceed 1000 characters'),
  handleValidationErrors
];

// Journal entry validation
const validateJournalEntry = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Title must be between 1 and 200 characters'),
  body('content')
    .trim()
    .isLength({ min: 1, max: 5000 })
    .withMessage('Content must be between 1 and 5000 characters'),
  body('mood')
    .optional()
    .isIn(['happy', 'sad', 'anxious', 'calm', 'angry', 'excited', 'tired', 'motivated', 'grateful', 'reflective'])
    .withMessage('Invalid mood selection'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  handleValidationErrors
];

// Meal entry validation
const validateMealEntry = [
  body('mealType')
    .isIn(['breakfast', 'lunch', 'dinner', 'snack'])
    .withMessage('Invalid meal type'),
  body('foods')
    .isArray({ min: 1 })
    .withMessage('At least one food item is required'),
  body('foods.*.name')
    .trim()
    .notEmpty()
    .withMessage('Food name is required'),
  body('foods.*.quantity')
    .trim()
    .notEmpty()
    .withMessage('Food quantity is required'),
  body('foods.*.calories')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Calories must be a positive number'),
  body('mealQuality')
    .isIn(['excellent', 'good', 'fair', 'poor'])
    .withMessage('Invalid meal quality'),
  body('mood')
    .optional()
    .isIn(['happy', 'content', 'neutral', 'sad', 'anxious'])
    .withMessage('Invalid mood selection'),
  body('notes')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Notes cannot exceed 500 characters'),
  handleValidationErrors
];

// Forum post validation
const validateForumPost = [
  body('title')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Title must be between 5 and 200 characters'),
  body('content')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Content must be between 10 and 2000 characters'),
  body('category')
    .isIn(['general', 'anxiety', 'depression', 'academic', 'relationships', 'sleep', 'motivation', 'success'])
    .withMessage('Invalid category'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  body('isAnonymous')
    .optional()
    .isBoolean()
    .withMessage('isAnonymous must be a boolean'),
  handleValidationErrors
];

// Resource validation
const validateResource = [
  body('title')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Title must be between 5 and 200 characters'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Content is required'),
  body('category')
    .isIn(['anxiety', 'depression', 'stress', 'mindfulness', 'sleep', 'relationships', 'academic', 'career', 'resilience', 'wellness'])
    .withMessage('Invalid category'),
  body('type')
    .isIn(['article', 'video', 'audio', 'interactive', 'worksheet'])
    .withMessage('Invalid resource type'),
  body('difficulty')
    .optional()
    .isIn(['beginner', 'intermediate', 'advanced'])
    .withMessage('Invalid difficulty level'),
  handleValidationErrors
];

// General validation helpers
const validateObjectId = (paramName) => [
  param(paramName)
    .isMongoId()
    .withMessage(`Invalid ${paramName} ID`),
  handleValidationErrors
];

const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  handleValidationErrors
];

const validateDateRange = [
  query('startDate')
    .optional()
    .isISO8601()
    .withMessage('Start date must be a valid date'),
  query('endDate')
    .optional()
    .isISO8601()
    .withMessage('End date must be a valid date'),
  handleValidationErrors
];

module.exports = {
  handleValidationErrors,
  validateUserRegistration,
  validateUserLogin,
  validateCounsellorRegistration,
  validateChatMessage,
  validateAppointmentBooking,
  validateJournalEntry,
  validateMealEntry,
  validateForumPost,
  validateResource,
  validateObjectId,
  validatePagination,
  validateDateRange
};