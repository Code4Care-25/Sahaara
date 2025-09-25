# Sahaara Meal Monitoring System

A privacy-focused meal attendance monitoring system designed to provide gentle, supportive check-ins for students showing concerning eating patterns. Built with Node.js, MongoDB, and JWT tokens.

## 🎯 Core Principles

- **Caring Support, Not Surveillance**: The system is designed to help, not monitor
- **Privacy First**: All data is anonymized and tokenized
- **User Control**: Students can opt out and control their data
- **Gentle Approach**: Supportive messages, not intrusive alerts

## 🏗️ Architecture

### Backend Components

- **Anonymization Service**: Tokenizes student data for privacy
- **Pattern Detection**: Analyzes meal patterns for anomalies
- **Check-in Service**: Sends gentle, supportive messages
- **Privacy Controls**: Opt-out and data expiration features

### Data Flow

1. **College System** → Sends anonymized meal data
2. **Tokenization** → Student identity is protected
3. **Pattern Analysis** → Detects unusual skipping patterns
4. **Gentle Check-ins** → Sends supportive messages
5. **User Response** → Handles student feedback

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Installation

1. **Clone and setup**:

```bash
cd backend
npm install
```

2. **Environment setup**:

```bash
cp .env.example .env
# Edit .env with your configuration
```

3. **Start the server**:

```bash
# Development
npm run dev

# Production
npm start
```

## 📊 API Endpoints

### Meal Attendance

- `POST /api/meal-attendance` - Receive single meal record
- `POST /api/meal-attendance/batch` - Receive batch meal records
- `GET /api/meal-attendance/:anonymizedId/patterns` - Get pattern analysis
- `PUT /api/meal-attendance/:anonymizedId/privacy` - Update privacy settings
- `POST /api/meal-attendance/:anonymizedId/check-in/:checkInId/response` - Handle check-in response

### System

- `GET /health` - Health check
- `GET /privacy` - Privacy policy

## 🔒 Privacy Features

### Anonymization

- Student IDs are tokenized using HMAC-SHA256
- No personal information is stored
- College tokens rotate daily

### Data Protection

- Automatic data expiration (default: 90 days)
- User-controlled retention periods
- Opt-out functionality
- Encrypted data transmission

### User Rights

- Right to opt out
- Right to data access
- Right to data deletion
- Right to modify preferences

## 🧠 Pattern Detection

### Anomaly Types

- **Consecutive Misses**: 3+ meals missed in a row
- **Frequency Drop**: 30%+ decrease in attendance
- **Pattern Change**: Significant deviation from baseline
- **Meal Type Patterns**: Changes in meal preferences

### Scoring System

- Scores range from 0.0 to 1.0
- Threshold: 0.7 (configurable)
- Multiple analysis algorithms
- Baseline comparison over 30 days

## 💬 Check-in System

### Message Types

- **Meal Concern**: For eating pattern issues
- **Wellness Check**: General wellbeing check
- **Support Offer**: Resource and support availability

### Tones

- **Gentle**: High concern (score ≥ 0.8)
- **Supportive**: Medium concern (score ≥ 0.6)
- **Encouraging**: Low concern (score < 0.6)

### Cooldown System

- Default: 24 hours between check-ins
- Extended for "doing fine" responses
- Shorter for "needs help" follow-ups

## 🔧 Configuration

### Environment Variables

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/sahaara_meal_monitoring

# Security
JWT_SECRET=your-super-secret-jwt-key
ANONYMIZATION_KEY=your-anonymization-key-32-chars-long
TOKENIZATION_SALT=your-tokenization-salt-16-chars

# College Integration
COLLEGE_API_BASE_URL=https://college-api.example.com
COLLEGE_API_KEY=your-college-api-key

# System Settings
CHECK_IN_COOLDOWN_HOURS=24
DATA_RETENTION_DAYS=90
PATTERN_DETECTION_THRESHOLD=0.7
```

## 🧪 Testing

```bash
# Run tests
npm test

# Test with sample data
curl -X POST http://localhost:5000/api/meal-attendance \
  -H "Content-Type: application/json" \
  -d '{
    "collegeToken": "sample-token",
    "collegeId": "student123",
    "mealData": {
      "date": "2024-01-15",
      "mealType": "lunch",
      "attended": false
    },
    "source": {
      "collegeSystem": "college-cafeteria-system"
    }
  }'
```

## 📈 Monitoring

### Health Checks

- Database connectivity
- API response times
- Error rates
- Pattern detection accuracy

### Privacy Metrics

- Opt-out rates
- Data retention compliance
- Anonymization effectiveness
- User consent tracking

## 🛡️ Security

### Data Protection

- HTTPS/TLS encryption
- Rate limiting
- Input validation
- SQL injection prevention
- XSS protection

### Access Control

- JWT token authentication
- Role-based permissions
- Audit logging
- Secure headers

## 🤝 Integration

### College Systems

The system integrates with college meal attendance systems through secure APIs:

```javascript
// Example college system integration
const collegeData = {
  collegeToken: "generated-token",
  collegeId: "student-id",
  mealData: {
    date: "2024-01-15",
    mealType: "lunch",
    attended: false,
    timestamp: "2024-01-15T12:30:00Z",
  },
  source: {
    collegeSystem: "college-cafeteria-system",
    syncTimestamp: "2024-01-15T12:35:00Z",
  },
};
```

### Frontend Integration

The system provides APIs for frontend applications to:

- Display privacy controls
- Show check-in history
- Manage user preferences
- Handle responses

## 📋 Compliance

### Privacy Regulations

- GDPR compliant
- FERPA compliant
- COPPA compliant
- Institution-specific policies

### Data Handling

- Minimal data collection
- Purpose limitation
- Data minimization
- Storage limitation

## 🚨 Ethical Considerations

### Design Philosophy

- **Support over Surveillance**: Focus on helping, not monitoring
- **Transparency**: Clear communication about data use
- **User Agency**: Students control their data and participation
- **Non-intrusive**: Gentle, supportive approach

### Risk Mitigation

- Regular privacy audits
- User feedback integration
- Ethical review processes
- Continuous improvement

## 📞 Support

For questions, concerns, or support:

- **Email**: privacy@sahaara.com
- **Phone**: +1-800-SAHAARA
- **Documentation**: [API Docs](https://docs.sahaara.com)
- **Privacy**: [Privacy Policy](https://sahaara.com/privacy)

---

**Remember**: This system is designed to care for students, not surveil them. Every feature is built with privacy, consent, and student wellbeing in mind. 💙
