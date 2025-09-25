const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Counsellor = require('../models/Counsellor');
const { 
  generateToken, 
  generateRefreshToken, 
  verifyRefreshToken,
  authenticateToken,
  sensitiveOperationLimit 
} = require('../middleware/auth');
const { 
  validateUserRegistration, 
  validateUserLogin, 
  validateCounsellorRegistration 
} = require('../middleware/validation');

// User registration
router.post('/register', validateUserRegistration, async (req, res) => {
  try {
    const { email, password, name, phone, institution, department, academicYear } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: { message: 'User already exists with this email' }
      });
    }

    // Create new user
    const user = new User({
      email,
      password,
      name,
      phone,
      institution,
      department,
      academicYear
    });

    await user.save();

    // Generate tokens
    const token = generateToken({ userId: user._id });
    const refreshToken = generateRefreshToken({ userId: user._id });

    res.status(201).json({
      success: true,
      data: {
        user: user.getPublicProfile(),
        token,
        refreshToken
      },
      message: 'User registered successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Registration failed', details: error.message }
    });
  }
});

// User login
router.post('/login', validateUserLogin, sensitiveOperationLimit(), async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        error: { message: 'Invalid credentials' }
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: { message: 'Invalid credentials' }
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate tokens
    const token = generateToken({ userId: user._id });
    const refreshToken = generateRefreshToken({ userId: user._id });

    res.json({
      success: true,
      data: {
        user: user.getPublicProfile(),
        token,
        refreshToken
      },
      message: 'Login successful'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Login failed', details: error.message }
    });
  }
});

// Counsellor registration
router.post('/counsellor/register', validateCounsellorRegistration, async (req, res) => {
  try {
    const { email, password, name, phone, specialization, credentials, bio } = req.body;

    // Check if counsellor already exists
    const existingCounsellor = await Counsellor.findOne({ email });
    if (existingCounsellor) {
      return res.status(400).json({
        success: false,
        error: { message: 'Counsellor already exists with this email' }
      });
    }

    // Create new counsellor
    const counsellor = new Counsellor({
      email,
      password,
      name,
      phone,
      specialization,
      credentials,
      bio
    });

    await counsellor.save();

    // Generate tokens
    const token = generateToken({ counsellorId: counsellor._id });
    const refreshToken = generateRefreshToken({ counsellorId: counsellor._id });

    res.status(201).json({
      success: true,
      data: {
        counsellor: counsellor.fullProfile,
        token,
        refreshToken
      },
      message: 'Counsellor registered successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Counsellor registration failed', details: error.message }
    });
  }
});

// Counsellor login
router.post('/counsellor/login', validateUserLogin, sensitiveOperationLimit(), async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find counsellor
    const counsellor = await Counsellor.findOne({ email });
    if (!counsellor) {
      return res.status(401).json({
        success: false,
        error: { message: 'Invalid credentials' }
      });
    }

    // Check password
    const isPasswordValid = await counsellor.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: { message: 'Invalid credentials' }
      });
    }

    // Update last login
    counsellor.lastLogin = new Date();
    await counsellor.save();

    // Generate tokens
    const token = generateToken({ counsellorId: counsellor._id });
    const refreshToken = generateRefreshToken({ counsellorId: counsellor._id });

    res.json({
      success: true,
      data: {
        counsellor: counsellor.fullProfile,
        token,
        refreshToken
      },
      message: 'Counsellor login successful'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Counsellor login failed', details: error.message }
    });
  }
});

// Refresh token
router.post('/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        error: { message: 'Refresh token required' }
      });
    }

    const decoded = verifyRefreshToken(refreshToken);
    
    // Generate new tokens
    const newToken = generateToken({ userId: decoded.userId });
    const newRefreshToken = generateRefreshToken({ userId: decoded.userId });

    res.json({
      success: true,
      data: {
        token: newToken,
        refreshToken: newRefreshToken
      },
      message: 'Token refreshed successfully'
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      error: { message: 'Invalid refresh token' }
    });
  }
});

// Email verification (mock implementation)
router.post('/verify-email', async (req, res) => {
  try {
    const { token } = req.body;

    // Mock verification - in real implementation, verify the token
    res.json({
      success: true,
      message: 'Email verified successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: { message: 'Email verification failed' }
    });
  }
});

// Forgot password
router.post('/forgot-password', sensitiveOperationLimit(), async (req, res) => {
  try {
    const { email } = req.body;

    // Mock implementation - in real app, send reset email
    res.json({
      success: true,
      message: 'Password reset email sent'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Password reset failed' }
    });
  }
});

// Reset password
router.post('/reset-password', sensitiveOperationLimit(), async (req, res) => {
  try {
    const { token, password } = req.body;

    // Mock implementation - in real app, verify token and update password
    res.json({
      success: true,
      message: 'Password reset successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: { message: 'Password reset failed' }
    });
  }
});

// Get institutions (mock data)
router.get('/institutions', async (req, res) => {
  try {
    const institutions = [
      { id: '1', name: 'New Horizon College of Engineering', code: 'NHCE' },
      { id: '2', name: 'Bangalore Institute of Technology', code: 'BIT' },
      { id: '3', name: 'RV College of Engineering', code: 'RVCE' },
      { id: '4', name: 'Delhi University', code: 'DU' },
      { id: '5', name: 'Bangalore University', code: 'BU' }
    ];

    res.json({
      success: true,
      data: institutions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Failed to fetch institutions' }
    });
  }
});

// Get departments by institution
router.get('/departments/:institutionId', async (req, res) => {
  try {
    const departments = [
      { id: '1', name: 'Computer Science Engineering', code: 'CSE' },
      { id: '2', name: 'Information Science Engineering', code: 'ISE' },
      { id: '3', name: 'Electronics and Communication Engineering', code: 'ECE' },
      { id: '4', name: 'Mechanical Engineering', code: 'ME' },
      { id: '5', name: 'Civil Engineering', code: 'CE' },
      { id: '6', name: 'Electrical Engineering', code: 'EE' },
      { id: '7', name: 'Business Administration', code: 'MBA' },
      { id: '8', name: 'Psychology', code: 'PSY' }
    ];

    res.json({
      success: true,
      data: departments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Failed to fetch departments' }
    });
  }
});

// Logout
router.post('/logout', authenticateToken, async (req, res) => {
  try {
    // In a real implementation, you might want to blacklist the token
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Logout failed' }
    });
  }
});

module.exports = router;
