const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Counsellor = require('../models/Counsellor');

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'fallback-secret', {
    expiresIn: process.env.JWT_EXPIRES_IN || '24h'
  });
};

// Generate refresh token
const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET || 'fallback-refresh-secret', {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d'
  });
};

// Verify refresh token
const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET || 'fallback-refresh-secret');
};

// Authenticate JWT token
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        error: { message: 'Access token required' }
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        error: { message: 'Invalid token - user not found' }
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        error: { message: 'Token expired' }
      });
    }
    
    return res.status(403).json({
      success: false,
      error: { message: 'Invalid token' }
    });
  }
};

// Authenticate counsellor
const authenticateCounsellor = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        error: { message: 'Access token required' }
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user || user.role !== 'counsellor') {
      return res.status(403).json({
        success: false,
        error: { message: 'Counsellor access required' }
      });
    }

    const counsellor = await Counsellor.findOne({ userId: user._id });
    if (!counsellor || !counsellor.isActive) {
      return res.status(403).json({
        success: false,
        error: { message: 'Counsellor profile not active' }
      });
    }

    req.user = user;
    req.counsellor = counsellor;
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      error: { message: 'Invalid counsellor token' }
    });
  }
};

// Require admin role
const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({
      success: false,
      error: { message: 'Admin access required' }
    });
  }
};

// Require counsellor role
const requireCounsellor = (req, res, next) => {
  if (req.user && req.user.role === 'counsellor') {
    next();
  } else {
    res.status(403).json({
      success: false,
      error: { message: 'Counsellor access required' }
    });
  }
};

// Optional authentication (for public endpoints)
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
      const user = await User.findById(decoded.userId).select('-password');
      req.user = user;
    }
    
    next();
  } catch (error) {
    // Continue without authentication for optional auth
    next();
  }
};

// Check ownership of resource
const checkOwnership = (resourceUserIdField = 'userId') => {
  return (req, res, next) => {
    if (req.user.role === 'admin') {
      return next(); // Admin can access everything
    }

    const resourceUserId = req.resource ? req.resource[resourceUserIdField] : req.params.userId;
    
    if (req.user._id.toString() === resourceUserId.toString()) {
      next();
    } else {
      res.status(403).json({
        success: false,
        error: { message: 'Access denied - resource ownership required' }
      });
    }
  };
};

// Rate limiting for sensitive operations
const sensitiveOperationLimit = (maxAttempts = 5, windowMs = 15 * 60 * 1000) => {
  const attempts = new Map();

  return (req, res, next) => {
    const key = req.ip + req.user._id;
    const now = Date.now();
    const userAttempts = attempts.get(key) || { count: 0, resetTime: now + windowMs };

    if (now > userAttempts.resetTime) {
      userAttempts.count = 0;
      userAttempts.resetTime = now + windowMs;
    }

    if (userAttempts.count >= maxAttempts) {
      return res.status(429).json({
        success: false,
        error: { 
          message: 'Too many attempts. Please try again later.',
          retryAfter: Math.ceil((userAttempts.resetTime - now) / 1000)
        }
      });
    }

    userAttempts.count++;
    attempts.set(key, userAttempts);
    next();
  };
};

module.exports = {
  generateToken,
  generateRefreshToken,
  verifyRefreshToken,
  authenticateToken,
  authenticateCounsellor,
  requireAdmin,
  requireCounsellor,
  optionalAuth,
  checkOwnership,
  sensitiveOperationLimit
};