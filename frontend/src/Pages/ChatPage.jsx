import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '../utils/routes';
import ChatMessage from '../Components/ChatMessage';
import ChatInput from '../Components/ChatInput';
import ChatHeader from '../Components/ChatHeader';
import { Send, Paperclip, ArrowLeft, MoreVertical, Phone, Video } from 'lucide-react';

// Sample chat data for demo
const sampleMessages = [
  {
    id: 1,
    senderId: 'client-1',
    senderName: 'Priya Patel',
    senderType: 'client',
    message: 'Hi! I saw your proposal for the e-commerce website. I have a few questions about the timeline.',
    timestamp: '2024-01-28T10:30:00Z',
    type: 'text'
  },
  {
    id: 2,
    senderId: 'student-1',
    senderName: 'Arjun Singh',
    senderType: 'student',
    message: 'Hello Priya! Thank you for considering my proposal. I\'d be happy to answer any questions you have about the timeline.',
    timestamp: '2024-01-28T10:35:00Z',
    type: 'text'
  },
  {
    id: 3,
    senderId: 'client-1',
    senderName: 'Priya Patel',
    senderType: 'client',
    message: 'Great! Can you break down the development phases? I need to understand when each milestone will be completed.',
    timestamp: '2024-01-28T10:40:00Z',
    type: 'text'
  },
  {
    id: 4,
    senderId: 'student-1',
    senderName: 'Arjun Singh',
    senderType: 'student',
    message: 'Absolutely! Here\'s the breakdown:',
    timestamp: '2024-01-28T10:45:00Z',
    type: 'text'
  },
  {
    id: 5,
    senderId: 'student-1',
    senderName: 'Arjun Singh',
    senderType: 'student',
    message: '/project-timeline.pdf',
    fileName: 'project-timeline.pdf',
    fileSize: '2.3 MB',
    timestamp: '2024-01-28T10:46:00Z',
    type: 'file'
  },
  {
    id: 6,
    senderId: 'client-1',
    senderName: 'Priya Patel',
    senderType: 'client',
    message: 'Perfect! This looks comprehensive. When can we start?',
    timestamp: '2024-01-28T11:00:00Z',
    type: 'text'
  },
  {
    id: 7,
    senderId: 'student-1',
    senderName: 'Arjun Singh',
    senderType: 'student',
    message: 'I can start immediately! Let me also share some mockups I prepared.',
    timestamp: '2024-01-28T11:05:00Z',
    type: 'text'
  },
  {
    id: 8,
    senderId: 'student-1',
    senderName: 'Arjun Singh',
    senderType: 'student',
    message: '/homepage-mockup.jpg',
    fileName: 'homepage-mockup.jpg',
    fileSize: '1.8 MB',
    timestamp: '2024-01-28T11:06:00Z',
    type: 'image'
  }
];

const ChatPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState(sampleMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isOtherUserTyping, setIsOtherUserTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Current user (for demo purposes, this would come from auth context)
  const currentUser = {
    id: 'student-1',
    name: 'Arjun Singh',
    type: 'student'
  };

  // Chat partner info (would come from props or context)
  const chatPartner = {
    id: 'client-1',
    name: 'Priya Patel',
    type: 'client',
    avatar: 'PP',
    status: 'online',
    lastSeen: 'Active now'
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (messageData) => {
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
      {/* Chat Header */}
      <ChatHeader 
        partner={chatPartner}
        onBack={() => navigate(routes.MARKETPLACE)}
        onCall={() => console.log('Voice call')}
        onVideoCall={() => console.log('Video call')}
        onMore={() => console.log('More options')}
      />

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto scroll-smooth">
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
          {Object.entries(groupedMessages).map(([date, dateMessages]) => (
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
            {isOtherUserTyping && (
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
        <ChatInput 
          onSendMessage={handleSendMessage}
          onTyping={handleTypingChange}
        />
      </div>
    </div>
  );
};

export default ChatPage;