const rateLimit = require('express-rate-limit');

// General API rate limiting
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: { message: 'Too many requests from this IP, please try again later.' }
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Strict rate limiting for authentication endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    success: false,
    error: { message: 'Too many authentication attempts, please try again later.' }
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Rate limiting for password reset
const passwordResetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // limit each IP to 3 password reset requests per hour
  message: {
    success: false,
    error: { message: 'Too many password reset attempts, please try again later.' }
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Rate limiting for chat messages
const chatLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 30, // limit each IP to 30 chat messages per minute
  message: {
    success: false,
    error: { message: 'Too many chat messages, please slow down.' }
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Rate limiting for forum posts
const forumLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // limit each IP to 10 forum posts per hour
  message: {
    success: false,
    error: { message: 'Too many forum posts, please try again later.' }
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Rate limiting for resource interactions
const resourceLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // limit each IP to 50 resource interactions per 15 minutes
  message: {
    success: false,
    error: { message: 'Too many resource interactions, please slow down.' }
  },
  standardHeaders: true,
  legacyHeaders: false
});

module.exports = {
  generalLimiter,
  authLimiter,
  passwordResetLimiter,
  chatLimiter,
  forumLimiter,
  resourceLimiter
};
