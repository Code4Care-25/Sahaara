// Date and time utilities
export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("en-US", {
    ...defaultOptions,
    ...options,
  });
};

export const formatTime = (date, options = {}) => {
  const defaultOptions = {
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(date).toLocaleTimeString("en-US", {
    ...defaultOptions,
    ...options,
  });
};

export const formatDateTime = (date) => {
  return `${formatDate(date)} at ${formatTime(date)}`;
};

export const getRelativeTime = (date) => {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now - past) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 2592000)
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  return formatDate(date);
};

// String utilities
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

export const capitalizeFirst = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const capitalizeWords = (str) => {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
};

export const slugify = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
};

// Number utilities
export const formatNumber = (num, decimals = 0) => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
};

export const formatPercentage = (num, decimals = 1) => {
  return `${formatNumber(num, decimals)}%`;
};

export const formatCurrency = (amount, currency = "USD") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
};

// Array utilities
export const groupBy = (array, key) => {
  return array.reduce((groups, item) => {
    const group = item[key];
    groups[group] = groups[group] || [];
    groups[group].push(item);
    return groups;
  }, {});
};

export const sortBy = (array, key, direction = "asc") => {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];

    if (direction === "desc") {
      return bVal > aVal ? 1 : -1;
    }
    return aVal > bVal ? 1 : -1;
  });
};

export const uniqueBy = (array, key) => {
  const seen = new Set();
  return array.filter((item) => {
    const val = item[key];
    if (seen.has(val)) {
      return false;
    }
    seen.add(val);
    return true;
  });
};

// Object utilities
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

export const pick = (obj, keys) => {
  return keys.reduce((result, key) => {
    if (key in obj) {
      result[key] = obj[key];
    }
    return result;
  }, {});
};

export const omit = (obj, keys) => {
  const result = { ...obj };
  keys.forEach((key) => delete result[key]);
  return result;
};

// Validation utilities
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
};

export const isValidPassword = (password) => {
  // At least 6 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{6,}$/;
  return passwordRegex.test(password);
};

export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Local storage utilities
export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  },

  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch {
      return false;
    }
  },
};

// Debounce utility
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle utility
export const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Color utilities
export const getRandomColor = () => {
  const colors = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#96CEB4",
    "#FFEAA7",
    "#DDA0DD",
    "#98D8C8",
    "#F7DC6F",
    "#BB8FCE",
    "#85C1E9",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

// File utilities
export const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export const getFileExtension = (filename) => {
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
};

// Mood and wellness utilities
export const getMoodEmoji = (mood) => {
  const moodEmojis = {
    happy: "😊",
    sad: "😢",
    anxious: "😰",
    calm: "😌",
    excited: "🤩",
    tired: "😴",
    motivated: "💪",
    grateful: "🙏",
    reflective: "🤔",
    neutral: "😐",
    content: "😌",
    stressed: "😫",
  };
  return moodEmojis[mood] || "😐";
};

export const getMoodColor = (mood) => {
  const moodColors = {
    happy: "#4CAF50",
    sad: "#2196F3",
    anxious: "#FF9800",
    calm: "#9C27B0",
    excited: "#E91E63",
    tired: "#607D8B",
    motivated: "#FF5722",
    grateful: "#795548",
    reflective: "#3F51B5",
    neutral: "#9E9E9E",
    content: "#8BC34A",
    stressed: "#F44336",
  };
  return moodColors[mood] || "#9E9E9E";
};

export const getMealQualityColor = (quality) => {
  const qualityColors = {
    excellent: "#4CAF50",
    good: "#8BC34A",
    fair: "#FFC107",
    poor: "#F44336",
  };
  return qualityColors[quality] || "#9E9E9E";
};

// Chart utilities
export const generateChartData = (data, xKey, yKey) => {
  return data.map((item) => ({
    x: item[xKey],
    y: item[yKey],
    label: item.label || item[xKey],
  }));
};

export const getChartColors = (count) => {
  const baseColors = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#96CEB4",
    "#FFEAA7",
    "#DDA0DD",
    "#98D8C8",
    "#F7DC6F",
    "#BB8FCE",
    "#85C1E9",
  ];
  const colors = [];
  for (let i = 0; i < count; i++) {
    colors.push(baseColors[i % baseColors.length]);
  }
  return colors;
};

// Error handling utilities
export const getErrorMessage = (error) => {
  if (typeof error === "string") return error;
  if (error?.message) return error.message;
  if (error?.error?.message) return error.error.message;
  return "An unexpected error occurred";
};

export const isNetworkError = (error) => {
  return !error.response && error.request;
};

export const isServerError = (error) => {
  return error.response && error.response.status >= 500;
};

export const isClientError = (error) => {
  return (
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500
  );
};

// Constants
export const CONSTANTS = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  SUPPORTED_IMAGE_TYPES: ["image/jpeg", "image/png", "image/gif", "image/webp"],
  SUPPORTED_DOCUMENT_TYPES: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
  PAGINATION_LIMIT: 20,
  DEBOUNCE_DELAY: 300,
  THROTTLE_DELAY: 1000,
  SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
};

export default {
  formatDate,
  formatTime,
  formatDateTime,
  getRelativeTime,
  truncateText,
  capitalizeFirst,
  capitalizeWords,
  slugify,
  formatNumber,
  formatPercentage,
  formatCurrency,
  groupBy,
  sortBy,
  uniqueBy,
  deepClone,
  isEmpty,
  pick,
  omit,
  isValidEmail,
  isValidPhone,
  isValidPassword,
  isValidUrl,
  storage,
  debounce,
  throttle,
  getRandomColor,
  hexToRgb,
  formatFileSize,
  getFileExtension,
  getMoodEmoji,
  getMoodColor,
  getMealQualityColor,
  generateChartData,
  getChartColors,
  getErrorMessage,
  isNetworkError,
  isServerError,
  isClientError,
  CONSTANTS,
};
