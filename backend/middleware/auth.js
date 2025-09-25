const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Counsellor = require('../models/Counsellor');

// Authenticate user token
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        error: { message: 'Access token required' }
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        error: { message: 'Invalid token' }
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        error: { message: 'Invalid token' }
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        error: { message: 'Token expired' }
      });
    }

    res.status(500).json({
      success: false,
      error: { message: 'Authentication error' }
    });
  }
};

// Authenticate counsellor token
const authenticateCounsellor = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        error: { message: 'Access token required' }
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const counsellor = await Counsellor.findById(decoded.counsellorId).select('-password');
    
    if (!counsellor) {
      return res.status(401).json({
        success: false,
        error: { message: 'Invalid token' }
      });
    }

    req.counsellor = counsellor;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        error: { message: 'Invalid token' }
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        error: { message: 'Token expired' }
      });
    }

    res.status(500).json({
      success: false,
      error: { message: 'Authentication error' }
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

// Optional authentication (for public endpoints that can benefit from user context)
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId).select('-password');
      if (user) {
        req.user = user;
      }
    }
    
    next();
  } catch (error) {
    // Ignore authentication errors for optional auth
    next();
  }
};

// Check ownership of resource
const checkOwnership = (resourceUserIdField = 'userId') => {
  return (req, res, next) => {
    const resourceUserId = req.resource?.[resourceUserIdField] || req.params.userId;
    
    if (req.user && req.user._id.toString() === resourceUserId.toString()) {
      next();
    } else {
      res.status(403).json({
        success: false,
        error: { message: 'Access denied' }
      });
    }
  };
};

// Rate limiting for sensitive operations
const sensitiveOperationLimit = (maxAttempts = 5, windowMs = 15 * 60 * 1000) => {
  const attempts = new Map();
  
  return (req, res, next) => {
    const key = req.ip + ':' + req.user?._id;
    const now = Date.now();
    const windowStart = now - windowMs;
    
    // Clean old attempts
    if (attempts.has(key)) {
      const userAttempts = attempts.get(key).filter(time => time > windowStart);
      attempts.set(key, userAttempts);
    } else {
      attempts.set(key, []);
    }
    
    const userAttempts = attempts.get(key);
    
    if (userAttempts.length >= maxAttempts) {
      return res.status(429).json({
        success: false,
        error: { 
          message: 'Too many attempts. Please try again later.',
          retryAfter: Math.ceil(windowMs / 1000)
        }
      });
    }
    
    userAttempts.push(now);
    next();
  };
};

// Generate JWT token
const generateToken = (payload, expiresIn = '24h') => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

// Generate refresh token
const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
};

// Verify refresh token
const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
};

module.exports = {
  authenticateToken,
  authenticateCounsellor,
  requireAdmin,
  requireCounsellor,
  optionalAuth,
  checkOwnership,
  sensitiveOperationLimit,
  generateToken,
  generateRefreshToken,
  verifyRefreshToken
};
