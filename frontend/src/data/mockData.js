// Mock data for the Sahaara app

export const colleges = [
  {
    id: 1,
    name: "New Horizon College of Engineering",
    logo: "/logos/logo-nhce.png",
  },
  { id: 2, name: "Delhi University" },
  { id: 3, name: "Bangalore University" },
  { id: 4, name: "Chennai University" },
  { id: 5, name: "Kolkata University" },
  { id: 6, name: "Pune University" },
  { id: 7, name: "Hyderabad University" },
  { id: 8, name: "Ahmedabad University" },
];

export const academicYears = [
  { id: 1, name: "First Year", value: "1st" },
  { id: 2, name: "Second Year", value: "2nd" },
  { id: 3, name: "Third Year", value: "3rd" },
  { id: 4, name: "Fourth Year", value: "4th" },
  { id: 5, name: "Post Graduate", value: "PG" },
  { id: 6, name: "PhD", value: "PhD" },
];

export const departments = [
  { id: 1, name: "Artificial Intelligence and Machine Learning", code: "AIML" },
  { id: 2, name: "Electronics & Communication", code: "ECE" },
  { id: 3, name: "Mechanical Engineering", code: "ME" },
  { id: 4, name: "Civil Engineering", code: "CE" },
  { id: 5, name: "Electrical Engineering", code: "EE" },
  { id: 6, name: "Business Administration", code: "MBA" },
  { id: 7, name: "Psychology", code: "PSY" },
  { id: 8, name: "Medicine", code: "MED" },
  { id: 9, name: "Law", code: "LAW" },
  { id: 10, name: "Arts & Humanities", code: "AH" },
];

export const filterCategories = [
  { id: 1, name: "Mental Health Issues", value: "mental_health" },
  { id: 2, name: "Academic Performance", value: "academic" },
  { id: 3, name: "Social Issues", value: "social" },
  { id: 4, name: "Family Problems", value: "family" },
  { id: 5, name: "Career Concerns", value: "career" },
  { id: 6, name: "Relationship Issues", value: "relationship" },
  { id: 7, name: "Financial Stress", value: "financial" },
  { id: 8, name: "Health Issues", value: "health" },
];

export const counsellors = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    specialization: "Anxiety & Depression",
    experience: "8 years",
    rating: 4.8,
    availableSlots: [
      { date: "2024-01-15", time: "10:00 AM", available: true },
      { date: "2024-01-15", time: "2:00 PM", available: true },
      { date: "2024-01-16", time: "11:00 AM", available: false },
      { date: "2024-01-16", time: "3:00 PM", available: true },
    ],
  },
  {
    id: 2,
    name: "Dr. Rajesh Kumar",
    specialization: "Academic Stress",
    experience: "6 years",
    rating: 4.6,
    availableSlots: [
      { date: "2024-01-15", time: "9:00 AM", available: true },
      { date: "2024-01-15", time: "1:00 PM", available: true },
      { date: "2024-01-17", time: "10:00 AM", available: true },
      { date: "2024-01-17", time: "4:00 PM", available: true },
    ],
  },
  {
    id: 3,
    name: "Dr. Anjali Mehta",
    specialization: "Relationship Issues",
    experience: "10 years",
    rating: 4.9,
    availableSlots: [
      { date: "2024-01-16", time: "2:00 PM", available: true },
      { date: "2024-01-18", time: "11:00 AM", available: true },
      { date: "2024-01-18", time: "3:00 PM", available: false },
    ],
  },
];

export const resources = [
  {
    id: 1,
    title: "Managing Exam Anxiety",
    type: "article",
    language: "English",
    duration: "5 min read",
    description: "Practical tips to overcome exam-related stress and anxiety",
  },
  {
    id: 2,
    title: "Breathing Techniques for Relaxation",
    type: "video",
    language: "English",
    duration: "8 min",
    description: "Guided breathing exercises to help you relax",
  },
  {
    id: 3,
    title: "Mindfulness Meditation",
    type: "audio",
    language: "Hindi",
    duration: "15 min",
    description: "निर्देशित ध्यान सत्र",
  },
  {
    id: 4,
    title: "Building Healthy Relationships",
    type: "article",
    language: "English",
    duration: "7 min read",
    description: "Tips for maintaining healthy relationships in college",
  },
  {
    id: 5,
    title: "Sleep Hygiene Tips",
    type: "video",
    language: "Kannada",
    duration: "6 min",
    description: "ನಿಮ್ಮ ನಿದ್ರೆಯ ಗುಣಮಟ್ಟವನ್ನು ಸುಧಾರಿಸುವ ವಿಧಾನಗಳು",
  },
  {
    id: 6,
    title: "Stress Management Techniques",
    type: "audio",
    language: "Kannada",
    duration: "12 min",
    description: "ದೈನಂದಿನ ಒತ್ತಡವನ್ನು ನಿರ್ವಹಿಸುವ ಆಡಿಯೋ ಮಾರ್ಗದರ್ಶಿ",
  },
  {
    id: 7,
    title: "Building Healthy Relationships",
    type: "article",
    category: "relationships",
    language: "Kannada",
    duration: "7 min read",
    description: "ಕಾಲೇಜಿನಲ್ಲಿ ಆರೋಗ್ಯಕರ ಸಂಬಂಧಗಳನ್ನು ಉಳಿಸುವ ಸಲಹೆಗಳು",
  },
  {
    id: 8,
    title: "Sleep Hygiene Tips",
    type: "video",
    category: "sleep",
    language: "Kannada",
    duration: "6 min",
    description: "ನಿಮ್ಮ ನಿದ್ರೆಯ ಗುಣಮಟ್ಟವನ್ನು ಸುಧಾರಿಸುವ ವಿಧಾನಗಳು",
  },
  {
    id: 9,
    title: "Stress Management Techniques",
    type: "audio",
    category: "stress",
    language: "Kannada",
    duration: "12 min",
    description: "ದೈನಂದಿನ ಒತ್ತಡವನ್ನು ನಿರ್ವಹಿಸುವ ಆಡಿಯೋ ಮಾರ್ಗದರ್ಶಿ",
  },
  {
    id: 10,
    title: "Managing Exam Anxiety",
    type: "article",
    category: "anxiety",
    language: "English",
    duration: "5 min read",
    description: "Practical tips to overcome exam-related stress and anxiety",
  },
  {
    id: 11,
    title: "Breathing Techniques for Relaxation",
    type: "video",
    category: "mindfulness",
    language: "English",
    duration: "8 min",
    description: "Guided breathing exercises to help you relax",
  },
  {
    id: 12,
    title: "Mindfulness Meditation",
    type: "audio",
    language: "Hindi",
    duration: "15 min",
    description: "निर्देशित ध्यान सत्र",
  },
  {
    id: 13,
    title: "Building Healthy Relationships",
    type: "article",
    language: "Hindi",
    duration: "7 min read",
    description: "कॉलेज में स्वस्थ संबंध बनाए रखने के सुझाव",
  },
  {
    id: 14,
    title: "Sleep Hygiene Tips",
    type: "video",
    language: "Bengali",
    duration: "6 min",
    description: "আপনার ঘুমের মান উন্নত করার উপায়",
  },
  {
    id: 15,
    title: "Stress Management Techniques",
    type: "audio",
    language: "Bengali",
    duration: "12 min",
    description: "দৈনন্দিন চাপ ব্যবস্থাপনার জন্য অডিও গাইড",
  },
  {
    id: 16,
    title: "Building Healthy Relationships",
    type: "article",
    language: "Bengali",
    duration: "7 min read",
    description: "কলেজে সুস্থ সম্পর্ক বজায় রাখার টিপস",
  },
  {
    id: 17,
    title: "Sleep Hygiene Tips",
    type: "video",
    language: "Bengali",
    duration: "6 min",
    description: "আপনার ঘুমের মান উন্নত করার উপায়",
  },
  {
    id: 18,
    title: "Stress Management Techniques",
    type: "audio",
    language: "Bengali",
    duration: "12 min",
    description: "দৈনন্দিন চাপ ব্যবস্থাপনার জন্য অডিও গাইড",
  },
  {
    id: 19,
    title: "Sleep Hygiene Tips",
    type: "video",
    language: "English",
    duration: "6 min",
    description: "How to improve your sleep quality",
  },
  {
    id: 20,
    title: "Stress Management Techniques",
    type: "audio",
    language: "English",
    duration: "12 min",
    description: "Audio guide for managing daily stress",
  },
];

export const forumPosts = [
  {
    id: 1,
    title: "Feeling overwhelmed with final exams",
    author: "Anonymous Student",
    content:
      "I have 5 exams next week and I'm feeling really stressed. Any advice?",
    replies: 8,
    timestamp: "2 hours ago",
    reported: false,
  },
  {
    id: 2,
    title: "Struggling with social anxiety",
    author: "Anonymous Student",
    content:
      "I find it hard to make friends in college. Anyone else facing this?",
    replies: 12,
    timestamp: "5 hours ago",
    reported: false,
  },
  {
    id: 3,
    title: "Family pressure about career choices",
    author: "Anonymous Student",
    content:
      "My parents want me to pursue engineering but I'm interested in arts. Need support.",
    replies: 15,
    timestamp: "1 day ago",
    reported: true,
  },
  {
    id: 4,
    title: "Tips for better time management",
    author: "Anonymous Student",
    content:
      "Sharing some techniques that helped me manage my study schedule better.",
    replies: 6,
    timestamp: "2 days ago",
    reported: false,
  },
];

export const phq9Questions = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling or staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself - or that you are a failure or have let yourself or your family down",
  "Trouble concentrating on things, such as reading the newspaper or watching television",
  "Moving or speaking so slowly that other people could have noticed, or the opposite - being so fidgety or restless that you have been moving around a lot more than usual",
  "Thoughts that you would be better off dead, or of hurting yourself",
];

export const gad7Questions = [
  "Feeling nervous, anxious, or on edge",
  "Not being able to stop or control worrying",
  "Worrying too much about different things",
  "Trouble relaxing",
  "Being so restless that it's hard to sit still",
  "Becoming easily annoyed or irritable",
  "Feeling afraid as if something awful might happen",
];

export const chatPersonalities = {
  clinical: {
    name: "Clinical Bot",
    description: "Professional clinical responses",
    responses: [
      "I hear your drive to improve. Encouraging and forward‑looking, with practical steps. Based on what you said about feeling low, what's one tiny step you could take today? I can help you plan it.",
      "I hear you. Stress can feel really heavy, and it's completely okay to acknowledge it. Sometimes, just sharing that you're feeling this way is the first step toward easing the weight a little. Stress often comes from carrying too many thoughts at once—work, studies, personal stuff, or even expectations you set for yourself. One thing that can help is slowing down for a moment. Try taking a few deep breaths—inhale slowly through your nose, hold it for a second, and exhale gently. This signals your body to calm down. You might also find it helpful to break things into smaller, more manageable steps instead of trying to handle everything at once.",
      "I understand you're going through a difficult time. It's important to remember that seeking help is a sign of strength.",
      "Your feelings are valid, and it's okay to not be okay sometimes. Have you tried any coping strategies?",
      "It sounds like you're dealing with a lot right now. Would you like to talk about what's been most challenging?",
      "I'm here to listen and support you. Sometimes just talking about what's on your mind can help.",
      "Based on your screening results, I'd recommend speaking with a professional counsellor. Would you like me to help you book an appointment?",
    ],
  },
  motivator: {
    name: "Motivator",
    description: "Encouraging and uplifting responses",
    responses: [
      "I hear your drive to improve. Encouraging and forward‑looking, with practical steps. Based on what you said about feeling low, what's one tiny step you could take today? I can help you plan it.",
      "I hear your drive to improve. Encouraging and forward‑looking, with practical steps. Based on what you said about feeling low, what's one tiny step you could take today? I can help you plan it.",
      "I hear your drive to improve. Encouraging and forward‑looking, with practical steps. Based on what you said about feeling low, what's one tiny step you could take today? I can help you plan it.",
      "I hear your drive to improve. Encouraging and forward‑looking, with practical steps. Based on what you said about feeling low, what's one tiny step you could take today? I can help you plan it.",
    ],
  },
  listener: {
    name: "Listener",
    description: "Empathetic and understanding responses",
    responses: [
      "I hear you, and I want you to know that your feelings are valid.",
      "It sounds like you're going through a really tough time. I'm here for you.",
      "Thank you for sharing this with me. It takes courage to open up.",
      "I can understand why you'd feel that way. That sounds really difficult.",
      "Your experience matters, and I'm glad you felt comfortable sharing it.",
    ],
  },
  chill: {
    name: "Chill Friend",
    description: "Casual and relaxed responses",
    responses: [
      "Hey, no worries! We all have those days. Want to talk about something else?",
      "Dude, that's totally normal. Don't stress about it too much.",
      "Yeah, I get it. Sometimes life just throws curveballs at us.",
      "No biggie! We can figure this out together, one step at a time.",
      "Honestly, that sounds pretty relatable. You're not alone in this.",
    ],
  },
};

export const analyticsData = {
  monthlyStats: {
    totalUsers: 1250,
    activeUsers: 890,
    sessionsCompleted: 2340,
    appointmentsBooked: 156,
  },
  commonIssues: [
    { issue: "Exam Anxiety", percentage: 40 },
    { issue: "Sleep Problems", percentage: 25 },
    { issue: "Social Anxiety", percentage: 20 },
    { issue: "Family Pressure", percentage: 15 },
  ],
  monthlyTrends: [
    { month: "Jan", users: 120, sessions: 180 },
    { month: "Feb", users: 135, sessions: 200 },
    { month: "Mar", users: 150, sessions: 220 },
    { month: "Apr", users: 165, sessions: 240 },
    { month: "May", users: 180, sessions: 260 },
    { month: "Jun", users: 195, sessions: 280 },
  ],
  academicYearBreakdown: [
    {
      year: "1st Year",
      users: 320,
      sessions: 450,
      issues: ["Exam Anxiety", "Homesickness", "Social Adjustment"],
    },
    {
      year: "2nd Year",
      users: 280,
      sessions: 380,
      issues: ["Academic Pressure", "Career Confusion", "Relationship Issues"],
    },
    {
      year: "3rd Year",
      users: 250,
      sessions: 350,
      issues: ["Placement Anxiety", "Academic Performance", "Future Planning"],
    },
    {
      year: "4th Year",
      users: 200,
      sessions: 280,
      issues: ["Job Search Stress", "Final Year Pressure", "Life Transition"],
    },
    {
      year: "PG",
      users: 150,
      sessions: 200,
      issues: ["Research Pressure", "Thesis Anxiety", "Career Decisions"],
    },
    {
      year: "PhD",
      users: 50,
      sessions: 80,
      issues: [
        "Research Stress",
        "Publication Pressure",
        "Academic Competition",
      ],
    },
  ],
  departmentBreakdown: [
    {
      department: "Computer Science",
      users: 180,
      sessions: 250,
      topIssues: ["Coding Stress", "Project Deadlines", "Technical Competency"],
    },
    {
      department: "Electronics & Communication",
      users: 160,
      sessions: 220,
      topIssues: ["Circuit Complexity", "Lab Pressure", "Technical Skills"],
    },
    {
      department: "Mechanical Engineering",
      users: 140,
      sessions: 190,
      topIssues: ["Design Projects", "Workshop Pressure", "Technical Drawing"],
    },
    {
      department: "Business Administration",
      users: 200,
      sessions: 280,
      topIssues: [
        "Case Study Pressure",
        "Presentation Anxiety",
        "Leadership Stress",
      ],
    },
    {
      department: "Psychology",
      users: 120,
      sessions: 160,
      topIssues: [
        "Research Methodology",
        "Clinical Practice",
        "Academic Writing",
      ],
    },
    {
      department: "Medicine",
      users: 100,
      sessions: 140,
      topIssues: ["Clinical Rotations", "Exam Pressure", "Patient Care Stress"],
    },
    {
      department: "Law",
      users: 80,
      sessions: 110,
      topIssues: ["Moot Court Pressure", "Legal Research", "Case Analysis"],
    },
    {
      department: "Arts & Humanities",
      users: 90,
      sessions: 120,
      topIssues: ["Creative Block", "Essay Writing", "Cultural Studies"],
    },
  ],
  categoryBreakdown: [
    { category: "Mental Health Issues", count: 450, percentage: 36 },
    { category: "Academic Performance", count: 320, percentage: 25.6 },
    { category: "Social Issues", count: 180, percentage: 14.4 },
    { category: "Family Problems", count: 150, percentage: 12 },
    { category: "Career Concerns", count: 100, percentage: 8 },
    { category: "Relationship Issues", count: 50, percentage: 4 },
  ],
};
