import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Star, CheckCircle } from "lucide-react";
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Dashboard
            </button>
            <h1 className="text-2xl font-bold text-gray-900">
              Book an Appointment
            </h1>
            <div className="text-sm text-gray-600">Mental Health Support</div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Quick Actions */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              New Appointment
            </h3>
            <p className="text-gray-600 mb-4">
              Book a new appointment with our professional counsellors
            </p>
            <button
              onClick={() => setShowBookingForm(false)}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Book Now
            </button>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Continue with Ticket
            </h3>
            <p className="text-gray-600 mb-4">
              Already have a ticket ID? Continue your previous booking
            </p>
            <button
              onClick={handleContinueWithTicket}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Continue
            </button>
          </div>
        </div>

        {!showBookingForm ? (
          /* Counsellor Selection */
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Select a Counsellor
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {counsellors.map((counsellor) => (
                <div
                  key={counsellor.id}
                  className={`bg-white rounded-lg shadow-lg p-6 cursor-pointer transition-all duration-300 ${
                    selectedCounsellor?.id === counsellor.id
                      ? "ring-2 ring-primary-500 bg-primary-50"
                      : "hover:shadow-xl"
                  }`}
                  onClick={() => setSelectedCounsellor(counsellor)}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-primary-600 font-semibold text-lg">
                        {counsellor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {counsellor.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {counsellor.specialization}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      {counsellor.experience} experience
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="h-4 w-4 mr-2 text-yellow-500" />
                      {counsellor.rating}/5.0 rating
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-700">
                      Available Slots:
                    </h4>
                    <div className="space-y-1">
                      {counsellor.availableSlots
                        .filter((slot) => slot.available)
                        .slice(0, 3)
                        .map((slot, index) => (
                          <div
                            key={index}
                            className={`text-xs p-2 rounded ${
                              selectedSlot?.date === slot.date &&
                              selectedSlot?.time === slot.time
                                ? "bg-primary-100 text-primary-700"
                                : "bg-gray-100 text-gray-600"
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedSlot(slot);
                            }}
                          >
                            {slot.date} at {slot.time}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedCounsellor && selectedSlot && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Selected Appointment
                </h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">
                      {selectedCounsellor.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedSlot.date} at {selectedSlot.time}
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedCounsellor.specialization}
                    </p>
                  </div>
                  <button
                    onClick={handleBookAppointment}
                    className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Appointment
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Booking Form */
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Appointment Details
              </h2>

              <form onSubmit={handleSubmitBooking} className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Counsellor & Time
                  </h3>
                  <p className="text-gray-600">
                    {selectedCounsellor?.name} - {selectedSlot?.date} at{" "}
                    {selectedSlot?.time}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Please share any additional information that might help the counsellor prepare for your session..."
                  ></textarea>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowBookingForm(false)}
                    className="flex-1 bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {ticketId && (
          <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center">
              <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
              <div>
                <h3 className="text-lg font-semibold text-green-900">
                  Appointment Booked Successfully!
                </h3>
                <p className="text-green-700">
                  Your ticket ID is: <strong>{ticketId}</strong>
                </p>
                <p className="text-sm text-green-600 mt-1">
                  You will receive a confirmation email shortly.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentBooking;
