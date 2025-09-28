import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  registerCounsellor: (counsellorData) => api.post('/auth/register-counsellor', counsellorData),
  refreshToken: (refreshToken) => api.post('/auth/refresh', { refreshToken }),
  verifyEmail: (token) => api.post('/auth/verify-email', { token }),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => api.post('/auth/reset-password', { token, password }),
  logout: () => api.post('/auth/logout'),
};

// User API
export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (userData) => api.put('/users/profile', userData),
  changePassword: (passwordData) => api.put('/users/change-password', passwordData),
  getStatistics: () => api.get('/users/statistics'),
  getActivitySummary: () => api.get('/users/activity-summary'),
  wellnessCheckin: (checkinData) => api.post('/users/wellness-checkin', checkinData),
  deleteAccount: () => api.delete('/users/account'),
};

// Chat API
export const chatAPI = {
  createSession: (sessionData) => api.post('/chat/sessions', sessionData),
  getSessions: () => api.get('/chat/sessions'),
  getSession: (sessionId) => api.get(`/chat/sessions/${sessionId}`),
  sendMessage: (sessionId, messageData) => api.post(`/chat/sessions/${sessionId}/messages`, messageData),
  completeSession: (sessionId) => api.put(`/chat/sessions/${sessionId}/complete`),
  flagSession: (sessionId, reason) => api.post(`/chat/sessions/${sessionId}/flag`, { reason }),
  getAnalytics: () => api.get('/chat/analytics'),
};

// Resources API
export const resourcesAPI = {
  getResources: (params) => api.get('/resources', { params }),
  getResource: (id) => api.get(`/resources/${id}`),
  getFeatured: () => api.get('/resources/featured'),
  getRecommendations: () => api.get('/resources/recommendations/personalized'),
  getCategories: () => api.get('/resources/categories'),
  getTags: () => api.get('/resources/tags'),
  search: (params) => api.get('/resources/search/advanced', { params }),
  getMyInteractions: () => api.get('/resources/my/interactions'),
  rateResource: (id, rating) => api.post(`/resources/${id}/rate`, { rating }),
  likeResource: (id) => api.post(`/resources/${id}/like`),
  shareResource: (id) => api.post(`/resources/${id}/share`),
};

// Counsellors API
export const counsellorsAPI = {
  getCounsellors: (params) => api.get('/counsellors', { params }),
  getCounsellor: (id) => api.get(`/counsellors/${id}`),
  getSpecializations: () => api.get('/counsellors/specializations'),
  getAvailability: (id, date) => api.get(`/counsellors/${id}/availability`, { params: { date } }),
  rateCounsellor: (id, rating) => api.post(`/counsellors/${id}/rate`, { rating }),
};

// Appointments API
export const appointmentsAPI = {
  getMyAppointments: () => api.get('/appointments/my-appointments'),
  createAppointment: (appointmentData) => api.post('/appointments', appointmentData),
  updateAppointment: (id, appointmentData) => api.put(`/appointments/${id}`, appointmentData),
  cancelAppointment: (id) => api.delete(`/appointments/${id}`),
  getStats: () => api.get('/appointments/stats/overview'),
};

// Forum API
export const forumAPI = {
  getPosts: (params) => api.get('/forum/posts', { params }),
  getPost: (id) => api.get(`/forum/posts/${id}`),
  createPost: (postData) => api.post('/forum/posts', postData),
  updatePost: (id, postData) => api.put(`/forum/posts/${id}`, postData),
  deletePost: (id) => api.delete(`/forum/posts/${id}`),
  getCategories: () => api.get('/forum/categories'),
  getMyPosts: () => api.get('/forum/my/posts'),
  getMyReplies: () => api.get('/forum/my/replies'),
  likePost: (id) => api.post(`/forum/posts/${id}/like`),
  replyToPost: (id, replyData) => api.post(`/forum/posts/${id}/replies`, replyData),
};

// Journal API
export const journalAPI = {
  getEntries: (params) => api.get('/journal/entries', { params }),
  getEntry: (id) => api.get(`/journal/entries/${id}`),
  createEntry: (entryData) => api.post('/journal/entries', entryData),
  updateEntry: (id, entryData) => api.put(`/journal/entries/${id}`, entryData),
  deleteEntry: (id) => api.delete(`/journal/entries/${id}`),
  getAnalytics: () => api.get('/journal/analytics'),
  searchEntries: (query) => api.get('/journal/search', { params: { query } }),
};

// Meal Monitoring API
export const mealAPI = {
  getEntries: (params) => api.get('/meal-monitoring/entries', { params }),
  getEntry: (id) => api.get(`/meal-monitoring/entries/${id}`),
  createEntry: (entryData) => api.post('/meal-monitoring/entries', entryData),
  updateEntry: (id, entryData) => api.put(`/meal-monitoring/entries/${id}`, entryData),
  deleteEntry: (id) => api.delete(`/meal-monitoring/entries/${id}`),
  getAnalytics: () => api.get('/meal-monitoring/analytics'),
  getWeeklyTrends: () => api.get('/meal-monitoring/weekly-trends'),
};

// Utility functions
export const apiUtils = {
  // Handle API errors
  handleError: (error) => {
    if (error.response) {
      // Server responded with error status
      return {
        message: error.response.data?.error?.message || 'An error occurred',
        code: error.response.data?.error?.code || 'UNKNOWN_ERROR',
        status: error.response.status,
      };
    } else if (error.request) {
      // Request was made but no response received
      return {
        message: 'Network error. Please check your connection.',
        code: 'NETWORK_ERROR',
        status: 0,
      };
    } else {
      // Something else happened
      return {
        message: error.message || 'An unexpected error occurred',
        code: 'UNKNOWN_ERROR',
        status: 0,
      };
    }
  },

  // Format API response
  formatResponse: (response) => {
    return {
      success: response.data?.success || true,
      data: response.data?.data || response.data,
      message: response.data?.message || '',
      pagination: response.data?.pagination || null,
    };
  },

  // Check if response is successful
  isSuccess: (response) => {
    return response.data?.success !== false && response.status >= 200 && response.status < 300;
  },
};

export default api;
