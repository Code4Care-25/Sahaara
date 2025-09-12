import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  Send,
  Heart,
  Bot,
  Sparkles,
  MessageCircle,
  User,
  Clock,
  CheckCircle,
  ArrowRight,
  Mic,
  Book,
  Menu,
  ChevronDown,
  ChevronRight,
  X,
  Plus,
} from "lucide-react";
import {
  phq9Questions,
  gad7Questions,
  chatPersonalities,
} from "../data/mockData";

const ChatPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isGuestMode = location.state?.isGuest || false;
  const [activeTab, setActiveTab] = useState("buddy"); // Changed default to buddy
  const [showScreening, setShowScreening] = useState(false);
  const [screeningType, setScreeningType] = useState("phq9");
  const [screeningAnswers, setScreeningAnswers] = useState({});
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedPersonality, setSelectedPersonality] = useState("motivator");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [hasCompletedScreening, setHasCompletedScreening] = useState(false);
  const [showJournal, setShowJournal] = useState(false);
  const [journalText, setJournalText] = useState("");
  const [savedJournals, setSavedJournals] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    { id: 1, title: "New Conversation", type: "Supportive Listener" },
    { id: 2, title: "Morning Check-in", type: "Motivational Coach" },
    { id: 3, title: "Anxiety Support", type: "Calm Companion" }
  ]);
  const [showChatDropdown, setShowChatDropdown] = useState(false);
  const [showJournalDropdown, setShowJournalDropdown] = useState(false);
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
      setHasCompletedScreening(true);
      setActiveTab("clinical");
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

  const handleSaveJournal = () => {
    if (!journalText.trim()) return;
    
    const newJournal = {
      id: savedJournals.length + 1,
      text: journalText,
      timestamp: new Date(),
    };
    
    setSavedJournals([...savedJournals, newJournal]);
    setJournalText("");
    
    // Send journal context to chatbot
    const contextMessage = {
      id: messages.length + 1,
      type: "system",
      text: `Journal entry saved. The chatbot will consider your latest journal while responding.`,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, contextMessage]);
  };

  const handleClearJournal = () => {
    setJournalText("");
  };

  const handleNewChat = () => {
    setMessages([]);
    setShowJournal(false);
    const newChatId = chatHistory.length + 1;
    const newChat = {
      id: newChatId,
      title: `Chat ${newChatId}`,
      type: activeTab === "clinical" ? "AI First-Aid" : chatPersonalities[selectedPersonality].name
    };
    setChatHistory([...chatHistory, newChat]);
  };

  const questions = screeningType === "phq9" ? phq9Questions : gad7Questions;

  if (showScreening) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        </div>

        <div className="relative bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <button
              onClick={() => setShowScreening(false)}
              className="group flex items-center text-gray-600 hover:text-gray-900 transition-all duration-300 hover:bg-gray-100 rounded-lg px-4 py-2"
            >
              <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Chat
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 animate-fade-in-up">
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-2 mb-4">
                <Sparkles className="h-6 w-6 text-yellow-500 animate-pulse" />
                <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                  Mental Health Assessment
                </span>
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
                {screeningType.toUpperCase()} Screening
              </h2>
              <p className="text-gray-600 text-lg">
                This assessment helps us understand how you've been feeling
                recently
              </p>
            </div>

            <div className="mb-8">
              <div className="flex justify-between text-sm font-medium text-gray-600 mb-4">
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <span className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  {Math.round(((currentQuestion + 1) / questions.length) * 100)}
                  % Complete
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${
                      ((currentQuestion + 1) / questions.length) * 100
                    }%`,
                  }}
                ></div>
              </div>
            </div>

            <div className="mb-8">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4 leading-relaxed">
                  {questions[currentQuestion]}
                </h3>
                <p className="text-lg text-gray-600">
                  Over the last 2 weeks, how often have you been bothered by
                  this problem?
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    value: 0,
                    label: "Not at all",
                    color: "from-green-500 to-emerald-600",
                  },
                  {
                    value: 1,
                    label: "Several days",
                    color: "from-yellow-500 to-orange-600",
                  },
                  {
                    value: 2,
                    label: "More than half the days",
                    color: "from-orange-500 to-red-600",
                  },
                  {
                    value: 3,
                    label: "Nearly every day",
                    color: "from-red-500 to-pink-600",
                  },
                ].map((option, index) => (
                  <button
                    key={option.value}
                    onClick={() =>
                      handleScreeningAnswer(currentQuestion, option.value)
                    }
                    className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 hover:scale-105 p-6 border border-gray-100 animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-gray-900 group-hover:text-gray-800">
                        {option.label}
                      </span>
                      <div
                        className={`w-4 h-4 rounded-full bg-gradient-to-r ${option.color} group-hover:scale-125 transition-transform`}
                      ></div>
                    </div>
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
    <div className="h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      {/* Sidebar */}
      <div className={`${showSidebar ? 'w-80' : 'w-0'} transition-all duration-300 overflow-hidden bg-white/90 backdrop-blur-md shadow-xl border-r border-white/20 flex flex-col relative z-10`}>
        <div className="p-4 border-b border-gray-200/50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
                <MessageCircle className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-gray-900">Sahaara</span>
            </div>
            <button
              onClick={() => setShowSidebar(false)}
              className="p-1 hover:bg-gray-100 rounded transition-colors text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <button 
            onClick={handleNewChat}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-lg px-4 py-2 text-sm font-medium transition-colors flex items-center justify-center space-x-2 text-white"
          >
            <Plus className="h-4 w-4" />
            <span>New Chat</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Chat History */}
          <div>
            <button
              onClick={() => setShowChatDropdown(!showChatDropdown)}
              className="w-full flex items-center justify-between text-left text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors p-2 rounded-lg hover:bg-gray-100"
            >
              <span className="flex items-center space-x-2">
                <MessageCircle className="h-4 w-4" />
                <span>CHAT HISTORY</span>
              </span>
              {showChatDropdown ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
            
            {showChatDropdown && (
              <div className="ml-4 mt-2 space-y-1">
                {chatHistory.map((chat) => (
                  <button
                    key={chat.id}
                    className="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="text-sm font-medium text-gray-900">{chat.title}</div>
                    <div className="text-xs text-gray-600">{chat.type}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Journal History */}
          <div>
            <button
              onClick={() => setShowJournalDropdown(!showJournalDropdown)}
              className="w-full flex items-center justify-between text-left text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors p-2 rounded-lg hover:bg-gray-100"
            >
              <span className="flex items-center space-x-2">
                <Book className="h-4 w-4" />
                <span>JOURNAL ENTRIES</span>
              </span>
              {showJournalDropdown ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
            
            {showJournalDropdown && (
              <div className="ml-4 mt-2 space-y-1">
                {savedJournals.length === 0 ? (
                  <div className="text-xs text-gray-500 p-2">No journal entries yet</div>
                ) : (
                  savedJournals.map((journal) => (
                    <button
                      key={journal.id}
                      className="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="text-sm text-gray-900 truncate">{journal.text.substring(0, 30)}...</div>
                      <div className="text-xs text-gray-600">{journal.timestamp.toLocaleDateString()}</div>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="relative bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 flex-shrink-0">
          <div className="px-4 py-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowSidebar(!showSidebar)}
                  className="group flex items-center text-gray-600 hover:text-gray-900 transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-lg px-3 py-2"
                >
                  <Menu className="h-5 w-5" />
                </button>
                <button
                  onClick={() => navigate(isGuestMode ? "/" : "/dashboard")}
                  className="group flex items-center text-gray-600 hover:text-gray-900 transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-lg px-4 py-2"
                >
                  <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                  {isGuestMode ? "Back to Login" : "Back to Dashboard"}
                </button>
                {isGuestMode && (
                  <div className="flex items-center space-x-2 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                    <User className="h-4 w-4" />
                    Guest Mode
                  </div>
                )}
              </div>

              <div className="flex space-x-1 bg-gray-100 rounded-2xl p-1">
                <button
                  onClick={() => {
                    if (!hasCompletedScreening && !isGuestMode) {
                      handleScreeningStart("phq9");
                    } else {
                      setActiveTab("clinical");
                      setShowJournal(false);
                    }
                  }}
                  className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    activeTab === "clinical"
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                  }`}
                >
                  Clinical Chatbot
                  {!hasCompletedScreening && !isGuestMode && (
                    <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                      PHQ-9 Required
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("buddy")}
                  className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    activeTab === "buddy"
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                  }`}
                >
                  Chat Buddy
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Content */}
        <div className="flex-1 flex min-h-0">
          {/* Chat Interface */}
          <div className={`${showJournal && activeTab === "buddy" ? 'w-1/2' : 'w-full'} flex flex-col min-w-0`}>
            <div className="bg-white/80 backdrop-blur-sm shadow-2xl h-full flex flex-col border-r border-white/20">
              {/* Chat Header */}
              <div className="p-6 border-b border-gray-200/50 flex-shrink-0">
                {activeTab === "clinical" ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="relative p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl mr-4">
                        <Bot className="h-8 w-8 text-white" />
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          AI First-Aid Assistant
                        </h3>
                        <p className="text-gray-600">
                          Professional mental health support
                        </p>
                      </div>
                    </div>
                    {!isGuestMode && (
                      <button
                        onClick={() => handleScreeningStart("phq9")}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center"
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Start PHQ-9 Screening
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="relative p-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl mr-4">
                        <Heart className="h-8 w-8 text-white" />
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-500 rounded-full animate-pulse"></div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          Chat Buddy
                        </h3>
                        <p className="text-gray-600">Choose your companion</p>
                      </div>
                    </div>
                    <select
                      value={selectedPersonality}
                      onChange={(e) => setSelectedPersonality(e.target.value)}
                      className="px-4 py-3 border-2 border-gray-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-gray-300"
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
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.length === 0 ? (
                  <div className="text-center text-gray-500 mt-8">
                    {isGuestMode && activeTab === "clinical" && (
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-6 mb-6">
                        <div className="flex items-center justify-center mb-4">
                          <Bot className="h-8 w-8 text-blue-600 mr-3" />
                          <h4 className="text-xl font-bold text-gray-900">
                            Want Clinical Support?
                          </h4>
                        </div>
                        <p className="text-gray-700 mb-4">
                          For personalized mental health support and clinical
                          guidance, please log in to access our AI First-Aid
                          Assistant.
                        </p>
                        <button
                          onClick={() => navigate("/")}
                          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                          Login for Clinical Support
                        </button>
                      </div>
                    )}
                    <div className="mb-6">
                      <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MessageCircle className="h-10 w-10 text-blue-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Start a conversation!
                      </h3>
                      <p className="text-lg text-gray-600 max-w-md mx-auto">
                        {activeTab === "clinical"
                          ? "I'm here to provide professional mental health support and guidance."
                          : `I'm your ${chatPersonalities[
                              selectedPersonality
                            ].name.toLowerCase()} - ${
                              chatPersonalities[selectedPersonality].description
                            }`}
                      </p>
                    </div>
                    <div className="flex justify-center space-x-4">
                      <button 
                        onClick={() => setInputMessage("How are you feeling?")}
                        className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
                      >
                        How are you feeling?
                      </button>
                      <button 
                        onClick={() => setInputMessage("I need help")}
                        className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors"
                      >
                        I need help
                      </button>
                    </div>
                  </div>
                ) : (
                  messages.map((message, index) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.type === "user" ? "justify-end" : "justify-start"
                      } ${message.type === "system" ? "justify-center" : ""} animate-fade-in-up`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {message.type === "system" ? (
                        <div className="bg-yellow-100 border border-yellow-300 rounded-lg px-4 py-2 text-yellow-800 text-sm">
                          {message.text}
                        </div>
                      ) : (
                        <div className="flex items-start space-x-3 max-w-md">
                          {message.type === "bot" && (
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                              <Bot className="h-4 w-4 text-white" />
                            </div>
                          )}
                          <div
                            className={`px-6 py-4 rounded-2xl ${
                              message.type === "user"
                                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                                : "bg-gray-100 text-gray-900"
                            }`}
                          >
                            <p className="text-sm leading-relaxed">{message.text}</p>
                            <p
                              className={`text-xs mt-2 ${
                                message.type === "user"
                                  ? "text-blue-100"
                                  : "text-gray-500"
                              }`}
                            >
                              {message.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                          {message.type === "user" && (
                            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                              <User className="h-4 w-4 text-white" />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-200/50 flex-shrink-0">
                <div className="flex space-x-3">
                  <button className="p-3 text-gray-500 hover:text-gray-700 rounded-xl hover:bg-gray-100 transition-colors">
                    <Mic className="h-5 w-5" />
                  </button>
                  {activeTab === "buddy" && (
                    <button
                      onClick={() => setShowJournal(!showJournal)}
                      className={`p-3 rounded-xl transition-colors ${
                        showJournal
                          ? "text-blue-600 bg-blue-100"
                          : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Book className="h-5 w-5" />
                    </button>
                  )}
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-gray-300"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-3 rounded-xl hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Journal Panel */}
          {showJournal && activeTab === "buddy" && (
            <div className="w-1/2 bg-white/80 backdrop-blur-sm shadow-2xl border-l border-gray-200/50 flex flex-col">
              <div className="p-6 border-b border-gray-200/50 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center space-x-3">
                  <Book className="h-6 w-6 text-blue-600" />
                  <h3 className="text-xl font-bold text-gray-900">Journal</h3>
                </div>
                <button
                  onClick={() => setShowJournal(false)}
                  className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="flex-1 p-6 min-h-0">
                <div className="text-gray-600 text-sm mb-4">
                  Write your thoughts here... Express yourself freely and reflect on your feelings.
                </div>
                <textarea
                  value={journalText}
                  onChange={(e) => setJournalText(e.target.value)}
                  placeholder="Start writing your journal entry..."
                  className="w-full h-full resize-none border-none outline-none text-gray-800 placeholder-gray-400 bg-transparent text-lg leading-relaxed"
                />
              </div>
              
              <div className="p-4 border-t border-gray-200/50 flex justify-between flex-shrink-0">
                <button
                  onClick={handleClearJournal}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <span>Clear</span>
                </button>
                <button
                  onClick={handleSaveJournal}
                  disabled={!journalText.trim()}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <span>Save</span>
                </button>
              </div>
              
              <div className="px-4 pb-4 flex-shrink-0">
                <div className="text-xs text-gray-500 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  The chatbot will gently consider your latest saved journal while replying.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;