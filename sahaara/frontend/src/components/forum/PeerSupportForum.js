import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MessageCircle,
  Users,
  Flag,
  Heart,
  Reply,
  Plus,
  Search,
  Sparkles,
  Clock,
  ArrowRight,
  Shield,
  CheckCircle,
} from "lucide-react";
import { forumPosts } from "../../data/mockData";

const PeerSupportForum = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
  });
  const [selectedPost, setSelectedPost] = useState(null);

  const filteredPosts = forumPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNewPost = (e) => {
    e.preventDefault();
    if (newPost.title && newPost.content) {
      alert("Post submitted successfully! (This is a demo)");
      setNewPost({ title: "", content: "" });
      setShowNewPost(false);
    }
  };

  const handleReply = (postId) => {
    const reply = prompt("Enter your reply:");
    if (reply) {
      alert("Reply posted successfully! (This is a demo)");
    }
  };

  const handleReport = (postId) => {
    if (window.confirm("Are you sure you want to report this post?")) {
      alert("Post reported. Our moderators will review it.");
    }
  };

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        </div>

        {/* Header */}
        <div className="relative bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSelectedPost(null)}
                className="group flex items-center text-gray-600 hover:text-gray-900 transition-all duration-300 hover:bg-gray-100 rounded-lg px-4 py-2"
              >
                <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Forum
              </button>
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900">
                  {selectedPost.title}
                </h1>
                <div className="flex items-center justify-center space-x-2 mt-1">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {selectedPost.timestamp}
                  </span>
                </div>
              </div>
              <div className="w-24"></div>
            </div>
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8 border border-white/20 animate-fade-in-up">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">
                    {selectedPost.author}
                  </p>
                  <p className="text-sm text-gray-500">
                    {selectedPost.timestamp}
                  </p>
                </div>
              </div>
              {selectedPost.reported && (
                <span className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full font-medium">
                  Reported
                </span>
              )}
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">
              {selectedPost.content}
            </p>
          </div>

          {/* Replies */}
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Replies ({selectedPost.replies})
              </h3>
              <p className="text-gray-600">Share your thoughts and support</p>
            </div>

            {/* Mock replies */}
            {[1, 2, 3].map((replyId, index) => (
              <div
                key={replyId}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-3">
                      <p className="font-bold text-gray-900 mr-3">
                        Anonymous Student
                      </p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {replyId} hours ago
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      This is a sample reply to demonstrate the forum
                      functionality. In a real application, these would be
                      actual user responses.
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Reply Form */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
              <h4 className="text-xl font-bold text-gray-900 mb-6">
                Add a Reply
              </h4>
              <textarea
                rows={6}
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-gray-300 text-lg"
                placeholder="Share your thoughts and support..."
              ></textarea>
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => handleReply(selectedPost.id)}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-semibold flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <Reply className="h-5 w-5 mr-2" />
                  Post Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
                Peer Support Forum
              </h1>
              <div className="flex items-center justify-center space-x-2 mt-2">
                <Sparkles className="h-4 w-4 text-yellow-500 animate-pulse" />
                <p className="text-gray-600 font-medium">Community Support</p>
              </div>
            </div>
            <div className="w-24"></div>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-8">
        {/* Search and New Post */}
        <div className="mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 animate-fade-in-up">
            <div className="flex flex-col lg:flex-row gap-6 mb-8">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search discussions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-gray-300 text-lg"
                  />
                </div>
              </div>
              <button
                onClick={() => setShowNewPost(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-semibold text-lg flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Plus className="h-5 w-5 mr-2" />
                New Post
              </button>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
              <div className="flex items-center space-x-3">
                <Shield className="h-6 w-6 text-blue-600" />
                <p className="text-gray-700 font-medium">
                  <strong>Remember:</strong> This is a safe space. Be kind,
                  respectful, and supportive to fellow students.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* New Post Modal */}
        {showNewPost && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Create New Post
              </h3>
              <form onSubmit={handleNewPost} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={newPost.title}
                    onChange={(e) =>
                      setNewPost({ ...newPost, title: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="What's on your mind?"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content
                  </label>
                  <textarea
                    value={newPost.content}
                    onChange={(e) =>
                      setNewPost({ ...newPost, content: e.target.value })
                    }
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Share your thoughts, ask for advice, or offer support..."
                    required
                  ></textarea>
                </div>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowNewPost(false)}
                    className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Forum Posts */}
        <div className="space-y-8">
          {filteredPosts.map((post, index) => (
            <div
              key={post.id}
              className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 hover:scale-105 border border-white/20 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => setSelectedPost(post)}
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-900">
                        {post.author}
                      </p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {post.timestamp}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {post.reported && (
                      <span className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full font-medium">
                        Reported
                      </span>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReport(post.id);
                      }}
                      className="text-gray-400 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-red-50"
                    >
                      <Flag className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-6 line-clamp-2 text-lg leading-relaxed">
                  {post.content}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReply(post.id);
                      }}
                      className="flex items-center text-gray-600 hover:text-blue-600 transition-colors font-medium group-hover:scale-105"
                    >
                      <Reply className="h-5 w-5 mr-2" />
                      Reply ({post.replies})
                    </button>
                    <button className="flex items-center text-gray-600 hover:text-red-600 transition-colors font-medium group-hover:scale-105">
                      <Heart className="h-5 w-5 mr-2" />
                      Support
                    </button>
                  </div>
                  <div className="text-sm text-gray-500 font-medium">
                    {post.replies} replies
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              No discussions found
            </h3>
            <p className="text-gray-600 text-lg mb-6">
              Try adjusting your search or create a new post
            </p>
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-semibold">
              Clear Search
            </button>
          </div>
        )}

        {/* Community Guidelines */}
        <div className="mt-16 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Community Guidelines
            </h3>
            <p className="text-gray-600 text-lg">
              Help us maintain a safe and supportive environment
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6">
              <h4 className="text-xl font-bold text-green-900 mb-4 flex items-center">
                <CheckCircle className="h-6 w-6 mr-2" />
                Do:
              </h4>
              <ul className="space-y-3 text-green-800">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Be kind and supportive
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Share your experiences
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Ask for help when needed
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Respect others' privacy
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-6">
              <h4 className="text-xl font-bold text-red-900 mb-4 flex items-center">
                <Flag className="h-6 w-6 mr-2" />
                Don't:
              </h4>
              <ul className="space-y-3 text-red-800">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                  Share personal information
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                  Give medical advice
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                  Be judgmental or critical
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                  Spam or post irrelevant content
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeerSupportForum;
