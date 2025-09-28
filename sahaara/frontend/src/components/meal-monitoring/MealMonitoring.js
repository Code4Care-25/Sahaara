import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Shield,
  Heart,
  Bell,
  Settings,
  Eye,
  EyeOff,
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  MessageCircle,
  User,
  Calendar,
  Lock,
  Unlock,
  Info,
  X,
  ChevronRight,
} from "lucide-react";

const MealMonitoring = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [privacySettings, setPrivacySettings] = useState({
    optOut: false,
    allowCheckIns: true,
    dataRetentionDays: 90,
  });
  const [checkInHistory, setCheckInHistory] = useState([]);
  const [patternAnalysis, setPatternAnalysis] = useState(null);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - replace with actual API calls
  useEffect(() => {
    // Simulate loading data
    setIsLoading(true);
    setTimeout(() => {
      setCheckInHistory([
        {
          id: 1,
          type: "meal_concern",
          message:
            "Hi! We noticed you might have missed a few meals recently. Just checking in - how are you feeling? 💙",
          tone: "gentle",
          createdAt: "2024-01-15T10:30:00Z",
          responseReceived: true,
          responseType: "doing_fine",
        },
        {
          id: 2,
          type: "wellness_check",
          message:
            "Just checking in - how has your week been? We're here if you need to chat. 💙",
          tone: "supportive",
          createdAt: "2024-01-10T14:20:00Z",
          responseReceived: false,
        },
      ]);

      setPatternAnalysis({
        isAnomaly: false,
        reason: "none",
        score: 0.3,
        lastAnalyzed: "2024-01-15T12:00:00Z",
        baselinePattern: {
          averageMealsPerWeek: 18,
          lastUpdated: "2024-01-10T00:00:00Z",
        },
      });

      setIsLoading(false);
    }, 1000);
  }, []);

  const handlePrivacyUpdate = async (newSettings) => {
    setIsLoading(true);
    try {
      // API call to update privacy settings
      // await updatePrivacySettings(newSettings);
      setPrivacySettings(newSettings);
      setShowPrivacyModal(false);
    } catch (error) {
      console.error("Failed to update privacy settings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckInResponse = async (checkInId, responseType) => {
    setIsLoading(true);
    try {
      // API call to send response
      // await sendCheckInResponse(checkInId, responseType);

      // Update local state
      setCheckInHistory((prev) =>
        prev.map((checkIn) =>
          checkIn.id === checkInId
            ? { ...checkIn, responseReceived: true, responseType }
            : checkIn
        )
      );
    } catch (error) {
      console.error("Failed to send response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getToneColor = (tone) => {
    switch (tone) {
      case "gentle":
        return "text-blue-600 bg-blue-50";
      case "supportive":
        return "text-green-600 bg-green-50";
      case "encouraging":
        return "text-purple-600 bg-purple-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getToneIcon = (tone) => {
    switch (tone) {
      case "gentle":
        return <Heart className="h-4 w-4" />;
      case "supportive":
        return <Shield className="h-4 w-4" />;
      case "encouraging":
        return <TrendingUp className="h-4 w-4" />;
      default:
        return <MessageCircle className="h-4 w-4" />;
    }
  };

  const getResponseColor = (responseType) => {
    switch (responseType) {
      case "needs_help":
        return "text-red-600 bg-red-50";
      case "doing_fine":
        return "text-green-600 bg-green-50";
      case "acknowledged":
        return "text-blue-600 bg-blue-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/dashboard")}
              className="group flex items-center text-gray-600 hover:text-gray-900 transition-all duration-300 hover:bg-gray-100 rounded-lg px-4 py-2"
            >
              <ChevronRight className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform rotate-180" />
              Back to Dashboard
            </button>
            <div className="text-center">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                Meal Monitoring
              </h1>
              <div className="flex items-center justify-center space-x-2 mt-2">
                <Shield className="h-4 w-4 text-green-500" />
                <p className="text-gray-600 font-medium">
                  Privacy-Focused Support
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowPrivacyModal(true)}
              className="group flex items-center text-blue-600 hover:text-blue-900 transition-all duration-300 hover:bg-blue-100 rounded-lg px-4 py-2"
            >
              <Settings className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform" />
              Privacy Settings
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Privacy Notice */}
        <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Your Privacy is Protected
              </h3>
              <p className="text-blue-800 mb-4">
                This system uses anonymized data to provide gentle, supportive
                check-ins. Your personal information is never stored, and you
                can opt out at any time.
              </p>
              <div className="flex items-center space-x-6 text-sm text-blue-700">
                <div className="flex items-center">
                  <Lock className="h-4 w-4 mr-2" />
                  Data is anonymized
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Auto-expires in {privacySettings.dataRetentionDays} days
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  You control your data
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-2 bg-white/80 backdrop-blur-sm rounded-2xl p-2 w-fit shadow-lg border border-white/20">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeTab === "overview"
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("checkins")}
              className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeTab === "checkins"
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              Check-ins
            </button>
            <button
              onClick={() => setActiveTab("patterns")}
              className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeTab === "patterns"
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-white shadow-lg transform scale-105"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              Patterns
            </button>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Status
                    </h3>
                    <p className="text-green-600 font-medium">All Good</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Bell className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Check-ins
                    </h3>
                    <p className="text-blue-600 font-medium">
                      {checkInHistory.length} Total
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Privacy
                    </h3>
                    <p className="text-purple-600 font-medium">
                      {privacySettings.optOut ? "Opted Out" : "Active"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Recent Activity
              </h3>
              <div className="space-y-4">
                {checkInHistory.slice(0, 3).map((checkIn) => (
                  <div
                    key={checkIn.id}
                    className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl"
                  >
                    <div
                      className={`p-2 rounded-lg ${getToneColor(checkIn.tone)}`}
                    >
                      {getToneIcon(checkIn.tone)}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800 mb-2">{checkIn.message}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>
                          {new Date(checkIn.createdAt).toLocaleDateString()}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${getToneColor(
                            checkIn.tone
                          )}`}
                        >
                          {checkIn.tone}
                        </span>
                        {checkIn.responseReceived && (
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${getResponseColor(
                              checkIn.responseType
                            )}`}
                          >
                            {checkIn.responseType}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Check-ins Tab */}
        {activeTab === "checkins" && (
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Check-in History
              </h3>
              <div className="space-y-4">
                {checkInHistory.map((checkIn) => (
                  <div
                    key={checkIn.id}
                    className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`p-2 rounded-lg ${getToneColor(
                            checkIn.tone
                          )}`}
                        >
                          {getToneIcon(checkIn.tone)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 capitalize">
                            {checkIn.type.replace("_", " ")}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {new Date(checkIn.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getToneColor(
                          checkIn.tone
                        )}`}
                      >
                        {checkIn.tone}
                      </span>
                    </div>

                    <p className="text-gray-800 mb-4">{checkIn.message}</p>

                    {!checkIn.responseReceived ? (
                      <div className="flex space-x-3">
                        <button
                          onClick={() =>
                            handleCheckInResponse(checkIn.id, "doing_fine")
                          }
                          className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium"
                        >
                          I'm doing fine
                        </button>
                        <button
                          onClick={() =>
                            handleCheckInResponse(checkIn.id, "needs_help")
                          }
                          className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
                        >
                          I need help
                        </button>
                        <button
                          onClick={() =>
                            handleCheckInResponse(checkIn.id, "acknowledged")
                          }
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                        >
                          Acknowledged
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span
                          className={`text-sm font-medium ${getResponseColor(
                            checkIn.responseType
                          )}`}
                        >
                          Responded: {checkIn.responseType.replace("_", " ")}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Patterns Tab */}
        {activeTab === "patterns" && (
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Pattern Analysis
              </h3>

              {patternAnalysis && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Current Status
                      </h4>
                      <div className="flex items-center space-x-2">
                        {patternAnalysis.isAnomaly ? (
                          <AlertTriangle className="h-5 w-5 text-yellow-500" />
                        ) : (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        )}
                        <span
                          className={
                            patternAnalysis.isAnomaly
                              ? "text-yellow-600"
                              : "text-green-600"
                          }
                        >
                          {patternAnalysis.isAnomaly
                            ? "Pattern Detected"
                            : "Normal Patterns"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        Score: {(patternAnalysis.score * 100).toFixed(1)}%
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-xl">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Baseline
                      </h4>
                      <p className="text-lg font-semibold text-blue-600">
                        {patternAnalysis.baselinePattern.averageMealsPerWeek}{" "}
                        meals/week
                      </p>
                      <p className="text-sm text-gray-600">
                        Last updated:{" "}
                        {new Date(
                          patternAnalysis.baselinePattern.lastUpdated
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-xl">
                    <h4 className="font-semibold text-blue-900 mb-2">
                      How it works
                    </h4>
                    <p className="text-blue-800 text-sm">
                      Our system analyzes your meal patterns anonymously to
                      detect when you might need support. It compares your
                      recent activity to your baseline patterns and sends gentle
                      check-ins when needed.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Privacy Settings Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                Privacy Settings
              </h3>
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">Opt Out</h4>
                  <p className="text-sm text-gray-600">
                    Stop all monitoring and check-ins
                  </p>
                </div>
                <button
                  onClick={() =>
                    handlePrivacyUpdate({
                      ...privacySettings,
                      optOut: !privacySettings.optOut,
                    })
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    privacySettings.optOut ? "bg-red-600" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      privacySettings.optOut ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Allow Check-ins
                  </h4>
                  <p className="text-sm text-gray-600">
                    Receive supportive messages
                  </p>
                </div>
                <button
                  onClick={() =>
                    handlePrivacyUpdate({
                      ...privacySettings,
                      allowCheckIns: !privacySettings.allowCheckIns,
                    })
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    privacySettings.allowCheckIns
                      ? "bg-green-600"
                      : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      privacySettings.allowCheckIns
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Data Retention (Days)
                </label>
                <select
                  value={privacySettings.dataRetentionDays}
                  onChange={(e) =>
                    handlePrivacyUpdate({
                      ...privacySettings,
                      dataRetentionDays: parseInt(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={30}>30 days</option>
                  <option value={60}>60 days</option>
                  <option value={90}>90 days</option>
                  <option value={180}>180 days</option>
                </select>
                <p className="text-xs text-gray-600 mt-1">
                  Your data will automatically expire after this period
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-xl">
              <div className="flex items-start space-x-3">
                <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-1">
                    Your Rights
                  </h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• You can opt out at any time</li>
                    <li>• Your data is anonymized</li>
                    <li>• Data expires automatically</li>
                    <li>• You control all settings</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealMonitoring;
