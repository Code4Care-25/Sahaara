import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { colleges } from "../data/mockData";
import {
  Heart,
  Users,
  Shield,
  Sparkles,
  ArrowRight,
  CheckCircle,
  ArrowLeft,
  Building2,
} from "lucide-react";

const Login = () => {
  const [selectedCollege, setSelectedCollege] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginType, setLoginType] = useState("student");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get selected institution from navigation state
  useEffect(() => {
    if (location.state?.selectedInstitution) {
      setSelectedCollege(location.state.selectedInstitution);
    }
  }, [location.state]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    console.log("Login attempt:", {
      loginType,
      username,
      password,
      selectedCollege,
    });

    // Simulate loading
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock login - any credentials work for demo
    if (username && password && selectedCollege) {
      console.log("Login successful, redirecting to:", loginType);
      setShowSuccess(true);
      setTimeout(() => {
        try {
          if (loginType === "counsellor") {
            console.log("Navigating to counsellor page");
            navigate("/counsellor");
          } else if (loginType === "admin") {
            console.log("Navigating to admin page");
            navigate("/admin");
          } else {
            console.log("Navigating to theme selection");
            navigate("/theme-selection", {
              state: {
                selectedInstitution: selectedCollege,
                loginType: loginType,
                username: username,
              },
            });
          }
        } catch (error) {
          console.error("Navigation error:", error);
        }
      }, 1000);
    } else {
      console.log("Login failed - missing required fields");
      alert("Please fill in all required fields");
    }
    setIsLoading(false);
  };

  const handleGuestAccess = () => {
    navigate("/chat", { state: { isGuest: true } });
  };

  const handleBackToInstitutionSelection = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      <div className="relative flex items-center justify-center min-h-screen p-4">
        <div className="max-w-2xl w-full animate-fade-in-up">
          {/* Header */}
          <div className="text-center mb-6">
            {/* Back Button */}
            {location.state?.selectedInstitution && (
              <div className="flex justify-start mb-3">
                <button
                  onClick={handleBackToInstitutionSelection}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    Back to Institution Selection
                  </span>
                </button>
              </div>
            )}

            <div className="flex justify-center items-center mb-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-30"></div>
                <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-xl">
                  <Heart className="h-6 w-6 text-white animate-pulse" />
                </div>
              </div>
              <div className="ml-2">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                  Sahaara
                </h1>
                <div className="flex items-center justify-center space-x-1 mt-0.5">
                  <Sparkles className="h-3 w-3 text-yellow-500 animate-pulse" />
                  <p className="text-gray-600 text-xs font-medium">
                    Mental Health Support Platform
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Login Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-white/20 hover:shadow-3xl transition-all duration-500">
            <div className="mb-4">
              <div className="flex space-x-1 mb-4 bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setLoginType("student")}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    loginType === "student"
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                  }`}
                >
                  Student
                </button>
                <button
                  onClick={() => setLoginType("counsellor")}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    loginType === "counsellor"
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                  }`}
                >
                  Counsellor
                </button>
                <button
                  onClick={() => setLoginType("admin")}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    loginType === "admin"
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                  }`}
                >
                  Admin
                </button>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Institution Selection - Show for all login types */}
              <div className="animate-fade-in-up">
                {location.state?.selectedInstitution ? (
                  // Show selected institution with compact logo display
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-3 shadow-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-bold text-gray-800">
                        Selected Institution
                      </h3>
                      <button
                        type="button"
                        onClick={handleBackToInstitutionSelection}
                        className="text-blue-600 hover:text-blue-800 text-xs font-medium underline hover:no-underline transition-all duration-200"
                      >
                        Change
                      </button>
                    </div>
                    <div className="flex items-center space-x-3">
                      {(() => {
                        const college = colleges.find(
                          (c) => c.name === selectedCollege
                        );
                        return college?.logo ? (
                          <div className="flex-shrink-0">
                            <img
                              src={college.logo}
                              alt={`${selectedCollege} logo`}
                              className="h-20 w-20 object-contain bg-white p-2 rounded-lg shadow-md border border-gray-200"
                              onError={(e) => {
                                console.log(
                                  "Logo failed to load:",
                                  college.logo
                                );
                                e.target.style.display = "none";
                              }}
                              onLoad={() =>
                                console.log(
                                  "Logo loaded successfully:",
                                  college.logo
                                )
                              }
                            />
                          </div>
                        ) : (
                          <div className="flex-shrink-0">
                            <div className="h-20 w-20 bg-blue-100 rounded-lg shadow-md border border-gray-200 flex items-center justify-center">
                              <Building2 className="h-10 w-10 text-blue-600" />
                            </div>
                          </div>
                        );
                      })()}
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-gray-800">
                          {selectedCollege}
                        </h4>
                        <p className="text-gray-600 text-xs">
                          Educational Institution
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Show dropdown when accessing login directly
                  <div className="flex items-center space-x-3">
                    <label
                      htmlFor="college"
                      className="w-40 text-sm font-semibold text-gray-700"
                    >
                      Select Your College
                    </label>
                    <select
                      id="college"
                      value={selectedCollege}
                      onChange={(e) => setSelectedCollege(e.target.value)}
                      className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-gray-300"
                      required
                    >
                      <option value="">Choose your college</option>
                      {colleges.map((college) => (
                        <option key={college.id} value={college.name}>
                          {college.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div className="animate-fade-in-up delay-100">
                  <div className="flex items-center space-x-3">
                    <label
                      htmlFor="username"
                      className="text-sm font-semibold text-gray-700 w-32"
                    >
                      {loginType === "student" ? "Student ID" : "Username"}
                    </label>
                    <input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="flex-1 px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-gray-300 text-sm"
                      placeholder={
                        loginType === "student"
                          ? "Enter your student ID"
                          : "Enter username"
                      }
                      required
                    />
                  </div>
                </div>

                <div className="animate-fade-in-up delay-200">
                  <div className="flex items-center space-x-3">
                    <label
                      htmlFor="password"
                      className="text-sm font-semibold text-gray-700 w-32"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="flex-1 px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-gray-300 text-sm"
                      placeholder="Enter password"
                      required
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 font-semibold text-base shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mt-4"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Signing in...
                  </>
                ) : showSuccess ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Success! Redirecting...
                  </>
                ) : (
                  <>
                    {loginType === "student"
                      ? "Login as Student"
                      : loginType === "counsellor"
                      ? "Login as Counsellor"
                      : "Login as Admin"}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </button>
            </form>

            {/* Guest Access */}
            <div className="mt-4 pt-3 border-t border-gray-200 animate-fade-in-up delay-300">
              <p className="text-center text-xs text-gray-600 mb-3">
                Want to try without logging in?
              </p>
              <button
                onClick={handleGuestAccess}
                className="w-full bg-white/80 text-gray-700 py-2 px-3 rounded-lg hover:bg-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300 font-medium border-2 border-gray-200 hover:border-gray-300 flex items-center justify-center"
              >
                <Users className="h-3 w-3 mr-2" />
                Access Chat Buddy (Guest Mode)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
