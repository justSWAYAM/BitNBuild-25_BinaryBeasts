import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';
import { createUserProfile, getUserProfile } from '../services/userService';
import { getOrCreateChatRoom, sendMessage, subscribeToMessages } from '../services/chatService';

const FirebaseTest = () => {
  const [user, loading, error] = useAuthState(auth);
  const [testResults, setTestResults] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  const addResult = (test, status, message) => {
    setTestResults(prev => [...prev, { test, status, message, timestamp: new Date().toLocaleTimeString() }]);
  };

  const runTests = async () => {
    setIsRunning(true);
    setTestResults([]);

    try {
      addResult('Authentication', 'info', `User: ${user ? user.email : 'Not authenticated'}`);
      
      if (!user) {
        addResult('Authentication', 'warning', 'Please sign in to test Firebase functionality');
        setIsRunning(false);
        return;
      }

      // Test 1: Create/Update user profile
      try {
        await createUserProfile(user.uid, {
          name: user.displayName || 'Test User',
          email: user.email,
          role: 'student'
        });
        addResult('User Profile', 'success', 'User profile created/updated successfully');
      } catch (err) {
        addResult('User Profile', 'error', `Failed: ${err.message}`);
      }

      // Test 2: Get user profile
      try {
        const profile = await getUserProfile(user.uid);
        addResult('Get Profile', 'success', `Profile retrieved: ${profile.name}`);
      } catch (err) {
        addResult('Get Profile', 'error', `Failed: ${err.message}`);
      }

      // Test 3: Create chat room
      let chatRoomId;
      try {
        chatRoomId = await getOrCreateChatRoom(user.uid, 'test-user-2', 'test-job', 'Test Chat Room');
        addResult('Chat Room', 'success', `Chat room created: ${chatRoomId}`);
      } catch (err) {
        addResult('Chat Room', 'error', `Failed: ${err.message}`);
      }

      // Test 4: Send a test message
      if (chatRoomId) {
        try {
          await sendMessage(chatRoomId, user.uid, 'Test User', 'Hello! This is a test message from Firebase.', 'text');
          addResult('Send Message', 'success', 'Test message sent successfully');
        } catch (err) {
          addResult('Send Message', 'error', `Failed: ${err.message}`);
        }

        // Test 5: Subscribe to messages
        try {
          const unsubscribe = subscribeToMessages(chatRoomId, (messages) => {
            addResult('Real-time Messages', 'success', `Received ${messages.length} messages in real-time`);
            unsubscribe(); // Clean up
          });
        } catch (err) {
          addResult('Real-time Messages', 'error', `Failed: ${err.message}`);
        }
      }

      addResult('Tests Complete', 'info', 'All tests finished!');
    } catch (err) {
      addResult('General Error', 'error', err.message);
    }

    setIsRunning(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Firebase Connection Test</h1>
        
        <div className="bg-slate-900 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Authentication Status</h2>
          {loading && <p className="text-slate-400">Loading...</p>}
          {error && <p className="text-red-400">Error: {error.message}</p>}
          {user ? (
            <div className="text-green-400">
              <p>✅ Signed in as: {user.email}</p>
              <p>User ID: {user.uid}</p>
            </div>
          ) : (
            <div className="text-amber-400">
              <p>⚠️ Not signed in</p>
              <p>Please sign in through your app to test Firebase functionality</p>
            </div>
          )}
        </div>

        <div className="bg-slate-900 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Firebase Tests</h2>
            <button
              onClick={runTests}
              disabled={isRunning || !user}
              className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              {isRunning ? 'Running Tests...' : 'Run Tests'}
            </button>
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {testResults.map((result, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-slate-800 rounded">
                <span className={`w-2 h-2 rounded-full ${
                  result.status === 'success' ? 'bg-green-400' :
                  result.status === 'error' ? 'bg-red-400' :
                  result.status === 'warning' ? 'bg-amber-400' :
                  'bg-blue-400'
                }`}></span>
                <span className="text-slate-300 font-medium min-w-32">{result.test}:</span>
                <span className={`flex-1 ${
                  result.status === 'success' ? 'text-green-400' :
                  result.status === 'error' ? 'text-red-400' :
                  result.status === 'warning' ? 'text-amber-400' :
                  'text-slate-400'
                }`}>{result.message}</span>
                <span className="text-slate-500 text-sm">{result.timestamp}</span>
              </div>
            ))}
            {testResults.length === 0 && !isRunning && (
              <p className="text-slate-500 text-center py-8">Click "Run Tests" to test your Firebase connection</p>
            )}
          </div>
        </div>

        <div className="mt-6 text-slate-400 text-sm">
          <p><strong>Note:</strong> File upload tests are disabled since Firebase Storage is not available on your current plan.</p>
          <p>Text messaging and real-time chat functionality will work perfectly without Storage.</p>
        </div>
      </div>
    </div>
  );
};

export default FirebaseTest;