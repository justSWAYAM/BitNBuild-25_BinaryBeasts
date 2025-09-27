import React from 'react';

const JobCard = ({ job, onApplyClick }) => {

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const posted = new Date(dateString);
    const diffTime = Math.abs(now - posted);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day ago';
    return `${diffDays} days ago`;
  };

  const formatBudget = (min, max) => {
    if (min === max) return `₹${min.toLocaleString()}`;
    return `₹${min.toLocaleString()} - ₹${max.toLocaleString()}`;
  };

  const formatDeadline = (deadline) => {
    return new Date(deadline).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="glass rounded-xl p-6 card-hover shadow-elegant animate-slideUp relative z-10 group border border-transparent hover:border-cyan-500/30 transition-all duration-500">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-teal-400 opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
          <h3 className="text-xl font-bold gradient-text group-hover:from-cyan-300 group-hover:to-teal-300 transition-all duration-300">{job.title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
          <span className="text-sm text-cyan-400 font-medium">{formatTimeAgo(job.postedAt)}</span>
        </div>
      </div>
      
      {/* Description */}
      <p className="mb-4 line-clamp-3 text-secondary">{job.description}</p>
      
      {/* Skills */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {job.skills.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 text-cyan-300 rounded-full text-sm font-medium border border-cyan-500/30 transition-all duration-300 hover:border-cyan-400/50 hover:bg-gradient-to-r hover:from-cyan-500/30 hover:to-teal-500/30"
            >
              {skill}
            </span>
          ))}
          {job.skills.length > 3 && (
            <span className="px-3 py-1.5 bg-gray-700/50 text-gray-300 rounded-full text-sm font-medium border border-gray-600/50">
              +{job.skills.length - 3} more
            </span>
          )}
        </div>
      </div>
      
      {/* Budget and Deadline */}
      <div className="flex justify-between items-center mb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
            <span className="font-medium text-gray-300">Budget</span>
          </div>
          <span className="font-bold text-white text-lg">{formatBudget(job.budget.min, job.budget.max)}</span>
        </div>
        <div className="space-y-1 text-right">
          <div className="flex items-center gap-2 justify-end">
            <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="font-medium text-gray-300">Deadline</span>
          </div>
          <span className="font-medium text-white">{formatDeadline(job.deadline)}</span>
        </div>
      </div>
      
      {/* Client Info */}
      <div className="flex justify-between items-center mb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="font-medium text-gray-300">Client</span>
          </div>
          <span className="font-medium text-white">{job.clientName}</span>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex gap-3">
        {/* Apply Button */}
        <button
          onClick={() => onApplyClick(job)}
          className="flex-1 text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-500 relative overflow-hidden"
          style={{ 
            background: 'linear-gradient(135deg, #155e75, #0f766e)',
            border: 'none',
            outline: 'none',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            WebkitAppearance: 'none',
            MozAppearance: 'none',
            appearance: 'none'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'linear-gradient(135deg, #0f766e, #06b6d4)';
            e.target.style.transform = 'translateY(-3px)';
            e.target.style.boxShadow = '0 20px 40px rgba(6, 182, 212, 0.4)';
            e.target.style.outline = 'none';
            e.target.style.border = 'none';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'linear-gradient(135deg, #155e75, #0f766e)';
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
            e.target.style.outline = 'none';
            e.target.style.border = 'none';
          }}
          onFocus={(e) => {
            e.target.style.outline = 'none';
            e.target.style.border = 'none';
            e.target.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
          }}
          onBlur={(e) => {
            e.target.style.outline = 'none';
            e.target.style.border = 'none';
          }}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <span>Apply Now</span>
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 skew-x-12"></div>
        </button>
      </div>
    </div>
  );
};

export default JobCard;