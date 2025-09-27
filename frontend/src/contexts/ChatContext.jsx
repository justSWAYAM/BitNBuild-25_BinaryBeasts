import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';
import { getUserChatRooms, getUnreadMessageCount } from '../services/chatService';
import { updateUserOnlineStatus } from '../services/userService';

const ChatContext = createContext();

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  const [chatRooms, setChatRooms] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [activeChatRoom, setActiveChatRoom] = useState(null);

  useEffect(() => {
    if (user) {
      // Subscribe to user's chat rooms
      const unsubscribeChatRooms = getUserChatRooms(user.uid, setChatRooms);
      
      // Subscribe to unread message count
      const unsubscribeUnreadCount = getUnreadMessageCount(user.uid, setUnreadCount);
      
      // Set user as online
      updateUserOnlineStatus(user.uid, true);
      
      // Set user as offline when component unmounts or user signs out
      const setOfflineOnUnload = () => {
        updateUserOnlineStatus(user.uid, false);
      };
      
      window.addEventListener('beforeunload', setOfflineOnUnload);
      
      return () => {
        unsubscribeChatRooms();
        unsubscribeUnreadCount();
        window.removeEventListener('beforeunload', setOfflineOnUnload);
        updateUserOnlineStatus(user.uid, false);
      };
    }
  }, [user]);

  const value = {
    user,
    loading,
    error,
    chatRooms,
    unreadCount,
    activeChatRoom,
    setActiveChatRoom
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContext;