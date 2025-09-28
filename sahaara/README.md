# Sahaara - Mental Health Support Platform

A comprehensive mental health support platform designed for students, featuring AI-powered chat support, appointment booking, resource library, peer support forum, personal journaling, and meal monitoring.

## 🏗️ Project Structure

```
sahaara/
├── frontend/                 # React.js frontend application
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # React components organized by feature
│   │   │   ├── auth/        # Authentication components
│   │   │   ├── dashboard/   # Dashboard components
│   │   │   ├── chat/        # Chat system components
│   │   │   ├── appointments/ # Appointment booking components
│   │   │   ├── resources/   # Resource hub components
│   │   │   ├── forum/       # Peer support forum components
│   │   │   ├── journal/     # Personal journal components
│   │   │   ├── meal-monitoring/ # Meal monitoring components
│   │   │   ├── admin/       # Admin dashboard components
│   │   │   └── common/      # Shared/common components
│   │   ├── services/        # API services and external integrations
│   │   ├── utils/           # Utility functions and helpers
│   │   ├── constants/       # App-wide constants and configurations
│   │   ├── hooks/           # Custom React hooks
│   │   ├── pages/           # Page-level components
│   │   └── data/            # Mock data and static data
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── backend/                  # Node.js/Express.js backend API
│   ├── config/              # Configuration files
│   ├── models/              # Mongoose database models
│   ├── routes/              # API route handlers
│   ├── middleware/          # Express middleware
│   ├── controllers/         # Business logic controllers
│   ├── services/           # External service integrations
│   ├── utils/              # Utility functions
│   ├── validators/         # Input validation schemas
│   ├── package.json
│   ├── server.js
│   └── README.md
│
└── README.md               # This file
```

## 🚀 Features

### Core Features

- **User Authentication**: Secure login/registration with JWT tokens
- **AI Chat Support**: Multiple personality-based chat sessions
- **Appointment Booking**: Schedule sessions with professional counsellors
- **Resource Library**: Curated mental health resources and materials
- **Peer Support Forum**: Community-driven support and discussions
- **Personal Journal**: Private journaling with mood tracking
- **Meal Monitoring**: Track eating habits and nutritional wellness
- **Admin Dashboard**: Comprehensive admin and counsellor portals

### Technical Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Real-time Updates**: WebSocket support for live chat
- **Data Privacy**: End-to-end encryption and anonymization
- **Analytics**: Comprehensive user analytics and insights
- **Notifications**: Email and in-app notification system
- **Search & Filtering**: Advanced search across all content types

## 🛠️ Technology Stack

### Frontend

- **React.js** - UI framework
- **Tailwind CSS** - Styling framework
- **Axios** - HTTP client
- **React Router** - Client-side routing
- **Context API** - State management

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Nodemailer** - Email service
- **express-validator** - Input validation

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd sahaara
```

### 2. Backend Setup

```bash
cd backend
npm install
cp env.example .env
# Edit .env with your configuration
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

### 4. Environment Variables

#### Backend (.env)

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/sahaara
JWT_SECRET=your-jwt-secret
JWT_REFRESH_SECRET=your-refresh-secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
FRONTEND_URL=http://localhost:3000
```

#### Frontend (.env)

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_APP_NAME=Sahaara
```

## 🎯 API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh token
- `POST /api/auth/logout` - User logout

### Chat System

- `POST /api/chat/sessions` - Create chat session
- `GET /api/chat/sessions` - Get user sessions
- `POST /api/chat/sessions/:id/messages` - Send message

### Appointments

- `POST /api/appointments` - Book appointment
- `GET /api/appointments/my-appointments` - Get user appointments
- `PATCH /api/appointments/:id/confirm` - Confirm appointment

### Resources

- `GET /api/resources` - Get resources
- `GET /api/resources/:id` - Get specific resource
- `PATCH /api/resources/:id/like` - Like resource

### Forum

- `GET /api/forum/posts` - Get forum posts
- `POST /api/forum/posts` - Create post
- `POST /api/forum/posts/:id/replies` - Reply to post

### Journal

- `GET /api/journal/entries` - Get journal entries
- `POST /api/journal/entries` - Create entry
- `GET /api/journal/analytics` - Get analytics

### Meal Monitoring

- `GET /api/meal-monitoring/entries` - Get meal entries
- `POST /api/meal-monitoring/entries` - Create entry
- `GET /api/meal-monitoring/analytics` - Get analytics

## 🧪 Testing

### Backend Tests

```bash
cd backend
npm test
```

### Frontend Tests

```bash
cd frontend
npm test
```

## 📊 Database Schema

### Key Models

- **User**: Student profiles and authentication
- **Counsellor**: Professional counsellor profiles
- **ChatSession**: AI chat interactions
- **Appointment**: Counselling appointments
- **Resource**: Mental health resources
- **ForumPost**: Community discussions
- **JournalEntry**: Personal journal entries
- **MealMonitoring**: Meal tracking data

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- Rate limiting
- CORS configuration
- Data encryption for sensitive information
- Anonymization for privacy protection

## 📱 Mobile Responsiveness

The application is fully responsive and optimized for:

- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🗺️ Roadmap

### Phase 1 (Current)

- ✅ Core authentication system
- ✅ Basic chat functionality
- ✅ Appointment booking
- ✅ Resource library
- ✅ Forum system
- ✅ Journal and meal monitoring

### Phase 2 (Planned)

- 🔄 Advanced AI chat personalities
- 🔄 Video call integration
- 🔄 Mobile app development
- 🔄 Advanced analytics dashboard
- 🔄 Integration with external services

### Phase 3 (Future)

- 📋 Machine learning recommendations
- 📋 Advanced privacy features
- 📋 Multi-language support
- 📋 Advanced reporting system

---

**Sahaara** - Empowering mental wellness through technology 🌟
