import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  MessageCircle,
  Calendar,
  TrendingUp,
  AlertTriangle,
  Sparkles,
  Heart,
  Shield,
  ArrowRight,
  CheckCircle,
  Clock,
  Star,
  Filter,
  Search,
  RefreshCw,
  Download,
  Eye,
  LogOut,
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
import {
  analyticsData,
  academicYears,
  departments,
  filterCategories,
  colleges,
} from "../data/mockData";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Filter states
  const [filters, setFilters] = useState({
    academicYear: "",
    department: "",
    category: "",
    college: "",
    dateRange: "all",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [filteredData, setFilteredData] = useState(analyticsData);

  const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

  // Filter data based on selected filters
  const applyFilters = () => {
    let filtered = { ...analyticsData };

    if (filters.academicYear) {
      filtered.academicYearBreakdown =
        analyticsData.academicYearBreakdown.filter(
          (item) => item.year === filters.academicYear
        );
    }

    if (filters.department) {
      filtered.departmentBreakdown = analyticsData.departmentBreakdown.filter(
        (item) => item.department === filters.department
      );
    }

    if (filters.category) {
      filtered.categoryBreakdown = analyticsData.categoryBreakdown.filter(
        (item) => item.category === filters.category
      );
    }

    setFilteredData(filtered);
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      academicYear: "",
      department: "",
      category: "",
      college: "",
      dateRange: "all",
    });
    setFilteredData(analyticsData);
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      {/* Header */}
      <div className="relative bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/")}
              className="group flex items-center text-gray-600 hover:text-gray-900 transition-all duration-300 hover:bg-gray-100 rounded-lg px-4 py-2"
            >
              <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Login
            </button>
            <div className="text-center">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <div className="flex items-center justify-center space-x-2 mt-2">
                <Sparkles className="h-4 w-4 text-yellow-500 animate-pulse" />
                <p className="text-gray-600 font-medium">
                  System Administrator
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="group flex items-center text-red-600 hover:text-red-900 transition-all duration-300 hover:bg-red-100 rounded-lg px-4 py-2"
            >
              <LogOut className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Filter Panel */}
      <div className="relative bg-white/60 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </button>
              <button
                onClick={applyFilters}
                className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                <Search className="h-4 w-4" />
                <span>Apply</span>
              </button>
              <button
                onClick={resetFilters}
                className="flex items-center space-x-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Reset</span>
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-2 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
              <button className="flex items-center space-x-2 bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors">
                <Eye className="h-4 w-4" />
                <span>View Details</span>
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-4 bg-white/80 rounded-lg border border-gray-200">
              {/* Academic Year Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Academic Year
                </label>
                <select
                  value={filters.academicYear}
                  onChange={(e) =>
                    setFilters({ ...filters, academicYear: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Years</option>
                  {academicYears.map((year) => (
                    <option key={year.id} value={year.name}>
                      {year.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Department Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Department
                </label>
                <select
                  value={filters.department}
                  onChange={(e) =>
                    setFilters({ ...filters, department: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Departments</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.name}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Issue Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) =>
                    setFilters({ ...filters, category: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Categories</option>
                  {filterCategories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* College Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  College
                </label>
                <select
                  value={filters.college}
                  onChange={(e) =>
                    setFilters({ ...filters, college: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Colleges</option>
                  {colleges.map((college) => (
                    <option key={college.id} value={college.name}>
                      {college.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Range Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date Range 1
                </label>
                <select
                  value={filters.dateRange}
                  onChange={(e) =>
                    setFilters({ ...filters, dateRange: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Time</option>
                  <option value="7d">Last 7 Days</option>
                  <option value="30d">Last 30 Days</option>
                  <option value="90d">Last 3 Months</option>
                  <option value="1y">Last Year</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div className="ml-6">
                <p className="text-sm font-semibold text-gray-600 mb-1">
                  Total Users
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {analyticsData.monthlyStats.totalUsers.toLocaleString()}
                </p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600 font-medium">
                    +12%
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up"
            style={{ animationDelay: "100ms" }}
          >
            <div className="flex items-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div className="ml-6">
                <p className="text-sm font-semibold text-gray-600 mb-1">
                  Active Users
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {analyticsData.monthlyStats.activeUsers.toLocaleString()}
                </p>
                <div className="flex items-center mt-1">
                  <Clock className="h-4 w-4 text-blue-500 mr-1" />
                  <span className="text-sm text-blue-600 font-medium">
                    Live
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
            <div className="flex items-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
              <div className="ml-6">
                <p className="text-sm font-semibold text-gray-600 mb-1">
                  Sessions Completed
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {analyticsData.monthlyStats.sessionsCompleted.toLocaleString()}
                </p>
                <div className="flex items-center mt-1">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600 font-medium">
                    This month
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up"
            style={{ animationDelay: "300ms" }}
          >
            <div className="flex items-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <div className="ml-6">
                <p className="text-sm font-semibold text-gray-600 mb-1">
                  Appointments Booked
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {analyticsData.monthlyStats.appointmentsBooked}
                </p>
                <div className="flex items-center mt-1">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="text-sm text-yellow-600 font-medium">
                    Success
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Monthly Trends */}
          <div
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 animate-fade-in-up"
            style={{ animationDelay: "400ms" }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Monthly Usage Trends
              </h3>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Users</span>
                <div className="w-3 h-3 bg-green-500 rounded-full ml-4"></div>
                <span className="text-sm text-gray-600">Sessions</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData.monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    border: "none",
                    borderRadius: "12px",
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  name="Users"
                  dot={{ fill: "#3B82F6", strokeWidth: 2, r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="sessions"
                  stroke="#10B981"
                  strokeWidth={3}
                  name="Sessions"
                  dot={{ fill: "#10B981", strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Common Issues */}
          <div
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 animate-fade-in-up"
            style={{ animationDelay: "500ms" }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Common Mental Health Issues
              </h3>
              <div className="text-sm text-gray-600">
                Distribution by Category
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analyticsData.commonIssues}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ issue, percentage }) => `${issue}: ${percentage}%`}
                  outerRadius={100}
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
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    border: "none",
                    borderRadius: "12px",
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Issue Distribution Bar Chart */}
          <div
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 animate-fade-in-up"
            style={{ animationDelay: "600ms" }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Issue Distribution
              </h3>
              <div className="text-sm text-gray-600">Student Reports</div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData.commonIssues}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="issue" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    border: "none",
                    borderRadius: "12px",
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Bar
                  dataKey="percentage"
                  fill="url(#colorGradient)"
                  radius={[4, 4, 0, 0]}
                />
                <defs>
                  <linearGradient
                    id="colorGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#3B82F6" />
                    <stop offset="95%" stopColor="#1D4ED8" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* System Health */}
          <div
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 animate-fade-in-up"
            style={{ animationDelay: "700ms" }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                System Health
              </h3>
              <div className="text-sm text-gray-600">Live Status</div>
            </div>
            <div className="space-y-4">
              <div className="group flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl hover:from-green-100 hover:to-emerald-100 transition-all duration-300">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3 group-hover:scale-125 transition-transform"></div>
                  <span className="text-sm font-semibold text-gray-900">
                    Server Status
                  </span>
                </div>
                <span className="text-sm text-green-600 font-semibold">
                  Operational
                </span>
              </div>

              <div className="group flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl hover:from-green-100 hover:to-emerald-100 transition-all duration-300">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3 group-hover:scale-125 transition-transform"></div>
                  <span className="text-sm font-semibold text-gray-900">
                    Database
                  </span>
                </div>
                <span className="text-sm text-green-600 font-semibold">
                  Connected
                </span>
              </div>

              <div className="group flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl hover:from-yellow-100 hover:to-orange-100 transition-all duration-300">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3 group-hover:scale-125 transition-transform"></div>
                  <span className="text-sm font-semibold text-gray-900">
                    AI Chatbot
                  </span>
                </div>
                <span className="text-sm text-yellow-600 font-semibold">
                  High Load
                </span>
              </div>

              <div className="group flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl hover:from-green-100 hover:to-emerald-100 transition-all duration-300">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3 group-hover:scale-125 transition-transform"></div>
                  <span className="text-sm font-semibold text-gray-900">
                    Counsellor Portal
                  </span>
                </div>
                <span className="text-sm text-green-600 font-semibold">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Year Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Academic Year Breakdown */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 animate-fade-in-up">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Academic Year Breakdown
              </h3>
              <div className="text-sm text-gray-600">Student Distribution</div>
            </div>
            <div className="space-y-4">
              {filteredData.academicYearBreakdown.map((year, index) => (
                <div
                  key={year.year}
                  className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-gray-900">{year.year}</h4>
                    <span className="text-sm text-gray-600">
                      {year.users} users
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Sessions: {year.sessions}</span>
                    <span>
                      Avg: {Math.round(year.sessions / year.users)} per user
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {year.issues.map((issue, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {issue}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Department Analytics */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 animate-fade-in-up">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Department Analytics
              </h3>
              <div className="text-sm text-gray-600">Issue Distribution</div>
            </div>
            <div className="space-y-4">
              {filteredData.departmentBreakdown.map((dept, index) => (
                <div
                  key={dept.department}
                  className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-gray-900">
                      {dept.department}
                    </h4>
                    <span className="text-sm text-gray-600">
                      {dept.users} users
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Sessions: {dept.sessions}</span>
                    <span>
                      Avg: {Math.round(dept.sessions / dept.users)} per user
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {dept.topIssues.map((issue, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                      >
                        {issue}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Category Breakdown Chart */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 mb-12 animate-fade-in-up">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              Issue Category Distribution
            </h3>
            <div className="text-sm text-gray-600">Filtered Data</div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={filteredData.categoryBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ category, percentage }) =>
                      `${category}: ${percentage}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="percentage"
                  >
                    {filteredData.categoryBreakdown.map((entry, index) => (
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
            <div className="space-y-4">
              {filteredData.categoryBreakdown.map((category, index) => (
                <div
                  key={category.category}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center">
                    <div
                      className="w-4 h-4 rounded-full mr-3"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span className="font-medium text-gray-900">
                      {category.category}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">
                      {category.count} cases
                    </div>
                    <div className="text-sm text-gray-600">
                      {category.percentage}%
                    </div>
                  </div>
                </div>
              ))}
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
