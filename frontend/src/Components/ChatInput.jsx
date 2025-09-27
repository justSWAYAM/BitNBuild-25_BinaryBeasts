import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, X, Image, FileText } from 'lucide-react';

const ChatInput = ({ onSendMessage, onTyping }) => {
  const [message, setMessage] = useState('');
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 100)}px`;
    }
  }, [message]);

  // Handle typing indicator - simplified logic
  useEffect(() => {
    // Only notify parent about typing for demo purposes
    if (onTyping) {
      onTyping(message.trim().length > 0);
    }
  }, [message, onTyping]);

  const handleSend = () => {
    const trimmedMessage = message.trim();
    
    if (!trimmedMessage && attachedFiles.length === 0) return;

    if (attachedFiles.length > 0) {
      // Send files
      attachedFiles.forEach((file, index) => {
        setTimeout(() => {
          onSendMessage({
            type: file.type.startsWith('image/') ? 'image' : 'file',
            message: index === 0 ? trimmedMessage : '', // Only include message with first file
            fileName: file.name,
            fileSize: formatFileSize(file.size),
            file: file
          });
        }, index * 100); // Small delay between multiple files
      });
    } else {
      // Send text message
      onSendMessage({
        type: 'text',
        message: trimmedMessage
      });
    }

    // Clear inputs
    setMessage('');
    setAttachedFiles([]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || []);
    addFiles(files);
  };

  const addFiles = (files) => {
    const validFiles = files.filter(file => {
      // Limit file size to 10MB
      if (file.size > 10 * 1024 * 1024) {
        alert(`File ${file.name} is too large. Maximum size is 10MB.`);
        return false;
      }
      return true;
    });

    setAttachedFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const getFileIcon = (file) => {
    if (file.type.startsWith('image/')) {
      return <Image className="w-4 h-4" />;
    }
    return <FileText className="w-4 h-4" />;
  };

  const getFilePreview = (file) => {
    if (file.type.startsWith('image/')) {
      return URL.createObjectURL(file);
    }
    return null;
  };

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    addFiles(files);
  };

  return (
    <div className="bg-slate-950">
      <div className="max-w-4xl mx-auto py-4">
        {/* File attachments preview */}
        {attachedFiles.length > 0 && (
          <div className="mx-4 mb-3">
            <div className="flex flex-wrap gap-2">
              {attachedFiles.map((file, index) => {
                const preview = getFilePreview(file);
                return (
                  <div key={index} className="relative">
                    <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-xl p-3 max-w-xs">
                      <div className="flex items-center space-x-3">
                        {preview ? (
                          <img 
                            src={preview} 
                            alt={file.name}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="p-2 bg-slate-700/50 rounded-lg text-slate-300">
                            {getFileIcon(file)}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-medium truncate">{file.name}</p>
                          <p className="text-slate-400 text-xs">{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition-colors duration-200"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Main input area */}
        <div 
          className={`mx-4 ${isDragging ? 'bg-emerald-500/5' : ''} transition-colors duration-200 rounded-2xl`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {isDragging && (
            <div className="absolute inset-0 bg-emerald-500/10 border-2 border-dashed border-emerald-500/50 rounded-2xl flex items-center justify-center z-10 mx-4">
              <div className="text-emerald-400 font-medium">Drop files here to attach</div>
            </div>
          )}

          <div className="flex items-end space-x-3 bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-3 focus-within:border-emerald-500/50 transition-all duration-200">
            {/* File attachment button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 hover:bg-slate-700/50 rounded-xl transition-colors duration-200 text-slate-300 hover:text-emerald-400 flex-shrink-0"
              title="Attach file"
            >
              <Paperclip className="w-5 h-5" />
            </button>

            {/* Text input */}
            <div className="flex-1">
              <textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="w-full bg-transparent text-white placeholder-slate-400 resize-none focus:outline-none max-h-[100px] min-h-[24px] leading-6 py-1"
                rows={1}
              />
            </div>

            {/* Send button */}
            <button
              onClick={handleSend}
              disabled={!message.trim() && attachedFiles.length === 0}
              className={`p-2.5 rounded-xl transition-all duration-200 flex-shrink-0 ${
                message.trim() || attachedFiles.length > 0
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg hover:shadow-emerald-500/25 hover:scale-105'
                  : 'bg-slate-700/50 text-slate-500 cursor-not-allowed'
              }`}
              title="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,application/pdf,.doc,.docx,.txt,.zip,.rar"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ChatInput;