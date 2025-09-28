const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { validateChatMessage, validatePagination } = require('../middleware/validation');
const { chatLimiter } = require('../middleware/rateLimiting');
const {
  createChatSession,
  sendMessage,
  completeChatSession,
  flagChatSession,
  getChatSessions,
  getChatSession,
  getChatAnalytics
} = require('../controllers/chatController');

const router = express.Router();

// Create new chat session
router.post('/sessions', authenticateToken, createChatSession);

// Send message to chat session
router.post('/sessions/:sessionId/messages', chatLimiter, authenticateToken, validateChatMessage, sendMessage);

// Complete chat session
router.put('/sessions/:sessionId/complete', authenticateToken, completeChatSession);

// Flag chat session
router.put('/sessions/:sessionId/flag', authenticateToken, flagChatSession);

// Get chat sessions
router.get('/sessions', authenticateToken, validatePagination, getChatSessions);

// Get specific chat session with messages
router.get('/sessions/:sessionId', authenticateToken, getChatSession);

// Get chat analytics
router.get('/analytics', authenticateToken, getChatAnalytics);

module.exports = router;