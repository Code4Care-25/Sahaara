import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, Play, Volume2, Globe, Clock } from "lucide-react";
import { resources } from "../data/mockData";

const ResourceHub = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState("all");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResources = resources.filter((resource) => {
    const matchesType =
      selectedType === "all" || resource.type === selectedType;
    const matchesLanguage =
      selectedLanguage === "all" || resource.language === selectedLanguage;
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesLanguage && matchesSearch;
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case "article":
        return <BookOpen className="h-5 w-5" />;
      case "video":
        return <Play className="h-5 w-5" />;
      case "audio":
        return <Volume2 className="h-5 w-5" />;
      default:
        return <BookOpen className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "article":
        return "bg-blue-100 text-blue-600";
      case "video":
        return "bg-red-100 text-red-600";
      case "audio":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const handleResourceClick = (resource) => {
    alert(`Opening ${resource.title}...`);
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
            <h1 className="text-2xl font-bold text-gray-900">Resource Hub</h1>
            <div className="text-sm text-gray-600">Educational Content</div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div className="flex gap-4">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="all">All Types</option>
                  <option value="article">Articles</option>
                  <option value="video">Videos</option>
                  <option value="audio">Audio</option>
                </select>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="all">All Languages</option>
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Tamil">Tamil</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-gray-600">Quick filters:</span>
              {["all", "article", "video", "audio"].map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedType === type
                      ? "bg-primary-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {type === "all"
                    ? "All"
                    : type.charAt(0).toUpperCase() + type.slice(1) + "s"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <div
              key={resource.id}
              onClick={() => handleResourceClick(resource)}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`p-2 rounded-lg ${getTypeColor(resource.type)}`}
                  >
                    {getTypeIcon(resource.type)}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {resource.duration}
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {resource.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {resource.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Globe className="h-4 w-4 mr-1" />
                    {resource.language}
                  </div>
                  <div className="text-sm text-primary-600 font-medium">
                    {resource.type === "article"
                      ? "Read"
                      : resource.type === "video"
                      ? "Watch"
                      : "Listen"}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No resources found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or filters
            </p>
          </div>
        )}

        {/* Featured Content */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Featured Content
          </h2>
          <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Mental Health Awareness Week
                </h3>
                <p className="text-gray-600 mb-4">
                  Special collection of resources focusing on mental health
                  awareness, coping strategies, and building resilience.
                </p>
                <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                  Explore Collection
                </button>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Exam Stress Management
                </h3>
                <p className="text-gray-600 mb-4">
                  Comprehensive guide to managing exam-related stress and
                  anxiety with practical techniques and relaxation exercises.
                </p>
                <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                  View Guide
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Language Support */}
        <div className="mt-12 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Multilingual Support
          </h3>
          <p className="text-gray-600 mb-4">
            We provide resources in multiple languages to ensure accessibility
            for all students.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["English", "Hindi", "Tamil", "Bengali"].map((lang) => (
              <div
                key={lang}
                className="text-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
              >
                <div className="text-lg font-medium text-gray-900">{lang}</div>
                <div className="text-sm text-gray-600">
                  {resources.filter((r) => r.language === lang).length}{" "}
                  resources
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceHub;
