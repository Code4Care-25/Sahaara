# Sahaara Meal Monitoring Integration Guide

## 🎯 Overview

The Sahaara Meal Monitoring system is a privacy-focused solution that provides gentle, supportive check-ins for students showing concerning eating patterns. This guide covers integration with college systems and frontend applications.

## 🏗️ System Architecture

```
College System → API Gateway → Anonymization → Pattern Detection → Check-in Service → Frontend
     ↓              ↓              ↓              ↓              ↓           ↓
  Meal Data    Tokenization   Privacy Safe   Anomaly Detection  Gentle Messages  User Interface
```

## 🔧 Backend Integration

### 1. College System Integration

#### API Endpoint

```
POST /api/meal-attendance
```

#### Request Format

```json
{
  "collegeToken": "generated-token",
  "collegeId": "student-id",
  "mealData": {
    "date": "2024-01-15",
    "mealType": "lunch",
    "attended": false,
    "timestamp": "2024-01-15T12:30:00Z"
  },
  "source": {
    "collegeSystem": "college-cafeteria-system",
    "syncTimestamp": "2024-01-15T12:35:00Z"
  }
}
```

#### Batch Processing

```json
{
  "collegeToken": "generated-token",
  "collegeId": "student-id",
  "mealData": [
    {
      "date": "2024-01-15",
      "mealType": "breakfast",
      "attended": true
    },
    {
      "date": "2024-01-15",
      "mealType": "lunch",
      "attended": false
    }
  ],
  "source": {
    "collegeSystem": "college-cafeteria-system"
  }
}
```

### 2. Token Generation

#### College Token Creation

```javascript
const crypto = require("crypto");

function createCollegeToken(collegeId) {
  const dataString = JSON.stringify({
    collegeId: collegeId,
    timestamp: Math.floor(Date.now() / (24 * 60 * 60 * 1000)), // Daily rotation
  });

  return crypto
    .createHmac("sha256", process.env.TOKENIZATION_SALT)
    .update(dataString)
    .digest("hex")
    .substring(0, 24);
}
```

### 3. Privacy Controls

#### Student Privacy Settings

```javascript
PUT /api/meal-attendance/:anonymizedId/privacy

{
  "optOut": false,
  "allowCheckIns": true,
  "dataRetentionDays": 90
}
```

## 🎨 Frontend Integration

### 1. React Component Integration

The `MealMonitoring` component is already integrated into your Sahaara application:

```jsx
// Already added to App.js
<Route path="/meal-monitoring" element={<MealMonitoring />} />

// Already added to Dashboard.js
{
  id: 5,
  title: "Meal Monitoring",
  description: "Privacy-focused wellness support",
  icon: Shield,
  gradient: "from-emerald-500 to-emerald-600",
  onClick: () => navigate("/meal-monitoring")
}
```

### 2. API Service Integration

Create an API service for frontend communication:

```javascript
// services/mealMonitoringAPI.js
const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";

class MealMonitoringAPI {
  async getPatternAnalysis(anonymizedId) {
    const response = await fetch(
      `${API_BASE_URL}/meal-attendance/${anonymizedId}/patterns`
    );
    return response.json();
  }

  async updatePrivacySettings(anonymizedId, settings) {
    const response = await fetch(
      `${API_BASE_URL}/meal-attendance/${anonymizedId}/privacy`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      }
    );
    return response.json();
  }

  async respondToCheckIn(checkInId, responseType, responseText = "") {
    const response = await fetch(
      `${API_BASE_URL}/meal-attendance/${anonymizedId}/check-in/${checkInId}/response`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ responseType, responseText }),
      }
    );
    return response.json();
  }
}

export default new MealMonitoringAPI();
```

### 3. Environment Configuration

Add to your `.env` file:

```env
# Meal Monitoring API
REACT_APP_MEAL_MONITORING_API_URL=http://localhost:5000/api
REACT_APP_MEAL_MONITORING_ENABLED=true
```

## 🔒 Privacy Implementation

### 1. Data Anonymization

- **Student IDs**: Tokenized using HMAC-SHA256
- **Personal Data**: Never stored in plain text
- **College Tokens**: Rotate daily for security
- **Data Expiry**: Automatic cleanup based on retention settings

### 2. User Consent

#### Consent Flow

1. **Initial Setup**: Students opt-in during onboarding
2. **Granular Control**: Separate settings for monitoring vs. check-ins
3. **Easy Opt-out**: One-click disable functionality
4. **Data Control**: Users set their own retention periods

#### Consent UI Components

```jsx
// Privacy Settings Modal (already implemented)
<PrivacySettingsModal
  settings={privacySettings}
  onUpdate={handlePrivacyUpdate}
  showModal={showPrivacyModal}
  onClose={() => setShowPrivacyModal(false)}
/>
```

### 3. Compliance Features

- **GDPR Compliance**: Right to be forgotten, data portability
- **FERPA Compliance**: Educational privacy protection
- **COPPA Compliance**: Children's privacy protection
- **Institution Policies**: Customizable privacy rules

## 🧠 Pattern Detection

### 1. Anomaly Types

#### Consecutive Misses

- **Trigger**: 3+ meals missed in a row
- **Score**: Based on consecutive count (max 1.0)
- **Action**: Gentle check-in with meal concern message

#### Frequency Drop

- **Trigger**: 30%+ decrease in attendance
- **Score**: Based on drop percentage
- **Action**: Supportive wellness check

#### Pattern Change

- **Trigger**: Significant deviation from baseline
- **Score**: Pattern similarity analysis
- **Action**: Encouraging support offer

### 2. Baseline Calculation

- **Period**: 30 days of historical data
- **Update**: Weekly recalculation
- **Factors**: Meal types, timing, frequency
- **Privacy**: No personal identifiers used

### 3. Scoring System

```javascript
// Pattern Analysis Result
{
  isAnomaly: boolean,
  score: number,        // 0.0 to 1.0
  reason: string,       // 'missed_consecutive', 'frequency_drop', etc.
  details: object       // Additional context
}
```

## 💬 Check-in System

### 1. Message Types

#### Meal Concern

- **Trigger**: Eating pattern anomalies
- **Tone**: Gentle, supportive, encouraging
- **Examples**:
  - "Hi! We noticed you might have missed a few meals recently. Just checking in - how are you feeling? 💙"
  - "We care about your wellbeing. If you're having trouble with meals, we're here to help. 🌟"

#### Wellness Check

- **Trigger**: General pattern changes
- **Tone**: Supportive, caring
- **Examples**:
  - "Just checking in - how has your week been? We're here if you need to chat. 💙"
  - "Your mental health matters. If you need someone to talk to, we're listening. 🤗"

#### Support Offer

- **Trigger**: Low-level concerns
- **Tone**: Encouraging, resource-focused
- **Examples**:
  - "We're thinking of you! If you need any support or resources, just let us know. 💙"
  - "You've got this! And we've got your back. Support is available whenever you need it. 🌱"

### 2. Cooldown System

- **Default**: 24 hours between check-ins
- **Extended**: 48 hours for "doing fine" responses
- **Reduced**: 2 hours for "needs help" follow-ups
- **Override**: User can request pause

### 3. Response Handling

#### Response Types

- **needs_help**: Triggers immediate follow-up with resources
- **doing_fine**: Extends cooldown period
- **acknowledged**: Standard cooldown
- **no_response**: No special action

## 🚀 Deployment

### 1. Backend Deployment

```bash
# Install dependencies
cd backend
npm install

# Environment setup
cp .env.example .env
# Edit .env with your configuration

# Start server
npm start
```

### 2. Frontend Integration

The meal monitoring component is already integrated into your Sahaara frontend. No additional deployment steps needed.

### 3. College System Integration

#### Webhook Setup

```javascript
// College system webhook endpoint
app.post("/webhook/meal-attendance", async (req, res) => {
  const { studentId, mealData } = req.body;

  // Generate college token
  const collegeToken = createCollegeToken(studentId);

  // Send to Sahaara API
  const response = await fetch("http://sahaara-api.com/api/meal-attendance", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      collegeToken,
      collegeId: studentId,
      mealData,
      source: {
        collegeSystem: "your-college-system",
        syncTimestamp: new Date().toISOString(),
      },
    }),
  });

  res.json({ success: true });
});
```

## 📊 Monitoring & Analytics

### 1. System Health

- **API Response Times**: Monitor endpoint performance
- **Database Health**: Connection and query performance
- **Error Rates**: Track and alert on failures
- **Privacy Compliance**: Monitor opt-out rates and data retention

### 2. Privacy Metrics

- **Opt-out Rate**: Percentage of students who opt out
- **Data Retention**: Compliance with user settings
- **Anonymization**: Effectiveness of tokenization
- **User Engagement**: Response rates to check-ins

### 3. Pattern Detection Accuracy

- **False Positives**: Incorrect anomaly detection
- **False Negatives**: Missed concerning patterns
- **Baseline Accuracy**: Quality of pattern analysis
- **User Feedback**: Satisfaction with check-ins

## 🛡️ Security Considerations

### 1. Data Protection

- **Encryption**: All data encrypted in transit and at rest
- **Access Control**: Role-based permissions
- **Audit Logging**: Track all data access
- **Secure Headers**: Helmet.js security middleware

### 2. API Security

- **Rate Limiting**: Prevent abuse and DoS attacks
- **Input Validation**: Joi schema validation
- **CORS**: Configured for specific origins
- **Authentication**: JWT token validation

### 3. Privacy Security

- **Token Rotation**: Daily college token rotation
- **Data Expiry**: Automatic cleanup
- **Anonymization**: Multiple layers of protection
- **Consent Tracking**: Audit trail of user choices

## 🧪 Testing

### 1. Unit Tests

```bash
# Run backend tests
cd backend
npm test

# Test pattern detection
npm run test:patterns

# Test anonymization
npm run test:privacy
```

### 2. Integration Tests

```bash
# Test API endpoints
npm run test:api

# Test college system integration
npm run test:integration
```

### 3. Privacy Tests

```bash
# Test anonymization
npm run test:anonymization

# Test data expiry
npm run test:expiry

# Test opt-out functionality
npm run test:optout
```

## 📞 Support & Maintenance

### 1. Monitoring

- **Health Checks**: `/health` endpoint
- **Privacy Policy**: `/privacy` endpoint
- **Error Tracking**: Comprehensive logging
- **Performance Metrics**: Response time monitoring

### 2. Updates

- **Pattern Algorithms**: Regular improvements
- **Message Templates**: A/B testing for effectiveness
- **Privacy Features**: Enhanced user controls
- **Security Patches**: Regular updates

### 3. User Support

- **Documentation**: Comprehensive guides
- **Privacy Policy**: Clear data handling explanation
- **Contact Information**: Support channels
- **Feedback System**: User input collection

---

## 🎯 Key Principles

1. **Caring Support, Not Surveillance**: Every feature designed to help, not monitor
2. **Privacy First**: Multiple layers of data protection
3. **User Control**: Students control their data and participation
4. **Gentle Approach**: Supportive, non-intrusive communication
5. **Transparency**: Clear communication about data use and purpose

The Sahaara Meal Monitoring system is designed to be a caring, privacy-focused solution that supports student wellbeing through gentle check-ins and pattern analysis. Every component is built with student privacy, consent, and wellbeing as the top priorities. 💙
