import { 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  doc, 
  updateDoc, 
  serverTimestamp,
  getDocs,
  limit,
  startAfter,
  getDoc,
  setDoc
} from 'firebase/firestore';
import { db } from '../config/firebase';

// Chat room management
export const createChatRoom = async (participants, jobId = null, jobTitle = null) => {
  try {
    const chatRoomData = {
      participants: participants, // Array of user IDs
      jobId: jobId,
      jobTitle: jobTitle,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      lastMessage: null,
      lastMessageTime: null
    };

    const docRef = await addDoc(collection(db, 'chatRooms'), chatRoomData);
    return docRef.id;
  } catch (error) {
    console.error('Error creating chat room:', error);
    throw error;
  }
};

// Get or create chat room between two users
export const getOrCreateChatRoom = async (userId1, userId2, jobId = null, jobTitle = null) => {
  try {
    // Check if chat room already exists
    const q = query(
      collection(db, 'chatRooms'),
      where('participants', 'array-contains', userId1)
    );
    
    const querySnapshot = await getDocs(q);
    let existingRoom = null;
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.participants.includes(userId2)) {
        existingRoom = { id: doc.id, ...data };
      }
    });

    if (existingRoom) {
      return existingRoom.id;
    }

    // Create new chat room if none exists
    return await createChatRoom([userId1, userId2], jobId, jobTitle);
  } catch (error) {
    console.error('Error getting or creating chat room:', error);
    throw error;
  }
};

// Send a message
export const sendMessage = async (chatRoomId, senderId, senderName, message, messageType = 'text', fileUrl = null) => {
  try {
    const messageData = {
      chatRoomId,
      senderId,
      senderName,
      message,
      type: messageType, // 'text', 'file', 'image'
      fileUrl,
      timestamp: serverTimestamp(),
      readBy: [senderId] // Initially only read by sender
    };

    // Add message to messages collection
    const messageRef = await addDoc(collection(db, 'messages'), messageData);

    // Update chat room with last message info
    const chatRoomRef = doc(db, 'chatRooms', chatRoomId);
    await updateDoc(chatRoomRef, {
      lastMessage: message,
      lastMessageTime: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    return messageRef.id;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

// Listen to messages in real-time
export const subscribeToMessages = (chatRoomId, callback) => {
  const q = query(
    collection(db, 'messages'),
    where('chatRoomId', '==', chatRoomId),
    orderBy('timestamp', 'asc')
  );

  return onSnapshot(q, (querySnapshot) => {
    const messages = [];
    querySnapshot.forEach((doc) => {
      messages.push({ id: doc.id, ...doc.data() });
    });
    callback(messages);
  });
};

// Get chat rooms for a user
export const getUserChatRooms = (userId, callback) => {
  const q = query(
    collection(db, 'chatRooms'),
    where('participants', 'array-contains', userId),
    orderBy('updatedAt', 'desc')
  );

  return onSnapshot(q, (querySnapshot) => {
    const chatRooms = [];
    querySnapshot.forEach((doc) => {
      chatRooms.push({ id: doc.id, ...doc.data() });
    });
    callback(chatRooms);
  });
};

// Mark messages as read
export const markMessagesAsRead = async (chatRoomId, userId) => {
  try {
    const q = query(
      collection(db, 'messages'),
      where('chatRoomId', '==', chatRoomId),
      where('readBy', 'not-in', [[userId]])
    );

    const querySnapshot = await getDocs(q);
    
    const batch = [];
    querySnapshot.forEach((docSnapshot) => {
      const messageRef = doc(db, 'messages', docSnapshot.id);
      const currentReadBy = docSnapshot.data().readBy || [];
      if (!currentReadBy.includes(userId)) {
        batch.push(
          updateDoc(messageRef, {
            readBy: [...currentReadBy, userId]
          })
        );
      }
    });

    await Promise.all(batch);
  } catch (error) {
    console.error('Error marking messages as read:', error);
    throw error;
  }
};

// Get unread message count
export const getUnreadMessageCount = (userId, callback) => {
  const q = query(
    collection(db, 'messages'),
    where('readBy', 'not-in', [[userId]])
  );

  return onSnapshot(q, (querySnapshot) => {
    let count = 0;
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.senderId !== userId && (!data.readBy || !data.readBy.includes(userId))) {
        count++;
      }
    });
    callback(count);
  });
};

// Search messages
export const searchMessages = async (chatRoomId, searchTerm, limitCount = 20) => {
  try {
    const q = query(
      collection(db, 'messages'),
      where('chatRoomId', '==', chatRoomId),
      orderBy('timestamp', 'desc'),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    const messages = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.message.toLowerCase().includes(searchTerm.toLowerCase())) {
        messages.push({ id: doc.id, ...data });
      }
    });

    return messages.reverse(); // Return in chronological order
  } catch (error) {
    console.error('Error searching messages:', error);
    throw error;
  }
};