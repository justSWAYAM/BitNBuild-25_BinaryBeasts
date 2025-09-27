import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, User } from 'lucide-react';

// Demo component to help test the chat functionality
const ChatTestLinks = () => {
  const navigate = useNavigate();

  const testUsers = [
    { id: 'test-client-1', name: 'Alice Johnson', role: 'client' },
    { id: 'test-client-2', name: 'Bob Smith', role: 'client' },
    { id: 'test-student-1', name: 'Charlie Brown', role: 'student' },
    { id: 'test-student-2', name: 'Diana Prince', role: 'student' },
  ];

  const startChat = (userId, userName, jobTitle = null) => {
    const chatUrl = `/chat/${userId}${jobTitle ? `?jobTitle=${encodeURIComponent(jobTitle)}&jobId=test-job-${Date.now()}` : ''}`;
    navigate(chatUrl);
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Chat Test Links</h1>
        
        <div className="bg-slate-900 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Start a Chat</h2>
          <p className="text-slate-400 mb-6">
            Click on any user below to start a chat with them. These are demo users for testing your Firebase chat.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testUsers.map((user) => (
              <div key={user.id} className="space-y-3">
                <div className="bg-slate-800 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-slate-900 font-semibold">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{user.name}</h3>
                      <p className="text-slate-400 text-sm capitalize">{user.role}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <button
                      onClick={() => startChat(user.id, user.name)}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Start General Chat</span>
                    </button>
                    
                    <button
                      onClick={() => startChat(user.id, user.name, 'Website Development Project')}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Chat About Project</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Instructions</h2>
          <div className="space-y-3 text-slate-300">
            <p>1. <strong>Sign in first</strong> through your app authentication to enable real Firebase chat</p>
            <p>2. <strong>Click on any user</strong> above to start chatting with them</p>
            <p>3. <strong>Open multiple tabs/browsers</strong> to simulate different users chatting</p>
            <p>4. <strong>Messages sync in real-time</strong> when both users are authenticated</p>
          </div>
          
          <div className="mt-6 pt-4 border-t border-slate-700">
            <h3 className="text-lg font-medium text-white mb-2">URL Format</h3>
            <code className="bg-slate-800 text-emerald-400 p-2 rounded text-sm block">
              /chat/[userId]?jobTitle=[title]&jobId=[id]
            </code>
            <p className="text-slate-400 text-sm mt-2">
              You can use this URL format to link directly to chats from your job listings or user profiles.
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/chat')}
            className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Go to Empty Chat (No Partner)
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatTestLinks;