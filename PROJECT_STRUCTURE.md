# Sahaara Project Structure

## 📁 Clean & Organized Structure

```
Sahaara/
├── 📁 frontend/                    # React.js Frontend Application
│   ├── 📁 public/                  # Static assets
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── 📁 logos/               # Logo files
│   ├── 📁 src/                     # Source code
│   │   ├── 📁 components/          # React components (organized by feature)
│   │   │   ├── 📁 auth/            # Authentication components
│   │   │   │   ├── Login.js
│   │   │   │   └── InstitutionSelection.js
│   │   │   ├── 📁 dashboard/        # Dashboard components
│   │   │   │   └── Dashboard.js
│   │   │   ├── 📁 chat/            # Chat system components
│   │   │   │   └── ChatPage.js
│   │   │   ├── 📁 appointments/    # Appointment booking components
│   │   │   │   └── AppointmentBooking.js
│   │   │   ├── 📁 resources/        # Resource hub components
│   │   │   │   └── ResourceHub.js
│   │   │   ├── 📁 forum/           # Peer support forum components
│   │   │   │   └── PeerSupportForum.js
│   │   │   ├── 📁 journal/         # Personal journal components
│   │   │   │   └── PersonalJournal.js
│   │   │   ├── 📁 meal-monitoring/ # Meal monitoring components
│   │   │   │   ├── MealMonitoring.js
│   │   │   │   ├── MealMonitoringCharacter.js
│   │   │   │   └── MealCharacterDemo.js
│   │   │   ├── 📁 admin/           # Admin dashboard components
│   │   │   │   ├── AdminDashboard.js
│   │   │   │   └── CounsellorPage.js
│   │   │   ├── 📁 common/          # Shared/common components
│   │   │   │   └── themeselection.js
│   │   │   └── index.js            # Component exports
│   │   ├── 📁 services/            # API services and external integrations
│   │   │   └── api.js              # Centralized API service
│   │   ├── 📁 utils/               # Utility functions and helpers
│   │   │   └── index.js            # Utility functions
│   │   ├── 📁 constants/           # App-wide constants and configurations
│   │   │   └── index.js            # App constants
│   │   ├── 📁 hooks/               # Custom React hooks
│   │   ├── 📁 pages/               # Page-level components
│   │   ├── 📁 assets/              # Static assets
│   │   │   ├── 📁 images/          # Image files
│   │   │   └── 📁 icons/           # Icon files
│   │   ├── 📁 data/                # Mock data and static data
│   │   │   └── mockData.js
│   │   ├── App.js                  # Main App component
│   │   ├── App.css                 # App styles
│   │   ├── App.test.js             # App tests
│   │   ├── index.js                # Entry point
│   │   ├── index.css               # Global styles
│   │   └── logo.svg                # App logo
│   ├── package.json                # Frontend dependencies
│   ├── package-lock.json           # Dependency lock file
│   ├── tailwind.config.js          # Tailwind CSS configuration
│   └── postcss.config.js           # PostCSS configuration
│
├── 📁 backend/                     # Node.js/Express.js Backend API
│   ├── 📁 config/                  # Configuration files
│   │   └── database.js             # MongoDB connection setup
│   ├── 📁 models/                  # Mongoose database models
│   │   ├── User.js                 # User/Student model
│   │   ├── Counsellor.js           # Counsellor model
│   │   ├── Institution.js           # Institution model
│   │   ├── Department.js           # Department model
│   │   ├── ChatSession.js          # Chat session model
│   │   ├── Appointment.js          # Appointment model
│   │   ├── Resource.js             # Resource model
│   │   ├── ForumPost.js            # Forum post model
│   │   ├── JournalEntry.js         # Journal entry model
│   │   └── MealMonitoring.js       # Meal monitoring model
│   ├── 📁 routes/                  # API route handlers
│   │   ├── auth.js                 # Authentication routes
│   │   ├── users.js                # User management routes
│   │   ├── chat.js                 # Chat system routes
│   │   ├── appointments.js         # Appointment routes
│   │   └── resources.js            # Resource routes
│   ├── 📁 middleware/              # Express middleware
│   │   ├── auth.js                 # Authentication middleware
│   │   ├── errorHandler.js         # Error handling middleware
│   │   └── validation.js           # Input validation middleware
│   ├── 📁 controllers/             # Business logic controllers
│   ├── 📁 services/                # External service integrations
│   ├── 📁 utils/                   # Utility functions
│   │   ├── encryption.js            # Data encryption utilities
│   │   ├── emailService.js         # Email service
│   │   └── seedData.js             # Database seeding
│   ├── 📁 validators/              # Input validation schemas
│   ├── package.json                # Backend dependencies
│   ├── server.js                   # Main server file
│   ├── env.example                 # Environment variables template
│   └── README.md                   # Backend documentation
│
├── README.md                       # Main project documentation
├── INTEGRATION_GUIDE.md            # Integration guide
└── PROJECT_STRUCTURE.md            # This file
```

## 🎯 Key Benefits of This Structure

### ✅ **Clean Separation**

- **Frontend** and **Backend** are completely separated
- No confusion between client and server code
- Easy to deploy independently

### ✅ **Feature-Based Organization**

- Components organized by feature (auth, chat, appointments, etc.)
- Related files grouped together
- Easy to find and maintain specific features

### ✅ **Scalable Architecture**

- Clear separation of concerns
- Modular design allows easy addition of new features
- Consistent patterns across the application

### ✅ **Developer-Friendly**

- Intuitive folder structure
- Clear naming conventions
- Comprehensive documentation

### ✅ **Production-Ready**

- Proper configuration management
- Environment-specific settings
- Security best practices

## 🚀 Quick Start Commands

### Frontend Development

```bash
cd frontend
npm install
npm start
```

### Backend Development

```bash
cd backend
npm install
cp env.example .env
# Edit .env with your configuration
npm run dev
```

## 📋 File Organization Principles

1. **Feature-Based Grouping**: Related functionality grouped together
2. **Clear Naming**: Descriptive file and folder names
3. **Consistent Structure**: Same patterns across features
4. **Separation of Concerns**: Clear boundaries between different layers
5. **Documentation**: Comprehensive README files for each major section

## 🔧 Maintenance Guidelines

- **Add new features** in their respective folders
- **Keep components small** and focused on single responsibility
- **Use index.js files** for clean imports
- **Follow naming conventions** consistently
- **Update documentation** when adding new features

---

**This structure provides a clean, maintainable, and scalable foundation for the Sahaara mental health platform.** 🌟
