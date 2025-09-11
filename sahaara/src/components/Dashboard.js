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
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
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
      onClick: () => navigate("/chat"),
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
    {
      id: 5,
      title: "Personal Journal",
      description: "Record your thoughts & reflections",
      icon: FileText,
      gradient: "from-pink-500 to-pink-600",
      hoverGradient: "from-pink-600 to-pink-700",
      bgColor: "bg-pink-50",
      iconColor: "text-pink-600",
      onClick: () => navigate("/journal"),
      delay: "delay-400",
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
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
            <button
              onClick={handleLogout}
              className="group flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-all duration-300 hover:bg-gray-100 rounded-lg"
            >
              <LogOut className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Logout</span>
            </button>
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

        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-white/20 hover:shadow-xl transition-all duration-300 animate-fade-in-up delay-500">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <MessageCircle className="h-8 w-8 text-blue-600" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                Chat Sessions
              </p>
              <p className="text-4xl font-bold text-gray-900">
                {stats.chatSessions}
              </p>
              <p className="text-sm text-green-600 font-medium">+2 this week</p>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-white/20 hover:shadow-xl transition-all duration-300 animate-fade-in-up delay-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-emerald-100 rounded-xl">
                <Calendar className="h-8 w-8 text-emerald-600" />
              </div>
              <Clock className="h-5 w-5 text-blue-500" />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                Appointments
              </p>
              <p className="text-4xl font-bold text-gray-900">
                {stats.appointments}
              </p>
              <p className="text-sm text-blue-600 font-medium">
                Next: Tomorrow
              </p>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-white/20 hover:shadow-xl transition-all duration-300 animate-fade-in-up delay-900">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <FileText className="h-8 w-8 text-purple-600" />
              </div>
              <CheckCircle className="h-5 w-5 text-purple-500" />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                Journal Entries
              </p>
              <p className="text-4xl font-bold text-gray-900">
                {stats.journalEntries}
              </p>
              <p className="text-sm text-purple-600 font-medium">+1 today</p>
            </div>
          </div>
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
    </div>
  );
};

export default Dashboard;
