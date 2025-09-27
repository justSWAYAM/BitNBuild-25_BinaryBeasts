import React, { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { auth, db } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc, Timestamp } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

const AuthModal = ({ isOpen, onClose, mode, onModeChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState(""); // For signup role selection
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showRolePrompt, setShowRolePrompt] = useState(false); // For Google first login
  const navigate = useNavigate();

  if (!isOpen) return null;

  const provider = new GoogleAuthProvider();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        // First-time Google login: show role selection
        setShowRolePrompt(true);
      } else {
        onClose(); // Close modal if user exists
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  const handleGoogleRoleSelect = async (selectedRole) => {
    const user = auth.currentUser;
    if (!user) {
      console.error("No user found");
      return;
    }

    try {
      console.log("Creating Google user with role:", selectedRole); // Debug log

      // Create base user document
      const userDoc = {
        email: user.email,
        type: selectedRole,
        provider: "google",
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };

      await setDoc(doc(db, "users", user.uid), userDoc);
      console.log("User document created successfully"); // Debug log

      if (selectedRole === "freelancer") {
        console.log("Creating freelancer document for Google user..."); // Debug log
        
        const freelancerDoc = {
          userId: user.uid,
          rating: 0,
          totalRatings: 0,
          available: true,
          skills: [],
          reviews: [],
          pastWorks: [],
          completedJobs: 0,
          hourlyRate: 0,
          bio: "",
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now()
        };

        await setDoc(doc(db, "freelancers", user.uid), freelancerDoc);
        console.log("Freelancer document created successfully"); // Debug log
        navigate("/marketplace");
      } else if (selectedRole === "client") {
        console.log("Creating client document for Google user..."); // Debug log
        
        const clientDoc = {
          userId: user.uid,
          rating: 0,
          totalRatings: 0,
          lastPostedDate: null,
          totalPostings: 0,
          activePostings: [],
          completedPostings: [],
          reviews: [],
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now()
        };

        await setDoc(doc(db, "clients", user.uid), clientDoc);
        console.log("Client document created successfully"); // Debug log
        navigate("/dashboard");
      }

      setShowRolePrompt(false);
      onClose();
    } catch (error) {
      console.error("Profile setup error:", error); // More detailed error logging
      alert(`Error setting up profile: ${error.message}`);
    }
  };

  const handleEmailAuth = async () => {
    try {
      if (mode === "signin") {
        // Sign in logic remains the same
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
        const userType = userDoc.data()?.type;
        
        if (userType === "freelancer") {
          navigate("/marketplace");
        } else if (userType === "client") {
          navigate("/dashboard");
        }
        onClose();
      } else {
        // Sign up logic with better error handling
        if (!role) {
          alert("Please select a role (Client or Freelancer)");
          return;
        }

        if (!email || !password) {
          alert("Please fill in all fields");
          return;
        }

        console.log("Creating new user with role:", role); // Debug log

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const uid = userCredential.user.uid;

        // Create user document first
        const userDoc = {
          email: email,
          type: role,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        };

        console.log("Creating user document..."); // Debug log
        await setDoc(doc(db, "users", uid), userDoc);

        // Create role-specific document
        if (role === "freelancer") {
          console.log("Creating freelancer document..."); // Debug log
          
          const freelancerDoc = {
            userId: uid,
            rating: 0,
            totalRatings: 0,
            available: true,
            skills: [],
            reviews: [],
            pastWorks: [],
            completedJobs: 0,
            hourlyRate: 0,
            bio: "",
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now()
          };

          await setDoc(doc(db, "freelancers", uid), freelancerDoc);
          console.log("Freelancer document created successfully"); // Debug log
          navigate("/marketplace");
        } else if (role === "client") {
          console.log("Creating client document..."); // Debug log
          
          const clientDoc = {
            userId: uid,
            rating: 0,
            totalRatings: 0,
            lastPostedDate: null,
            totalPostings: 0,
            activePostings: [],
            completedPostings: [],
            reviews: [],
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now()
          };

          await setDoc(doc(db, "clients", uid), clientDoc);
          console.log("Client document created successfully"); // Debug log
          navigate("/dashboard");
        }

        onClose();
      }
    } catch (error) {
      console.error("Auth error:", error); // More detailed error logging
      alert(`Authentication error: ${error.message}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-8 w-full max-w-md relative shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
          <X className="w-6 h-6" />
        </button>

        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">
              {mode === "signin" ? "Welcome Back" : "Join GigCampus"}
            </h2>
            <p className="text-slate-400">{mode === "signin" ? "Sign in to your account" : "Create your account"}</p>
          </div>

          <div className="space-y-4">
            {!showRolePrompt && (
              <>
                {/* Email & Password */}
                <div className="space-y-2">
                  <label className="text-white font-semibold text-sm">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-800/50 border border-slate-700/30 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-white font-semibold text-sm">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-slate-800/50 border border-slate-700/30 rounded-xl px-4 py-3 pr-12 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {mode === "signup" && (
                  <div className="flex justify-between text-sm mb-2">
                    <button
                      onClick={() => setRole("client")}
                      className={`w-1/2 mr-2 py-2 rounded-xl ${role === "client" ? "bg-emerald-500" : "bg-slate-800/50"} text-white font-medium transition-colors`}
                    >
                      Client
                    </button>
                    <button
                      onClick={() => setRole("freelancer")}
                      className={`w-1/2 ml-2 py-2 rounded-xl ${role === "freelancer" ? "bg-emerald-500" : "bg-slate-800/50"} text-white font-medium transition-colors`}
                    >
                      Freelancer
                    </button>
                  </div>
                )}

                <button
                  onClick={handleEmailAuth}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl transition-colors"
                >
                  {mode === "signin" ? "Sign In" : "Sign Up"}
                </button>

                <p className="text-center text-slate-400 text-sm">
                  {mode === "signin" ? "Don't have an account? " : "Already have an account? "}
                  <button
                    onClick={() => onModeChange(mode === "signin" ? "signup" : "signin")}
                    className="text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
                  >
                    {mode === "signin" ? "Sign Up" : "Sign In"}
                  </button>
                </p>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm mb-2">
                    <span className="px-2 bg-slate-900 text-slate-400">Or continue with</span>
                  </div>
                </div>

                {/* Google Button */}
                <div className="flex justify-center">
                  <button
                    onClick={handleGoogleSignIn}
                    className="flex items-center justify-center px-4 py-3 border border-slate-700/30 bg-slate-800/50 rounded-xl hover:border-emerald-500/30 transition-colors text-white font-medium w-full max-w-sm"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Sign in with Google
                  </button>
                </div>
              </>
            )}

            {/* Role selection for first-time Google login */}
            {showRolePrompt && (
              <div className="space-y-2">
                <p className="text-slate-400 text-center mb-2">Select your role to continue</p>
                <div className="flex justify-between">
                  <button
                    onClick={() => handleGoogleRoleSelect("client")}
                    className="w-1/2 mr-2 py-2 rounded-xl bg-emerald-500 text-white font-medium"
                  >
                    Client
                  </button>
                  <button
                    onClick={() => handleGoogleRoleSelect("freelancer")}
                    className="w-1/2 ml-2 py-2 rounded-xl bg-emerald-500 text-white font-medium"
                  >
                    Freelancer
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
