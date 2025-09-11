import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Heart, Bot } from "lucide-react";
import {
  phq9Questions,
  gad7Questions,
  chatPersonalities,
} from "../data/mockData";

const ChatPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("clinical");
  const [showScreening, setShowScreening] = useState(false);
  const [screeningType, setScreeningType] = useState("phq9");
  const [screeningAnswers, setScreeningAnswers] = useState({});
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedPersonality, setSelectedPersonality] = useState("motivator");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleScreeningStart = (type) => {
    setScreeningType(type);
    setShowScreening(true);
    setCurrentQuestion(0);
    setScreeningAnswers({});
  };

  const handleScreeningAnswer = (questionIndex, answer) => {
    const newAnswers = { ...screeningAnswers, [questionIndex]: answer };
    setScreeningAnswers(newAnswers);

    if (
      questionIndex <
      (screeningType === "phq9" ? phq9Questions.length : gad7Questions.length) -
        1
    ) {
      setCurrentQuestion(questionIndex + 1);
    } else {
      // Screening completed
      const totalScore = Object.values(newAnswers).reduce(
        (sum, score) => sum + score,
        0
      );
      const questions =
        screeningType === "phq9" ? phq9Questions : gad7Questions;

      let recommendation = "";
      if (screeningType === "phq9") {
        if (totalScore <= 4) recommendation = "minimal";
        else if (totalScore <= 9) recommendation = "mild";
        else if (totalScore <= 14) recommendation = "moderate";
        else if (totalScore <= 19) recommendation = "moderately-severe";
        else recommendation = "severe";
      } else {
        if (totalScore <= 4) recommendation = "minimal";
        else if (totalScore <= 9) recommendation = "mild";
        else if (totalScore <= 14) recommendation = "moderate";
        else recommendation = "severe";
      }

      setShowScreening(false);
      setMessages([
        {
          id: 1,
          type: "bot",
          text: `Thank you for completing the ${screeningType.toUpperCase()} screening. Your score is ${totalScore}. Based on your responses, I recommend ${recommendation} support. Let's chat about how you're feeling.`,
          timestamp: new Date(),
        },
      ]);
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      type: "user",
      text: inputMessage,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputMessage("");

    // Generate bot response
    setTimeout(() => {
      let botResponse = "";
      if (activeTab === "clinical") {
        const responses = [
          "I understand you're going through a difficult time. It's important to remember that seeking help is a sign of strength.",
          "Your feelings are valid, and it's okay to not be okay sometimes. Have you tried any coping strategies?",
          "It sounds like you're dealing with a lot right now. Would you like to talk about what's been most challenging?",
          "I'm here to listen and support you. Sometimes just talking about what's on your mind can help.",
          "Based on your screening results, I'd recommend speaking with a professional counsellor. Would you like me to help you book an appointment?",
        ];
        botResponse = responses[Math.floor(Math.random() * responses.length)];
      } else {
        const personality = chatPersonalities[selectedPersonality];
        botResponse =
          personality.responses[
            Math.floor(Math.random() * personality.responses.length)
          ];
      }

      const botMessage = {
        id: messages.length + 2,
        type: "bot",
        text: botResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const questions = screeningType === "phq9" ? phq9Questions : gad7Questions;

  if (showScreening) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <button
              onClick={() => setShowScreening(false)}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Chat
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {screeningType.toUpperCase()} Mental Health Screening
            </h2>

            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <span>
                  {Math.round(((currentQuestion + 1) / questions.length) * 100)}
                  % Complete
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${
                      ((currentQuestion + 1) / questions.length) * 100
                    }%`,
                  }}
                ></div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {questions[currentQuestion]}
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Over the last 2 weeks, how often have you been bothered by this
                problem?
              </p>

              <div className="space-y-3">
                {[
                  { value: 0, label: "Not at all" },
                  { value: 1, label: "Several days" },
                  { value: 2, label: "More than half the days" },
                  { value: 3, label: "Nearly every day" },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() =>
                      handleScreeningAnswer(currentQuestion, option.value)
                    }
                    className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Dashboard
            </button>

            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab("clinical")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "clinical"
                    ? "bg-white text-primary-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Clinical Chatbot
              </button>
              <button
                onClick={() => setActiveTab("friendly")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "friendly"
                    ? "bg-white text-primary-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Friendly Chat Buddy
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-lg h-[600px] flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200">
            {activeTab === "clinical" ? (
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg mr-3">
                  <Bot className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    AI First-Aid Assistant
                  </h3>
                  <p className="text-sm text-gray-600">
                    Professional mental health support
                  </p>
                </div>
                <button
                  onClick={() => handleScreeningStart("phq9")}
                  className="ml-auto bg-primary-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-primary-700 transition-colors"
                >
                  Start PHQ-9 Screening
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg mr-3">
                    <Heart className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Friendly Chat Buddy
                    </h3>
                    <p className="text-sm text-gray-600">
                      Choose your companion
                    </p>
                  </div>
                </div>
                <select
                  value={selectedPersonality}
                  onChange={(e) => setSelectedPersonality(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {Object.entries(chatPersonalities).map(
                    ([key, personality]) => (
                      <option key={key} value={key}>
                        {personality.name}
                      </option>
                    )
                  )}
                </select>
              </div>
            )}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                <p className="text-lg mb-2">Start a conversation!</p>
                <p className="text-sm">
                  {activeTab === "clinical"
                    ? "I'm here to provide professional mental health support."
                    : `I'm your ${chatPersonalities[
                        selectedPersonality
                      ].name.toLowerCase()} - ${
                        chatPersonalities[selectedPersonality].description
                      }`}
                </p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.type === "user"
                        ? "bg-primary-600 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button
                onClick={handleSendMessage}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
