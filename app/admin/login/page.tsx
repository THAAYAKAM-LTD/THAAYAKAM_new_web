"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, Loader2 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/admin/dashboard");
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#15CEFF 1.5px, transparent 1.5px)",
          backgroundSize: "45px 45px",
        }}
      />
      
      {/* Login Card */}
      <div className="relative z-10 w-full max-w-[440px] bg-white rounded-[32px] border border-gray-100 shadow-[0px_20px_60px_rgba(0,0,0,0.06)] p-10 md:p-12">
        <div className="flex flex-col items-center mb-10">
          <Link href="/">
            <img src="/logo.svg" alt="THAAYAKAM" className="h-14 mb-8 opacity-90" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Admin CMS Access</h1>
          <p className="text-gray-500 mt-2 text-sm italic">Manage your digital excellence</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Username</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#15CEFF] transition-colors" size={20} />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl py-4 pl-12 pr-4 text-gray-900 outline-none focus:border-[#15CEFF] focus:bg-white transition-all shadow-sm"
                placeholder="thaayakam-dev"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#15CEFF] transition-colors" size={20} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl py-4 pl-12 pr-4 text-gray-900 outline-none focus:border-[#15CEFF] focus:bg-white transition-all shadow-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-500 text-sm py-3 px-4 rounded-xl text-center font-medium animate-shake">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#15CEFF] text-white font-bold py-4 rounded-xl shadow-lg shadow-cyan-100 hover:shadow-cyan-200 hover:bg-[#00B4D8] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:active:scale-100"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={22} />
            ) : (
              <>
                Sign in to Dashboard
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-12 text-center">
          <Link 
            href="/" 
            className="text-gray-400 text-sm font-medium hover:text-[#15CEFF] transition-colors flex items-center justify-center gap-1 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Back to Public Website
          </Link>
        </div>
      </div>

      <div className="mt-8 text-gray-300 text-xs font-medium tracking-widest uppercase">
        © 2026 THAAYAKAM LTD • INTERNAL ACCESS
      </div>
    </div>
  );
}
