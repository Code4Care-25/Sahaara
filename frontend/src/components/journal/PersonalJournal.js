import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  Plus,
  Edit,
  Trash2,
  Calendar,
  Search,
  Save,
  Sparkles,
  Heart,
  TrendingUp,
  ArrowRight,
  Clock,
  CheckCircle,
} from "lucide-react";

const PersonalJournal = () => {
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newEntry, setNewEntry] = useState({
    title: "",
    content: "",
    mood: "neutral",
    tags: "",
  });

  // Load entries from localStorage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem("journalEntries");
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    } else {
      // Initialize with some sample entries
      const sampleEntries = [
        {
          id: 1,
          title: "First Day of College",
          content:
            "Today was my first day at college. I felt nervous but excited about the new journey ahead. Met some interesting people in my classes.",
          mood: "excited",
          tags: "college, first-day, new-beginnings",
          date: "2024-01-10",
          timestamp: new Date("2024-01-10").toISOString(),
        },
        {
          id: 2,
          title: "Feeling Overwhelmed",
          content:
            "The workload is getting intense. I'm struggling to balance studies, social life, and personal time. Need to find better time management strategies.",
          mood: "stressed",
          tags: "stress, workload, time-management",
          date: "2024-01-12",
          timestamp: new Date("2024-01-12").toISOString(),
        },
        {
          id: 3,
          title: "Small Victory",
          content:
            "Finally understood that difficult math concept! It took hours of practice, but the feeling of accomplishment was worth it.",
          mood: "happy",
          tags: "achievement, math, learning",
          date: "2024-01-15",
          timestamp: new Date("2024-01-15").toISOString(),
        },
      ];
      setEntries(sampleEntries);
      localStorage.setItem("journalEntries", JSON.stringify(sampleEntries));
    }
  }, []);

  // Save entries to localStorage whenever entries change
  useEffect(() => {
    localStorage.setItem("journalEntries", JSON.stringify(entries));
  }, [entries]);

  const filteredEntries = entries.filter(
    (entry) =>
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.tags.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNewEntry = (e) => {
    e.preventDefault();
    if (newEntry.title && newEntry.content) {
      const entry = {
        id: Date.now(),
        ...newEntry,
        date: new Date().toISOString().split("T")[0],
        timestamp: new Date().toISOString(),
      };
      setEntries([entry, ...entries]);
      setNewEntry({ title: "", content: "", mood: "neutral", tags: "" });
      setShowNewEntry(false);
    }
  };

  const handleEditEntry = (entry) => {
    setEditingEntry(entry);
    setNewEntry({
      title: entry.title,
      content: entry.content,
      mood: entry.mood,
      tags: entry.tags,
    });
    setShowNewEntry(true);
  };

  const handleUpdateEntry = (e) => {
    e.preventDefault();
    if (newEntry.title && newEntry.content) {
      setEntries(
        entries.map((entry) =>
          entry.id === editingEntry.id
            ? {
                ...entry,
                ...newEntry,
                timestamp: new Date().toISOString(),
              }
            : entry
        )
      );
      setNewEntry({ title: "", content: "", mood: "neutral", tags: "" });
      setEditingEntry(null);
      setShowNewEntry(false);
    }
  };

  const handleDeleteEntry = (entryId) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      setEntries(entries.filter((entry) => entry.id !== entryId));
    }
  };

  const getMoodIcon = (mood) => {
    switch (mood) {
      case "happy":
        return "😊";
      case "sad":
        return "😢";
      case "excited":
        return "🤩";
      case "stressed":
        return "😰";
      case "angry":
        return "😠";
      case "neutral":
        return "😐";
      default:
        return "😐";
    }
  };

  const getMoodColor = (mood) => {
    switch (mood) {
      case "happy":
        return "bg-green-100 text-green-800";
      case "sad":
        return "bg-blue-100 text-blue-800";
      case "excited":
        return "bg-yellow-100 text-yellow-800";
      case "stressed":
        return "bg-red-100 text-red-800";
      case "angry":
        return "bg-red-100 text-red-800";
      case "neutral":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
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
                Personal Journal
              </h1>
              <div className="flex items-center justify-center space-x-2 mt-2">
                <Sparkles className="h-4 w-4 text-yellow-500 animate-pulse" />
                <p className="text-gray-600 font-medium">
                  {entries.length} entries
                </p>
              </div>
            </div>
            <div className="w-24"></div>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-8">
        {/* Search and New Entry */}
        <div className="mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 animate-fade-in-up">
            <div className="flex flex-col lg:flex-row gap-6 mb-8">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search your journal entries..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-gray-300 text-lg"
                  />
                </div>
              </div>
              <button
                onClick={() => {
                  setEditingEntry(null);
                  setNewEntry({
                    title: "",
                    content: "",
                    mood: "neutral",
                    tags: "",
                  });
                  setShowNewEntry(true);
                }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-semibold text-lg flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Plus className="h-5 w-5 mr-2" />
                New Entry
              </button>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
              <div className="flex items-center space-x-3">
                <Heart className="h-6 w-6 text-blue-600" />
                <p className="text-gray-700 font-medium">
                  <strong>Tip:</strong> Regular journaling can help improve your
                  mental health and self-awareness.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* New/Edit Entry Modal */}
        {showNewEntry && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl max-w-3xl w-full p-8 max-h-[90vh] overflow-y-auto border border-white/20 animate-scale-in">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                  {editingEntry ? "Edit Entry" : "New Journal Entry"}
                </h3>
                <button
                  onClick={() => {
                    setShowNewEntry(false);
                    setEditingEntry(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-all duration-300"
                >
                  <span className="text-2xl">×</span>
                </button>
              </div>
              <form
                onSubmit={editingEntry ? handleUpdateEntry : handleNewEntry}
                className="space-y-6"
              >
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-3">
                    Title
                  </label>
                  <input
                    type="text"
                    value={newEntry.title}
                    onChange={(e) =>
                      setNewEntry({ ...newEntry, title: e.target.value })
                    }
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-gray-300 text-lg"
                    placeholder="What's the main theme of this entry?"
                    required
                  />
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-3">
                    How are you feeling?
                  </label>
                  <select
                    value={newEntry.mood}
                    onChange={(e) =>
                      setNewEntry({ ...newEntry, mood: e.target.value })
                    }
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-gray-300 text-lg"
                  >
                    <option value="happy">😊 Happy</option>
                    <option value="sad">😢 Sad</option>
                    <option value="excited">🤩 Excited</option>
                    <option value="stressed">😰 Stressed</option>
                    <option value="angry">😠 Angry</option>
                    <option value="neutral">😐 Neutral</option>
                  </select>
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-3">
                    Content
                  </label>
                  <textarea
                    value={newEntry.content}
                    onChange={(e) =>
                      setNewEntry({ ...newEntry, content: e.target.value })
                    }
                    rows={8}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-gray-300 text-lg resize-none"
                    placeholder="Write about your day, thoughts, feelings, or anything that's on your mind..."
                    required
                  ></textarea>
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-3">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={newEntry.tags}
                    onChange={(e) =>
                      setNewEntry({ ...newEntry, tags: e.target.value })
                    }
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-gray-300 text-lg"
                    placeholder="e.g., college, stress, achievement, friends"
                  />
                </div>

                <div className="flex space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowNewEntry(false);
                      setEditingEntry(null);
                    }}
                    className="flex-1 px-8 py-3 text-gray-600 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-semibold flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <Save className="h-5 w-5 mr-2" />
                    {editingEntry ? "Update" : "Save"} Entry
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Journal Entries */}
        <div className="space-y-8">
          {filteredEntries.map((entry, index) => (
            <div
              key={entry.id}
              className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 border border-white/20 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                      <div className="text-2xl">{getMoodIcon(entry.mood)}</div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors">
                        {entry.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(entry.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span
                      className={`px-4 py-2 rounded-xl text-sm font-semibold ${getMoodColor(
                        entry.mood
                      )}`}
                    >
                      {entry.mood}
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditEntry(entry)}
                        className="text-gray-400 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-blue-50"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteEntry(entry.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-red-50"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                  {entry.content}
                </p>

                {entry.tags && (
                  <div className="flex flex-wrap gap-3">
                    {entry.tags.split(",").map((tag, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 text-sm rounded-xl font-medium hover:from-blue-100 hover:to-purple-100 transition-all duration-300"
                      >
                        #{tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredEntries.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {searchQuery ? "No entries found" : "No journal entries yet"}
            </h3>
            <p className="text-gray-600 text-lg mb-6">
              {searchQuery
                ? "Try adjusting your search terms"
                : "Start your journaling journey by creating your first entry"}
            </p>
            {!searchQuery && (
              <button
                onClick={() => {
                  setEditingEntry(null);
                  setNewEntry({
                    title: "",
                    content: "",
                    mood: "neutral",
                    tags: "",
                  });
                  setShowNewEntry(true);
                }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-semibold"
              >
                Create First Entry
              </button>
            )}
          </div>
        )}

        {/* Journal Statistics */}
        {entries.length > 0 && (
          <div className="mt-16 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Your Journal Insights
              </h3>
              <p className="text-gray-600 text-lg">
                Track your mental health journey
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-2">
                  {entries.length}
                </h4>
                <p className="text-gray-600">Total Entries</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-2">
                  {Math.max(0, entries.length - 1)}
                </h4>
                <p className="text-gray-600">Days Streak</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-2">
                  {Math.round(
                    (entries.filter(
                      (e) => e.mood === "happy" || e.mood === "excited"
                    ).length /
                      entries.length) *
                      100
                  ) || 0}
                  %
                </h4>
                <p className="text-gray-600">Positive Days</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalJournal;
