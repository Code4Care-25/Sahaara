import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { colleges } from "../data/mockData";
import { Heart, Users, Shield } from "lucide-react";

const Login = () => {
  const [selectedCollege, setSelectedCollege] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginType, setLoginType] = useState("student");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock login - any credentials work for demo
    if (selectedCollege && username && password) {
      if (loginType === "counsellor") {
        navigate("/counsellor");
      } else if (loginType === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    }
  };

  const handleGuestAccess = () => {
    navigate("/chat");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center items-center mb-4">
            <Heart className="h-12 w-12 text-primary-600" />
            <h1 className="ml-3 text-4xl font-bold text-gray-900">Sahaara</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Digital Mental Health Support for Students
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-6">
            <div className="flex space-x-1 mb-4">
              <button
                onClick={() => setLoginType("student")}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                  loginType === "student"
                    ? "bg-primary-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Student
              </button>
              <button
                onClick={() => setLoginType("counsellor")}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                  loginType === "counsellor"
                    ? "bg-primary-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Counsellor
              </button>
              <button
                onClick={() => setLoginType("admin")}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                  loginType === "admin"
                    ? "bg-primary-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Admin
              </button>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {loginType === "student" && (
              <div>
                <label
                  htmlFor="college"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Select Your College
                </label>
                <select
                  id="college"
                  value={selectedCollege}
                  onChange={(e) => setSelectedCollege(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {loginType === "student" ? "Student ID" : "Username"}
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder={
                  loginType === "student"
                    ? "Enter your student ID"
                    : "Enter username"
                }
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors font-medium"
            >
              {loginType === "student"
                ? "Login as Student"
                : loginType === "counsellor"
                ? "Login as Counsellor"
                : "Login as Admin"}
            </button>
          </form>

          {/* Guest Access */}
          {loginType === "student" && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600 mb-3">
                Want to try without logging in?
              </p>
              <button
                onClick={handleGuestAccess}
                className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors font-medium"
              >
                <Users className="inline h-4 w-4 mr-2" />
                Access Chat Buddy (Guest Mode)
              </button>
            </div>
          )}
        </div>

        {/* Features Preview */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <Heart className="h-8 w-8 text-primary-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Mental Health Support</p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <Users className="h-8 w-8 text-primary-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Peer Support</p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <Shield className="h-8 w-8 text-primary-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Safe & Anonymous</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

