import React, { useState, useRef, useEffect } from 'react';

const CustomDropdown = ({ 
  value, 
  onChange, 
  options, 
  placeholder = "Select option",
  icon = null 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  // Filter options based on search
  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className={`dropdown-container min-w-[200px] ${isOpen ? 'active' : ''}`} ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all duration-300 flex items-center justify-between hover:bg-slate-700/60 text-white"
      >
        <div className="flex items-center gap-2">
          {icon && <span className="text-emerald-400">{icon}</span>}
          <span className="text-white font-medium">
            {value || placeholder}
          </span>
        </div>
        
        <svg
          className={`w-4 h-4 text-emerald-400 transition-transform duration-300 ${
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
          {/* Invisible backdrop */}
          <div 
            className="fixed inset-0 z-[9998]" 
            onClick={() => setIsOpen(false)}
          />
          
          <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-lg z-[9999] max-h-60 overflow-hidden">
            {/* Search input */}
            <div className="p-3 border-b border-slate-700/50">
              <input
                type="text"
                placeholder="Search options..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800/80 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            
            <div className="max-h-48 overflow-y-auto">
              {filteredOptions.length === 0 ? (
                <div className="px-4 py-3 text-slate-400 text-sm">No options found</div>
              ) : (
                filteredOptions.map((option, index) => (
                  <div
                    key={index}
                    onClick={() => handleOptionClick(option)}
                    className={`px-4 py-3 cursor-pointer transition-all duration-200 border-b border-slate-700/30 last:border-b-0 ${
                      value === option
                        ? 'bg-emerald-500/20 text-white font-medium'
                        : 'text-slate-200 hover:bg-slate-800/60 hover:text-white'
                    }`}
                  >
                    {option}
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CustomDropdown;