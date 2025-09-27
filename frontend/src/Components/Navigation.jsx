import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import routes from '../utils/routes';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { path: routes.HOME, label: 'Home', icon: '🏠' },
    { path: routes.MARKETPLACE, label: 'Marketplace', icon: '💼' },
    // Future navigation items can be added here
    // { path: routes.PROFILE, label: 'Profile', icon: '👤' },
    // { path: routes.MESSAGES, label: 'Messages', icon: '💬' },
    // { path: routes.SETTINGS, label: 'Settings', icon: '⚙️' },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 lg:hidden">
      <div className="glass backdrop-blur-xl rounded-2xl border border-cyan-400/20 shadow-lg">
        <div className="flex items-center space-x-1 p-2">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`
                  flex flex-col items-center justify-center px-4 py-3 rounded-xl transition-all duration-200
                  ${isActive 
                    ? 'bg-cyan-500/20 text-cyan-300 scale-105' 
                    : 'text-gray-400 hover:text-cyan-300 hover:bg-cyan-500/10'
                  }
                `}
              >
                <span className="text-lg mb-1">{item.icon}</span>
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;