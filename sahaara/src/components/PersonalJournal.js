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
              Personal Journal
            </h1>
            <div className="text-sm text-gray-600">
              {entries.length} entries
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and New Entry */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search your journal entries..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
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
                className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Entry
              </button>
            </div>

            <div className="text-sm text-gray-600">
              <p>
                💡 <strong>Tip:</strong> Regular journaling can help improve
                your mental health and self-awareness.
              </p>
            </div>
          </div>
        </div>

        {/* New/Edit Entry Modal */}
        {showNewEntry && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {editingEntry ? "Edit Entry" : "New Journal Entry"}
              </h3>
              <form
                onSubmit={editingEntry ? handleUpdateEntry : handleNewEntry}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={newEntry.title}
                    onChange={(e) =>
                      setNewEntry({ ...newEntry, title: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="What's the main theme of this entry?"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How are you feeling?
                  </label>
                  <select
                    value={newEntry.mood}
                    onChange={(e) =>
                      setNewEntry({ ...newEntry, mood: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content
                  </label>
                  <textarea
                    value={newEntry.content}
                    onChange={(e) =>
                      setNewEntry({ ...newEntry, content: e.target.value })
                    }
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Write about your day, thoughts, feelings, or anything that's on your mind..."
                    required
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={newEntry.tags}
                    onChange={(e) =>
                      setNewEntry({ ...newEntry, tags: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="e.g., college, stress, achievement, friends"
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowNewEntry(false);
                      setEditingEntry(null);
                    }}
                    className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {editingEntry ? "Update" : "Save"} Entry
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Journal Entries */}
        <div className="space-y-6">
          {filteredEntries.map((entry) => (
            <div
              key={entry.id}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="text-2xl mr-3">
                      {getMoodIcon(entry.mood)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {entry.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(entry.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getMoodColor(
                        entry.mood
                      )}`}
                    >
                      {entry.mood}
                    </span>
                    <button
                      onClick={() => handleEditEntry(entry)}
                      className="text-gray-400 hover:text-primary-600 transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteEntry(entry.id)}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed mb-4">
                  {entry.content}
                </p>

                {entry.tags && (
                  <div className="flex flex-wrap gap-2">
                    {entry.tags.split(",").map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
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
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchQuery ? "No entries found" : "No journal entries yet"}
            </h3>
            <p className="text-gray-600 mb-4">
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
                className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Create First Entry
              </button>
            )}
          </div>
        )}

        {/* Journal Statistics */}
        {entries.length > 0 && (
          <div className="mt-12 bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Your Journal Statistics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">
                  {entries.length}
                </div>
                <div className="text-sm text-gray-600">Total Entries</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {
                    entries.filter(
                      (e) => e.mood === "happy" || e.mood === "excited"
                    ).length
                  }
                </div>
                <div className="text-sm text-gray-600">Positive Entries</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {new Set(entries.map((e) => e.date)).size}
                </div>
                <div className="text-sm text-gray-600">Days Journaled</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalJournal;
