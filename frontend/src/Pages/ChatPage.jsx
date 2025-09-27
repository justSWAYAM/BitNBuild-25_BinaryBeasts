import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import routes from '../utils/routes';
import ChatMessage from '../Components/ChatMessage';
import ChatInput from '../Components/ChatInput';
import ChatHeader from '../Components/ChatHeader';
import { auth } from '../config/firebase';
import { 
  subscribeToMessages, 
  sendMessage, 
  markMessagesAsRead,
  getOrCreateChatRoom 
} from '../services/chatService';
import { getUserProfile } from '../services/userService';
import { Send, Paperclip, ArrowLeft, MoreVertical, Phone, Video, MessageCircle } from 'lucide-react';

const ChatPage = () => {
  const navigate = useNavigate();
  const { partnerId } = useParams();
  const [searchParams] = useSearchParams();
  const [user, loading, error] = useAuthState(auth);
  
  // Get URL parameters for job context
  const jobId = searchParams.get('jobId');
  const jobTitle = searchParams.get('jobTitle');
  
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isOtherUserTyping, setIsOtherUserTyping] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Firebase-specific state
  const [chatRoomId, setChatRoomId] = useState(null);
  const [otherUser, setOtherUser] = useState(null);
  const [currentUserProfile, setCurrentUserProfile] = useState(null);
  const [isFirebaseEnabled, setIsFirebaseEnabled] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  // Current user - fully dynamic
  const currentUser = {
    id: user?.uid,
    name: user?.displayName || currentUserProfile?.name || 'User',
    type: currentUserProfile?.role || 'student'
  };

  // Chat partner info - fully dynamic
  const chatPartner = {
    id: partnerId,
    name: otherUser?.name || 'Chat Partner',
    type: otherUser?.role || 'client',
    avatar: otherUser?.name ? otherUser.name.charAt(0).toUpperCase() : 'U',
    status: otherUser?.isOnline ? 'online' : 'offline',
    lastSeen: otherUser?.isOnline ? 'Active now' : 'Last seen recently'
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Initialize Firebase chat
  const initializeFirebaseChat = async () => {
    // Check if we have required parameters
    if (!partnerId) {
      setIsFirebaseEnabled(false);
      setIsInitializing(false);
      setMessages([]);
      return;
    }

    try {
      setIsInitializing(true);
      
      // Get current user profile
      const userProfile = await getUserProfile(user.uid);
      setCurrentUserProfile(userProfile);

      // Get or create chat room with real partner ID
      const roomId = await getOrCreateChatRoom(
        user.uid, 
        partnerId, 
        jobId, 
        jobTitle
      );
      setChatRoomId(roomId);

      // Get other user profile
      const otherUserProfile = await getUserProfile(partnerId);
      setOtherUser(otherUserProfile);

      // Subscribe to messages
      const unsubscribe = subscribeToMessages(roomId, (firebaseMessages) => {
        // Transform Firebase messages to match your existing format
        const transformedMessages = firebaseMessages.map(msg => ({
          ...msg,
          senderType: msg.senderId === user.uid ? (userProfile?.role || 'student') : (otherUserProfile?.role || 'client'),
          timestamp: msg.timestamp?.toDate ? msg.timestamp.toDate().toISOString() : msg.timestamp
        }));
        setMessages(transformedMessages);
        setIsFirebaseEnabled(true);
        setIsInitializing(false);
      });

      // Mark messages as read
      await markMessagesAsRead(roomId, user.uid);

      return unsubscribe;
    } catch (error) {
      console.error('Error initializing Firebase chat:', error);
      setIsFirebaseEnabled(false);
      setIsInitializing(false);
      // Start with empty messages for new chats
      setMessages([]);
    }
  };

  useEffect(() => {
    if (user && !loading) {
      initializeFirebaseChat();
    } else if (!loading) {
      // Not authenticated, show empty chat with guidance
      setIsFirebaseEnabled(false);
      setIsInitializing(false);
      setMessages([]);
    }
  }, [user, loading, partnerId, jobId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (messageData) => {
    if (isFirebaseEnabled && chatRoomId && user) {
      // Send via Firebase
      try {
        await sendMessage(
          chatRoomId,
          user.uid,
          currentUserProfile?.name || user.displayName || 'Unknown User',
          messageData.message || messageData.text || '',
          messageData.type || 'text',
          messageData.fileUrl
        );
        setNewMessage('');
      } catch (error) {
        console.error('Error sending Firebase message:', error);
        // Fall back to local message handling
        handleLocalMessage(messageData);
      }
    } else {
      // Handle locally (demo mode)
      handleLocalMessage(messageData);
    }
  };

  const handleLocalMessage = (messageData) => {
    const newMsg = {
      id: messages.length + 1,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderType: currentUser.type,
      timestamp: new Date().toISOString(),
      ...messageData
    };
    
    setMessages(prev => [...prev, newMsg]);
    setNewMessage('');
  };

  // Simulate other user typing (for demo)
  const handleTypingChange = (isTyping) => {
    // Don't show typing indicator for current user's typing
    // In real implementation, this would come from WebSocket
    // For demo, we'll simulate random typing from other user
    if (Math.random() > 0.8) { // 20% chance to show other user typing
      setIsOtherUserTyping(true);
      setTimeout(() => setIsOtherUserTyping(false), 2000);
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
      });
    }
  };

  // Group messages by date
  const groupedMessages = messages.reduce((groups, message) => {
    const date = formatDate(message.timestamp);
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {});

  return (
    <div className="h-screen bg-slate-950 flex flex-col">
      {/* Loading State */}
      {(loading || isInitializing) && (
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400 mx-auto mb-4"></div>
            <p className="text-slate-300">
              {loading ? 'Connecting...' : 'Initializing chat...'}
            </p>
          </div>
        </div>
      )}

      {/* Chat Header */}
      <ChatHeader 
        partner={chatPartner}
        onBack={() => navigate(routes.MARKETPLACE)}
        onCall={() => console.log('Voice call')}
        onVideoCall={() => console.log('Video call')}
        onMore={() => console.log('More options')}
      />

      {/* Firebase Status Indicator */}
      {!loading && !isInitializing && (
        <div className="px-4 py-2 bg-slate-900/50 border-b border-slate-800">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                partnerId && isFirebaseEnabled ? 'bg-emerald-400' : 
                partnerId ? 'bg-amber-400' : 'bg-slate-400'
              }`}></div>
              <span className="text-slate-400 text-sm">
                {!partnerId ? 'No chat selected' :
                 isFirebaseEnabled ? 'Live chat enabled' : 'Chat ready'}
              </span>
            </div>
            {!user && (
              <button 
                onClick={() => navigate(routes.HOME)}
                className="text-emerald-400 text-sm hover:text-emerald-300 transition-colors"
              >
                Sign in for live chat
              </button>
            )}
          </div>
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto scroll-smooth">
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
          {/* No Partner Selected State */}
          {!partnerId && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-300 mb-2">No Chat Selected</h3>
                <p className="text-slate-500 mb-4">Select a user to start chatting</p>
                <button 
                  onClick={() => navigate(routes.MARKETPLACE)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Browse Projects
                </button>
              </div>
            </div>
          )}

          {/* Empty Chat State */}
          {partnerId && messages.length === 0 && !isInitializing && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-900 font-bold text-xl">
                  {chatPartner.avatar}
                </div>
                <h3 className="text-xl font-semibold text-slate-300 mb-2">Start a conversation</h3>
                <p className="text-slate-500 mb-4">
                  {jobTitle ? `About: ${jobTitle}` : `Send a message to ${chatPartner.name}`}
                </p>
                <div className="text-slate-600 text-sm">
                  {isFirebaseEnabled ? 'Messages will appear here in real-time' : 'Sign in to enable live chat'}
                </div>
              </div>
            </div>
          )}

          {/* Messages */}
          {messages.length > 0 && Object.entries(groupedMessages).map(([date, dateMessages]) => (
            <div key={date} className="space-y-4">
              {/* Date Separator */}
              <div className="flex items-center justify-center my-6">
                <div className="bg-slate-800/60 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-slate-300 text-sm font-medium">{date}</span>
                </div>
              </div>

              {/* Messages for this date */}
              {dateMessages.map((message, index) => (
                <div 
                  key={message.id} 
                  className="animate-fade-in opacity-0"
                  style={{ 
                    animationDelay: `${index * 100}ms`, 
                    animationFillMode: 'forwards',
                    animationDuration: '300ms'
                  }}
                >
                  <ChatMessage
                    message={message}
                    isCurrentUser={message.senderId === currentUser.id}
                    showTime={true}
                  />
                </div>
              ))}
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>
        
        {/* Typing Indicator Container - Fixed position to prevent layout shift */}
        <div className="max-w-4xl mx-auto px-4">
          <div className="h-12 flex items-start">
            {isOtherUserTyping && partnerId && (
              <div className="flex items-start space-x-3 animate-in slide-in-from-left-2 duration-300">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-slate-900 font-semibold text-sm">
                  {chatPartner.avatar}
                </div>
                <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl rounded-bl-md px-4 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chat Input - Fixed at bottom */}
      <div className="border-t border-slate-700/30 bg-slate-950">
        {partnerId ? (
          <ChatInput 
            onSendMessage={handleSendMessage}
            onTyping={handleTypingChange}
          />
        ) : (
          <div className="p-4 text-center text-slate-500">
            Select a chat partner to start messaging
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;