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
    if (username && password && (loginType !== "student" || selectedCollege)) {
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
            console.log("Navigating to dashboard");
            navigate("/dashboard");
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
        <div className="max-w-4xl w-full space-y-4 animate-fade-in-up">
          {/* Header */}
          <div className="text-center">
            {/* Back Button */}
            {location.state?.selectedInstitution && (
              <div className="flex justify-start mb-4">
                <button
                  onClick={handleBackToInstitutionSelection}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span className="text-sm font-medium">Back to Institution Selection</span>
                </button>
              </div>
            )}
            
            <div className="flex justify-center items-center mb-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-30"></div>
                <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-2xl">
                  <Heart className="h-8 w-8 text-white animate-pulse" />
                </div>
              </div>
              <div className="ml-3">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                  Sahaara
                </h1>
                <div className="flex items-center justify-center space-x-2 mt-1">
                  <Sparkles className="h-3 w-3 text-yellow-500 animate-pulse" />
                  <p className="text-gray-600 text-xs font-medium">
                    Mental Health Support Platform
                  </p>
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Your journey to better mental health starts here
            </p>
          </div>

          {/* Features Preview */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="text-center p-3 bg-white/70 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <div className="p-1 bg-blue-100 rounded-lg w-fit mx-auto mb-1 group-hover:scale-110 transition-transform">
                <Heart className="h-4 w-4 text-blue-600" />
              </div>
              <p className="text-xs font-semibold text-gray-700">
                Mental Health Support
              </p>
            </div>
            <div className="text-center p-3 bg-white/70 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <div className="p-1 bg-green-100 rounded-lg w-fit mx-auto mb-1 group-hover:scale-110 transition-transform">
                <Users className="h-4 w-4 text-green-600" />
              </div>
              <p className="text-xs font-semibold text-gray-700">
                Peer Support
              </p>
            </div>
            <div className="text-center p-3 bg-white/70 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <div className="p-1 bg-purple-100 rounded-lg w-fit mx-auto mb-1 group-hover:scale-110 transition-transform">
                <Shield className="h-4 w-4 text-purple-600" />
              </div>
              <p className="text-xs font-semibold text-gray-700">
                Safe & Anonymous
              </p>
            </div>
          </div>

          {/* Login Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-4 border border-white/20 hover:shadow-3xl transition-all duration-500">
            <div className="mb-4">
              <div className="flex space-x-1 mb-3 bg-gray-100 rounded-2xl p-1">
                <button
                  onClick={() => setLoginType("student")}
                  className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    loginType === "student"
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                  }`}
                >
                  Student
                </button>
                <button
                  onClick={() => setLoginType("counsellor")}
                  className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    loginType === "counsellor"
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                  }`}
                >
                  Counsellor
                </button>
                <button
                  onClick={() => setLoginType("admin")}
                  className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    loginType === "admin"
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                  }`}
                >
                  Admin
                </button>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-3">
              {loginType === "student" && (
                <div className="animate-fade-in-up">
                  {location.state?.selectedInstitution ? (
                    // Show selected institution as read-only when coming from institution selection
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 border-2 border-blue-200 rounded-lg">
                      <Building2 className="h-5 w-5 text-blue-600" />
                      <div className="flex-1">
                        <label className="text-sm font-semibold text-blue-800">
                          Selected Institution
                        </label>
                        <p className="text-blue-700 font-medium">{selectedCollege}</p>
                      </div>
                      <button
                        type="button"
                        onClick={handleBackToInstitutionSelection}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium underline"
                      >
                        Change
                      </button>
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
              )}

              <div className="animate-fade-in-up delay-100 flex items-center space-x-3">
                <label
                  htmlFor="username"
                  className="w-40 text-sm font-semibold text-gray-700"
                >
                  {loginType === "student" ? "Student ID" : "Username"}
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-gray-300"
                  placeholder={
                    loginType === "student"
                      ? "Enter your student ID"
                      : "Enter username"
                  }
                  required
                />
              </div>

              <div className="animate-fade-in-up delay-200 flex items-center space-x-3">
                <label
                  htmlFor="password"
                  className="w-40 text-sm font-semibold text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-gray-300"
                  placeholder="Enter password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 font-semibold text-base shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Signing in...
                  </>
                ) : showSuccess ? (
                  <>
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Success! Redirecting...
                  </>
                ) : (
                  <>
                    {loginType === "student"
                      ? "Login as Student"
                      : loginType === "counsellor"
                      ? "Login as Counsellor"
                      : "Login as Admin"}
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </>
                )}
              </button>
            </form>

            {/* Guest Access */}
            {loginType === "student" && (
              <div className="mt-4 pt-4 border-t border-gray-200 animate-fade-in-up delay-300">
                <p className="text-center text-xs text-gray-600 mb-3">
                  Want to try without logging in?
                </p>
                <button
                  onClick={handleGuestAccess}
                  className="w-full bg-white/70 text-gray-700 py-2 px-3 rounded-lg hover:bg-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300 font-medium border-2 border-gray-200 hover:border-gray-300 flex items-center justify-center"
                >
                  <Users className="h-3 w-3 mr-2" />
                  Access Chat Buddy (Guest Mode)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
