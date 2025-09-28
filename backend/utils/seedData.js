const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// Import models
const User = require("../models/User");
const Counsellor = require("../models/Counsellor");
const Resource = require("../models/Resource");
const ChatSession = require("../models/ChatSession");
const Appointment = require("../models/Appointment");

// Connect to MongoDB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/sahaara",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

async function seedData() {
  try {
    console.log("🌱 Starting database seeding...");

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Counsellor.deleteMany({}),
      Resource.deleteMany({}),
      ChatSession.deleteMany({}),
      Appointment.deleteMany({}),
    ]);
    console.log("🗑️  Cleared existing data");

    // Create sample users
    const users = await User.insertMany([
      {
        email: "student1@sahaara.com",
        password: "password123",
        name: "Rahul Sharma",
        phone: "+91 9876543210",
        institution: "New Horizon College of Engineering",
        department: "Computer Science Engineering",
        academicYear: "3rd Year",
        role: "student",
        isEmailVerified: true,
        preferences: {
          theme: "light",
          notifications: { email: true, push: true, sms: false },
          privacy: { profileVisibility: "private", allowMessages: true },
        },
        wellnessProfile: {
          currentMood: "happy",
          stressLevel: 5,
          sleepQuality: 7,
          energyLevel: 6,
          socialActivity: 8,
          lastCheckIn: new Date(),
        },
      },
      {
        email: "student2@sahaara.com",
        password: "password123",
        name: "Priya Patel",
        phone: "+91 9876543211",
        institution: "Bangalore Institute of Technology",
        department: "Information Science Engineering",
        academicYear: "2nd Year",
        role: "student",
        isEmailVerified: true,
        preferences: {
          theme: "dark",
          notifications: { email: true, push: false, sms: true },
          privacy: { profileVisibility: "private", allowMessages: true },
        },
        wellnessProfile: {
          currentMood: "anxious",
          stressLevel: 8,
          sleepQuality: 4,
          energyLevel: 4,
          socialActivity: 5,
          lastCheckIn: new Date(),
        },
      },
      {
        email: "admin@sahaara.com",
        password: "admin123",
        name: "Admin User",
        phone: "+91 9876543212",
        institution: "Sahaara Platform",
        department: "Administration",
        academicYear: "N/A",
        role: "admin",
        isEmailVerified: true,
      },
    ]);
    console.log("👥 Created sample users");

    // Create counsellors
    const counsellors = await Counsellor.insertMany([
      {
        userId: users[0]._id, // This will be updated after creating counsellor users
        licenseNumber: "PSY001",
        specialization: ["Anxiety & Depression", "Academic Stress"],
        experience: {
          years: 8,
          description:
            "Specialized in helping students with anxiety and depression",
        },
        education: [
          {
            degree: "PhD in Psychology",
            institution: "Bangalore University",
            year: 2015,
            specialization: "Clinical Psychology",
          },
        ],
        bio: "Dr. Sarah Johnson is a licensed clinical psychologist with over 8 years of experience helping students navigate academic stress, anxiety, and depression. She uses evidence-based approaches including CBT and mindfulness techniques.",
        languages: ["English", "Hindi", "Kannada"],
        availability: {
          workingDays: ["monday", "tuesday", "wednesday", "thursday", "friday"],
          workingHours: { start: "09:00", end: "17:00" },
          timezone: "Asia/Kolkata",
        },
        pricing: {
          individualSession: 1500,
          groupSession: 800,
          emergencySession: 2000,
          currency: "INR",
        },
        isVerified: true,
        isActive: true,
        isAvailable: true,
      },
    ]);
    console.log("👨‍⚕️ Created sample counsellors");

    // Create counsellor users
    const counsellorUsers = await User.insertMany([
      {
        email: "counsellor1@sahaara.com",
        password: "counsellor123",
        name: "Dr. Sarah Johnson",
        phone: "+91 9876543213",
        institution: "Independent Practice",
        department: "Psychology",
        academicYear: "N/A",
        role: "counsellor",
        isEmailVerified: true,
      },
      {
        email: "counsellor2@sahaara.com",
        password: "counsellor123",
        name: "Dr. Michael Chen",
        phone: "+91 9876543214",
        institution: "Independent Practice",
        department: "Psychology",
        academicYear: "N/A",
        role: "counsellor",
        isEmailVerified: true,
      },
    ]);

    // Update counsellor records with correct user IDs
    await Counsellor.updateOne(
      { licenseNumber: "PSY001" },
      { userId: counsellorUsers[0]._id }
    );

    await Counsellor.insertMany([
      {
        userId: counsellorUsers[1]._id,
        licenseNumber: "PSY002",
        specialization: ["Academic Stress", "Career Counseling"],
        experience: {
          years: 6,
          description:
            "Expert in academic stress management and study techniques",
        },
        bio: "Dr. Michael Chen specializes in helping students manage academic pressure and make informed career decisions. He combines cognitive-behavioral techniques with practical study strategies.",
        languages: ["English", "Mandarin"],
        availability: {
          workingDays: [
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
          ],
          workingHours: { start: "10:00", end: "18:00" },
          timezone: "Asia/Kolkata",
        },
        pricing: {
          individualSession: 1200,
          groupSession: 700,
          emergencySession: 1800,
          currency: "INR",
        },
        isVerified: true,
        isActive: true,
        isAvailable: true,
      },
    ]);
    console.log("👨‍⚕️ Updated counsellor records");

    // Create sample resources
    const resources = await Resource.insertMany([
      {
        title: "Understanding Anxiety",
        description:
          "A comprehensive guide to understanding anxiety and its effects on daily life.",
        content:
          "Anxiety is a natural response to stress, but when it becomes overwhelming, it can interfere with daily activities. This guide covers the basics of anxiety, common symptoms, and initial coping strategies.",
        category: "anxiety",
        type: "article",
        difficulty: "beginner",
        tags: ["anxiety", "mental-health", "wellness", "stress"],
        thumbnailUrl: "/images/anxiety-guide.jpg",
        author: {
          name: "Dr. Sarah Johnson",
          credentials: "PhD in Clinical Psychology",
          bio: "Licensed clinical psychologist with 8+ years experience",
        },
        engagement: {
          viewCount: 1250,
          likeCount: 89,
          shareCount: 23,
          averageRating: 4.5,
          totalRatings: 156,
          completionRate: 78,
        },
        isFeatured: true,
        featuredAt: new Date(),
        isActive: true,
      },
      {
        title: "Mindfulness Meditation for Beginners",
        description:
          "Learn the basics of mindfulness meditation for stress relief and mental clarity.",
        content:
          "Mindfulness meditation is a practice that involves focusing your attention on the present moment. This comprehensive guide will teach you the fundamentals of mindfulness meditation.",
        category: "mindfulness",
        type: "video",
        difficulty: "beginner",
        tags: ["meditation", "mindfulness", "stress-relief", "wellness"],
        thumbnailUrl: "/images/mindfulness.jpg",
        duration: 15,
        author: {
          name: "Dr. Michael Chen",
          credentials: "Licensed Psychologist",
          bio: "Specialist in stress management and mindfulness techniques",
        },
        engagement: {
          viewCount: 2100,
          likeCount: 145,
          shareCount: 67,
          averageRating: 4.8,
          totalRatings: 203,
          completionRate: 85,
        },
        isFeatured: true,
        featuredAt: new Date(),
        isActive: true,
      },
      {
        title: "Building Emotional Resilience",
        description:
          "Strategies to build emotional resilience and cope with life's challenges.",
        content:
          "Emotional resilience is the ability to adapt to stressful situations and bounce back from adversity. This resource provides practical strategies for building resilience.",
        category: "resilience",
        type: "article",
        difficulty: "intermediate",
        tags: ["resilience", "coping", "emotional-wellness", "stress"],
        thumbnailUrl: "/images/resilience.jpg",
        author: {
          name: "Dr. Sarah Johnson",
          credentials: "PhD in Clinical Psychology",
          bio: "Expert in resilience training and trauma recovery",
        },
        engagement: {
          viewCount: 980,
          likeCount: 67,
          shareCount: 19,
          averageRating: 4.3,
          totalRatings: 89,
          completionRate: 72,
        },
        isActive: true,
      },
      {
        title: "Sleep Hygiene for Better Rest",
        description:
          "Essential tips and techniques for improving sleep quality and duration.",
        content:
          "Good sleep hygiene involves habits and practices that promote consistent, uninterrupted sleep. Learn about the importance of sleep and how to improve your sleep quality.",
        category: "sleep",
        type: "article",
        difficulty: "beginner",
        tags: ["sleep", "wellness", "health", "habits"],
        thumbnailUrl: "/images/sleep.jpg",
        author: {
          name: "Dr. Michael Chen",
          credentials: "Licensed Psychologist",
          bio: "Specialist in sleep disorders and wellness",
        },
        engagement: {
          viewCount: 1500,
          likeCount: 98,
          shareCount: 34,
          averageRating: 4.6,
          totalRatings: 134,
          completionRate: 81,
        },
        isActive: true,
      },
      {
        title: "Stress Management Techniques",
        description:
          "Effective ways to manage daily stress and maintain mental well-being.",
        content:
          "Stress is a normal part of life, but chronic stress can have negative effects on your health. This resource covers various stress management techniques.",
        category: "stress",
        type: "video",
        difficulty: "beginner",
        tags: ["stress", "management", "wellness", "coping"],
        thumbnailUrl: "/images/stress.jpg",
        duration: 20,
        author: {
          name: "Dr. Sarah Johnson",
          credentials: "PhD in Clinical Psychology",
          bio: "Expert in stress management and anxiety treatment",
        },
        engagement: {
          viewCount: 1800,
          likeCount: 112,
          shareCount: 45,
          averageRating: 4.4,
          totalRatings: 167,
          completionRate: 76,
        },
        isActive: true,
      },
    ]);
    console.log("📚 Created sample resources");

    // Create sample chat sessions
    const chatSessions = await ChatSession.insertMany([
      {
        userId: users[0]._id,
        personality: "supportive",
        messages: [
          {
            role: "user",
            content: "I'm feeling really anxious about my upcoming exams",
            timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            metadata: {
              sentiment: "negative",
              keywords: ["anxious", "exams", "upcoming"],
            },
          },
          {
            role: "assistant",
            content:
              "I understand how you're feeling. Exam anxiety is very common and completely normal. Let's work through this together.",
            timestamp: new Date(
              Date.now() - 2 * 24 * 60 * 60 * 1000 + 30 * 1000
            ),
            metadata: {
              responseTime: 1000,
              sentiment: "positive",
            },
          },
        ],
        isCompleted: true,
        completedAt: new Date(
          Date.now() - 2 * 24 * 60 * 60 * 1000 + 12 * 60 * 1000
        ),
        analytics: {
          sessionDuration: 12,
          messageCount: 8,
          userSatisfaction: 4,
          topicsDiscussed: ["anxiety", "exams", "study"],
          moodChange: "improved",
          followUpNeeded: false,
        },
      },
      {
        userId: users[1]._id,
        personality: "professional",
        messages: [
          {
            role: "user",
            content: "I'm having trouble sleeping at night",
            timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
            metadata: {
              sentiment: "negative",
              keywords: ["trouble", "sleeping", "night"],
            },
          },
          {
            role: "assistant",
            content:
              "Sleep issues can significantly impact your daily functioning. Let's explore some evidence-based sleep hygiene strategies.",
            timestamp: new Date(
              Date.now() - 5 * 24 * 60 * 60 * 1000 + 30 * 1000
            ),
            metadata: {
              responseTime: 1200,
              sentiment: "neutral",
            },
          },
        ],
        isCompleted: true,
        completedAt: new Date(
          Date.now() - 5 * 24 * 60 * 60 * 1000 + 8 * 60 * 1000
        ),
        analytics: {
          sessionDuration: 8,
          messageCount: 6,
          userSatisfaction: 5,
          topicsDiscussed: ["sleep", "insomnia", "wellness"],
          moodChange: "improved",
          followUpNeeded: true,
        },
      },
    ]);
    console.log("💬 Created sample chat sessions");

    // Create sample appointments
    const appointments = await Appointment.insertMany([
      {
        userId: users[0]._id,
        counsellorId: counsellorUsers[0]._id,
        counsellorName: "Dr. Sarah Johnson",
        dateTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
        duration: 60,
        type: "individual",
        status: "confirmed",
        notes: "First session to discuss anxiety management strategies",
        payment: {
          amount: 1500,
          currency: "INR",
          status: "paid",
          paymentMethod: "online",
        },
      },
      {
        userId: users[1]._id,
        counsellorId: counsellorUsers[1]._id,
        counsellorName: "Dr. Michael Chen",
        dateTime: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 weeks from now
        duration: 60,
        type: "individual",
        status: "pending",
        notes: "Follow-up session for academic stress management",
        payment: {
          amount: 1200,
          currency: "INR",
          status: "pending",
          paymentMethod: "online",
        },
      },
    ]);
    console.log("📅 Created sample appointments");

    console.log("✅ Database seeding completed successfully!");
    console.log(`📊 Created:`);
    console.log(`   - ${users.length + counsellorUsers.length} users`);
    console.log(`   - ${counsellors.length} counsellors`);
    console.log(`   - ${resources.length} resources`);
    console.log(`   - ${chatSessions.length} chat sessions`);
    console.log(`   - ${appointments.length} appointments`);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  } finally {
    mongoose.connection.close();
  }
}

// Run seeding
seedData();
