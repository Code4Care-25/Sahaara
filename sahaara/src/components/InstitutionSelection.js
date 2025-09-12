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
        institutionName: colleges.find((c) => c.name === selectedInstitution)
          ?.name,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center items-center mb-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-30"></div>
              <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-2xl">
                <Building2 className="h-8 w-8 text-white" />
              </div>
            </div>
            <div className="ml-3">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                Sahaara
              </h1>
              <div className="flex items-center justify-center space-x-1 mt-1">
                <Sparkles className="h-3 w-3 text-yellow-500" />
                <p className="text-gray-600 text-xs font-medium">
                  Mental Health Support Platform
                </p>
              </div>
            </div>
          </div>
          <p className="text-gray-600 text-sm max-w-2xl mx-auto">
            Welcome to Sahaara! Please select your institution to get started
            with your mental health journey.
          </p>
        </div>

        {/* Institution Selection */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">
              Select Your Institution
            </h2>
            <p className="text-gray-600 text-center text-sm">
              Choose your college or university to access personalized mental
              health support
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search institutions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-gray-300 text-sm"
            />
          </div>

          {/* Institution List - Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-64 overflow-y-auto">
            {filteredColleges.length > 0 ? (
              filteredColleges.map((college) => (
                <div
                  key={college.id}
                  onClick={() => handleInstitutionSelect(college.name)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedInstitution === college.name
                      ? "border-blue-500 bg-blue-50 shadow-md"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-1.5 rounded-md ${
                        selectedInstitution === college.name
                          ? "bg-blue-100"
                          : "bg-gray-100"
                      }`}
                    >
                      {college.logo ? (
                        <img
                          src={college.logo}
                          alt={`${college.name} logo`}
                          className="h-4 w-4 object-contain"
                        />
                      ) : (
                        <Building2
                          className={`h-4 w-4 ${
                            selectedInstitution === college.name
                              ? "text-blue-600"
                              : "text-gray-600"
                          }`}
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`text-sm font-medium truncate ${
                          selectedInstitution === college.name
                            ? "text-blue-800"
                            : "text-gray-800"
                        }`}
                        title={college.name}
                      >
                        {college.name}
                      </h3>
                    </div>
                    {selectedInstitution === college.name && (
                      <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0" />
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-6">
                <Building2 className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">
                  No institutions found matching your search.
                </p>
              </div>
            )}
          </div>

          {/* Continue Button */}
          <div className="mt-4">
            <button
              onClick={handleContinue}
              disabled={!selectedInstitution || isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2.5 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 font-semibold text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  Continue to Login
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </button>
          </div>

          {/* Guest Access Option */}
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-center text-xs text-gray-600 mb-2">
              Want to explore without selecting an institution?
            </p>
            <button
              onClick={() => navigate("/chat", { state: { isGuest: true } })}
              className="w-full bg-white/70 text-gray-700 py-2 px-3 rounded-lg hover:bg-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300 font-medium border-2 border-gray-200 hover:border-gray-300 flex items-center justify-center text-xs"
            >
              <Users className="h-3 w-3 mr-1" />
              Continue as Guest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionSelection;
