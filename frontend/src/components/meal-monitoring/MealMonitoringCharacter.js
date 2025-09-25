import React, { useState, useEffect } from "react";
import { X, Heart, Utensils } from "lucide-react";

const MealMonitoringCharacter = ({ onClose, theme = "mother" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  // General character messages for all themes
  const characterMessages = [
    "Hi there! I'm your wellness companion, and I'm here to gently remind you about the importance of regular meals for your health and studies. 💚",
    "Taking care of your body with proper nutrition is just as important as taking care of your mind. Let's make sure you're nourished and strong! 🌟",
    "I care about your wellbeing. If you're having trouble with meals or need support, remember that you're not alone in this journey. 🤗",
    "Regular meals help keep your energy up and your mind focused. Your health matters, and I'm here to support you! ✨",
    "Remember, self-care includes nourishing your body. Taking time for regular meals is an investment in your overall wellness. 💪",
  ];

  const currentMessages = characterMessages;
  const currentMessage = currentMessages[messageIndex];

  useEffect(() => {
    // Check if message has been shown in this session
    const hasShownInSession = sessionStorage.getItem(
      "mealMonitoringMessageShown"
    );

    if (!hasShownInSession) {
      // Show character after a short delay
      const showTimer = setTimeout(() => {
        setIsVisible(true);
        // Mark message as shown for this session only
        sessionStorage.setItem("mealMonitoringMessageShown", "true");
      }, 500);

      return () => {
        clearTimeout(showTimer);
      };
    } else {
      // If message was already shown in this session, close the component
      onClose();
    }
  }, [onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 p-0">
      <div className="bg-white rounded-2xl shadow-2xl w-72 sm:w-80 p-4 transform transition-all duration-300">
        {/* Character Avatar */}
        <div className="flex items-center justify-center mb-3">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
              <Heart className="h-6 w-6 text-white animate-pulse" />
            </div>
            <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
              <Utensils className="h-2.5 w-2.5 text-white" />
            </div>
          </div>
        </div>

        {/* Character Message */}
        <div className="text-center mb-3">
          <h3 className="text-base font-bold text-gray-900 mb-2">
            Your Wellness Companion
          </h3>
          <div className="bg-gray-50 rounded-xl p-3 mb-3">
            <p className="text-gray-700 leading-relaxed text-sm">
              {currentMessage}
            </p>
          </div>
        </div>
        {/* Minimal content: no indicators or extra sections */}

        {/* Actions */}
        <div className="flex space-x-3">
          <button
            onClick={handleClose}
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-medium text-sm"
          >
            I Understand
          </button>
          <button
            onClick={handleClose}
            className="px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {/* No footer to keep compact */}
      </div>
    </div>
  );
};

export default MealMonitoringCharacter;
