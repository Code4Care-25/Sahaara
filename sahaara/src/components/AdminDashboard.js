import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  MessageCircle,
  Calendar,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import { analyticsData } from "../data/mockData";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/")}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Login
            </button>
            <h1 className="text-2xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <div className="text-sm text-gray-600">System Administrator</div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">
                  {analyticsData.monthlyStats.totalUsers.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Active Users
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {analyticsData.monthlyStats.activeUsers.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <MessageCircle className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Sessions Completed
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {analyticsData.monthlyStats.sessionsCompleted.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Appointments Booked
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {analyticsData.monthlyStats.appointmentsBooked}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly Trends */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Monthly Usage Trends
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData.monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  name="Users"
                />
                <Line
                  type="monotone"
                  dataKey="sessions"
                  stroke="#10B981"
                  strokeWidth={2}
                  name="Sessions"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Common Issues */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Common Mental Health Issues
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analyticsData.commonIssues}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ issue, percentage }) => `${issue}: ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="percentage"
                >
                  {analyticsData.commonIssues.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Issue Distribution Bar Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Issue Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData.commonIssues}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="issue" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="percentage" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* System Health */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              System Health
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm font-medium text-gray-900">
                    Server Status
                  </span>
                </div>
                <span className="text-sm text-green-600 font-medium">
                  Operational
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm font-medium text-gray-900">
                    Database
                  </span>
                </div>
                <span className="text-sm text-green-600 font-medium">
                  Connected
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                  <span className="text-sm font-medium text-gray-900">
                    AI Chatbot
                  </span>
                </div>
                <span className="text-sm text-yellow-600 font-medium">
                  High Load
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm font-medium text-gray-900">
                    Counsellor Portal
                  </span>
                </div>
                <span className="text-sm text-green-600 font-medium">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Future Predictions */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Future Predictions (Prophet Forecast)
          </h3>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <TrendingUp className="h-6 w-6 text-blue-600 mr-2" />
              <h4 className="text-lg font-medium text-gray-900">
                Predicted Trends for Next 3 Months
              </h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">+15%</p>
                <p className="text-sm text-gray-600">Expected User Growth</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">+22%</p>
                <p className="text-sm text-gray-600">Session Increase</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">+8%</p>
                <p className="text-sm text-gray-600">Appointment Bookings</p>
              </div>
            </div>
            <div className="mt-4 p-4 bg-white rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Key Insights:</strong> Based on current trends and
                seasonal patterns, we expect a significant increase in user
                engagement during exam periods. The system is predicted to
                handle 1,500+ concurrent users by March 2024.
              </p>
            </div>
          </div>
        </div>

        {/* Alerts and Notifications */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            System Alerts
          </h3>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  High Server Load
                </p>
                <p className="text-sm text-gray-600">
                  Consider scaling up server resources during peak hours
                </p>
              </div>
            </div>

            <div className="flex items-center p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
              <AlertTriangle className="h-5 w-5 text-blue-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  New Feature Available
                </p>
                <p className="text-sm text-gray-600">
                  Voice-enabled chatbot is ready for deployment
                </p>
              </div>
            </div>

            <div className="flex items-center p-3 bg-green-50 border-l-4 border-green-400 rounded">
              <AlertTriangle className="h-5 w-5 text-green-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  System Update Complete
                </p>
                <p className="text-sm text-gray-600">
                  Latest security patches have been applied successfully
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

