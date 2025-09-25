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
    .withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number'),
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('phone')
    .optional()
    .isMobilePhone()
    .withMessage('Valid phone number is required'),
  body('institution')
    .optional()
    .isMongoId()
    .withMessage('Valid institution ID is required'),
  body('department')
    .optional()
    .isMongoId()
    .withMessage('Valid department ID is required'),
  body('academicYear')
    .optional()
    .isIn(['1st', '2nd', '3rd', '4th', 'PG', 'PhD'])
    .withMessage('Valid academic year is required'),
  handleValidationErrors
];

// User login validation
const validateUserLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
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
    .withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('phone')
    .optional()
    .isMobilePhone()
    .withMessage('Valid phone number is required'),
  body('specialization')
    .isIn([
      'Anxiety & Depression', 'Academic Stress', 'Relationship Issues',
      'Career Counseling', 'Family Therapy', 'Trauma Recovery',
      'Substance Abuse', 'Eating Disorders', 'LGBTQ+ Support', 'Grief Counseling'
    ])
    .withMessage('Valid specialization is required'),
  body('credentials.degree')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Degree must be less than 100 characters'),
  body('credentials.license')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('License must be less than 100 characters'),
  body('bio')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Bio must be less than 1000 characters'),
  handleValidationErrors
];

// Chat message validation
const validateChatMessage = [
  body('content')
    .trim()
    .isLength({ min: 1, max: 2000 })
    .withMessage('Message content must be between 1 and 2000 characters'),
  body('personality')
    .optional()
    .isIn(['supportive', 'professional', 'friendly'])
    .withMessage('Valid personality type is required'),
  handleValidationErrors
];

// Appointment validation
const validateAppointment = [
  body('counsellorId')
    .isMongoId()
    .withMessage('Valid counsellor ID is required'),
  body('dateTime')
    .isISO8601()
    .withMessage('Valid date and time is required')
    .custom((value) => {
      if (new Date(value) <= new Date()) {
        throw new Error('Appointment time must be in the future');
      }
      return true;
    }),
  body('type')
    .optional()
    .isIn(['individual', 'group', 'emergency', 'follow_up'])
    .withMessage('Valid appointment type is required'),
  body('notes')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Notes must be less than 1000 characters'),
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
    .isIn(['happy', 'sad', 'anxious', 'stressed', 'neutral', 'excited', 'grateful', 'motivated'])
    .withMessage('Valid mood is required'),
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
    .withMessage('Valid meal type is required'),
  body('foods')
    .isArray({ min: 1 })
    .withMessage('At least one food item is required'),
  body('foods.*.name')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Food name must be between 1 and 100 characters'),
  body('foods.*.quantity')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Food quantity must be between 1 and 50 characters'),
  body('foods.*.calories')
    .optional()
    .isInt({ min: 0, max: 10000 })
    .withMessage('Calories must be between 0 and 10000'),
  body('mealQuality')
    .optional()
    .isIn(['excellent', 'good', 'fair', 'poor'])
    .withMessage('Valid meal quality is required'),
  body('mood')
    .optional()
    .isIn(['happy', 'content', 'neutral', 'sad', 'anxious'])
    .withMessage('Valid mood is required'),
  body('notes')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Notes must be less than 500 characters'),
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
    .isLength({ min: 10, max: 5000 })
    .withMessage('Content must be between 10 and 5000 characters'),
  body('category')
    .isIn(['general', 'anxiety', 'depression', 'academic', 'relationships', 'sleep', 'motivation', 'success'])
    .withMessage('Valid category is required'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  body('isAnonymous')
    .optional()
    .isBoolean()
    .withMessage('Anonymous flag must be boolean'),
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
    .isLength({ min: 50 })
    .withMessage('Content must be at least 50 characters'),
  body('category')
    .isIn(['anxiety', 'depression', 'stress', 'mindfulness', 'sleep', 'relationships', 'academic', 'career', 'resilience', 'wellness'])
    .withMessage('Valid category is required'),
  body('type')
    .isIn(['article', 'video', 'audio', 'exercise', 'worksheet', 'book'])
    .withMessage('Valid resource type is required'),
  body('difficulty')
    .optional()
    .isIn(['beginner', 'intermediate', 'advanced'])
    .withMessage('Valid difficulty level is required'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  handleValidationErrors
];

// ObjectId validation
const validateObjectId = (paramName = 'id') => [
  param(paramName)
    .isMongoId()
    .withMessage(`Valid ${paramName} is required`),
  handleValidationErrors
];

// Pagination validation
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

// Date range validation
const validateDateRange = [
  query('startDate')
    .optional()
    .isISO8601()
    .withMessage('Valid start date is required'),
  query('endDate')
    .optional()
    .isISO8601()
    .withMessage('Valid end date is required'),
  query('startDate')
    .custom((value, { req }) => {
      if (value && req.query.endDate && new Date(value) > new Date(req.query.endDate)) {
        throw new Error('Start date must be before end date');
      }
      return true;
    }),
  handleValidationErrors
];

module.exports = {
  handleValidationErrors,
  validateUserRegistration,
  validateUserLogin,
  validateCounsellorRegistration,
  validateChatMessage,
  validateAppointment,
  validateJournalEntry,
  validateMealEntry,
  validateForumPost,
  validateResource,
  validateObjectId,
  validatePagination,
  validateDateRange
};
