import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Star,
  CheckCircle,
  Sparkles,
  User,
  ArrowRight,
  Ticket,
  History,
  X,
} from "lucide-react";
import { counsellors } from "../data/mockData";

const AppointmentBooking = () => {
  const navigate = useNavigate();
  const [selectedCounsellor, setSelectedCounsellor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    issue: "",
    notes: "",
    priority: "Medium",
  });
  const [isBookingComplete, setIsBookingComplete] = useState(false);
  const [showFlashMessage, setShowFlashMessage] = useState(false);
  const [flashMessage, setFlashMessage] = useState("");
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [ticketId, setTicketId] = useState("");

  // Mock recent bookings data
  const recentBookings = [
    {
      id: 1,
      counsellor: "Dr. Priya Sharma",
      date: "2024-01-10",
      time: "2:00 PM",
      status: "Completed",
      issue: "Anxiety & Stress",
    },
    {
      id: 2,
      counsellor: "Dr. Rajesh Kumar",
      date: "2024-01-12",
      time: "10:00 AM",
      status: "Upcoming",
      issue: "Academic Pressure",
    },
    {
      id: 3,
      counsellor: "Dr. Anjali Mehta",
      date: "2024-01-08",
      time: "3:00 PM",
      status: "Completed",
      issue: "Relationship Issues",
    },
  ];

  const handleBookAppointment = () => {
    if (selectedCounsellor && selectedSlot) {
      setShowBookingForm(true);
    }
  };

  const showFlash = (message, type = "success") => {
    setFlashMessage(message);
    setShowFlashMessage(true);
    setTimeout(() => {
      setShowFlashMessage(false);
    }, 3000);
  };

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    setIsBookingComplete(true);
    showFlash("Appointment booked successfully! Redirecting to dashboard...");
    // Simulate booking success
    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  };

  const handleTicketBooking = (e) => {
    e.preventDefault();
    if (ticketId.trim()) {
      showFlash(
        `Booking with ticket ID: ${ticketId}. Redirecting to dashboard...`
      );
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } else {
      showFlash("Please enter a valid ticket ID", "error");
    }
  };

  if (isBookingComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-12 text-center max-w-md mx-4">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Booking Confirmed!
          </h2>
          <p className="text-gray-600 mb-6">
            Your appointment has been successfully booked. You will receive a
            confirmation email shortly.
          </p>
          <div className="space-y-3 text-sm text-gray-500">
            <p>
              <strong>Counsellor:</strong> {selectedCounsellor?.name}
            </p>
            <p>
              <strong>Date:</strong> {selectedSlot?.date}
            </p>
            <p>
              <strong>Time:</strong> {selectedSlot?.time}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Flash Message */}
      {showFlashMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
          <div
            className={`px-6 py-3 rounded-lg shadow-lg ${
              flashMessage.includes("error")
                ? "bg-red-100 text-red-800 border border-red-200"
                : "bg-green-100 text-green-800 border border-green-200"
            }`}
          >
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">{flashMessage}</span>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="relative bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/dashboard")}
              className="group flex items-center text-gray-600 hover:text-gray-900 transition-all duration-300 hover:bg-gray-100 rounded-lg px-4 py-2"
            >
              <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Dashboard
            </button>
            <div className="text-center">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                Book an Appointment
              </h1>
              <div className="flex items-center justify-center space-x-2 mt-2">
                <Sparkles className="h-4 w-4 text-yellow-500 animate-pulse" />
                <p className="text-gray-600 font-medium">
                  Mental Health Support
                </p>
              </div>
            </div>
            <div className="w-24"></div>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-8">
        {!showBookingForm && !showTicketForm ? (
          /* Counsellor Selection with Parallel Layout */
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Select a Counsellor
              </h2>
              <p className="text-gray-600">
                Choose from our team of experienced mental health professionals
              </p>
            </div>

            {/* Parallel Layout: Counsellors and Booking Form */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Counsellors List */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  {counsellors.map((counsellor, index) => (
                    <div
                      key={counsellor.id}
                      className={`group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 border-2 ${
                        selectedCounsellor?.id === counsellor.id
                          ? "border-blue-500 bg-blue-50/50"
                          : "border-white/20 hover:border-blue-200"
                      }`}
                      onClick={() => setSelectedCounsellor(counsellor)}
                    >
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                          <span className="text-white font-bold text-sm">
                            {counsellor.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-gray-900">
                            {counsellor.name}
                          </h3>
                          <p className="text-gray-600 text-xs">
                            {counsellor.specialization}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2 mb-3">
                        <div className="flex items-center text-gray-600 text-xs">
                          <Clock className="h-3 w-3 mr-1 text-blue-500" />
                          <span>{counsellor.experience} experience</span>
                        </div>
                        <div className="flex items-center text-gray-600 text-xs">
                          <Star className="h-3 w-3 mr-1 text-yellow-500" />
                          <span>{counsellor.rating}/5.0 rating</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs font-semibold text-gray-700 mb-1">
                          Available Slots:
                        </h4>
                        <div className="space-y-1">
                          {counsellor.availableSlots
                            .filter((slot) => slot.available)
                            .slice(0, 2)
                            .map((slot, slotIndex) => (
                              <div
                                key={slotIndex}
                                className={`text-xs p-2 rounded-lg transition-all duration-300 ${
                                  selectedSlot?.date === slot.date &&
                                  selectedSlot?.time === slot.time
                                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedSlot(slot);
                                }}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-medium">
                                    {slot.date}
                                  </span>
                                  <span className="font-semibold">
                                    {slot.time}
                                  </span>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Booking Form Side */}
              <div className="space-y-4">
                {/* Ticket ID Button */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 border border-white/20">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                    <Ticket className="h-5 w-5 mr-2 text-blue-500" />
                    Quick Booking Options
                  </h3>
                  <button
                    onClick={() => setShowTicketForm(true)}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"
                  >
                    <Ticket className="h-4 w-4 mr-2" />
                    Book with Existing Ticket ID
                  </button>
                </div>

                {/* Selected Appointment Summary */}
                {selectedCounsellor && selectedSlot && (
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 border border-white/20">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      Selected Appointment
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {selectedCounsellor.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-sm">
                            {selectedCounsellor.name}
                          </h4>
                          <p className="text-gray-600 text-xs">
                            {selectedCounsellor.specialization}
                          </p>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium text-gray-700">
                            Date:
                          </span>
                          <span className="text-gray-900">
                            {selectedSlot.date}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm mt-1">
                          <span className="font-medium text-gray-700">
                            Time:
                          </span>
                          <span className="text-gray-900">
                            {selectedSlot.time}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={handleBookAppointment}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"
                      >
                        Book Appointment
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Bookings Section - Moved to Bottom */}
            <div className="mt-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center">
                    <History className="h-5 w-5 mr-2 text-blue-500" />
                    Recent Bookings
                  </h2>
                </div>
                <div className="space-y-3">
                  {recentBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {booking.counsellor
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {booking.counsellor}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {booking.issue}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">
                            {booking.date}
                          </span>
                          <span className="text-sm text-gray-600">
                            {booking.time}
                          </span>
                        </div>
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            booking.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : showTicketForm ? (
          /* Ticket Booking Form */
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <div className="text-center flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Book with Ticket ID
                  </h2>
                  <p className="text-gray-600">
                    Enter your existing ticket ID to book an appointment
                  </p>
                </div>
                <button
                  onClick={() => setShowTicketForm(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleTicketBooking} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ticket ID
                  </label>
                  <input
                    type="text"
                    value={ticketId}
                    onChange={(e) => setTicketId(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your ticket ID (e.g., TKT-123456)"
                    required
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowTicketForm(false)}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-all duration-300 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Book with Ticket
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-white/20">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Complete Your Booking
                </h2>
                <p className="text-gray-600">
                  Please provide some details about your appointment
                </p>
              </div>

              <form onSubmit={handleSubmitBooking} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    What would you like to discuss?
                  </label>
                  <select
                    value={bookingDetails.issue}
                    onChange={(e) =>
                      setBookingDetails({
                        ...bookingDetails,
                        issue: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    required
                  >
                    <option value="">Select an issue</option>
                    <option value="anxiety">Anxiety & Stress</option>
                    <option value="depression">Depression</option>
                    <option value="academic">Academic Pressure</option>
                    <option value="relationships">Relationship Issues</option>
                    <option value="career">Career Guidance</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Priority Level
                  </label>
                  <select
                    value={bookingDetails.priority}
                    onChange={(e) =>
                      setBookingDetails({
                        ...bookingDetails,
                        priority: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    value={bookingDetails.notes}
                    onChange={(e) =>
                      setBookingDetails({
                        ...bookingDetails,
                        notes: e.target.value,
                      })
                    }
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Please share any additional information that might help the counsellor prepare for your session..."
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowBookingForm(false)}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-all duration-300 font-semibold"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentBooking;
