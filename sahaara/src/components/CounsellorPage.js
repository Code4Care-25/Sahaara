import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, X, Clock, User } from "lucide-react";

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
              Counsellor Dashboard
            </h1>
            <div className="text-sm text-gray-600">Dr. Priya Sharma</div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 w-fit">
            <button
              onClick={() => setActiveTab("appointments")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "appointments"
                  ? "bg-white text-primary-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Pending Appointments
            </button>
            <button
              onClick={() => setActiveTab("notes")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "notes"
                  ? "bg-white text-primary-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Session Notes
            </button>
          </div>
        </div>

        {/* Appointments Tab */}
        {activeTab === "appointments" && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  Pending Appointment Requests
                </h2>
                <p className="text-gray-600 mt-1">
                  Review and approve student appointment requests
                </p>
              </div>

              <div className="divide-y divide-gray-200">
                {pendingAppointments.map((appointment) => (
                  <div key={appointment.id} className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-3">
                          <div className="flex items-center space-x-2">
                            <User className="h-5 w-5 text-gray-400" />
                            <span className="font-medium text-gray-900">
                              {appointment.studentName}
                            </span>
                            <span className="text-sm text-gray-500">
                              ({appointment.studentId})
                            </span>
                          </div>
                          <div
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              appointment.priority === "High"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {appointment.priority} Priority
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="h-4 w-4 mr-2" />
                            {appointment.date} at {appointment.time}
                          </div>
                          <div className="text-sm text-gray-600">
                            <strong>Issue:</strong> {appointment.issue}
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-sm text-gray-700">
                            <strong>Student Notes:</strong> {appointment.notes}
                          </p>
                        </div>
                      </div>

                      <div className="flex space-x-2 ml-6">
                        <button
                          onClick={() =>
                            handleApproveAppointment(appointment.id)
                          }
                          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                        >
                          <Check className="h-4 w-4 mr-2" />
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            handleRejectAppointment(appointment.id)
                          }
                          className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Session Notes Tab */}
        {activeTab === "notes" && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  Session Notes
                </h2>
                <p className="text-gray-600 mt-1">
                  View and manage your session notes
                </p>
              </div>

              <div className="divide-y divide-gray-200">
                {sessionNotes.map((note) => (
                  <div key={note.id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center space-x-4 mb-2">
                          <span className="font-medium text-gray-900">
                            {note.studentId}
                          </span>
                          <span className="text-sm text-gray-500">
                            {note.date}
                          </span>
                          <span className="text-sm text-gray-500">
                            {note.duration}
                          </span>
                        </div>
                      </div>
                      <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        Edit Notes
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-1">
                          Session Notes:
                        </h4>
                        <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                          {note.notes}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-1">
                          Follow-up Actions:
                        </h4>
                        <p className="text-sm text-gray-600 bg-blue-50 rounded-lg p-3">
                          {note.followUp}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add New Notes */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Add New Session Notes
              </h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Student ID
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter student ID"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Session Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Session Notes
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter detailed session notes..."
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Follow-up Actions
                  </label>
                  <textarea
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter follow-up actions or recommendations..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                >
                  Save Notes
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CounsellorPage;
