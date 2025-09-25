const express = require("express");
const router = express.Router();
const ChatSession = require("../models/ChatSession");
const { authenticateToken } = require("../middleware/auth");
const {
  validateChatMessage,
  validatePagination,
} = require("../middleware/validation");

// Create new chat session
router.post("/sessions", authenticateToken, async (req, res) => {
  try {
    const { personality = "supportive" } = req.body;

    const session = new ChatSession({
      userId: req.user._id,
      personality,
    });

    await session.save();

    res.status(201).json({
      success: true,
      data: session,
      message: "Chat session created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: "Failed to create chat session",
        details: error.message,
      },
    });
  }
});

// Get user's chat sessions
router.get(
  "/sessions",
  authenticateToken,
  validatePagination,
  async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      const sessions = await ChatSession.find({ userId: req.user._id })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("userId", "name profilePicture");

      const total = await ChatSession.countDocuments({ userId: req.user._id });

      res.json({
        success: true,
        data: sessions,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalSessions: total,
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          message: "Failed to fetch chat sessions",
          details: error.message,
        },
      });
    }
  }
);

// Get specific chat session
router.get("/sessions/:sessionId", authenticateToken, async (req, res) => {
  try {
    const session = await ChatSession.findOne({
      _id: req.params.sessionId,
      userId: req.user._id,
    }).populate("userId", "name profilePicture");

    if (!session) {
      return res.status(404).json({
        success: false,
        error: { message: "Chat session not found" },
      });
    }

    res.json({
      success: true,
      data: session,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: "Failed to fetch chat session",
        details: error.message,
      },
    });
  }
});

// Send message in chat session
router.post(
  "/sessions/:sessionId/messages",
  authenticateToken,
  validateChatMessage,
  async (req, res) => {
    try {
      const { content } = req.body;

      const session = await ChatSession.findOne({
        _id: req.params.sessionId,
        userId: req.user._id,
      });

      if (!session) {
        return res.status(404).json({
          success: false,
          error: { message: "Chat session not found" },
        });
      }

      // Add user message
      await session.addMessage("user", content);

      // Generate AI response (mock implementation)
      const aiResponse = generateAIResponse(content, session.personality);

      // Add AI response
      await session.addMessage("assistant", aiResponse);

      res.json({
        success: true,
        data: {
          userMessage: { role: "user", content },
          aiResponse: { role: "assistant", content: aiResponse },
        },
        message: "Message sent successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: { message: "Failed to send message", details: error.message },
      });
    }
  }
);

// Complete chat session
router.put(
  "/sessions/:sessionId/complete",
  authenticateToken,
  async (req, res) => {
    try {
      const session = await ChatSession.findOne({
        _id: req.params.sessionId,
        userId: req.user._id,
      });

      if (!session) {
        return res.status(404).json({
          success: false,
          error: { message: "Chat session not found" },
        });
      }

      await session.completeSession();

      res.json({
        success: true,
        data: session,
        message: "Chat session completed successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          message: "Failed to complete chat session",
          details: error.message,
        },
      });
    }
  }
);

// Flag chat session
router.put("/sessions/:sessionId/flag", authenticateToken, async (req, res) => {
  try {
    const { reason } = req.body;

    const session = await ChatSession.findOne({
      _id: req.params.sessionId,
      userId: req.user._id,
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        error: { message: "Chat session not found" },
      });
    }

    await session.flagSession(reason);

    res.json({
      success: true,
      data: session,
      message: "Chat session flagged successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: "Failed to flag chat session", details: error.message },
    });
  }
});

// Get chat analytics
router.get("/analytics", authenticateToken, async (req, res) => {
  try {
    const analytics = await ChatSession.getUserAnalytics(req.user._id, "30d");

    res.json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: "Failed to fetch chat analytics",
        details: error.message,
      },
    });
  }
});

// Mock AI response generator
function generateAIResponse(userMessage, personality) {
  const responses = {
    supportive: [
      "I understand how you're feeling. That sounds really challenging.",
      "You're not alone in this. Many people experience similar feelings.",
      "It's okay to feel this way. Your feelings are valid.",
      "Let's work through this together. What would help you feel better?",
      "I'm here to support you. Take your time with this.",
    ],
    professional: [
      "Based on what you've shared, let's explore some evidence-based strategies.",
      "This is a common concern. Let me share some professional insights.",
      "I'd recommend considering these therapeutic approaches.",
      "From a clinical perspective, here are some techniques that might help.",
      "Let's examine this systematically and develop a plan.",
    ],
    friendly: [
      "Hey, I'm here for you! That sounds tough.",
      "I get it! Let's chat about this together.",
      "No worries, we'll figure this out!",
      "I'm on your side! What's going on?",
      "Let's tackle this together, friend!",
    ],
  };

  const personalityResponses = responses[personality] || responses.supportive;
  const randomResponse =
    personalityResponses[
      Math.floor(Math.random() * personalityResponses.length)
    ];

  // Add some context-aware responses based on keywords
  if (
    userMessage.toLowerCase().includes("anxious") ||
    userMessage.toLowerCase().includes("anxiety")
  ) {
    return (
      randomResponse +
      " Anxiety can be overwhelming, but there are effective ways to manage it."
    );
  }

  if (
    userMessage.toLowerCase().includes("sad") ||
    userMessage.toLowerCase().includes("depressed")
  ) {
    return (
      randomResponse +
      " It's important to acknowledge these feelings and seek support when needed."
    );
  }

  if (
    userMessage.toLowerCase().includes("stress") ||
    userMessage.toLowerCase().includes("stressed")
  ) {
    return (
      randomResponse +
      " Stress management techniques can be very helpful in these situations."
    );
  }

  return randomResponse;
}

module.exports = router;
