import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Settings, ArrowLeft, Building2 } from "lucide-react";

const SahaaraMainCover = () => {
  const [selectedTheme, setSelectedTheme] = useState("mother");
  const navigate = useNavigate();
  const location = useLocation();

  // Get user data from login
  const userData = location.state || {};
  const { selectedInstitution, loginType, username } = userData;

  const themes = {
    mother: {
      name: "Mother",
      gradient: "linear-gradient(135deg, #fef7f0 0%, #fed7aa 100%)",
      primary: "#ea580c",
      secondary: "#f97316",
      accent: "#fb923c",
      text: "#9a3412",
      cardBg: "rgba(255, 255, 255, 0.9)",
      buttonHover: "#dc2626",
    },
    father: {
      name: "Father",
      gradient: "linear-gradient(135deg, #f0fdff 0%, #cffafe 100%)",
      primary: "#0891b2",
      secondary: "#06b6d4",
      accent: "#67e8f9",
      text: "#0c4a6e",
      cardBg: "rgba(255, 255, 255, 0.9)",
      buttonHover: "#0e7490",
    },
    friend: {
      name: "Friend",
      gradient: "linear-gradient(135deg, #f7fdf7 0%, #d1fae5 100%)",
      primary: "#059669",
      secondary: "#10b981",
      accent: "#34d399",
      text: "#064e3b",
      cardBg: "rgba(255, 255, 255, 0.9)",
      buttonHover: "#047857",
    },
    relative: {
      name: "Relative",
      gradient: "linear-gradient(135deg, #faf5ff 0%, #e9d5ff 100%)",
      primary: "#a855f7",
      secondary: "#d946ef",
      accent: "#c084fc",
      text: "#4c1d95",
      cardBg: "rgba(255, 255, 255, 0.9)",
      buttonHover: "#9333ea",
    },
    mentor: {
      name: "Mentor",
      gradient: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      primary: "#6366f1",
      secondary: "#8b5cf6",
      accent: "#06b6d4",
      text: "#1f2937",
      cardBg: "rgba(255, 255, 255, 0.9)",
      buttonHover: "#4f46e5",
    },
    counselor: {
      name: "Counselor",
      gradient: "linear-gradient(135deg, #faf5ff 0%, #e879f9 100%)",
      primary: "#c026d3",
      secondary: "#d946ef",
      accent: "#f0abfc",
      text: "#701a75",
      cardBg: "rgba(255, 255, 255, 0.9)",
      buttonHover: "#a21caf",
    },
  };

  const currentTheme = themes[selectedTheme];

  const handleThemeChange = (themeKey) => {
    setSelectedTheme(themeKey);
  };

  const handleGetStarted = () => {
    // Navigate to dashboard with selected theme and user data
    navigate("/dashboard", {
      state: {
        selectedTheme: selectedTheme,
        selectedInstitution: selectedInstitution,
        loginType: loginType,
        username: username,
      },
    });
  };

  const handleBackToLogin = () => {
    navigate("/login", {
      state: {
        selectedInstitution: selectedInstitution,
      },
    });
  };

  return (
    <div
      className="min-h-screen transition-all duration-700 ease-in-out"
      style={{ background: currentTheme.gradient }}
    >
      {/* Header */}
      <header className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg"
              style={{ backgroundColor: currentTheme.primary }}
            >
              <span style={{ color: "white" }}>❤️</span>
            </div>
            <div className="ml-3">
              <h1
                className="text-xl font-bold"
                style={{ color: currentTheme.text }}
              >
                Sahaara
              </h1>
              <p
                className="text-sm opacity-75"
                style={{ color: currentTheme.text }}
              >
                Mental Health Support Platform
              </p>
            </div>
          </div>

          {/* Back Button */}
          <button
            onClick={handleBackToLogin}
            className="flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-lg"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              color: currentTheme.text,
              border: `2px solid ${currentTheme.primary}`,
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = currentTheme.primary;
              e.target.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
              e.target.style.color = currentTheme.text;
            }}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Login
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 pb-12">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2
            className="text-5xl font-bold mb-6"
            style={{ color: currentTheme.text }}
          >
            Welcome to Sahaara
          </h2>
          <p
            className="text-xl max-w-4xl mx-auto leading-relaxed mb-8"
            style={{ color: currentTheme.text, opacity: 0.8 }}
          >
            Your comprehensive mental health companion designed to support
            students through their academic journey. Find resources, connect
            with counselors, and build a supportive community in a safe,
            understanding environment.
          </p>

          {/* User Context */}
          {selectedInstitution && (
            <div
              className="inline-flex items-center px-6 py-3 rounded-xl mb-8"
              style={{ backgroundColor: currentTheme.cardBg }}
            >
              <Building2
                className="h-5 w-5 mr-3"
                style={{ color: currentTheme.primary }}
              />
              <span
                className="text-lg font-medium"
                style={{ color: currentTheme.text }}
              >
                {username && `Welcome, ${username}! `}Selected:{" "}
                {selectedInstitution}
              </span>
            </div>
          )}
        </div>

        {/* Theme Selection */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <Settings
              style={{ color: currentTheme.text }}
              size={24}
              className="mr-2"
            />
            <h3
              className="text-2xl font-bold"
              style={{ color: currentTheme.text }}
            >
              Choose Your Theme
            </h3>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {Object.entries(themes).map(([key, theme]) => (
              <button
                key={key}
                onClick={() => handleThemeChange(key)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg border-2 ${
                  selectedTheme === key
                    ? "ring-4 ring-opacity-50"
                    : "hover:shadow-md"
                }`}
                style={{
                  backgroundColor: theme.primary,
                  color: "white",
                  borderColor:
                    selectedTheme === key ? theme.secondary : theme.primary,
                  ringColor: theme.secondary,
                }}
              >
                {theme.name}
              </button>
            ))}
          </div>

          {/* Get Started Button */}
          <button
            onClick={handleGetStarted}
            className="px-12 py-4 rounded-2xl font-semibold text-lg text-white shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            style={{
              backgroundColor: currentTheme.primary,
            }}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = currentTheme.buttonHover)
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = currentTheme.primary)
            }
          >
            Get Started →
          </button>
        </div>
      </div>
    </div>
  );
};

export default SahaaraMainCover;
