# Sahaara Backend

A comprehensive backend API for the Sahaara mental health support platform built with Node.js, Express.js, and MongoDB.

## 🚀 Features

- **🔐 User Authentication**: Secure JWT-based authentication for students and counsellors
- **💬 Chat System**: AI-powered chat sessions with different personality types
- **📅 Appointment Booking**: Schedule and manage counselling appointments
- **📚 Resource Hub**: Mental health resources, articles, and exercises
- **👥 Peer Support Forum**: Anonymous forum for peer support and discussions
- **🍽️ Meal Monitoring**: Track meals, mood, and wellness patterns
- **📖 Personal Journal**: Private journaling with mood tracking
- **👨‍💼 Admin Dashboard**: Administrative tools and analytics
- **👩‍⚕️ Counsellor Portal**: Professional counsellor management system
- **📊 Analytics**: Comprehensive analytics and reporting
- **🔔 Notification System**: Email and push notifications
- **🔒 Privacy & Security**: Data encryption and anonymization

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **express-validator** - Input validation
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logger

## ⚡ Quick Start

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd sahaara/backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:5000`

## 🔧 Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/sahaara

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this-in-production
JWT_EXPIRES_IN=24h
JWT_REFRESH_EXPIRES_IN=7d

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@sahaara.com

# Frontend URL
FRONTEND_URL=http://localhost:3000

# File Upload
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Security
BCRYPT_ROUNDS=12
SESSION_SECRET=your-session-secret-change-this-in-production
```

## 📡 API Endpoints

### 🔐 Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/counsellor/register` - Counsellor registration
- `POST /api/auth/counsellor/login` - Counsellor login
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - User logout
- `GET /api/auth/institutions` - Get institutions
- `GET /api/auth/departments/:institutionId` - Get departments

### 👤 Users

- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/change-password` - Change password
- `GET /api/users/wellness-profile` - Get wellness profile
- `PUT /api/users/wellness-profile` - Update wellness profile
- `POST /api/users/wellness-checkin` - Wellness check-in
- `GET /api/users/activity-summary` - Get activity summary
- `GET /api/users/statistics` - Get user statistics
- `DELETE /api/users/account` - Delete account

### 💬 Chat

- `POST /api/chat/sessions` - Create chat session
- `GET /api/chat/sessions` - Get user's chat sessions
- `GET /api/chat/sessions/:id` - Get specific chat session
- `POST /api/chat/sessions/:id/messages` - Send message
- `PUT /api/chat/sessions/:id/complete` - Complete chat session
- `PUT /api/chat/sessions/:id/flag` - Flag chat session
- `GET /api/chat/analytics` - Get chat analytics

### 📅 Appointments

- `GET /api/appointments` - Get user's appointments
- `POST /api/appointments` - Book appointment
- `GET /api/appointments/:id` - Get specific appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Cancel appointment
- `GET /api/appointments/stats/overview` - Get appointment statistics

### 📚 Resources

- `GET /api/resources` - Get resources
- `GET /api/resources/:id` - Get specific resource
- `POST /api/resources/:id/view` - Track resource view
- `POST /api/resources/:id/like` - Like/unlike resource
- `POST /api/resources/:id/rating` - Rate resource
- `POST /api/resources/:id/share` - Share resource
- `POST /api/resources/:id/complete` - Mark resource as completed
- `GET /api/resources/categories` - Get resource categories
- `GET /api/resources/tags` - Get resource tags
- `GET /api/resources/featured` - Get featured resources
- `GET /api/resources/recommendations/personalized` - Get personalized recommendations
- `GET /api/resources/search/advanced` - Advanced resource search

### 👩‍⚕️ Counsellors

- `GET /api/counsellors` - Get counsellors
- `GET /api/counsellors/:id` - Get specific counsellor
- `GET /api/counsellors/specializations` - Get specializations
- `POST /api/counsellors/:id/review` - Add counsellor review

### 👥 Forum

- `GET /api/forum/posts` - Get forum posts
- `POST /api/forum/posts` - Create forum post
- `GET /api/forum/posts/:id` - Get specific post
- `PUT /api/forum/posts/:id` - Update post
- `DELETE /api/forum/posts/:id` - Delete post
- `POST /api/forum/posts/:id/like` - Like/unlike post
- `POST /api/forum/posts/:id/reply` - Reply to post
- `GET /api/forum/categories` - Get forum categories
- `GET /api/forum/my/posts` - Get user's posts
- `GET /api/forum/my/replies` - Get user's replies

### 📖 Journal

- `GET /api/journal/entries` - Get journal entries
- `POST /api/journal/entries` - Create journal entry
- `GET /api/journal/entries/:id` - Get specific entry
- `PUT /api/journal/entries/:id` - Update entry
- `DELETE /api/journal/entries/:id` - Delete entry
- `GET /api/journal/analytics` - Get journal analytics

### 🍽️ Meal Monitoring

- `GET /api/meal-monitoring/entries` - Get meal entries
- `POST /api/meal-monitoring/entries` - Create meal entry
- `GET /api/meal-monitoring/entries/:id` - Get specific entry
- `PUT /api/meal-monitoring/entries/:id` - Update entry
- `DELETE /api/meal-monitoring/entries/:id` - Delete entry
- `GET /api/meal-monitoring/analytics` - Get meal analytics

## 🗄️ Database Models

### User

- Personal information (name, email, phone)
- Academic information (institution, department, year)
- Wellness profile (mood, energy, stress, sleep, social)
- Preferences and settings

### Counsellor

- Professional information (specialization, credentials, bio)
- Availability and working hours
- Ratings and reviews
- Verification status

### ChatSession

- User and session information
- Messages with timestamps
- Analytics and metadata
- Completion and flagging status

### Resource

- Content information (title, description, content)
- Categories and tags
- Engagement metrics (views, likes, ratings)
- Author and publication details

### Appointment

- User and counsellor information
- Date, time, and type
- Status and notes
- Feedback and ratings

### ForumPost

- Content and metadata
- Categories and tags
- Engagement metrics
- Replies and moderation

### JournalEntry

- Personal content and mood
- Tags and privacy settings
- Analytics and insights

### MealMonitoring

- Meal details and nutrition
- Mood and wellness tracking
- Analytics and patterns

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt with configurable rounds
- **Input Validation**: Comprehensive validation using express-validator
- **Rate Limiting**: Protection against abuse and brute force attacks
- **CORS Configuration**: Secure cross-origin resource sharing
- **Helmet Security**: Security headers and protection
- **Data Encryption**: Sensitive data encryption and anonymization
- **Access Control**: Role-based access control (RBAC)

## ❌ Error Handling

The API uses consistent error response format:

```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "details": "Additional error details"
  }
}
```

## 🚦 Rate Limiting

- **General API**: 100 requests per 15 minutes
- **Authentication**: 5 attempts per 15 minutes
- **Sensitive Operations**: 5 attempts per 15 minutes

## 🛠️ Development

### Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests
- `npm run lint` - Run ESLint

### Project Structure

```
backend/
├── config/          # Configuration files
├── controllers/     # Route controllers
├── middleware/      # Custom middleware
├── models/          # Database models
├── routes/          # API routes
├── services/        # Business logic services
├── utils/           # Utility functions
├── validators/      # Input validators
├── server.js        # Main server file
└── package.json     # Dependencies and scripts
```

## 🧪 Testing

Run the test suite:

```bash
npm test
```

## 🚀 Deployment

1. **Production Environment**

   ```bash
   NODE_ENV=production npm start
   ```

2. **Docker Deployment**

   ```bash
   docker build -t sahaara-backend .
   docker run -p 5000:5000 sahaara-backend
   ```

3. **Environment Variables**
   - Set all required environment variables
   - Use secure, production-ready values
   - Enable SSL/TLS in production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔑 Sample Credentials

### Test User

- **Email**: test@example.com
- **Password**: Test123!

### Test Counsellor

- **Email**: counsellor@example.com
- **Password**: Counsellor123!

## 📚 API Documentation

For detailed API documentation, visit:

- Swagger UI: `http://localhost:5000/api-docs`
- Postman Collection: Available in `/docs` folder

## 🎯 Demo Ready Features

The backend is fully configured for demonstration with:

✅ **Complete Authentication System**
✅ **User Management & Profiles**
✅ **AI Chat System with Multiple Personalities**
✅ **Appointment Booking System**
✅ **Resource Management & Recommendations**
✅ **Peer Support Forum**
✅ **Personal Journaling**
✅ **Meal Monitoring & Analytics**
✅ **Counsellor Management**
✅ **Comprehensive Analytics**
✅ **Security & Privacy Features**

Perfect for showcasing the full capabilities of the Sahaara platform! 🌟
