# Sahaara Backend - Clean Implementation

A comprehensive backend implementation for Sahaara, a student mental health support platform. This clean backend provides all the necessary APIs and services to support the frontend application.

## 🚀 Features

### Core Features

- **User Authentication & Management**

  - User registration and login
  - Email verification
  - Password reset functionality
  - JWT-based authentication
  - User profile management

- **Counsellor Management**

  - Counsellor registration and verification
  - Professional profile management
  - Availability and scheduling

- **AI Chat System**

  - Multiple personality types (Motivator, Listener, Chill)
  - Mental health screening tools (PHQ-9, GAD-7)
  - Conversation history and analytics
  - Risk assessment and flagging

- **Appointment Booking**

  - Real-time availability checking
  - Appointment scheduling and management
  - Payment integration
  - Rescheduling and cancellation

- **Resource Hub**

  - Articles, videos, and audio content
  - Multi-language support
  - Content categorization and tagging
  - User engagement tracking

- **Peer Support Forum**

  - Anonymous posting and replies
  - Content moderation
  - Community guidelines enforcement
  - Topic categorization

- **Personal Journal**

  - Private journaling with mood tracking
  - Wellness metrics monitoring
  - Goal setting and tracking
  - Gratitude logging

- **Meal Monitoring**

  - Food intake tracking
  - Nutritional analysis
  - Eating behavior assessment
  - Wellness correlation

- **Analytics & Reporting**

  - User engagement metrics
  - Wellness trend analysis
  - Platform usage statistics
  - Risk assessment reports

- **Admin Dashboard**
  - User management
  - Content moderation
  - System analytics
  - Counsellor verification

## 🏗️ Architecture

### Project Structure

```
backend-clean/
├── config/           # Database and app configuration
├── controllers/      # Route controllers
├── middleware/       # Custom middleware
├── models/          # MongoDB models
├── routes/          # API routes
├── services/        # Business logic services
├── utils/           # Utility functions
├── validators/      # Input validation
├── server.js        # Main application file
└── package.json     # Dependencies
```

### Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Email**: Nodemailer
- **Security**: Helmet, CORS, Rate Limiting
- **Validation**: Express-validator
- **File Upload**: Multer

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd sahaara/backend-clean
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   ```bash
   cp env.example .env
   ```

   Update the `.env` file with your configuration:

   ```env
   # Database Configuration
   MONGODB_URI=mongodb://localhost:27017/sahaara
   MONGODB_TEST_URI=mongodb://localhost:27017/sahaara_test

   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRE=7d
   JWT_REFRESH_SECRET=your-refresh-secret-key-here
   JWT_REFRESH_EXPIRE=30d

   # Email Configuration
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password

   # AI Chat Configuration
   OPENAI_API_KEY=your-openai-api-key-here

   # Privacy & Security
   ENCRYPTION_KEY=your-32-character-encryption-key
   ANONYMIZATION_ENABLED=true
   ```

4. **Start the server**

   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

## 📚 API Documentation

### Authentication Endpoints

#### User Registration

```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securePassword123",
  "firstName": "John",
  "lastName": "Doe",
  "dateOfBirth": "2000-01-01",
  "gender": "male",
  "institution": "institution_id",
  "department": "department_id",
  "academicYear": "3rd",
  "studentId": "STU123456"
}
```

#### User Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Password Reset

```http
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "john@example.com"
}
```

### User Management Endpoints

#### Get User Profile

```http
GET /api/users/profile
Authorization: Bearer <token>
```

#### Update Profile

```http
PUT /api/users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "+1234567890",
  "preferences": {
    "theme": "mother",
    "language": "en",
    "notifications": {
      "email": true,
      "push": true,
      "sms": false
    }
  }
}
```

#### Wellness Check-in

```http
POST /api/users/wellness-checkin
Authorization: Bearer <token>
Content-Type: application/json

{
  "mood": "happy",
  "energy": 8,
  "stress": 3,
  "sleep": 7,
  "social": 6,
  "academic": 7,
  "physical": 8,
  "notes": "Feeling good today!"
}
```

### Chat System Endpoints

#### Start Chat Session

```http
POST /api/chat/sessions
Authorization: Bearer <token>
Content-Type: application/json

{
  "personality": "listener",
  "title": "Daily Check-in"
}
```

#### Send Message

```http
POST /api/chat/sessions/:sessionId/messages
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "I'm feeling anxious about my exams",
  "personality": "listener"
}
```

#### Complete Screening

```http
POST /api/chat/sessions/:sessionId/screening
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "phq9",
  "answers": [
    {"question": "Little interest or pleasure in doing things", "answer": 2},
    {"question": "Feeling down, depressed, or hopeless", "answer": 1}
  ]
}
```

### Appointment Endpoints

#### Book Appointment

```http
POST /api/appointments
Authorization: Bearer <token>
Content-Type: application/json

{
  "counsellorId": "counsellor_id",
  "date": "2024-01-15",
  "time": "10:00",
  "type": "individual",
  "mode": "online"
}
```

#### Get Appointments

```http
GET /api/appointments
Authorization: Bearer <token>
```

#### Cancel Appointment

```http
PUT /api/appointments/:appointmentId/cancel
Authorization: Bearer <token>
Content-Type: application/json

{
  "reason": "Schedule conflict"
}
```

### Resource Endpoints

#### Get Resources

```http
GET /api/resources?category=mental_health&type=article&limit=10&page=1
Authorization: Bearer <token>
```

#### Get Resource Details

```http
GET /api/resources/:resourceId
Authorization: Bearer <token>
```

#### Rate Resource

```http
POST /api/resources/:resourceId/rate
Authorization: Bearer <token>
Content-Type: application/json

{
  "rating": 5,
  "feedback": "Very helpful article!"
}
```

### Forum Endpoints

#### Create Post

```http
POST /api/forum/posts
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Feeling overwhelmed with studies",
  "content": "I have multiple assignments due and I'm feeling stressed...",
  "category": "academic_performance",
  "tags": ["stress", "academic"],
  "privacy": {
    "isAnonymous": true
  }
}
```

#### Get Posts

```http
GET /api/forum/posts?category=mental_health&limit=20&page=1
Authorization: Bearer <token>
```

#### Reply to Post

```http
POST /api/forum/posts/:postId/replies
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "I understand how you feel. Have you tried breaking down your tasks into smaller chunks?"
}
```

### Journal Endpoints

#### Create Journal Entry

```http
POST /api/journal/entries
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Reflecting on today",
  "content": "Today was a productive day...",
  "mood": "happy",
  "emotions": ["grateful", "motivated"],
  "wellnessMetrics": {
    "energy": 8,
    "stress": 3,
    "sleep": 7
  },
  "category": "daily_reflection"
}
```

#### Get Journal Entries

```http
GET /api/journal/entries?startDate=2024-01-01&endDate=2024-01-31
Authorization: Bearer <token>
```

### Meal Monitoring Endpoints

#### Log Meal

```http
POST /api/meal-monitoring/entries
Authorization: Bearer <token>
Content-Type: application/json

{
  "mealType": "lunch",
  "mealTime": "2024-01-15T12:00:00Z",
  "mealQuality": "good",
  "portionSize": "appropriate",
  "foodItems": [
    {
      "name": "Grilled Chicken",
      "quantity": "150g",
      "calories": 250,
      "category": "protein"
    }
  ],
  "context": {
    "location": "cafeteria",
    "company": "friends",
    "mood": "happy",
    "hungerLevel": 7
  }
}
```

#### Get Meal Summary

```http
GET /api/meal-monitoring/summary?date=2024-01-15
Authorization: Bearer <token>
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Rate Limiting**: Protection against brute force attacks
- **Input Validation**: Comprehensive request validation
- **CORS Protection**: Cross-origin request security
- **Helmet Security**: HTTP header security
- **Data Encryption**: Sensitive data encryption
- **Anonymization**: User data anonymization for privacy

## 📊 Database Models

### Core Models

- **User**: Student user profiles and preferences
- **Counsellor**: Professional counsellor profiles
- **Institution**: Educational institutions
- **Department**: Academic departments
- **ChatSession**: AI chat conversations
- **Appointment**: Counselling appointments
- **Resource**: Educational content
- **ForumPost**: Community discussions
- **JournalEntry**: Personal journal entries
- **MealMonitoring**: Meal tracking data

### Key Features

- **Indexing**: Optimized database queries
- **Validation**: Data integrity enforcement
- **Relationships**: Proper model associations
- **Virtual Fields**: Computed properties
- **Middleware**: Pre/post processing hooks
- **Methods**: Custom model methods

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- --grep "User Authentication"
```

## 🚀 Deployment

### Production Setup

1. **Environment Configuration**

   ```bash
   NODE_ENV=production
   MONGODB_URI=mongodb://your-production-db
   JWT_SECRET=your-production-secret
   ```

2. **Build and Start**

   ```bash
   npm install --production
   npm start
   ```

3. **Process Management**
   ```bash
   # Using PM2
   npm install -g pm2
   pm2 start server.js --name sahaara-backend
   pm2 startup
   pm2 save
   ```

### Docker Deployment

```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 📈 Monitoring & Analytics

- **Health Checks**: `/health` endpoint for monitoring
- **Error Logging**: Comprehensive error tracking
- **Performance Metrics**: Response time monitoring
- **User Analytics**: Engagement and usage tracking
- **Wellness Trends**: Mental health pattern analysis

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔄 Version History

- **v1.0.0**: Initial clean backend implementation
  - Complete authentication system
  - All core features implemented
  - Comprehensive API documentation
  - Security and privacy features

---

**Sahaara Backend** - Empowering student mental health through technology.
