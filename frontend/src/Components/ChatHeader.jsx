import React from 'react';
import { ArrowLeft, Phone, Video, MoreVertical } from 'lucide-react';

const ChatHeader = ({ partner, onBack, onCall, onVideoCall, onMore }) => {
  return (
    <div className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-xl border-b border-slate-700/30">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section - Back button and partner info */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-slate-800/50 rounded-xl transition-colors duration-200 text-slate-300 hover:text-white"
              title="Back to marketplace"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3">
              {/* Avatar */}
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-slate-900 font-semibold">
                  {partner.avatar}
                </div>
                {/* Online status indicator */}
                {partner.status === 'online' && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 border-2 border-slate-950 rounded-full"></div>
                )}
              </div>

              {/* Partner Info */}
              <div>
                <h2 className="text-white font-semibold text-lg">{partner.name}</h2>
                <p className="text-slate-400 text-sm">
                  {partner.status === 'online' ? partner.lastSeen : `Last seen ${partner.lastSeen}`}
                </p>
              </div>
            </div>
          </div>

          {/* Right Section - Action buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onCall}
              className="p-3 hover:bg-slate-800/50 rounded-xl transition-all duration-200 text-slate-300 hover:text-emerald-400 group"
              title="Voice call"
            >
              <Phone className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            </button>

            <button
              onClick={onVideoCall}
              className="p-3 hover:bg-slate-800/50 rounded-xl transition-all duration-200 text-slate-300 hover:text-emerald-400 group"
              title="Video call"
            >
              <Video className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            </button>

            <button
              onClick={onMore}
              className="p-3 hover:bg-slate-800/50 rounded-xl transition-all duration-200 text-slate-300 hover:text-white"
              title="More options"
            >
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;