const ChatSession = require("../models/ChatSession");
const User = require("../models/User");

// Create new chat session
const createChatSession = async (req, res) => {
  try {
    const { personality = "supportive" } = req.body;
    const userId = req.user._id;

    const session = new ChatSession({
      userId,
      personality,
      messages: [],
    });

    await session.save();

    res.json({
      success: true,
      data: {
        id: session._id,
        userId: session.userId,
        personality: session.personality,
        messages: session.messages,
        createdAt: session.createdAt,
        isCompleted: session.isCompleted,
      },
      message: "Chat session created successfully",
    });
  } catch (error) {
    console.error("Create session error:", error);
    res.status(500).json({
      success: false,
      error: { message: "Failed to create chat session" },
    });
  }
};

// Send message to chat session
const sendMessage = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { content } = req.body;
    const userId = req.user._id;

    // Find the session
    const session = await ChatSession.findOne({ _id: sessionId, userId });
    if (!session) {
      return res.status(404).json({
        success: false,
        error: { message: "Chat session not found" },
      });
    }

    if (session.isCompleted) {
      return res.status(400).json({
        success: false,
        error: { message: "Cannot send messages to completed session" },
      });
    }

    // Add user message
    const userMessage = {
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
      metadata: {
        sentiment: analyzeSentiment(content),
        keywords: extractKeywords(content),
      },
    };

    session.messages.push(userMessage);

    // Generate AI response based on personality
    const aiResponse = generateAIResponse(
      content,
      session.personality,
      session.messages
    );

    const assistantMessage = {
      role: "assistant",
      content: aiResponse,
      timestamp: new Date(),
      metadata: {
        responseTime: 1000, // Mock response time
        sentiment: analyzeSentiment(aiResponse),
      },
    };

    session.messages.push(assistantMessage);
    await session.save();

    res.json({
      success: true,
      data: {
        sessionId: session._id,
        messages: [userMessage, assistantMessage],
      },
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Send message error:", error);
    res.status(500).json({
      success: false,
      error: { message: "Failed to send message" },
    });
  }
};

// Complete chat session
const completeChatSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { satisfaction, moodChange, followUpNeeded } = req.body;
    const userId = req.user._id;

    const session = await ChatSession.findOne({ _id: sessionId, userId });
    if (!session) {
      return res.status(404).json({
        success: false,
        error: { message: "Chat session not found" },
      });
    }

    session.isCompleted = true;
    session.completedAt = new Date();
    session.analytics.userSatisfaction = satisfaction;
    session.analytics.moodChange = moodChange;
    session.analytics.followUpNeeded = followUpNeeded;
    session.analytics.sessionDuration = Math.round(
      (session.completedAt - session.createdAt) / 1000 / 60
    );

    await session.save();

    res.json({
      success: true,
      data: {
        sessionId: session._id,
        completedAt: session.completedAt,
        duration: session.analytics.sessionDuration,
      },
      message: "Chat session completed successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: "Failed to complete chat session" },
    });
  }
};

// Flag chat session
const flagChatSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { reason } = req.body;
    const userId = req.user._id;

    const session = await ChatSession.findOne({ _id: sessionId, userId });
    if (!session) {
      return res.status(404).json({
        success: false,
        error: { message: "Chat session not found" },
      });
    }

    session.flagged = true;
    session.flaggedReason = reason;
    session.flaggedAt = new Date();

    await session.save();

    res.json({
      success: true,
      message: "Chat session flagged successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: "Failed to flag chat session" },
    });
  }
};

// Get chat sessions
const getChatSessions = async (req, res) => {
  try {
    const userId = req.user._id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const sessions = await ChatSession.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("-messages") // Don't include full messages in list
      .lean();

    const total = await ChatSession.countDocuments({ userId });

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
      error: { message: "Failed to fetch chat sessions" },
    });
  }
};

// Get specific chat session with messages
const getChatSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const userId = req.user._id;

    const session = await ChatSession.findOne({ _id: sessionId, userId });
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
      error: { message: "Failed to fetch chat session" },
    });
  }
};

// Get chat analytics
const getChatAnalytics = async (req, res) => {
  try {
    const userId = req.user._id;

    const [
      totalSessions,
      completedSessions,
      averageDuration,
      personalityStats,
      moodStats,
      weeklyStats,
    ] = await Promise.all([
      ChatSession.countDocuments({ userId }),
      ChatSession.countDocuments({ userId, isCompleted: true }),
      ChatSession.aggregate([
        { $match: { userId, isCompleted: true } },
        {
          $group: {
            _id: null,
            avgDuration: { $avg: "$analytics.sessionDuration" },
          },
        },
      ]),
      ChatSession.aggregate([
        { $match: { userId } },
        { $group: { _id: "$personality", count: { $sum: 1 } } },
      ]),
      ChatSession.aggregate([
        { $match: { userId, isCompleted: true } },
        { $group: { _id: "$analytics.moodChange", count: { $sum: 1 } } },
      ]),
      getWeeklySessionStats(userId),
    ]);

    const mostUsedPersonality = personalityStats.reduce(
      (max, current) => (current.count > max.count ? current : max),
      { count: 0, _id: "none" }
    );

    const moodBreakdown = moodStats.reduce((acc, item) => {
      acc[item._id || "unknown"] = item.count;
      return acc;
    }, {});

    res.json({
      success: true,
      data: {
        totalSessions,
        completedSessions,
        averageSessionDuration: averageDuration[0]?.avgDuration || 0,
        mostUsedPersonality: mostUsedPersonality._id,
        moodAfterChat: moodBreakdown,
        weeklySessions: weeklyStats,
        completionRate:
          totalSessions > 0 ? (completedSessions / totalSessions) * 100 : 0,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: "Failed to fetch chat analytics" },
    });
  }
};

// Helper functions
function generateAIResponse(userMessage, personality, messageHistory) {
  const responses = {
    "AI First-Aid Assistant": [
      "I hear your drive to improve. Encouraging and forward‑looking, with practical steps. Based on what you said about feeling low, what's one tiny step you could take today? I can help you plan it.",
      "I understand you're going through a difficult time. It's important to remember that seeking help is a sign of strength.",
      "Your feelings are valid, and it's okay to not be okay sometimes. Have you tried any coping strategies?",
      "It sounds like you're dealing with a lot right now. Would you like to talk about what's been most challenging?",
      "I'm here to listen and support you. Sometimes just talking about what's on your mind can help.",
      "Based on your screening results, I'd recommend speaking with a professional counsellor. Would you like me to help you book an appointment?",
    ],
    supportive: [
      "I understand how you're feeling. It's completely normal to have these thoughts.",
      "You're not alone in this. Many people experience similar feelings.",
      "It takes courage to share what you're going through. Thank you for trusting me.",
      "Let's work through this together, one step at a time.",
      "I'm here to support you through this. What would be most helpful right now?",
    ],
    professional: [
      "Based on what you've shared, I'd like to explore some evidence-based strategies.",
      "Let's examine this situation from a different perspective.",
      "I notice some patterns in what you're describing. Let's discuss them.",
      "From a clinical standpoint, this is a common experience. Here's what we know...",
      "Let's break this down systematically and identify specific areas to work on.",
    ],
    friendly: [
      "Hey, I'm really glad you're sharing this with me!",
      "That sounds really tough. I'm here to listen and help however I can.",
      "You know what? You're doing great by reaching out. That's not easy.",
      "I've got your back on this one. Let's figure it out together!",
      "Thanks for being so open with me. That takes real strength.",
    ],
    analytical: [
      "Let's analyze the factors contributing to this situation.",
      "I'd like to understand the root causes here. Can you tell me more about...",
      "There seem to be several variables at play. Let's examine each one.",
      "From a problem-solving perspective, let's identify the key issues.",
      "Let's map out the different aspects of this challenge systematically.",
    ],
  };

  const personalityResponses =
    responses[personality] || responses["AI First-Aid Assistant"];
  return personalityResponses[
    Math.floor(Math.random() * personalityResponses.length)
  ];
}

function analyzeSentiment(text) {
  // Simple sentiment analysis (in production, use a proper NLP library)
  const positiveWords = [
    "good",
    "great",
    "happy",
    "excited",
    "better",
    "amazing",
    "wonderful",
  ];
  const negativeWords = [
    "bad",
    "terrible",
    "sad",
    "angry",
    "worried",
    "anxious",
    "depressed",
  ];

  const lowerText = text.toLowerCase();
  const positiveCount = positiveWords.filter((word) =>
    lowerText.includes(word)
  ).length;
  const negativeCount = negativeWords.filter((word) =>
    lowerText.includes(word)
  ).length;

  if (positiveCount > negativeCount) return "positive";
  if (negativeCount > positiveCount) return "negative";
  return "neutral";
}

function extractKeywords(text) {
  // Simple keyword extraction (in production, use proper NLP)
  const commonWords = [
    "the",
    "a",
    "an",
    "and",
    "or",
    "but",
    "in",
    "on",
    "at",
    "to",
    "for",
    "of",
    "with",
    "by",
  ];
  return text
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length > 3 && !commonWords.includes(word))
    .slice(0, 5);
}

async function getWeeklySessionStats(userId) {
  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const stats = await ChatSession.aggregate([
    { $match: { userId, createdAt: { $gte: oneWeekAgo } } },
    {
      $group: {
        _id: { $dayOfWeek: "$createdAt" },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  // Convert to array with 7 days (Sunday = 1)
  const weeklyStats = [0, 0, 0, 0, 0, 0, 0];
  stats.forEach((stat) => {
    weeklyStats[stat._id - 1] = stat.count;
  });

  return weeklyStats;
}

module.exports = {
  createChatSession,
  sendMessage,
  completeChatSession,
  flagChatSession,
  getChatSessions,
  getChatSession,
  getChatAnalytics,
};
