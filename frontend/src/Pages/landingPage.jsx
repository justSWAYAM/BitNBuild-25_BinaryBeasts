import React, { useState, useEffect } from 'react';
import routes from '../utils/routes';
import { ChevronDown, Users, Shield, MessageCircle, Star, Code, Palette, PenTool, BookOpen, ArrowRight, Menu, X, CheckCircle, Zap, Globe, Play, Sparkles, TrendingUp, Target, Lightbulb, RotateCcw, Trophy, User, Clock, Award } from 'lucide-react';
import AuthModal from '../Components/AuthModal';

const GigCampusLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('signin'); // 'signin' or 'signup'

  const features = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Real Time Chat",
      description: "Built-in messaging system with file sharing and instant notifications keeps all project communication centralized.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secured Payment",
      description: "Escrow-protected payments ensure freelancers get paid for completed work with smart contract security.",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "On Time Delivery",
      description: "Milestone tracking and deadline management tools help ensure projects are completed on schedule.",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Automation",
      description: "Automated workflows handle project matching, payment processing, and portfolio updates seamlessly.",
    },
    {
      icon: <User className="w-8 h-8" />,
      title: "AI Agents",
      description: "Smart AI assistants help with project recommendations, skill assessments, and client matching.",
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Summarizer",
      description: "AI-powered project summaries and progress reports keep all stakeholders updated automatically.",
    }
  ];

  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Navigation */}
      <nav className="relative z-50 px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-slate-900" />
              </div>
              <span className="text-xl font-bold text-white">GigCampus</span>
            </div>
            
            <div className="hidden lg:flex items-center space-x-8">
              <a href="#features" className="text-slate-300 hover:text-emerald-400 transition-colors">
                Features
              </a>
              <a href="#pricing" className="text-slate-300 hover:text-emerald-400 transition-colors">
                Pricing
              </a>
              <a href="#about" className="text-slate-300 hover:text-emerald-400 transition-colors">
                About
              </a>
              <div className="flex items-center space-x-4">
                <button className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors">
                  <div className="w-4 h-4 bg-slate-500 rounded-full"></div>
                </button>
                <button 
                  className="bg-white text-slate-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                  onClick={() => openAuthModal('signin')}
                >
                  Sign In
                </button>
              </div>
            </div>
            
            <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="relative bg-gradient-to-br from-slate-900/40 to-slate-800/60 backdrop-blur-xl rounded-[2rem] border border-slate-700/30 overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-12 items-center p-8 lg:p-16">
              <div className="space-y-8">
                <div className="inline-flex items-center px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-full text-slate-300 text-sm font-medium">
                  STUDENT FREELANCE PLATFORM
                </div>
                
                <div className="space-y-6">
                  <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-white">
                    Turn Campus Skills Online
                  </h1>
                  
                  <p className="text-lg text-slate-400 leading-relaxed">
                    Connect with real projects, build your professional portfolio, and start earning from your dorm room. Join the future of student entrepreneurship.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                  onClick={() => navigate(routes.MARKETPLACE)}
                    className="bg-emerald-500 hover:bg-emerald-600 px-8 py-4 rounded-xl font-semibold text-lg transition-colors text-white"
                    
                  >
                    Start Now
                  </button>
                  <button className="text-slate-300 hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors">
                    Learn More
                  </button>
                  <button 
                    className="bg-slate-800 hover:bg-slate-700 px-8 py-4 rounded-xl font-semibold text-lg transition-colors text-white"
                    onClick={() => openAuthModal('signup')}
                  >
                    Get Started
                  </button>
                </div>
                
                <div className="flex items-center space-x-6 pt-4">
                  <div className="flex items-center space-x-2 text-emerald-400 text-sm">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span>Fast project matching under 24h average</span>
                  </div>
                  <div className="flex items-center space-x-2 text-emerald-400 text-sm">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span>Secure escrow payment system</span>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 shadow-2xl">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-white">Live Projects</h3>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                        <span className="text-emerald-400 text-sm font-medium">24 active</span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl border border-slate-600/20 hover:border-emerald-500/30 transition-all duration-300">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                            <Palette className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="font-medium text-white">Logo Design</div>
                            <div className="text-xs text-slate-400">Posted 2h ago</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-emerald-400">$450</div>
                          <div className="text-xs text-orange-400">Urgent</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl border border-slate-600/20 hover:border-emerald-500/30 transition-all duration-300">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                            <Code className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="font-medium text-white">React Dashboard</div>
                            <div className="text-xs text-slate-400">Posted 5h ago</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-emerald-400">$680</div>
                          <div className="text-xs text-slate-400">5 bids</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl border border-slate-600/20 hover:border-emerald-500/30 transition-all duration-300">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                            <PenTool className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="font-medium text-white">Blog Articles</div>
                            <div className="text-xs text-slate-400">Posted 1d ago</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-emerald-400">$280</div>
                          <div className="text-xs text-slate-400">3 bids</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl border border-slate-600/20 hover:border-emerald-500/30 transition-all duration-300">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="font-medium text-white">Math Tutoring</div>
                            <div className="text-xs text-slate-400">Posted 2d ago</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-emerald-400">$25/hr</div>
                          <div className="text-xs text-slate-400">2 bids</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-slate-600/30">
                      <button className="w-full text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors">
                        View all projects →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="relative bg-gradient-to-br from-slate-900/40 to-slate-800/60 backdrop-blur-xl rounded-[2rem] border border-slate-700/30 p-8 lg:p-16">
            <div className="mb-12">
              <div className="inline-flex items-center px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-full text-emerald-400 text-sm font-medium mb-6">
                FEATURES
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Everything you need to succeed on campus
              </h2>
              
              <div className="grid lg:grid-cols-2 gap-12">
                <p className="text-lg text-slate-400 leading-relaxed">
                  From finding your first client to building a thriving freelance business, GigCampus provides all the tools and support you need to turn your academic skills into real income.
                </p>
                <p className="text-lg text-slate-400 leading-relaxed">
                  Our platform connects talented students with verified opportunities, ensuring secure payments and professional growth through every project.
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="space-y-4">
                  <div className="inline-flex p-3 rounded-xl bg-slate-800/30 border border-slate-700/30 text-emerald-400">
                    {feature.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                  
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials & Pricing Section */}
      <section className="relative px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Testimonials */}
            <div className="relative bg-gradient-to-br from-slate-900/40 to-slate-800/60 backdrop-blur-xl rounded-[2rem] border border-slate-700/30 p-8 lg:p-12">
              <div className="mb-8">
                <div className="inline-flex items-center px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-full text-emerald-400 text-sm font-medium mb-6">
                  TRUSTED
                </div>
                
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                  Loved by thousands of students
                </h2>
                
                <blockquote className="text-lg text-slate-300 mb-8 leading-relaxed">
                  "The platform made it incredibly easy to find my first freelance clients. Within a week, I had three ongoing projects and was earning more than my part-time campus job."
                </blockquote>
                
                <div className="flex items-center space-x-4 mb-12">
                  <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-slate-300" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Alex Chen</div>
                    <div className="text-sm text-slate-400">CS Student & Full-stack Developer</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="text-xs text-slate-500 uppercase tracking-wide mb-2">Projects Completed</div>
                    <div className="text-2xl font-bold text-white">23</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 uppercase tracking-wide mb-2">Active Clients</div>
                    <div className="text-2xl font-bold text-white">8</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 uppercase tracking-wide mb-2">Avg Rating</div>
                    <div className="text-2xl font-bold text-white">4.9</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="relative bg-gradient-to-br from-slate-900/40 to-slate-800/60 backdrop-blur-xl rounded-[2rem] border border-slate-700/30 p-8 lg:p-12">
              <div className="mb-8">
                <div className="inline-flex items-center px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-full text-emerald-400 text-sm font-medium mb-6">
                  PRICING
                </div>
                
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                  Free
                </h2>
                
                <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                  Get started with all essential features included. Premium tools and advanced analytics coming soon.
                </p>
                
                <button 
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-colors mb-6"
                  onClick={() => openAuthModal('signup')}
                >
                  Sign Up
                </button>
                
                <div className="text-center">
                  <button className="text-slate-300 hover:text-white font-medium transition-colors">
                    Explore Success Stories
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative px-6 lg:px-8 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-slate-900" />
              </div>
              <span className="text-xl font-bold text-white">GigCampus</span>
            </div>
            
            <div className="flex items-center space-x-8 text-slate-400">
              <a href="#" className="hover:text-emerald-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-emerald-400 transition-colors">Terms</a>
              <a href="#" className="hover:text-emerald-400 transition-colors">Support</a>
              <a href="#" className="hover:text-emerald-400 transition-colors">Careers</a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-slate-800 text-center">
            <p className="text-slate-500">© 2024 GigCampus. Empowering student entrepreneurs everywhere.</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </div>
  );
};

export default GigCampusLanding;