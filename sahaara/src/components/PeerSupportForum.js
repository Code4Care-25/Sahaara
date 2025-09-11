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
} from "lucide-react";
import { forumPosts } from "../data/mockData";

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
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSelectedPost(null)}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Forum
              </button>
              <h1 className="text-xl font-bold text-gray-900">
                {selectedPost.title}
              </h1>
              <div className="text-sm text-gray-600">
                {selectedPost.timestamp}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                  <Users className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {selectedPost.author}
                  </p>
                  <p className="text-sm text-gray-500">
                    {selectedPost.timestamp}
                  </p>
                </div>
              </div>
              {selectedPost.reported && (
                <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                  Reported
                </span>
              )}
            </div>
            <p className="text-gray-700 leading-relaxed">
              {selectedPost.content}
            </p>
          </div>

          {/* Replies */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Replies ({selectedPost.replies})
            </h3>

            {/* Mock replies */}
            {[1, 2, 3].map((replyId) => (
              <div key={replyId} className="bg-white rounded-lg shadow p-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                    <Users className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <p className="font-medium text-gray-900 mr-2">
                        Anonymous Student
                      </p>
                      <p className="text-sm text-gray-500">
                        {replyId} hours ago
                      </p>
                    </div>
                    <p className="text-gray-700">
                      This is a sample reply to demonstrate the forum
                      functionality. In a real application, these would be
                      actual user responses.
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Reply Form */}
            <div className="bg-white rounded-lg shadow p-6">
              <h4 className="font-medium text-gray-900 mb-4">Add a Reply</h4>
              <textarea
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 mb-4"
                placeholder="Share your thoughts and support..."
              ></textarea>
              <button
                onClick={() => handleReply(selectedPost.id)}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center"
              >
                <Reply className="h-4 w-4 mr-2" />
                Post Reply
              </button>
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
              Peer Support Forum
            </h1>
            <div className="text-sm text-gray-600">Community Support</div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and New Post */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search discussions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
              <button
                onClick={() => setShowNewPost(true)}
                className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Post
              </button>
            </div>

            <div className="text-sm text-gray-600">
              <p>
                💡 <strong>Remember:</strong> This is a safe space. Be kind,
                respectful, and supportive to fellow students.
              </p>
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
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                      <Users className="h-5 w-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{post.author}</p>
                      <p className="text-sm text-gray-500">{post.timestamp}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {post.reported && (
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                        Reported
                      </span>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReport(post.id);
                      }}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Flag className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {post.content}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReply(post.id);
                      }}
                      className="flex items-center text-gray-600 hover:text-primary-600 transition-colors"
                    >
                      <Reply className="h-4 w-4 mr-1" />
                      Reply ({post.replies})
                    </button>
                    <button className="flex items-center text-gray-600 hover:text-red-600 transition-colors">
                      <Heart className="h-4 w-4 mr-1" />
                      Support
                    </button>
                  </div>
                  <div className="text-sm text-gray-500">
                    {post.replies} replies
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No discussions found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or create a new post
            </p>
          </div>
        )}

        {/* Community Guidelines */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">
            Community Guidelines
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
            <div>
              <h4 className="font-medium mb-2">✅ Do:</h4>
              <ul className="space-y-1">
                <li>• Be kind and supportive</li>
                <li>• Share your experiences</li>
                <li>• Ask for help when needed</li>
                <li>• Respect others' privacy</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">❌ Don't:</h4>
              <ul className="space-y-1">
                <li>• Share personal information</li>
                <li>• Give medical advice</li>
                <li>• Be judgmental or critical</li>
                <li>• Spam or post irrelevant content</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeerSupportForum;
