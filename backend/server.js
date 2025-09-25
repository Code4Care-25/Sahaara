const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(morgan("combined"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Sahaara Backend is running!",
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to Sahaara API",
    version: "1.0.0",
    endpoints: {
      health: "/health",
      api: "/api",
      auth: "/api/auth",
      users: "/api/users",
      chat: "/api/chat",
      appointments: "/api/appointments",
      resources: "/api/resources",
    },
  });
});

// Auth routes (minimal)
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: { message: "Email and password are required" },
    });
  }

  // Mock authentication - replace with real auth logic
  if (email === "test@sahaara.com" && password === "password") {
    res.json({
      success: true,
      data: {
        user: {
          id: "1",
          email: email,
          name: "Test User",
          role: "student",
        },
        token: "mock-jwt-token-" + Date.now(),
      },
      message: "Login successful",
    });
  } else {
    res.status(401).json({
      success: false,
      error: { message: "Invalid credentials" },
    });
  }
});

app.post("/api/auth/register", (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({
      success: false,
      error: { message: "Email, password, and name are required" },
    });
  }

  // Mock registration - replace with real registration logic
  res.json({
    success: true,
    data: {
      user: {
        id: Date.now().toString(),
        email: email,
        name: name,
        role: "student",
      },
      token: "mock-jwt-token-" + Date.now(),
    },
    message: "Registration successful",
  });
});

// Mock data endpoints
app.get("/api/institutions", (req, res) => {
  res.json({
    success: true,
    data: [
      { id: "1", name: "New Horizon College of Engineering", code: "NHCE" },
      { id: "2", name: "Bangalore Institute of Technology", code: "BIT" },
      { id: "3", name: "RV College of Engineering", code: "RVCE" },
    ],
  });
});

app.get("/api/departments/:institutionId", (req, res) => {
  const departments = [
    { id: "1", name: "Computer Science Engineering", code: "CSE" },
    { id: "2", name: "Information Science Engineering", code: "ISE" },
    { id: "3", name: "Electronics and Communication Engineering", code: "ECE" },
    { id: "4", name: "Mechanical Engineering", code: "ME" },
    { id: "5", name: "Civil Engineering", code: "CE" },
  ];

  res.json({
    success: true,
    data: departments,
  });
});

// Chat endpoints (minimal)
app.post("/api/chat/sessions", (req, res) => {
  const sessionId = "session-" + Date.now();
  res.json({
    success: true,
    data: {
      id: sessionId,
      userId: "1",
      personality: req.body.personality || "supportive",
      messages: [],
      createdAt: new Date().toISOString(),
    },
  });
});

app.post("/api/chat/sessions/:sessionId/messages", (req, res) => {
  const { sessionId } = req.params;
  const { content } = req.body;

  // Mock AI response
  const responses = [
    "I understand how you're feeling. It's completely normal to have these thoughts.",
    "You're not alone in this. Many people experience similar feelings.",
    "It takes courage to share what you're going through. Thank you for trusting me.",
    "Let's work through this together, one step at a time.",
  ];

  const randomResponse =
    responses[Math.floor(Math.random() * responses.length)];

  res.json({
    success: true,
    data: {
      sessionId: sessionId,
      messages: [
        { role: "user", content: content, timestamp: new Date().toISOString() },
        {
          role: "assistant",
          content: randomResponse,
          timestamp: new Date().toISOString(),
        },
      ],
    },
  });
});

// Resources endpoint
app.get("/api/resources", (req, res) => {
  const resources = [
    {
      id: "1",
      title: "Understanding Anxiety",
      description:
        "A comprehensive guide to understanding anxiety and its effects.",
      category: "anxiety",
      type: "article",
      difficulty: "beginner",
      tags: ["anxiety", "mental-health", "wellness"],
      thumbnailUrl: "/images/anxiety-guide.jpg",
      averageRating: 4.5,
      viewCount: 1250,
    },
    {
      id: "2",
      title: "Mindfulness Meditation",
      description:
        "Learn the basics of mindfulness meditation for stress relief.",
      category: "mindfulness",
      type: "video",
      difficulty: "beginner",
      tags: ["meditation", "mindfulness", "stress-relief"],
      thumbnailUrl: "/images/mindfulness.jpg",
      averageRating: 4.8,
      viewCount: 2100,
    },
    {
      id: "3",
      title: "Building Resilience",
      description:
        "Strategies to build emotional resilience and cope with challenges.",
      category: "resilience",
      type: "article",
      difficulty: "intermediate",
      tags: ["resilience", "coping", "emotional-wellness"],
      thumbnailUrl: "/images/resilience.jpg",
      averageRating: 4.3,
      viewCount: 980,
    },
    {
      id: "4",
      title: "Sleep Hygiene Tips",
      description: "Essential tips for better sleep and rest.",
      category: "sleep",
      type: "article",
      difficulty: "beginner",
      tags: ["sleep", "wellness", "health"],
      thumbnailUrl: "/images/sleep.jpg",
      averageRating: 4.6,
      viewCount: 1500,
    },
    {
      id: "5",
      title: "Stress Management Techniques",
      description: "Effective ways to manage daily stress.",
      category: "stress",
      type: "video",
      difficulty: "beginner",
      tags: ["s