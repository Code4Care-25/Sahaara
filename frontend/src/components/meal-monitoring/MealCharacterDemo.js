import React, { useState } from "react";
import MealMonitoringCharacter from "./MealMonitoringCharacter";

const MealCharacterDemo = () => {
  const [showCharacter, setShowCharacter] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState("mother");

  const themes = [
    "mother",
    "father",
    "friend",
    "relative",
    "mentor",
    "counselor",
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Meal Monitoring Character Demo
        </h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Theme:
            </label>
            <select
              value={selectedTheme}
              onChange={(e) => setSelectedTheme(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {themes.map((theme) => (
                <option key={theme} value={theme}>
                  {theme.charAt(0).toUpperCase() + theme.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setShowCharacter(true)}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-medium"
          >
            Show Character
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            This character will appear when students log into the dashboard,
            delivering general meal monitoring messages to support their
            wellness.
          </p>
        </div>
      </div>

      {showCharacter && (
        <MealMonitoringCharacter
          onClose={() => setShowCharacter(false)}
          theme={selectedTheme}
        />
      )}
    </div>
  );
};

export default MealCharacterDemo;
