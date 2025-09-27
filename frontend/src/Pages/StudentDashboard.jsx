import React, { useState, useRef } from 'react';
import {
  Menu,
  Bell,
  Home,
  Folder,
  List,
  BarChart3,
  Settings,
  MoreHorizontal,
  Edit,
  RefreshCw,
  Trash2,
  Mail,
  Phone,
  CheckCircle,
  FileEdit,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Eye,
  MessageSquare,
  X
} from 'lucide-react';

// Color constants
const COLORS = {
  black: '#232b36', // darker than #456882
  darkBlue: '#16202a', // darker than #1B3C53
  teal: '#38a3a5',
  mint: '#57cc99',
  lightMint: '#80ed99',
};

const glassCard =
  "bg-[#16202a]/95 backdrop-blur-xl border border-[#16202a] rounded-3xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:bg-[#16202a]/100 hover:border-[#38a3a5] hover:brightness-110";

const StudentDashboard = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenus, setActiveMenus] = useState({});
  const [loadingMore, setLoadingMore] = useState(false);
  const [checkedTasks, setCheckedTasks] = useState({});
  const [activeTab, setActiveTab] = useState('home');

  // Refs for scrolling
  const projectsRef = useRef(null);
  const tasksRef = useRef(null);

  const toggleMenu = (menuId) => {
    setActiveMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };

  const toggleTask = (taskId) => {
    setCheckedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const loadMore = () => {
    setLoadingMore(true);
    setTimeout(() => setLoadingMore(false), 1500);
  };

  // Scroll handlers
  const scrollToProjects = () => {
    projectsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveTab('projects');
  };
  const scrollToTasks = () => {
    tasksRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveTab('tasks');
  };

  return (
    <div className="min-h-screen" style={{ background: COLORS.black }}>
      {/* Header */}
    <header className="fixed top-0 left-0 w-full bg-[#1B3C53]/95 shadow-lg z-50 h-[100px] backdrop-blur-xl">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#80ed99] tracking-wide">Dashboard</h1>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full hover:bg-[#38a3a5]/30 transition"
          >
            {mobileMenuOpen ? <X size={28} color={COLORS.lightMint} /> : <Menu size={28} color={COLORS.lightMint} />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex flex-1 justify-center">
            <ul className="flex items-center gap-6">
              <li>
                <button
                  onClick={() => setActiveTab('home')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-colors ${
                    activeTab === 'home'
                      ? 'text-[#80ed99] bg-[#1B3C53]/70'
                      : 'text-[#38a3a5] hover:bg-[#38a3a5]/20'
                  }`}
                >
                  <Home size={20} />
                  <span>Home</span>
                </button>
              </li>
              <li>
                <button
                  onClick={scrollToProjects}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-colors ${
                    activeTab === 'projects'
                      ? 'text-[#80ed99] bg-[#1B3C53]/70'
                      : 'text-[#38a3a5] hover:bg-[#38a3a5]/20'
                  }`}
                >
                  <Folder size={20} />
                  <span>Projects</span>
                </button>
              </li>
              <li>
                <button
                  onClick={scrollToTasks}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-colors ${
                    activeTab === 'tasks'
                      ? 'text-[#80ed99] bg-[#1B3C53]/70'
                      : 'text-[#38a3a5] hover:bg-[#38a3a5]/20'
                  }`}
                >
                  <List size={20} />
                  <span>Tasks</span>
                </button>
              </li>
              <li>
                <button className="flex items-center gap-2 px-4 py-2 rounded-full text-[#38a3a5] hover:bg-[#38a3a5]/20 font-semibold">
                  <BarChart3 size={20} />
                  <span>Reports</span>
                </button>
              </li>
              <li>
                <button className="flex items-center gap-2 px-4 py-2 rounded-full text-[#38a3a5] hover:bg-[#38a3a5]/20 font-semibold">
                  <Settings size={20} />
                  <span>Settings</span>
                </button>
              </li>
            </ul>
          </nav>

          {/* User Actions */}
          <div className="hidden lg:flex items-center gap-5">
            <button className="p-2 rounded-full hover:bg-[#38a3a5]/30 transition">
              <Bell size={20} className="text-[#80ed99]" />
            </button>
            <button className="flex items-center gap-3 px-3 py-2 rounded-full hover:bg-[#38a3a5]/20 transition">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Elizabeth"
                alt="Elizabeth Foster"
                className="w-9 h-9 rounded-full border-2 border-[#80ed99]"
              />
              <div className="text-left">
                <p className="text-sm font-bold text-[#80ed99]">Elizabeth F</p>
                <p className="text-xs text-[#38a3a5]">Admin</p>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-[72px] left-0 w-full bg-[#1B3C53]/95 shadow-xl backdrop-blur-xl">
            <ul className="px-4 py-3">
              <li>
                <button className="flex items-center gap-2 w-full px-3 py-2 rounded-full text-[#80ed99] font-semibold">
                  <Home size={20} />
                  <span>Home</span>
                </button>
              </li>
              <li>
                <button onClick={scrollToProjects} className="flex items-center gap-2 w-full px-3 py-2 rounded-full text-[#38a3a5] hover:bg-[#38a3a5]/20 font-semibold">
                  <Folder size={20} />
                  <span>Projects</span>
                </button>
              </li>
              <li>
                <button onClick={scrollToTasks} className="flex items-center gap-2 w-full px-3 py-2 rounded-full text-[#38a3a5] hover:bg-[#38a3a5]/20 font-semibold">
                  <List size={20} />
                  <span>Tasks</span>
                </button>
              </li>
              <li>
                <button className="flex items-center gap-2 w-full px-3 py-2 rounded-full text-[#38a3a5] hover:bg-[#38a3a5]/20 font-semibold">
                  <BarChart3 size={20} />
                  <span>Reports</span>
                </button>
              </li>
              <li>
                <button className="flex items-center gap-2 w-full px-3 py-2 rounded-full text-[#38a3a5] hover:bg-[#38a3a5]/20 font-semibold">
                  <Settings size={20} />
                  <span>Settings</span>
                </button>
              </li>
            </ul>
            <div className="px-4 py-3 border-t border-[#38a3a5]/30 flex items-center justify-between">
              <button className="flex items-center gap-3 px-3 py-2 rounded-full hover:bg-[#38a3a5]/20 transition">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Elizabeth"
                  alt="Elizabeth Foster"
                  className="w-9 h-9 rounded-full border-2 border-[#80ed99]"
                />
                <div className="text-left">
                  <p className="text-sm font-bold text-[#80ed99]">Elizabeth F</p>
                  <p className="text-xs text-[#38a3a5]">Admin</p>
                </div>
              </button>
              <button className="p-2 rounded-full hover:bg-[#38a3a5]/30 transition">
                <Bell size={20} className="text-[#80ed99]" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-[118px]">
        <article className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold text-[#80ed99] mb-3">Hi Elizabeth</h2>
         <p className="text-[#c7f9cc] mb-8 text-xl">Welcome to your dashboard!</p>


          {/* Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_0.85fr_1.1fr] gap-14">
            {/* Profile Card */}
            <div className={glassCard + " relative p-12 min-h-[400px] lg:min-h-[440px] lg:p-14"}>
              <button
                onClick={() => toggleMenu('profile')}
                className="absolute top-6 right-6 p-3 rounded-full hover:bg-[#38a3a5]/30"
              >
                <MoreHorizontal size={28} className="text-[#80ed99]" />
              </button>

              {activeMenus.profile && (
                <div className="absolute top-20 right-6 bg-[#1B3C53]/95 shadow-xl rounded-2xl py-2 px-1 w-56 z-10 border border-[#38a3a5]/40">
                  <button className="flex items-center gap-2 w-full px-6 py-3 text-base text-[#80ed99] hover:bg-[#38a3a5]/20 rounded-full">
                    <Edit size={18} />
                    <span>Edit</span>
                  </button>
                  <button className="flex items-center gap-2 w-full px-6 py-3 text-base text-[#80ed99] hover:bg-[#38a3a5]/20 rounded-full">
                    <RefreshCw size={18} />
                    <span>Refresh</span>
                  </button>
                  <div className="h-px bg-[#38a3a5]/30 my-2"></div>
                  <button className="flex items-center gap-2 w-full px-6 py-3 text-base text-red-400 hover:bg-[#38a3a5]/20 rounded-full">
                    <Trash2 size={18} />
                    <span>Deactivate</span>
                  </button>
                </div>
              )}

              <div className="flex items-center gap-8 mb-10">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Elizabeth"
                  alt="Elizabeth Foster"
                  className="w-24 h-24 rounded-full border-4 border-[#80ed99]"
                />
                <div>
                  <h3 className="font-bold text-[#80ed99] text-2xl lg:text-3xl">Elizabeth Foster</h3>
                  <p className="text-lg text-[#c7f9cc]">Web & Graphic Designer</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-6 mb-10">
                <a href="mailto:xyz@mail.com" className="flex items-center gap-2 text-[#c7f9cc] text-base hover:text-[#80ed99]">
                  <Mail size={18} />
                  <span>xyz@mail.com</span>
                </a>
                <a href="tel:00123456789" className="flex items-center gap-2 text-[#c7f9cc] text-base hover:text-[#80ed99]">
                  <Phone size={18} />
                  <span>+00 123-456-789</span>
                </a>
              </div>

              <div className="h-px bg-[#38a3a5]/30 mb-10"></div>

              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-base font-medium text-[#c7f9cc]">Project Completion</p>
                    <span className="text-[#80ed99] text-base font-bold">85%</span>
                  </div>
                  <div className="h-3 bg-[#38a3a5]/30 rounded-full overflow-hidden">
                    <div className="h-full bg-[#57cc99] rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-base font-medium text-[#c7f9cc]">Overall Rating</p>
                    <span className="text-[#80ed99] text-base font-bold">7.5</span>
                  </div>
                  <div className="h-3 bg-[#38a3a5]/30 rounded-full overflow-hidden">
                    <div className="h-full bg-[#80ed99] rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Task Cards */}
            <div className="grid grid-cols-1 gap-14">
              <div className={glassCard + " flex items-center gap-10 p-14 min-h-[200px]"}>
                <div className="p-4 bg-[#57cc99]/30 rounded-full">
                  <CheckCircle size={38} className="text-[#57cc99]" />
                </div>
                <div>
                  <p className="text-4xl font-bold text-[#80ed99]">21</p>
                  <p className="text-lg text-[#c7f9cc]">Tasks Completed</p>
                </div>
              </div>
              <div className={glassCard + " flex items-center gap-10 p-14 min-h-[200px]"}>
                <div className="p-4 bg-[#38a3a5]/30 rounded-full">
                  <FileEdit size={38} className="text-[#38a3a5]" />
                </div>
                <div>
                  <p className="text-4xl font-bold text-[#80ed99]">21</p>
                  <p className="text-lg text-[#c7f9cc]">Tasks Inprogress</p>
                </div>
              </div>
            </div>

            {/* Revenue Card */}
             <div className={glassCard + " relative p-14 min-h-[320px]"}>
              <button
                onClick={() => toggleMenu('revenue')}
                className="absolute top-6 right-6 p-3 rounded-full hover:bg-[#38a3a5]/30"
              >
                <MoreHorizontal size={28} className="text-[#80ed99]" />
              </button>

              {activeMenus.revenue && (
                <div className="absolute top-20 right-6 bg-[#1B3C53]/95 shadow-xl rounded-2xl py-2 px-1 w-56 z-10 border border-[#38a3a5]/40">
                  <button className="flex items-center gap-2 w-full px-6 py-3 text-base text-[#80ed99] hover:bg-[#38a3a5]/20 rounded-full">
                    <Edit size={18} />
                    <span>Edit</span>
                  </button>
                  <button className="flex items-center gap-2 w-full px-6 py-3 text-base text-[#80ed99] hover:bg-[#38a3a5]/20 rounded-full">
                    <RefreshCw size={18} />
                    <span>Refresh</span>
                  </button>
                </div>
              )}

              <h3 className="font-bold text-[#80ed99] mb-4 text-2xl">Revenue</h3>
              <p className="text-5xl font-bold text-[#c7f9cc] mb-3">$2,100</p>
              <p className="text-lg text-[#38a3a5] mb-10">Last Week</p>

              <div className="h-px bg-[#38a3a5]/30 mb-10"></div>

              <div className="grid grid-cols-2 gap-8">
                <div className="flex items-center gap-4">
                  <TrendingUp size={38} className="text-[#57cc99]" />
                  <div>
                    <p className="font-bold text-[#80ed99] text-xl">15%</p>
                    <p className="text-base text-[#c7f9cc]">Prev Week</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <TrendingDown size={38} className="text-red-400" />
                  <div>
                    <p className="font-bold text-[#80ed99] text-xl">10%</p>
                    <p className="text-base text-[#c7f9cc]">Prev Month</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Projects */}
          <section ref={projectsRef} className="mt-16">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-bold text-[#80ed99]">Recent Projects</h2>
              <button className="flex items-center gap-1 text-[#38a3a5] hover:bg-[#38a3a5]/20 px-6 py-3 rounded-full text-base font-bold transition">
                <span>View All</span>
                <ArrowRight size={18} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
              {/* Project Card 1 */}
              <div className={glassCard + " relative p-12 min-h-[260px]"}>
                <button
                  onClick={() => toggleMenu('project1')}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#38a3a5]/30"
                >
                  <MoreHorizontal size={22} className="text-[#80ed99]" />
                </button>

                {activeMenus.project1 && (
                  <div className="absolute top-16 right-4 bg-[#1B3C53]/95 shadow-xl rounded-2xl py-2 px-1 w-48 z-10 border border-[#38a3a5]/40">
                    <button className="flex items-center gap-2 w-full px-6 py-2 text-sm text-[#80ed99] hover:bg-[#38a3a5]/20 rounded-full">
                      <Eye size={16} />
                      <span>View</span>
                    </button>
                    <button className="flex items-center gap-2 w-full px-6 py-2 text-sm text-[#80ed99] hover:bg-[#38a3a5]/20 rounded-full">
                      <Edit size={16} />
                      <span>Edit</span>
                    </button>
                    <div className="h-px bg-[#38a3a5]/30 my-1"></div>
                    <button className="flex items-center gap-2 w-full px-6 py-2 text-sm text-red-400 hover:bg-[#38a3a5]/20 rounded-full">
                      <Trash2 size={16} />
                      <span>Delete</span>
                    </button>
                  </div>
                )}

                <time className="text-xs text-[#c7f9cc]">Apr 09, 2022</time>
                <h3 className="text-xl font-bold text-[#80ed99] mt-2 mb-3">
                  <a href="#" className="hover:text-[#57cc99]">Shreyu - Design Updates</a>
                </h3>
                <span className="inline-block px-3 py-1 bg-[#38a3a5]/30 text-[#57cc99] text-xs font-bold rounded-full mb-4">
                  Designing
                </span>
                <p className="text-[#c7f9cc] text-sm mb-4 line-clamp-2">
                  Update shreyu with modern and latest trends...
                </p>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-[#c7f9cc]">Progress</span>
                    <span className="text-xs font-bold text-[#80ed99]">75%</span>
                  </div>
                  <div className="h-2 bg-[#38a3a5]/30 rounded-full overflow-hidden">
                    <div className="h-full bg-[#57cc99] rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div className="flex -space-x-3">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Elizabeth" alt="User" className="w-9 h-9 rounded-full border-2 border-[#80ed99]" />
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" alt="User" className="w-9 h-9 rounded-full border-2 border-[#80ed99]" />
                </div>
              </div>

              {/* Project Card 2 */}
              <div className={glassCard + " relative p-12 min-h-[260px]"}>
                <button
                  onClick={() => toggleMenu('project2')}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#80ed99]/30"
                >
                  <MoreHorizontal size={22} className="text-[#80ed99]" />
                </button>

                {activeMenus.project2 && (
                  <div className="absolute top-16 right-4 bg-[#1B3C53]/95 shadow-xl rounded-2xl py-2 px-1 w-48 z-10 border border-[#38a3a5]/40">
                    <button className="flex items-center gap-2 w-full px-6 py-2 text-sm text-[#80ed99] hover:bg-[#38a3a5]/20 rounded-full">
                      <Eye size={16} />
                      <span>View</span>
                    </button>
                    <button className="flex items-center gap-2 w-full px-6 py-2 text-sm text-[#80ed99] hover:bg-[#38a3a5]/20 rounded-full">
                      <Edit size={16} />
                      <span>Edit</span>
                    </button>
                    <div className="h-px bg-[#38a3a5]/30 my-1"></div>
                    <button className="flex items-center gap-2 w-full px-6 py-2 text-sm text-red-400 hover:bg-[#38a3a5]/20 rounded-full">
                      <Trash2 size={16} />
                      <span>Delete</span>
                    </button>
                  </div>
                )}

                <time className="text-xs text-[#c7f9cc]">Apr 09, 2022</time>
                <h3 className="text-xl font-bold text-[#80ed99] mt-2 mb-3">
                  <a href="#" className="hover:text-[#57cc99]">Prompt v2.0</a>
                </h3>
                <span className="inline-block px-3 py-1 bg-[#38a3a5]/30 text-[#57cc99] text-xs font-bold rounded-full mb-4">
                  Planning
                </span>
                <p className="text-[#c7f9cc] text-sm mb-4 line-clamp-2">
                  Plan new features and functionality for prompt...
                </p>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-[#c7f9cc]">Progress</span>
                    <span className="text-xs font-bold text-[#80ed99]">50%</span>
                  </div>
                  <div className="h-2 bg-[#38a3a5]/30 rounded-full overflow-hidden">
                    <div className="h-full bg-[#57cc99] rounded-full" style={{ width: '50%' }}></div>
                  </div>
                </div>
                <div className="flex -space-x-3">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Elizabeth" alt="User" className="w-9 h-9 rounded-full border-2 border-[#80ed99]" />
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" alt="User" className="w-9 h-9 rounded-full border-2 border-[#80ed99]" />
                </div>
              </div>

              {/* Project Card 3 */}
              <div className={glassCard + " relative p-12 min-h-[260px]"}>
                <button
                  onClick={() => toggleMenu('project25')}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#80ed99]/30"
                >
                  <MoreHorizontal size={22} className="text-[#80ed99]" />
                </button>

                {activeMenus.project25 && (
                  <div className="absolute top-16 right-4 bg-[#1B3C53]/95 shadow-xl rounded-2xl py-2 px-1 w-48 z-10 border border-[#38a3a5]/40">
                    <button className="flex items-center gap-2 w-full px-6 py-2 text-sm text-[#80ed99] hover:bg-[#38a3a5]/20 rounded-full">
                      <Eye size={16} />
                      <span>View</span>
                    </button>
                    <button className="flex items-center gap-2 w-full px-6 py-2 text-sm text-[#80ed99] hover:bg-[#38a3a5]/20 rounded-full">
                      <Edit size={16} />
                      <span>Edit</span>
                    </button>
                    <div className="h-px bg-[#38a3a5]/30 my-1"></div>
                    <button className="flex items-center gap-2 w-full px-6 py-2 text-sm text-red-400 hover:bg-[#38a3a5]/20 rounded-full">
                      <Trash2 size={16} />
                      <span>Delete</span>
                    </button>
                  </div>
                )}

                <time className="text-xs text-[#c7f9cc]">Apr 10, 2022</time>
                <h3 className="text-xl font-bold text-[#80ed99] mt-2 mb-3">
                  <a href="#" className="hover:text-[#57cc99]">Minty Project</a>
                </h3>
                <span className="inline-block px-3 py-1 bg-[#38a3a5]/30 text-[#57cc99] text-xs font-bold rounded-full mb-4">
                  Research
                </span>
                <p className="text-[#c7f9cc] text-sm mb-4 line-clamp-2">
                  Exploring new ideas with a fresh minty look...
                </p>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-[#c7f9cc]">Progress</span>
                    <span className="text-xs font-bold text-[#80ed99]">40%</span>
                  </div>
                  <div className="h-2 bg-[#38a3a5]/30 rounded-full overflow-hidden">
                    <div className="h-full bg-[#57cc99] rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
                <div className="flex -space-x-3">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Elizabeth" alt="User" className="w-9 h-9 rounded-full border-2 border-[#80ed99]" />
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" alt="User" className="w-9 h-9 rounded-full border-2 border-[#80ed99]" />
                </div>
              </div>
            </div>
          </section>

          {/* Tasks Section */}
          <section ref={tasksRef} className="mt-16">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-bold text-[#80ed99]">Tasks</h2>
              <button className="flex items-center gap-1 text-[#38a3a5] hover:bg-[#38a3a5]/20 px-6 py-3 rounded-full text-base font-bold transition">
                <span>View All</span>
                <ArrowRight size={18} />
              </button>
            </div>

            <div className="space-y-8">
              {/* Task 1 */}
              <div className={glassCard + " p-12 min-h-[120px]"}>
                <div className="grid lg:grid-cols-[1fr_auto_auto] gap-4 items-center">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={checkedTasks.task1 || false}
                      onChange={() => toggleTask('task1')}
                      className="mt-1 accent-[#38a3a5] scale-125"
                    />
                    <label className="text-base font-bold text-[#c7f9cc] cursor-pointer">
                      Draft the new contract document for sales team
                    </label>
                  </div>
                  <span className="inline-block px-4 py-1 bg-[#38a3a5]/30 text-[#57cc99] text-xs font-bold rounded-full">
                    Today 10pm
                  </span>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-[#c7f9cc] text-sm font-bold">
                      <List size={16} />
                      <span>3/7</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#c7f9cc] text-sm font-bold">
                      <MessageSquare size={16} />
                      <span>21</span>
                    </div>
                    <span className="inline-block px-3 py-1 bg-red-400/20 text-red-400 text-xs font-bold rounded-full">
                      High
                    </span>
                  </div>
                </div>
              </div>

              {/* Task 2 */}
              <div className={glassCard + " p-12 min-h-[120px]"}>
                <div className="grid lg:grid-cols-[1fr_auto_auto] gap-4 items-center">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={checkedTasks.task2 || false}
                      onChange={() => toggleTask('task2')}
                      className="mt-1 accent-[#38a3a5] scale-125"
                    />
                    <label className="text-base font-bold text-[#c7f9cc] cursor-pointer">
                      iOS App home page design
                    </label>
                  </div>
                  <span className="inline-block px-4 py-1 bg-[#38a3a5]/30 text-[#57cc99] text-xs font-bold rounded-full">
                    Today 5pm
                  </span>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-[#c7f9cc] text-sm font-bold">
                      <List size={16} />
                      <span>10/11</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#c7f9cc] text-sm font-bold">
                      <MessageSquare size={16} />
                      <span>5</span>
                    </div>
                    <span className="inline-block px-3 py-1 bg-orange-400/20 text-orange-400 text-xs font-bold rounded-full">
                      Medium
                    </span>
                  </div>
                </div>
              </div>

              {/* Task 3 */}
              <div className={glassCard + " p-12 min-h-[120px]"}>
                <div className="grid lg:grid-cols-[1fr_auto_auto] gap-4 items-center">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={checkedTasks.task3 || false}
                      onChange={() => toggleTask('task3')}
                      className="mt-1 accent-[#38a3a5] scale-125"
                    />
                    <label className="text-base font-bold text-[#c7f9cc] cursor-pointer">
                      Write a release note for the new update
                    </label>
                  </div>
                  <span className="inline-block px-4 py-1 bg-[#38a3a5]/30 text-[#57cc99] text-xs font-bold rounded-full">
                    Tomorrow 11am
                  </span>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-[#c7f9cc] text-sm font-bold">
                      <List size={16} />
                      <span>2/4</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#c7f9cc] text-sm font-bold">
                      <MessageSquare size={16} />
                      <span>8</span>
                    </div>
                    <span className="inline-block px-3 py-1 bg-green-400/20 text-green-400 text-xs font-bold rounded-full">
                      Low
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Load More Button */}
            <div className="flex justify-center mt-10">
              <button
                onClick={loadMore}
                className="flex items-center gap-2 px-8 py-3 rounded-full bg-[#38a3a5] text-white font-bold hover:bg-[#57cc99] transition-all text-lg shadow-lg"
                disabled={loadingMore}
              >
                {loadingMore ? (
                  <>
                    <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Loading...
                  </>
                ) : (
                  <>Load More</>
                )}
              </button>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
};

export default StudentDashboard;