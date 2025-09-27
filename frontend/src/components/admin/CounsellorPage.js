import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  X,
  Clock,
  User,
  Sparkles,
  TrendingUp,
  Heart,
  Shield,
  ArrowRight,
  Calendar,
  Star,
  CheckCircle,
  Users,
  MessageCircle,
  Phone,
  Mail,
  LogOut,
} from "lucide-react";

const CounsellorPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("appointments");

  // Mock data for appointments
  const pendingAppointments = [
    {
      id: 1,
      studentId: "STU001",
      studentName: "Anonymous Student",
      date: "2024-01-15",
      time: "10:00 AM",
      issue: "Exam Anxiety",
      priority: "High",
      notes: "Student reported severe anxiety about upcoming final exams",
    },
    {
      id: 2,
      studentId: "STU002",
      studentName: "Anonymous Student",
      date: "2024-01-16",
      time: "2:00 PM",
      issue: "Social Anxiety",
      priority: "Medium",
      notes: "Difficulty making friends in college",
    },
    {
      id: 3,
      studentId: "STU003",
      studentName: "Anonymous Student",
      date: "2024-01-17",
      time: "11:00 AM",
      issue: "Family Pressure",
      priority: "High",
      notes: "Parents pressuring about career choices",
    },
  ];

  const sessionNotes = [
    {
      id: 1,
      studentId: "STU001",
      date: "2024-01-10",
      duration: "45 minutes",
      notes:
        "Discussed coping strategies for exam anxiety. Student responded well to breathing exercises.",
      followUp: "Scheduled follow-up session for next week",
    },
    {
      id: 2,
      studentId: "STU004",
      date: "2024-01-08",
      duration: "30 minutes",
      notes:
        "Addressed relationship issues with roommate. Provided conflict resolution strategies.",
      followUp: "Student to practice communication techniques",
    },
  ];

  const handleApproveAppointment = (appointmentId) => {
    alert(`Appointment ${appointmentId} approved!`);
  };

  const handleRejectAppointment = (appointmentId) => {
    alert(`Appointment ${appointmentId} rejected.`);
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
                Counsellor Dashboard
              </h1>
              <div className="flex items-center justify-center space-x-2 mt-2">
                <Sparkles className="h-4 w-4 text-yellow-500 animate-pulse" />
                <p className="text-gray-600 font-medium">Dr. Priya Sharma</p>
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

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="mb-12">
          <div className="flex space-x-2 bg-white/80 backdrop-blur-sm rounded-2xl p-2 w-fit shadow-lg border border-white/20">
            <button
              onClick={() => setActiveTab("appointments")}
              className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeTab === "appointments"
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              Pending Appointments
            </button>
            <button
              onClick={() => setActiveTab("notes")}
              className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeTab === "notes"
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              Session Notes
            </button>
          </div>
        </div>

        {/* Appointments Tab */}
        {activeTab === "appointments" && (
          <div className="space-y-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 animate-fade-in-up">
              <div className="px-8 py-6 border-b border-white/20">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Pending Appointment Requests
                </h2>
                <p className="text-gray-600 text-lg">
                  Review and approve student appointment requests
                </p>
              </div>

              <div className="p-8">
                <div className="space-y-6">
                  {pendingAppointments.map((appointment, index) => (
                    <div
                      key={appointment.id}
                      className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-white/20 hover:-translate-y-1 animate-fade-in-up"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                              <User className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <span className="text-xl font-bold text-gray-900">
                                {appointment.studentName}
                              </span>
                              <span className="text-sm text-gray-500 ml-2">
                                ({appointment.studentId})
                              </span>
                            </div>
                            <div
                              className={`px-3 py-1 rounded-xl text-xs font-semibold ${
                                appointment.priority === "High"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {appointment.priority} Priority
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="flex items-center text-sm text-gray-600">
                              <Clock className="h-4 w-4 text-blue-500 mr-2" />
                              {appointment.date} at {appointment.time}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Heart className="h-4 w-4 text-red-500 mr-2" />
                              <strong>Issue:</strong> {appointment.issue}
                            </div>
                          </div>

                          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 mb-4">
                            <p className="text-sm text-gray-700 leading-relaxed">
                              <strong>Student Notes:</strong>{" "}
                              {appointment.notes}
                            </p>
                          </div>
                        </div>

                        <div className="flex space-x-3 ml-6">
                          <button
                            onClick={() =>
                              handleApproveAppointment(appointment.id)
                            }
                            className="flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                          >
                            {/* <Check className="h-5 w-5 mr-2" /> */}
                            Approve
                          </button>
                          <button
                            onClick={() =>
                              handleRejectAppointment(appointment.id)
                            }
                            className="flex items-center px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-xl hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                          >
                            {/* <X className="h-5 w-5 mr-2" /> */}
                            Reschedule
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Session Notes Tab */}
        {activeTab === "notes" && (
          <div className="space-y-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 animate-fade-in-up">
              <div className="px-8 py-6 border-b border-white/20">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Session Notes
                </h2>
                <p className="text-gray-600 text-lg">
                  View and manage your session notes
                </p>
              </div>

              <div className="p-8">
                <div className="space-y-6">
                  {sessionNotes.map((note, index) => (
                    <div
                      key={note.id}
                      className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-white/20 hover:-translate-y-1 animate-fade-in-up"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <User className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <span className="text-xl font-bold text-gray-900">
                              {note.studentId}
                            </span>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <Calendar className="h-4 w-4 mr-1" />
                              {note.date} - {note.duration}
                            </div>
                          </div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold px-3 py-1 rounded-lg hover:bg-blue-50 transition-colors">
                          Edit Notes
                        </button>
                      </div>

                      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">
                          Session Notes:
                        </h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {note.notes}
                        </p>
                      </div>

                      <div className="mt-4">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">
                          Follow-up Actions:
                        </h4>
                        <p className="text-sm text-gray-600 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-3">
                          {note.followUp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Add New Notes */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Add New Session Notes
              </h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-3">
                      Student ID
                    </label>
                    <input
                      type="text"
                      className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-gray-300 text-lg"
                      placeholder="Enter student ID"
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-3">
                      Session Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-gray-300 text-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-3">
                    Session Notes
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-gray-300 text-lg"
                    placeholder="Enter detailed session notes..."
                  ></textarea>
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-3">
                    Follow-up Actions
                  </label>
                  <textarea
                    rows={2}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-gray-300 text-lg"
                    placeholder="Enter follow-up actions or recommendations..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Save Notes
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Statistics Dashboard */}
        <div className="mt-16 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Counsellor Statistics
            </h3>
            <p className="text-gray-600 text-lg">
              Track your professional performance
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-2">
                {pendingAppointments.length}
              </h4>
              <p className="text-gray-600">Pending Appointments</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-2">
                {sessionNotes.length}
              </h4>
              <p className="text-gray-600">Completed Sessions</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-2">
                {new Set(sessionNotes.map((note) => note.studentId)).size}
              </h4>
              <p className="text-gray-600">Students Helped</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-2">4.8</h4>
              <p className="text-gray-600">Average Rating</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounsellorPage;
