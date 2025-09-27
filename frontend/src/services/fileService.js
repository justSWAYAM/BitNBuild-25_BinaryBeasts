import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../config/firebase';
import { v4 as uuidv4 } from 'uuid';

// Upload file to Firebase Storage
export const uploadFile = async (file, folder = 'chat-files') => {
  try {
    const fileExtension = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    const filePath = `${folder}/${fileName}`;
    
    const storageRef = ref(storage, filePath);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return {
      url: downloadURL,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      path: filePath
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

// Upload image with compression (optional)
export const uploadImage = async (file, folder = 'chat-images', maxWidth = 1200) => {
  try {
    // Create canvas for image compression
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    return new Promise((resolve, reject) => {
      img.onload = async () => {
        // Calculate new dimensions
        let { width, height } = img;
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw and compress image
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob(async (compressedFile) => {
          try {
            const fileExtension = file.name.split('.').pop();
            const fileName = `${uuidv4()}.${fileExtension}`;
            const filePath = `${folder}/${fileName}`;
            
            const storageRef = ref(storage, filePath);
            const snapshot = await uploadBytes(storageRef, compressedFile);
            const downloadURL = await getDownloadURL(snapshot.ref);
            
            resolve({
              url: downloadURL,
              fileName: file.name,
              fileSize: compressedFile.size,
              fileType: file.type,
              path: filePath,
              dimensions: { width, height }
            });
          } catch (error) {
            reject(error);
          }
        }, file.type, 0.8); // 80% quality
      };
      
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

// Delete file from Firebase Storage
export const deleteFile = async (filePath) => {
  try {
    const storageRef = ref(storage, filePath);
    await deleteObject(storageRef);
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};

// Validate file type and size
export const validateFile = (file, allowedTypes = [], maxSize = 10 * 1024 * 1024) => { // 10MB default
  const errors = [];
  
  if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
    errors.push(`File type ${file.type} is not allowed`);
  }
  
  if (file.size > maxSize) {
    errors.push(`File size must be less than ${maxSize / (1024 * 1024)}MB`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};