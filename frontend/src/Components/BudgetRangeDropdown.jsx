import React, { useState, useRef, useEffect } from 'react';

const BudgetRangeDropdown = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const budgetRanges = [
    { 
      label: 'All Budgets', 
      value: '', 
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 114 0 2 2 0 01-4 0zm6-2a2 2 0 100 4 2 2 0 000-4z"/>
        </svg>
      ), 
      range: '₹0 - ∞' 
    },
    { 
      label: 'Under ₹10,000', 
      value: 'under-10k', 
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
        </svg>
      ), 
      range: '₹0 - ₹10K' 
    },
    { 
      label: '₹10,000 - ₹25,000', 
      value: '10k-25k', 
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd"/>
        </svg>
      ), 
      range: '₹10K - ₹25K' 
    },
    { 
      label: '₹25,000 - ₹50,000', 
      value: '25k-50k', 
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd"/>
        </svg>
      ), 
      range: '₹25K - ₹50K' 
    },
    { 
      label: '₹50,000+', 
      value: '50k-plus', 
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ), 
      range: '₹50K+' 
    },
  ];

  const selectedRange = budgetRanges.find(range => range.value === value) || budgetRanges[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleRangeSelect = (range) => {
    onChange(range.value);
    setIsOpen(false);
  };

  return (
    <div className={`dropdown-container min-w-[200px] ${isOpen ? 'active' : ''}`} ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all duration-300 flex items-center justify-between hover:bg-slate-700/60 group text-white"
      >
        <div className="flex items-center gap-3">
          <span className="text-cyan-400">
            {selectedRange.icon}
          </span>
          <div className="text-left">
            <div className="text-white font-medium text-sm">
              {selectedRange.label}
            </div>
            <div className="text-gray-400 text-xs">
              {selectedRange.range}
            </div>
          </div>
        </div>
        
        <svg
          className={`w-4 h-4 text-cyan-400 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Invisible backdrop to catch clicks */}
          <div className="fixed inset-0 z-[9998]" onClick={() => setIsOpen(false)} />
          
          <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-lg z-[9999] max-h-60 overflow-y-auto">
            {budgetRanges.map((range, index) => (
              <div
                key={index}
                onClick={() => handleRangeSelect(range)}
                className={`flex items-center justify-between px-4 py-4 cursor-pointer transition-all duration-200 border-b border-slate-700/30 last:border-b-0 ${
                  value === range.value
                    ? 'bg-emerald-500/20 text-white font-medium'
                    : 'text-slate-200 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-emerald-400">{range.icon}</span>
                  <div>
                    <div className="font-medium">{range.label}</div>
                    <div className="text-xs opacity-70">{range.range}</div>
                  </div>
                </div>
                {value === range.value && (
                  <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default BudgetRangeDropdown;