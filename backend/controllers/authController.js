const User = require('../models/User');
const Counsellor = require('../models/Counsellor');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

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

// User Registration
const registerUser = async (req, res) => {
  try {
    const { email, password, name, phone, institution, department, academicYear } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: { message: 'User with this email already exists' }
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
      academicYear,
      emailVerificationToken: crypto.randomBytes(32).toString('hex')
    });

    await user.save();

    // Generate tokens
    const token = generateToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Update last login
    user.lastLogin = new Date();
    await user.save();

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
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Registration failed' }
    });
  }
};

// User Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user and include password for comparison
    const user = await User.findOne({ email }).select('+password');
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

    // Generate tokens
    const token = generateToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Update last login
    user.lastLogin = new Date();
    await user.save();

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
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Login failed' }
    });
  }
};

// Counsellor Registration
const registerCounsellor = async (req, res) => {
  try {
    const { 
      email, 
      password, 
      name, 
      licenseNumber, 
      specialization, 
      experience, 
      bio,
      education,
      certifications,
      languages,
      availability,
      pricing
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: { message: 'User with this email already exists' }
      });
    }

    // Check if license number already exists
    const existingCounsellor = await Counsellor.findOne({ licenseNumber });
    if (existingCounsellor) {
      return res.status(400).json({
        success: false,
        error: { message: 'Counsellor with this license number already exists' }
      });
    }

    // Create new user with counsellor role
    const user = new User({
      email,
      password,
      name,
      role: 'counsellor',
      emailVerificationToken: crypto.randomBytes(32).toString('hex')
    });

    await user.save();

    // Create counsellor profile
    const counsellor = new Counsellor({
      userId: user._id,
      licenseNumber,
      specialization,
      experience,
      bio,
      education: education || [],
      certifications: certifications || [],
      languages: languages || ['English'],
      availability: availability || {
        workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
        workingHours: { start: '09:00', end: '17:00' },
        timezone: 'Asia/Kolkata'
      },
      pricing: pricing || {
        individualSession: 1000,
        currency: 'INR'
      }
    });

    await counsellor.save();

    // Generate tokens
    const token = generateToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res.status(201).json({
      success: true,
      data: {
        user: user.getPublicProfile(),
        counsellor: counsellor,
        token,
        refreshToken
      },
      message: 'Counsellor registered successfully'
    });
  } catch (error) {
    console.error('Counsellor registration error:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Counsellor registration failed' }
    });
  }
};

// Token Refresh
const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        error: { message: 'Refresh token required' }
      });
    }

    const decoded = verifyRefreshToken(refreshToken);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        error: { message: 'Invalid refresh token' }
      });
    }

    // Generate new tokens
    const newToken = generateToken(user._id);
    const newRefreshToken = generateRefreshToken(user._id);

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
};

// Email Verification
const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({ emailVerificationToken: token });
    if (!user) {
      return res.status(400).json({
        success: false,
        error: { message: 'Invalid verification token' }
      });
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    await user.save();

    res.json({
      success: true,
      message: 'Email verified successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Email verification failed' }
    });
  }
};

// Password Reset Request
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      // Don't reveal if email exists or not
      return res.json({
        success: true,
        message: 'If the email exists, a password reset link has been sent'
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.passwordResetToken = resetToken;
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    // In a real app, you would send an email here
    console.log(`Password reset token for ${email}: ${resetToken}`);

    res.json({
      success: true,
      message: 'If the email exists, a password reset link has been sent'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Password reset request failed' }
    });
  }
};

// Password Reset
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        error: { message: 'Invalid or expired reset token' }
      });
    }

    user.password = newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    res.json({
      success: true,
      message: 'Password reset successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Password reset failed' }
    });
  }
};

// Get Institutions
const getInstitutions = async (req, res) => {
  try {
    const institutions = [
      { id: "1", name: "New Horizon College of Engineering", code: "NHCE" },
      { id: "2", name: "Bangalore Institute of Technology", code: "BIT" },
      { id: "3", name: "RV College of Engineering", code: "RVCE" },
      { id: "4", name: "PES University", code: "PES" },
      { id: "5", name: "BMS College of Engineering", code: "BMSCE" }
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
};

// Get Departments
const getDepartments = async (req, res) => {
  try {
    const departments = [
      { id: "1", name: "Computer Science Engineering", code: "CSE" },
      { id: "2", name: "Information Science Engineering", code: "ISE" },
      { id: "3", name: "Electronics and Communication Engineering", code: "ECE" },
      { id: "4", name: "Mechanical Engineering", code: "ME" },
      { id: "5", name: "Civil Engineering", code: "CE" },
      { id: "6", name: "Electrical and Electronics Engineering", code: "EEE" },
      { id: "7", name: "Aerospace Engineering", code: "AE" },
      { id: "8", name: "Biotechnology", code: "BT" }
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
};

// Verify Token
const verifyToken = async (req, res) => {
  res.json({
    success: true,
    data: {
      user: req.user.getPublicProfile()
    },
    message: 'Token is valid'
  });
};

module.exports = {
  registerUser,
  loginUser,
  registerCounsellor,
  refreshToken,
  verifyEmail,
  forgotPassword,
  resetPassword,
  getInstitutions,
  getDepartments,
  verifyToken
};
