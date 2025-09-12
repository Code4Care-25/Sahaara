import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MessageCircle,
  Calendar,
  BookOpen,
  Users,
  FileText,
  LogOut,
  Heart,
  TrendingUp,
  Clock,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Activity,
  Target,
  Award,
  User,
  Settings,
  Bell,
  HelpCircle,
  Shield,
  X,
  ChevronRight,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [stats, setStats] = useState({
    chatSessions: 0,
    appointments: 0,
    journalEntries: 0,
  });

  // Simulate loading and animate stats
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Animate stats counting up
      animateStats();
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const animateStats = () => {
    const targetStats = {
      chatSessions: 12,
      appointments: 3,
      journalEntries: 8,
    };
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);

      setStats({
        chatSessions: Math.floor(targetStats.chatSessions * easeOutCubic),
        appointments: Math.floor(targetStats.appointments * easeOutCubic),
        journalEntries: Math.floor(targetStats.journalEntries * easeOutCubic),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setStats(targetStats);
      }
    }, stepDuration);
  };

  const handleLogout = () => {
    navigate("/");
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const closeProfile = () => {
    setIsProfileOpen(false);
  };

  const toggleNotifications = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const closeNotifications = () => {
    setIsNotificationOpen(false);
  };

  // Profile sidebar data
  const profileFeatures = [
    {
      id: 1,
      title: "Account Settings",
      icon: Settings,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      onClick: () => console.log("Account Settings clicked"),
    },
    {
      id: 2,
      title: "Notifications",
      icon: Bell,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      onClick: () => console.log("Notifications clicked"),
    },

    {
      id: 3,
      title: "Help & Support",
      icon: HelpCircle,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      onClick: () => console.log("Help clicked"),
    },
  ];

  // Mock user data
  const userProfile = {
    name: "Ramesh",
    email: "ramesh.doe@newhorizonindia.edu",
    institution: "New Horizon College of Engineering",
    studentId: "1NH23AI612",
    joinDate: "January 2024",
    avatar: null, // You can add avatar URL here
  };

  // User statistics data
  const userStats = {
    totalSessions: 12,
    thisWeekSessions: 3,
    totalAppointments: 3,
    upcomingAppointments: 1,
    journalEntries: 8,
    thisWeekEntries: 2,
    goalsCompleted: 5,
    totalGoals: 8,
    streakDays: 7,
    lastActive: "2 hours ago",
  };

  const dashboardCards = [
    {
      id: 1,
      title: "Chat Support",
      description: "AI First-Aid & Friendly Chat Buddy",
      icon: MessageCircle,
      gradient: "from-blue-500 to-blue-600",
      hoverGradient: "from-blue-600 to-blue-700",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      onClick: () => navigate("/chat", { state: { isGuest: false } }),
      delay: "delay-0",
    },
    {
      id: 2,
      title: "Book Appointment",
      description: "Schedule with professional counsellors",
      icon: Calendar,
      gradient: "from-emerald-500 to-emerald-600",
      hoverGradient: "from-emerald-600 to-emerald-700",
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
      onClick: () => navigate("/appointment"),
      delay: "delay-100",
    },
    {
      id: 3,
      title: "Resource Hub",
      description: "Articles, videos & relaxation content",
      icon: BookOpen,
      gradient: "from-purple-500 to-purple-600",
      hoverGradient: "from-purple-600 to-purple-700",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      onClick: () => navigate("/resources"),
      delay: "delay-200",
    },
    {
      id: 4,
      title: "Peer Support",
      description: "Connect with fellow students",
      icon: Users,
      gradient: "from-orange-500 to-orange-600",
      hoverGradient: "from-orange-600 to-orange-700",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
      onClick: () => navigate("/forum"),
      delay: "delay-300",
    },
  ];

  const quickActions = [
    {
      title: "Quick Check-in",
      description: "How are you feeling today?",
      icon: Activity,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
    {
      title: "Set Goals",
      description: "Track your mental health goals",
      icon: Target,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Achievements",
      description: "View your progress milestones",
      icon: Award,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <Heart className="h-8 w-8 text-blue-600 mx-auto animate-pulse" />
          </div>
          <h2 className="text-xl font-semibold text-gray-700 mt-4">
            Loading your dashboard...
          </h2>
          <p className="text-gray-500 mt-2">
            Preparing your mental health journey
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      {/* Header */}
      <header className="relative bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Sahaara Logo - Leftmost */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-30"></div>
                <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl">
                  <Heart className="h-8 w-8 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Sahaara
                </h1>
                <p className="text-sm text-gray-500">
                  Mental Health Support Platform
                </p>
              </div>
            </div>

            {/* Profile Button - Rightmost */}
            <div className="flex items-center">
              <button
                onClick={toggleProfile}
                className="group flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-all duration-300 hover:bg-gray-100 rounded-lg"
              >
                <div className="relative">
                  {userProfile.avatar ? (
                    <img
                      src={userProfile.avatar}
                      alt="Profile"
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                  )}
                </div>
                <span className="font-medium hidden sm:block">Profile</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center space-x-2 mb-4">
            <Sparkles className="h-6 w-6 text-yellow-500 animate-pulse" />
            <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
              Welcome Back
            </span>
          </div>
          <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4 animate-fade-in">
            Ready to continue your journey?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Your mental health matters. Let's explore the tools and resources
            designed to support your wellbeing.
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {dashboardCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.id}
                onClick={card.onClick}
                className={`group relative bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 hover:scale-105 p-8 border border-white/20 animate-fade-in-up ${card.delay}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Card Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`}
                ></div>

                <div className="relative">
                  <div className="flex items-center mb-6">
                    <div
                      className={`relative p-4 rounded-2xl ${card.bgColor} group-hover:scale-110 transition-transform duration-300`}
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${card.gradient} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                      ></div>
                      <IconComponent
                        className={`h-8 w-8 ${card.iconColor} relative z-10`}
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 ml-6 group-hover:text-gray-800 transition-colors">
                      {card.title}
                    </h3>
                  </div>

                  <p className="text-gray-600 text-lg leading-relaxed mb-6 group-hover:text-gray-700 transition-colors">
                    {card.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-500 group-hover:text-gray-700 transition-colors">
                      <span className="font-medium">Get Started</span>
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <div
                      className={`w-2 h-2 rounded-full bg-gradient-to-r ${card.gradient} group-hover:scale-150 transition-transform`}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-white/20 animate-fade-in-up delay-1000">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <div
                  key={index}
                  className="group p-6 rounded-xl hover:bg-gray-50 transition-all duration-300 cursor-pointer border border-transparent hover:border-gray-200"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`p-3 rounded-lg ${action.bgColor} group-hover:scale-110 transition-transform`}
                    >
                      <IconComponent className={`h-6 w-6 ${action.color}`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 group-hover:text-gray-800">
                        {action.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>

      {/* Profile Sidebar */}
      {isProfileOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
            onClick={closeProfile}
          ></div>

          {/* Sidebar */}
          <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900">Profile</h2>
                <button
                  onClick={closeProfile}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              {/* Profile Info */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center space-x-3 mb-3">
                  {userProfile.avatar ? (
                    <img
                      src={userProfile.avatar}
                      alt="Profile"
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-12 w-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-white" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-base font-bold text-gray-900">
                      {userProfile.name}
                    </h3>
                    <p className="text-xs text-gray-500">{userProfile.email}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 bg-blue-50 rounded">
                      <Shield className="h-3 w-3 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-900">
                        {userProfile.institution}
                      </p>
                      <p className="text-xs text-gray-500">Institution</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 bg-green-50 rounded">
                      <Award className="h-3 w-3 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-900">
                        {userProfile.studentId}
                      </p>
                      <p className="text-xs text-gray-500">Student ID</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 bg-purple-50 rounded">
                      <Calendar className="h-3 w-3 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-900">
                        {userProfile.joinDate}
                      </p>
                      <p className="text-xs text-gray-500">Member since</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="flex-1 p-4">
                <h3 className="text-base font-semibold text-gray-900 mb-3">
                  Features & Settings
                </h3>
                <div className="space-y-2">
                  {profileFeatures.map((feature) => {
                    const IconComponent = feature.icon;
                    return (
                      <button
                        key={feature.id}
                        onClick={feature.onClick}
                        className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
                      >
                        <div className={`p-2 rounded ${feature.bgColor}`}>
                          <IconComponent
                            className={`h-4 w-4 ${feature.color}`}
                          />
                        </div>
                        <div className="flex-1 text-left">
                          <h4 className="text-sm font-medium text-gray-900 group-hover:text-gray-800">
                            {feature.title}
                          </h4>
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-200">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors duration-200"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="font-medium">Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
