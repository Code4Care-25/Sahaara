# Sahaara - Digital Mental Health Support System

A comprehensive prototype web application designed to provide mental health support for students in higher education. Built with React and TailwindCSS, featuring AI-powered chatbots, appointment booking, peer support forums, and more.

## 🌟 Features

### 🎯 Core Functionality

1. **Multi-Role Authentication**

   - Student login with college selection
   - Counsellor dashboard for appointment management
   - Admin dashboard with analytics and system monitoring
   - Guest access for Chat Buddy (no login required)

2. **AI-Powered Chat Support**

   - **Clinical Chatbot**: Professional mental health support with PHQ-9/GAD-7 screening
   - **Friendly Chat Buddy**: Casual support with multiple personality options
   - Real-time chat interface with message history
   - Screening questionnaires with scoring and recommendations

3. **Appointment Booking System**

   - Browse available counsellors with specializations
   - View real-time availability slots
   - Priority-based booking system
   - Ticket ID generation and tracking

4. **Resource Hub**

   - Educational articles, videos, and audio content
   - Multilingual support (English, Hindi, Tamil)
   - Filterable content by type and language
   - Featured collections and special content

5. **Peer Support Forum**

   - Anonymous discussion board
   - Community guidelines and moderation
   - Reply and support features
   - Report system for inappropriate content

6. **Personal Journal**

   - Private journaling with mood tracking
   - Tag-based organization
   - Local storage persistence
   - Statistics and insights

7. **Counsellor Dashboard**

   - Pending appointment management
   - Session notes and follow-up tracking
   - Student information (anonymized)
   - Approval/rejection workflow

8. **Admin Analytics Dashboard**
   - User engagement metrics
   - Mental health issue distribution
   - System health monitoring
   - Future predictions using mock Prophet forecasting
   - Interactive charts and visualizations

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd sahaara
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 🏗️ Project Structure

```
sahaara/
├── public/
├── src/
│   ├── components/
│   │   ├── Login.js                 # Multi-role authentication
│   │   ├── Dashboard.js             # Main student dashboard
│   │   ├── ChatPage.js              # AI chatbot interface
│   │   ├── AppointmentBooking.js    # Counsellor booking system
│   │   ├── ResourceHub.js           # Educational content hub
│   │   ├── PeerSupportForum.js      # Community discussion board
│   │   ├── PersonalJournal.js       # Private journaling
│   │   ├── CounsellorPage.js        # Counsellor management
│   │   └── AdminDashboard.js        # Analytics and monitoring
│   ├── data/
│   │   └── mockData.js              # Mock data and configurations
│   ├── App.js                       # Main app component with routing
│   └── index.js                     # Entry point
├── tailwind.config.js               # TailwindCSS configuration
└── package.json
```

## 🎨 Design Features

- **Modern UI/UX**: Clean, student-friendly interface with TailwindCSS
- **Mobile Responsive**: Optimized for all device sizes
- **Accessibility**: High contrast, keyboard navigation support
- **Intuitive Navigation**: Clear information architecture
- **Visual Feedback**: Loading states, hover effects, and transitions

## 🔧 Technical Stack

- **Frontend**: React 19.1.1
- **Styling**: TailwindCSS 4.1.13
- **Routing**: React Router DOM 7.8.2
- **Charts**: Recharts 3.2.0
- **Icons**: Lucide React 0.543.0
- **Build Tool**: Create React App

## 📱 User Flows

### Student Journey

1. **Login** → Select college and enter credentials
2. **Dashboard** → Choose from 5 main features
3. **Chat Support** → Get immediate AI assistance or friendly chat
4. **Book Appointment** → Schedule with professional counsellors
5. **Access Resources** → Learn from educational content
6. **Join Forum** → Connect with peer community
7. **Journal** → Track personal mental health journey

### Counsellor Workflow

1. **Login** → Access counsellor dashboard
2. **Review Appointments** → Approve/reject student requests
3. **Manage Sessions** → Add notes and follow-up actions
4. **Track Progress** → Monitor student engagement

### Admin Monitoring

1. **Login** → Access admin dashboard
2. **View Analytics** → Monitor system usage and trends
3. **System Health** → Check server and service status
4. **Predictions** → Review future trend forecasts

## 🎯 Key Features in Detail

### AI Chatbot System

- **PHQ-9 Screening**: 9-question depression assessment
- **GAD-7 Screening**: 7-question anxiety assessment
- **Scoring Algorithm**: Automatic severity classification
- **Personality Options**: Motivator, Listener, Chill Friend
- **Contextual Responses**: Personalized based on screening results

### Appointment Management

- **Real-time Availability**: Live slot checking
- **Priority System**: High/Medium/Low urgency levels
- **Ticket Generation**: Unique ID for tracking
- **Counsellor Profiles**: Specializations and ratings

### Resource Management

- **Content Types**: Articles, videos, audio files
- **Language Support**: Multiple regional languages
- **Search & Filter**: Advanced content discovery
- **Featured Collections**: Curated content themes

### Community Features

- **Anonymous Posting**: Privacy-focused discussions
- **Moderation Tools**: Report and flag system
- **Community Guidelines**: Clear usage policies
- **Support Features**: Like and reply functionality

## 🔒 Privacy & Security

- **Anonymous Data**: No personal information stored
- **Local Storage**: Journal entries stored locally
- **Mock Authentication**: Demo login system
- **Data Protection**: No real backend integration

## 🚀 Future Enhancements

- **Voice Integration**: Voice-enabled chatbot
- **Real Backend**: Database and API integration
- **Push Notifications**: Appointment reminders
- **Video Calls**: Integrated counselling sessions
- **Mobile App**: Native mobile application
- **AI Improvements**: More sophisticated chatbot responses

## 📊 Demo Data

The application includes comprehensive mock data:

- 8 universities for college selection
- 3 counsellors with different specializations
- 6 educational resources in multiple languages
- 4 forum discussion topics
- Sample journal entries
- Analytics data with charts and trends

## 🎨 Customization

### Styling

- Modify `tailwind.config.js` for theme customization
- Update color schemes in component files
- Responsive breakpoints can be adjusted

### Content

- Edit `src/data/mockData.js` for content updates
- Add new counsellors, resources, or forum topics
- Modify screening questions or chatbot responses

## 🤝 Contributing

This is a prototype application for demonstration purposes. For production use:

1. Implement proper backend integration
2. Add real authentication system
3. Integrate with actual counselling services
4. Add comprehensive testing
5. Implement proper data security measures

## 📄 License

This project is created for educational and demonstration purposes.

## 🙏 Acknowledgments

- Mental health screening tools (PHQ-9, GAD-7)
- Modern web development best practices
- Accessibility guidelines and standards
- Student mental health research and resources

---

**Note**: This is a prototype application designed for presentation and demonstration purposes. It uses mock data and simulated functionality. For production use, proper backend integration, real authentication, and professional mental health services would be required.
