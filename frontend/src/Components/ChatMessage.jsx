import React, { useState } from 'react';
import { Download, FileText, Image, File, Eye } from 'lucide-react';

const ChatMessage = ({ message, isCurrentUser, showTime = true }) => {
  const [imageError, setImageError] = useState(false);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getFileIcon = (fileName) => {
    const extension = fileName?.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'pdf':
        return <FileText className="w-6 h-6 text-red-400" />;
      case 'doc':
      case 'docx':
        return <FileText className="w-6 h-6 text-blue-400" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'webp':
        return <Image className="w-6 h-6 text-green-400" />;
      default:
        return <File className="w-6 h-6 text-slate-400" />;
    }
  };

  const isImage = (fileName) => {
    const extension = fileName?.split('.').pop()?.toLowerCase();
    return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension);
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '';
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const renderMessageContent = () => {
    switch (message.type) {
      case 'text':
        return (
          <div className="break-words">
            <p className="text-white leading-relaxed">{message.message}</p>
          </div>
        );

      case 'image':
        return (
          <div className="space-y-3">
            {!imageError ? (
              <div className="relative group max-w-sm">
                <img
                  src={`/api/files/${message.fileName}`} // This would be your actual image URL
                  alt={message.fileName}
                  className="rounded-xl max-w-full h-auto cursor-pointer transition-transform duration-200 hover:scale-105"
                  onError={() => setImageError(true)}
                  onClick={() => {/* Open image in modal */}}
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
              </div>
            ) : (
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 max-w-sm">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-slate-700/50 rounded-lg">
                    {getFileIcon(message.fileName)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">{message.fileName}</p>
                    <p className="text-slate-400 text-sm">{message.fileSize}</p>
                  </div>
                </div>
              </div>
            )}
            {message.message && (
              <p className="text-white leading-relaxed">{message.message}</p>
            )}
          </div>
        );

      case 'file':
        return (
          <div className="space-y-3">
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 max-w-sm hover:bg-slate-800/60 transition-colors duration-200 cursor-pointer group">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-slate-700/50 rounded-lg group-hover:bg-slate-700/70 transition-colors duration-200">
                  {getFileIcon(message.fileName)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">{message.fileName}</p>
                  <p className="text-slate-400 text-sm">{message.fileSize}</p>
                </div>
                <button className="p-2 hover:bg-slate-600/50 rounded-lg transition-colors duration-200 text-slate-300 hover:text-emerald-400">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
            {message.message && (
              <p className="text-white leading-relaxed">{message.message}</p>
            )}
          </div>
        );

      default:
        return (
          <p className="text-white leading-relaxed">{message.message}</p>
        );
    }
  };

  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex items-start space-x-3 max-w-[70%] ${isCurrentUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {/* Avatar - only show for other user */}
        {!isCurrentUser && (
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-slate-900 font-semibold text-sm flex-shrink-0">
            {message.senderName?.charAt(0) || 'U'}
          </div>
        )}

        <div className="flex flex-col space-y-1">
          {/* Sender name - only show for other user */}
          {!isCurrentUser && (
            <span className="text-slate-400 text-sm font-medium px-1">
              {message.senderName}
            </span>
          )}

          {/* Message bubble */}
          <div className={`relative px-4 py-3 rounded-2xl ${
            isCurrentUser 
              ? 'bg-gradient-to-br from-emerald-500 to-teal-600 rounded-br-md' 
              : 'bg-slate-800/60 backdrop-blur-sm rounded-bl-md'
          }`}>
            {renderMessageContent()}

            {/* Message status and time */}
            {showTime && (
              <div className={`flex items-center space-x-1 mt-2 ${
                isCurrentUser ? 'justify-end' : 'justify-start'
              }`}>
                <span className={`text-xs ${
                  isCurrentUser ? 'text-emerald-100/80' : 'text-slate-400'
                }`}>
                  {formatTime(message.timestamp)}
                </span>
                {isCurrentUser && (
                  <div className="flex space-x-1">
                    {/* Message status indicators */}
                    <div className="w-4 h-4 flex items-center justify-center">
                      {/* Delivered status */}
                      <svg className="w-3 h-3 text-emerald-100/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;