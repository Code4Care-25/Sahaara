import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { colleges } from "../data/mockData";
import {
  Heart,
  Users,
  Shield,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Building2,
  Search,
} from "lucide-react";

const InstitutionSelection = () => {
  const [selectedInstitution, setSelectedInstitution] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Filter colleges based on search term
  const filteredColleges = colleges.filter((college) =>
    college.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInstitutionSelect = (institution) => {
    setSelectedInstitution(institution);
  };

  const handleContinue = async () => {
    if (!selectedInstitution) {
      alert("Please select an institution to continue");
      return;
    }

    setIsLoading(true);
    
    // Simulate loading
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Navigate to login page with selected institution
    navigate("/login", { 
      state: { 
        selectedInstitution: selectedInstitution,
        institutionName: colleges.find(c => c.name === selectedInstitution)?.name 
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      <div className="relative flex items-center justify-center min-h-screen p-4">
        <div className="max-w-4xl w-full space-y-6 animate-fade-in-up">
          {/* Header */}
          <div className="text-center">
            <div className="flex justify-center items-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-30"></div>
                <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-2xl">
                  <Building2 className="h-10 w-10 text-white animate-pulse" />
                </div>
              </div>
              <div className="ml-4">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                  Sahaara
                </h1>
                <div className="flex items-center justify-center space-x-2 mt-2">
                  <Sparkles className="h-4 w-4 text-yellow-500 animate-pulse" />
                  <p className="text-gray-600 text-sm font-medium">
                    Mental Health Support Platform
                  </p>
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
              Welcome to Sahaara! Please select your institution to get started with your mental health journey.
            </p>
          </div>

          {/* Features Preview */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center p-4 bg-white/70 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <div className="p-2 bg-blue-100 rounded-lg w-fit mx-auto mb-2 group-hover:scale-110 transition-transform">
                <Heart className="h-5 w-5 text-blue-600" />
              </div>
              <p className="text-sm font-semibold text-gray-700">
                Mental Health Support
              </p>
            </div>
            <div className="text-center p-4 bg-white/70 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <div className="p-2 bg-green-100 rounded-lg w-fit mx-auto mb-2 group-hover:scale-110 transition-transform">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <p className="text-sm font-semibold text-gray-700">
                Peer Support
              </p>
            </div>
            <div className="text-center p-4 bg-white/70 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <div className="p-2 bg-purple-100 rounded-lg w-fit mx-auto mb-2 group-hover:scale-110 transition-transform">
                <Shield className="h-5 w-5 text-purple-600" />
              </div>
              <p className="text-sm font-semibold text-gray-700">
                Safe & Anonymous
              </p>
            </div>
          </div>

          {/* Institution Selection */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border border-white/20 hover:shadow-3xl transition-all duration-500">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
                Select Your Institution
              </h2>
              <p className="text-gray-600 text-center">
                Choose your college or university to access personalized mental health support
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for your institution..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-gray-300"
              />
            </div>

            {/* Institution List */}
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {filteredColleges.length > 0 ? (
                filteredColleges.map((college) => (
                  <div
                    key={college.id}
                    onClick={() => handleInstitutionSelect(college.name)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                      selectedInstitution === college.name
                        ? "border-blue-500 bg-blue-50 shadow-lg transform scale-105"
                        : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${
                          selectedInstitution === college.name
                            ? "bg-blue-100"
                            : "bg-gray-100"
                        }`}>
                          <Building2 className={`h-5 w-5 ${
                            selectedInstitution === college.name
                              ? "text-blue-600"
                              : "text-gray-600"
                          }`} />
                        </div>
                        <div>
                          <h3 className={`font-semibold ${
                            selectedInstitution === college.name
                              ? "text-blue-800"
                              : "text-gray-800"
                          }`}>
                            {college.name}
                          </h3>
                          <p className={`text-sm ${
                            selectedInstitution === college.name
                              ? "text-blue-600"
                              : "text-gray-500"
                          }`}>
                            Educational Institution
                          </p>
                        </div>
                      </div>
                      {selectedInstitution === college.name && (
                        <CheckCircle className="h-6 w-6 text-blue-600" />
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">No institutions found matching your search.</p>
                </div>
              )}
            </div>

            {/* Continue Button */}
            <div className="mt-6">
              <button
                onClick={handleContinue}
                disabled={!selectedInstitution || isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-xl hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    Continue to Login
                    <ArrowRight className="h-6 w-6 ml-3" />
                  </>
                )}
              </button>
            </div>

            {/* Guest Access Option */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600 mb-3">
                Want to explore without selecting an institution?
              </p>
              <button
                onClick={() => navigate("/chat", { state: { isGuest: true } })}
                className="w-full bg-white/70 text-gray-700 py-3 px-4 rounded-lg hover:bg-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300 font-medium border-2 border-gray-200 hover:border-gray-300 flex items-center justify-center"
              >
                <Users className="h-4 w-4 mr-2" />
                Continue as Guest
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionSelection;
