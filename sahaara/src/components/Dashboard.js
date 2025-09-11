import React from "react";
import { useNavigate } from "react-router-dom";
import {
  MessageCircle,
  Calendar,
  BookOpen,
  Users,
  FileText,
  LogOut,
  Heart,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const dashboardCards = [
    {
      id: 1,
      title: "Chat Support",
      description: "AI First-Aid & Friendly Chat Buddy",
      icon: MessageCircle,
      color: "bg-blue-500",
      onClick: () => navigate("/chat"),
    },
    {
      id: 2,
      title: "Book Appointment",
      description: "Schedule with professional counsellors",
      icon: Calendar,
      color: "bg-green-500",
      onClick: () => navigate("/appointment"),
    },
    {
      id: 3,
      title: "Resource Hub",
      description: "Articles, videos & relaxation content",
      icon: BookOpen,
      color: "bg-purple-500",
      onClick: () => navigate("/resources"),
    },
    {
      id: 4,
      title: "Peer Support",
      description: "Connect with fellow students",
      icon: Users,
      color: "bg-orange-500",
      onClick: () => navigate("/forum"),
    },
    {
      id: 5,
      title: "Personal Journal",
      description: "Record your thoughts & reflections",
      icon: FileText,
      color: "bg-pink-500",
      onClick: () => navigate("/journal"),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-primary-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Sahaara</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back!
          </h2>
          <p className="text-gray-600 text-lg">
            How can we support your mental health journey today?
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardCards.map((card) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.id}
                onClick={card.onClick}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 p-6 border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg ${card.color} text-white`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 ml-4">
                    {card.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {card.description}
                </p>
                <div className="mt-4 flex items-center text-primary-600 text-sm font-medium">
                  Get Started
                  <svg
                    className="ml-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MessageCircle className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Chat Sessions
                </p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Appointments
                </p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Journal Entries
                </p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

