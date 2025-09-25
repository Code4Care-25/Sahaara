const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

// Import routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const chatRoutes = require("./routes/chat");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/sahaara", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

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
      counsellors: "/api/counsellors",
      forum: "/api/forum",
      journal: "/api/journal",
      mealMonitoring: "/api/meal-monitoring",
    },
  });
});

// Use route modules
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

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
      tags: ["stress", "management", "wellness"],
      thumbnailUrl: "/images/stress.jpg",
      averageRating: 4.4,
      viewCount: 1800,
    },
  ];

  res.json({
    success: true,
    data: resources,
  });
});

// Counsellors endpoint
app.get("/api/counsellors", (req, res) => {
  const counsellors = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@sahaara.com",
      specialization: "Anxiety & Depression",
      experience: "8 years",
      rating: 4.8,
      profilePicture: "/images/counsellor1.jpg",
      bio: "Specialized in helping students with anxiety and depression.",
      isAvailable: true,
      workingHours: { start: 9, end: 17 },
    },
    {
      id: "2",
      name: "Dr. Michael Chen",
      email: "michael.chen@sahaara.com",
      specialization: "Academic Stress",
      experience: "6 years",
      rating: 4.6,
      profilePicture: "/images/counsellor2.jpg",
      bio: "Expert in academic stress management and study techniques.",
      isAvailable: true,
      workingHours: { start: 10, end: 18 },
    },
    {
      id: "3",
      name: "Dr. Emily Rodriguez",
      email: "emily.rodriguez@sahaara.com",
      specialization: "Relationship Issues",
      experience: "10 years",
      rating: 4.9,
      profilePicture: "/images/counsellor3.jpg",
      bio: "Specialized in relationship counseling and social skills.",
      isAvailable: false,
      workingHours: { start: 9, end: 16 },
    },
  ];

  res.json({
    success: true,
    data: counsellors,
  });
});

// Forum posts endpoint
app.get("/api/forum/posts", (req, res) => {
  const forumPosts = [
    {
      id: "1",
      title: "Feeling overwhelmed with studies",
      content: "I'm struggling to balance my studies and personal life...",
      author: "Anonymous Student",
      category: "academic",
      tags: ["studies", "stress", "balance"],
      likes: 15,
      replies: 8,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      isAnonymous: true,
    },
    {
      id: "2",
      title: "Tips for managing anxiety before exams",
      content: "Here are some techniques that helped me...",
      author: "StudyBuddy",
      category: "anxiety",
      tags: ["exams", "anxiety", "tips"],
      likes: 23,
      replies: 12,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      isAnonymous: false,
    },
    {
      id: "3",
      title: "Building confidence in social situations",
      content: "I used to be very shy but here's what helped...",
      author: "ConfidentNow",
      category: "social",
      tags: ["confidence", "social", "growth"],
      likes: 18,
      replies: 6,
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      isAnonymous: false,
    },
  ];

  res.json({
    success: true,
    data: forumPosts,
  });
});

// Create forum post
app.post("/api/forum/posts", (req, res) => {
  const { title, content, category, tags, isAnonymous } = req.body;

  const newPost = {
    id: Date.now().toString(),
    title,
    content,
    author: isAnonymous ? "Anonymous Student" : "Current User",
    category,
    tags: tags || [],
    likes: 0,
    replies: 0,
    createdAt: new Date().toISOString(),
    isAnonymous: isAnonymous || false,
  };

  res.json({
    success: true,
    data: newPost,
    message: "Post created successfully",
  });
});

// Meal monitoring endpoints
app.get("/api/meal-monitoring/entries", (req, res) => {
  const entries = [
    {
      id: "1",
      userId: "1",
      date: new Date().toISOString().split("T")[0],
      mealType: "breakfast",
      foods: [
        { name: "Oatmeal", quantity: "1 bowl", calories: 150 },
        { name: "Banana", quantity: "1 medium", calories: 105 },
      ],
      mealQuality: "good",
      mood: "happy",
      notes: "Felt energetic after breakfast",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      userId: "1",
      date: new Date(Date.now() - 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      mealType: "lunch",
      foods: [
        { name: "Rice", quantity: "1 cup", calories: 200 },
        { name: "Dal", quantity: "1 bowl", calories: 120 },
        { name: "Vegetables", quantity: "1 serving", calories: 80 },
      ],
      mealQuality: "excellent",
      mood: "content",
      notes: "Home-cooked meal, very satisfying",
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  res.json({
    success: true,
    data: entries,
  });
});

app.post("/api/meal-monitoring/entries", (req, res) => {
  const { mealType, foods, mealQuality, mood, notes } = req.body;

  const newEntry = {
    id: Date.now().toString(),
    userId: "1",
    date: new Date().toISOString().split("T")[0],
    mealType,
    foods: foods || [],
    mealQuality,
    mood,
    notes,
    createdAt: new Date().toISOString(),
  };

  res.json({
    success: true,
    data: newEntry,
    message: "Meal entry created successfully",
  });
});

// Journal entries endpoint
app.get("/api/journal/entries", (req, res) => {
  const entries = [
    {
      id: "1",
      userId: "1",
      title: "Today's Reflection",
      content: "Had a productive day studying for exams...",
      mood: "motivated",
      tags: ["study", "progress"],
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      userId: "1",
      title: "Grateful for",
      content: "I'm grateful for my supportive friends and family...",
      mood: "grateful",
      tags: ["gratitude", "relationships"],
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  res.json({
    success: true,
    data: entries,
  });
});

app.post("/api/journal/entries", (req, res) => {
  const { title, content, mood, tags } = req.body;

  const newEntry = {
    id: Date.now().toString(),
    userId: "1",
    title,
    content,
    mood,
    tags: tags || [],
    createdAt: new Date().toISOString(),
  };

  res.json({
    success: true,
    data: newEntry,
    message: "Journal entry created successfully",
  });
});

// Appointments endpoint
app.get("/api/appointments/my-appointments", (req, res) => {
  const appointments = [
    {
      id: "1",
      userId: "1",
      counsellorId: "1",
      counsellorName: "Dr. Sarah Johnson",
      dateTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      type: "individual",
      status: "confirmed",
      notes: "First session to discuss anxiety management",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      userId: "1",
      counsellorId: "2",
      counsellorName: "Dr. Michael Chen",
      dateTime: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      type: "individual",
      status: "pending",
      notes: "Follow-up session for academic stress",
      createdAt: new Date().toISOString(),
    },
  ];

  res.json({
    success: true,
    data: appointments,
  });
});

app.post("/api/appointments", (req, res) => {
  const { counsellorId, dateTime, type, notes } = req.body;

  const newAppointment = {
    id: Date.now().toString(),
    userId: "1",
    counsellorId,
    counsellorName: "Dr. Sarah Johnson",
    dateTime,
    type: type || "individual",
    status: "pending",
    notes,
    createdAt: new Date().toISOString(),
  };

  res.json({
    success: true,
    data: newAppointment,
    message: "Appointment booked successfully",
  });
});

// User profile endpoint
app.get("/api/users/profile", (req, res) => {
  res.json({
    success: true,
    data: {
      id: "1",
      name: "Test User",
      email: "test@sahaara.com",
      phone: "+91 9876543210",
      institution: "New Horizon College of Engineering",
      department: "Computer Science Engineering",
      academicYear: "3rd Year",
      profilePicture: "/images/user-avatar.jpg",
      role: "student",
      createdAt: new Date().toISOString(),
    },
  });
});

// Analytics endpoint
app.get("/api/users/statistics", (req, res) => {
  res.json({
    success: true,
    data: {
      totalChatSessions: 12,
      totalAppointments: 3,
      totalJournalEntries: 25,
      totalMealEntries: 45,
      totalResourcesViewed: 8,
      moodTrends: {
        happy: 15,
        neutral: 8,
        sad: 2,
      },
      weeklyActivity: {
        chat: 3,
        journal: 5,
        meals: 7,
        resources: 2,
      },
    },
  });
});

// Enhanced Chat Analytics
app.get("/api/chat/analytics", (req, res) => {
  res.json({
    success: true,
    data: {
      totalSessions: 12,
      averageSessionDuration: "15 minutes",
      mostUsedPersonality: "supportive",
      commonTopics: ["anxiety", "academic stress", "relationships"],
      weeklySessions: [2, 3, 1, 4, 2, 0, 0],
      moodAfterChat: {
        improved: 8,
        same: 3,
        worse: 1,
      },
    },
  });
});

// Meal Monitoring Analytics
app.get("/api/meal-monitoring/analytics", (req, res) => {
  res.json({
    success: true,
    data: {
      totalEntries: 45,
      averageMealsPerDay: 2.8,
      mealQualityDistribution: {
        excellent: 15,
        good: 20,
        fair: 8,
        poor: 2,
      },
      moodCorrelation: {
        happy: 18,
        content: 12,
        neutral: 10,
        sad: 5,
      },
      weeklyTrends: {
        breakfast: [5, 6, 4, 7, 5, 3, 2],
        lunch: [6, 7, 5, 8, 6, 4, 3],
        dinner: [7, 8, 6, 9, 7, 5, 4],
        snacks: [3, 4, 2, 5, 3, 2, 1],
      },
    },
  });
});

// Journal Analytics
app.get("/api/journal/analytics", (req, res) => {
  res.json({
    success: true,
    data: {
      totalEntries: 25,
      averageEntriesPerWeek: 3.5,
      moodDistribution: {
        motivated: 8,
        grateful: 6,
        happy: 5,
        reflective: 4,
        anxious: 2,
      },
      mostUsedTags: ["study", "gratitude", "relationships", "progress"],
      writingStreak: 7,
      weeklyEntries: [4, 3, 5, 2, 6, 3, 2],
    },
  });
});

// Appointment Statistics
app.get("/api/appointments/stats/overview", (req, res) => {
  res.json({
    success: true,
    data: {
      totalAppointments: 3,
      upcomingAppointments: 2,
      completedAppointments: 1,
      cancelledAppointments: 0,
      averageRating: 4.7,
      favoriteCounsellor: "Dr. Sarah Johnson",
      monthlyTrends: {
        booked: [1, 2, 3, 2, 1, 0, 0],
        completed: [0, 1, 1, 1, 0, 0, 0],
      },
    },
  });
});

// Resource Categories
app.get("/api/resources/categories", (req, res) => {
  res.json({
    success: true,
    data: [
      "anxiety",
      "depression",
      "stress",
      "mindfulness",
      "sleep",
      "relationships",
      "academic",
      "career",
      "resilience",
      "wellness",
    ],
  });
});

// Resource Tags
app.get("/api/resources/tags", (req, res) => {
  res.json({
    success: true,
    data: [
      "anxiety",
      "mental-health",
      "wellness",
      "meditation",
      "mindfulness",
      "stress-relief",
      "resilience",
      "coping",
      "emotional-wellness",
      "sleep",
      "health",
      "study-tips",
      "academic-success",
      "relationships",
      "communication",
    ],
  });
});

// Counsellor Specializations
app.get("/api/counsellors/specializations", (req, res) => {
  res.json({
    success: true,
    data: [
      "Anxiety & Depression",
      "Academic Stress",
      "Relationship Issues",
      "Career Counseling",
      "Family Therapy",
      "Trauma Recovery",
      "Substance Abuse",
      "Eating Disorders",
      "LGBTQ+ Support",
      "Grief Counseling",
    ],
  });
});

// Enhanced Chat Sessions with History
app.get("/api/chat/sessions", (req, res) => {
  const sessions = [
    {
      id: "session-1",
      userId: "1",
      personality: "supportive",
      messageCount: 8,
      duration: "12 minutes",
      isCompleted: true,
      flagged: false,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      completedAt: new Date(
        Date.now() - 2 * 24 * 60 * 60 * 1000 + 12 * 60 * 1000
      ).toISOString(),
      messages: [
        {
          role: "user",
          content: "I'm feeling really anxious about my exams",
          timestamp: new Date(
            Date.now() - 2 * 24 * 60 * 60 * 1000
          ).toISOString(),
        },
        {
          role: "assistant",
          content:
            "I understand how you're feeling. Exam anxiety is very common and completely normal.",
          timestamp: new Date(
            Date.now() - 2 * 24 * 60 * 60 * 1000 + 30 * 1000
          ).toISOString(),
        },
        {
          role: "user",
          content: "I can't seem to focus on studying",
          timestamp: new Date(
            Date.now() - 2 * 24 * 60 * 60 * 1000 + 60 * 1000
          ).toISOString(),
        },
        {
          role: "assistant",
          content:
            "Let's work on some focus techniques together. Have you tried the Pomodoro method?",
          timestamp: new Date(
            Date.now() - 2 * 24 * 60 * 60 * 1000 + 90 * 1000
          ).toISOString(),
        },
      ],
    },
    {
      id: "session-2",
      userId: "1",
      personality: "professional",
      messageCount: 6,
      duration: "8 minutes",
      isCompleted: true,
      flagged: false,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      completedAt: new Date(
        Date.now() - 5 * 24 * 60 * 60 * 1000 + 8 * 60 * 1000
      ).toISOString(),
      messages: [
        {
          role: "user",
          content: "I'm having trouble sleeping",
          timestamp: new Date(
            Date.now() - 5 * 24 * 60 * 60 * 1000
          ).toISOString(),
        },
        {
          role: "assistant",
          content:
            "Sleep issues can significantly impact your daily functioning. Let's explore some sleep hygiene strategies.",
          timestamp: new Date(
            Date.now() - 5 * 24 * 60 * 60 * 1000 + 30 * 1000
          ).toISOString(),
        },
      ],
    },
  ];

  res.json({
    success: true,
    data: sessions,
  });
});

// Enhanced Resources with More Data
app.get("/api/resources/featured", (req, res) => {
  const featuredResources = [
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
      isFeatured: true,
      featuredAt: new Date().toISOString(),
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
      isFeatured: true,
      featuredAt: new Date().toISOString(),
    },
  ];

  res.json({
    success: true,
    data: featuredResources,
  });
});

// Resource Recommendations
app.get("/api/resources/recommendations/personalized", (req, res) => {
  const recommendations = [
    {
      id: "6",
      title: "Study Stress Management",
      description: "Effective techniques to manage stress during exam periods.",
      category: "academic",
      type: "article",
      difficulty: "beginner",
      tags: ["study", "stress", "academic"],
      thumbnailUrl: "/images/study-stress.jpg",
      averageRating: 4.6,
      viewCount: 890,
    },
    {
      id: "7",
      title: "Building Healthy Relationships",
      description:
        "Guidelines for maintaining healthy relationships in college.",
      category: "relationships",
      type: "video",
      difficulty: "intermediate",
      tags: ["relationships", "communication", "social"],
      thumbnailUrl: "/images/relationships.jpg",
      averageRating: 4.4,
      viewCount: 1200,
    },
  ];

  res.json({
    success: true,
    data: recommendations,
  });
});

// User Interactions with Resources
app.get("/api/resources/my/interactions", (req, res) => {
  const interactions = [
    {
      id: "1",
      title: "Understanding Anxiety",
      category: "anxiety",
      type: "article",
      thumbnailUrl: "/images/anxiety-guide.jpg",
      averageRating: 4.5,
      userRating: 5,
      liked: true,
      completed: true,
      shared: false,
    },
    {
      id: "2",
      title: "Mindfulness Meditation",
      category: "mindfulness",
      type: "video",
      thumbnailUrl: "/images/mindfulness.jpg",
      averageRating: 4.8,
      userRating: 4,
      liked: true,
      completed: false,
      shared: true,
    },
  ];

  res.json({
    success: true,
    data: interactions,
  });
});

// Forum Categories
app.get("/api/forum/categories", (req, res) => {
  res.json({
    success: true,
    data: [
      { id: "general", name: "General Discussion" },
      { id: "anxiety", name: "Anxiety Support" },
      { id: "depression", name: "Depression Support" },
      { id: "academic", name: "Academic Stress" },
      { id: "relationships", name: "Relationships" },
      { id: "sleep", name: "Sleep Issues" },
      { id: "motivation", name: "Motivation" },
      { id: "success", name: "Success Stories" },
    ],
  });
});

// User's Forum Activity
app.get("/api/forum/my/posts", (req, res) => {
  const myPosts = [
    {
      id: "4",
      title: "How I overcame exam anxiety",
      content: "I wanted to share my experience with exam anxiety...",
      category: "anxiety",
      tags: ["anxiety", "exams", "success"],
      likes: 12,
      replies: 5,
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      isAnonymous: false,
    },
  ];

  res.json({
    success: true,
    data: myPosts,
  });
});

// User's Forum Replies
app.get("/api/forum/my/replies", (req, res) => {
  const myReplies = [
    {
      id: "reply-1",
      postId: "1",
      postTitle: "Feeling overwhelmed with studies",
      content:
        "I found that breaking tasks into smaller chunks really helps...",
      likes: 3,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  res.json({
    success: true,
    data: myReplies,
  });
});

// Wellness Check-in
app.post("/api/users/wellness-checkin", (req, res) => {
  const { mood, energy, stress, sleep, social } = req.body;

  const checkin = {
    id: Date.now().toString(),
    userId: "1",
    mood,
    energy,
    stress,
    sleep,
    social,
    timestamp: new Date().toISOString(),
    recommendations: [
      "Try a 10-minute meditation session",
      "Take a short walk outside",
      "Connect with a friend or family member",
    ],
  };

  res.json({
    success: true,
    data: checkin,
    message: "Wellness check-in completed successfully",
  });
});

// Activity Summary
app.get("/api/users/activity-summary", (req, res) => {
  res.json({
    success: true,
    data: {
      today: {
        chatSessions: 1,
        journalEntries: 1,
        mealEntries: 2,
        resourcesViewed: 1,
        forumPosts: 0,
      },
      thisWeek: {
        chatSessions: 3,
        journalEntries: 4,
        mealEntries: 12,
        resourcesViewed: 5,
        forumPosts: 2,
      },
      thisMonth: {
        chatSessions: 12,
        journalEntries: 18,
        mealEntries: 45,
        resourcesViewed: 15,
        forumPosts: 5,
      },
      streaks: {
        journal: 7,
        mealTracking: 5,
        chatSessions: 3,
      },
    },
  });
});

// Search Resources
app.get("/api/resources/search/advanced", (req, res) => {
  const { query, category, type, difficulty, tags } = req.query;

  let filteredResources = [
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
  ];

  // Simple filtering logic for demonstration
  if (query) {
    filteredResources = filteredResources.filter(
      (resource) =>
        resource.title.toLowerCase().includes(query.toLowerCase()) ||
        resource.description.toLowerCase().includes(query.toLowerCase())
    );
  }

  if (category) {
    filteredResources = filteredResources.filter(
      (resource) => resource.category === category
    );
  }

  res.json({
    success: true,
    data: filteredResources,
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalResources: filteredResources.length,
      hasNext: false,
      hasPrev: false,
    },
    filters: {
      query,
      category,
      type,
      difficulty,
      tags,
    },
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: {
      message: "Internal server error",
      code: "SERVER_ERROR",
    },
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    error: {
      message: "Route not found",
      code: "NOT_FOUND",
    },
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Sahaara Backend Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔗 API base URL: http://localhost:${PORT}/api`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || "development"}`);
});

module.exports = app;
