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
  Shield,
  Heart,
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
  const [ticketId, setTicketId] = useState("");

  const handleBookAppointment = () => {
    if (selectedCounsellor && selectedSlot) {
      setShowBookingForm(true);
    }
  };

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    // Generate mock ticket ID
    const newTicketId = `TKT${Date.now().toString().slice(-6)}`;
    setTicketId(newTicketId);
    alert(`Appointment booked successfully! Your ticket ID is: ${newTicketId}`);
  };

  const handleContinueWithTicket = () => {
    const inputTicketId = prompt("Enter your ticket ID:");
    if (inputTicketId) {
      setTicketId(inputTicketId);
      alert(`Continuing with ticket ID: ${inputTicketId}`);
    }
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
              onClick={() => navigate("/dashboard")}
              className="group flex items-center text-gray-600 hover:text-gray-900 transition-all duration-300 hover:bg-gray-100 rounded-lg px-4 py-2"
            >
              <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Dashboard
            </button>
            <div className="text-center">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
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
        {/* Quick Actions */}
        <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
            <div className="flex items-center mb-6">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl mr-4 group-hover:scale-110 transition-transform">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  New Appointment
                </h3>
                <p className="text-gray-600 text-lg">
                  Book a new appointment with our professional counsellors
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowBookingForm(false)}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-4 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"
            >
              Book Now
              <ArrowRight className="h-5 w-5 ml-2" />
            </button>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
            <div className="flex items-center mb-6">
              <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl mr-4 group-hover:scale-110 transition-transform">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Continue with Ticket
                </h3>
                <p className="text-gray-600 text-lg">
                  Already have a ticket ID? Continue your previous booking
                </p>
              </div>
            </div>
            <button
              onClick={handleContinueWithTicket}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"
            >
              Continue
              <ArrowRight className="h-5 w-5 ml-2" />
            </button>
          </div>
        </div>

        {!showBookingForm ? (
          /* Counsellor Selection */
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Select a Counsellor
              </h2>
              <p className="text-gray-600 text-lg">
                Choose from our team of experienced mental health professionals
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {counsellors.map((counsellor, index) => (
                <div
                  key={counsellor.id}
                  className={`group bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 cursor-pointer transition-all duration-500 hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105 border-2 ${
                    selectedCounsellor?.id === counsellor.id
                      ? "border-blue-500 bg-blue-50/50"
                      : "border-white/20 hover:border-blue-200"
                  } animate-fade-in-up`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setSelectedCounsellor(counsellor)}
                >
                  <div className="flex items-center mb-6">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform">
                        <span className="text-white font-bold text-xl">
                          {counsellor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {counsellor.name}
                      </h3>
                      <p className="text-gray-600 font-medium">
                        {counsellor.specialization}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-5 w-5 mr-3 text-blue-500" />
                      <span className="font-medium">
                        {counsellor.experience} experience
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Star className="h-5 w-5 mr-3 text-yellow-500" />
                      <span className="font-medium">
                        {counsellor.rating}/5.0 rating
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-700">
                      Available Slots:
                    </h4>
                    <div className="space-y-2">
                      {counsellor.availableSlots
                        .filter((slot) => slot.available)
                        .slice(0, 3)
                        .map((slot, slotIndex) => (
                          <div
                            key={slotIndex}
                            className={`text-sm p-3 rounded-xl transition-all duration-300 ${
                              selectedSlot?.date === slot.date &&
                              selectedSlot?.time === slot.time
                                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedSlot(slot);
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{slot.date}</span>
                              <span className="font-semibold">{slot.time}</span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedCounsellor && selectedSlot && (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 animate-fade-in-up">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Selected Appointment
                  </h3>
                  <p className="text-gray-600">
                    Review your selection before booking
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                      <span className="text-white font-bold text-xl">
                        {selectedCounsellor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <p className="text-xl font-bold text-gray-900 mb-1">
                        {selectedCounsellor.name}
                      </p>
                      <p className="text-gray-600 font-medium">
                        {selectedSlot.date} at {selectedSlot.time}
                      </p>
                      <p className="text-gray-600 font-medium">
                        {selectedCounsellor.specialization}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleBookAppointment}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center"
                  >
                    <Calendar className="h-5 w-5 mr-2" />
                    Book Appointment
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Booking Form */
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 animate-fade-in-up">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
                  Appointment Details
                </h2>
                <p className="text-gray-600 text-lg">
                  Please provide some additional information for your session
                </p>
              </div>

              <form onSubmit={handleSubmitBooking} className="space-y-8">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <User className="h-6 w-6 mr-3 text-blue-600" />
                    Counsellor & Time
                  </h3>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {selectedCounsellor?.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-900">
                        {selectedCounsellor?.name}
                      </p>
                      <p className="text-gray-600 font-medium">
                        {selectedSlot?.date} at {selectedSlot?.time}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-3">
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
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-gray-300"
                      required
                    >
                      <option value="">Select an issue</option>
                      <option value="anxiety">Anxiety & Stress</option>
                      <option value="depression">Depression</option>
                      <option value="academic">Academic Pressure</option>
                      <option value="relationships">Relationship Issues</option>
                      <option value="family">Family Problems</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-3">
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
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-gray-300"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-3">
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
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-gray-300"
                    placeholder="Please share any additional information that might help the counsellor prepare for your session..."
                  ></textarea>
                </div>

                <div className="flex space-x-6">
                  <button
                    type="button"
                    onClick={() => setShowBookingForm(false)}
                    className="flex-1 bg-gray-200 text-gray-700 px-8 py-4 rounded-xl hover:bg-gray-300 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"
                  >
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {ticketId && (
          <div className="mt-12 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-3xl p-8 animate-fade-in-up">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center animate-pulse">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-green-900 mb-4">
                Appointment Booked Successfully!
              </h3>
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 mb-6">
                <p className="text-lg text-green-800 mb-2">
                  Your ticket ID is:
                </p>
                <p className="text-2xl font-bold text-green-900 bg-green-100 rounded-xl py-3 px-6 inline-block">
                  {ticketId}
                </p>
              </div>
              <p className="text-green-700 text-lg">
                You will receive a confirmation email shortly with all the
                details.
              </p>
              <div className="flex items-center justify-center space-x-2 mt-4">
                <Heart className="h-5 w-5 text-green-600" />
                <span className="text-green-600 font-medium">
                  Thank you for choosing Sahaara!
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentBooking;
