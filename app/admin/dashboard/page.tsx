"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  Settings, 
  LogOut, 
  Save, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  ChevronRight
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await fetch("/api/content");
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const data = await res.json();
      setContent(data);
    } catch (err) {
      console.error("Failed to fetch content", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setStatus(null);
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });

      if (res.ok) {
        setStatus({ type: "success", message: "Content updated successfully! 🚀" });
        setTimeout(() => setStatus(null), 3000);
      } else {
        throw new Error("Failed to save");
      }
    } catch (err) {
      setStatus({ type: "error", message: "Failed to save changes. Please try again." });
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    // In a real app, we'd call an API to clear the cookie
    document.cookie = "admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="text-[#15CEFF] animate-spin" size={48} />
      </div>
    );
  }

  const updatePageText = (page: string, section: string, field: string, value: string) => {
    setContent((prev: any) => ({
      ...prev,
      pages: {
        ...prev.pages,
        [page]: {
          ...prev.pages[page],
          [section]: {
            ...prev.pages[page][section],
            [field]: value
          }
        }
      }
    }));
  };

  const updateService = (id: string, field: string, value: any) => {
    setContent((prev: any) => ({
      ...prev,
      pages: {
        ...prev.pages,
        services: {
          ...prev.pages.services,
          items: prev.pages.services.items.map((item: any) => 
            item.id === id ? { ...item, [field]: value } : item
          )
        }
      }
    }));
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-100 flex flex-col fixed inset-y-0 shadow-sm z-50">
        <div className="p-8 border-b border-gray-50 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#15CEFF] flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-cyan-100">
            T
          </div>
          <span className="font-bold text-xl tracking-tight text-gray-900 leading-none">
            THAAYAKAM <br />
            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">CMS Center</span>
          </span>
        </div>

        <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] px-4 mb-4">Website Pages</p>
          <button 
            onClick={() => setActiveTab("home")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "home" ? "bg-cyan-50 text-[#15CEFF] shadow-sm" : "text-gray-500 hover:bg-gray-50"}`}
          >
            <LayoutDashboard size={20} />
            <span className="font-semibold text-sm">Homepage</span>
          </button>
          <button 
            onClick={() => setActiveTab("whoWeAre")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "whoWeAre" ? "bg-cyan-50 text-[#15CEFF] shadow-sm" : "text-gray-500 hover:bg-gray-50"}`}
          >
            <FileText size={20} />
            <span className="font-semibold text-sm">Who We Are</span>
          </button>
          <button 
            onClick={() => setActiveTab("careers")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "careers" ? "bg-cyan-50 text-[#15CEFF] shadow-sm" : "text-gray-500 hover:bg-gray-50"}`}
          >
            <Briefcase size={20} />
            <span className="font-semibold text-sm">Careers</span>
          </button>
          <button 
            onClick={() => setActiveTab("services")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "services" ? "bg-cyan-50 text-[#15CEFF] shadow-sm" : "text-gray-500 hover:bg-gray-50"}`}
          >
            <Settings size={20} />
            <span className="font-semibold text-sm">Services Grid</span>
          </button>
        </nav>

        <div className="p-6 border-t border-gray-50">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all font-semibold text-sm"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72 p-10 pt-8 pb-32">
        {/* Top bar */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight capitalize">
              {activeTab.replace(/([A-Z])/g, ' $1')} Management
            </h1>
            <p className="text-gray-500 text-sm mt-1">Live updates for your global digital presence</p>
          </div>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="bg-[#15CEFF] text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-xl shadow-cyan-100 hover:shadow-cyan-200 hover:bg-[#00B4D8] transition-all flex items-center gap-2 active:scale-95 disabled:opacity-70 disabled:scale-100"
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            Publish Changes
          </button>
        </div>

        {/* Global Notifications */}
        {status && (
          <div className={`mb-8 p-4 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300 ${status.type === "success" ? "bg-green-50 text-green-700 border border-green-100" : "bg-red-50 text-red-700 border border-red-100"}`}>
            {status.type === "success" ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
            <span className="font-semibold text-sm">{status.message}</span>
          </div>
        )}

        {/* Dynamic Editor Sections */}
        <div className="grid grid-cols-1 gap-8">
          
          {/* HOMEPAGE EDITOR */}
          {activeTab === "home" && (
            <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-8 space-y-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-1.5 h-6 bg-[#15CEFF] rounded-full" />
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">Main Hero Section</h2>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Main Heading</label>
                  <input 
                    type="text" 
                    value={content.pages.home.hero.title}
                    onChange={(e) => updatePageText("home", "hero", "title", e.target.value)}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 font-semibold text-gray-900 focus:bg-white focus:border-[#15CEFF] outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Hero Subtitle</label>
                  <textarea 
                    rows={4}
                    value={content.pages.home.hero.subtitle}
                    onChange={(e) => updatePageText("home", "hero", "subtitle", e.target.value)}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 font-medium text-gray-700 focus:bg-white focus:border-[#15CEFF] outline-none transition-all leading-relaxed"
                  />
                </div>
              </div>
            </div>
          )}

          {/* WHO WE ARE EDITOR */}
          {activeTab === "whoWeAre" && (
            <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-8 space-y-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-1.5 h-6 bg-[#15CEFF] rounded-full" />
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">Introduction Section</h2>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Page Title</label>
                  <input 
                    type="text" 
                    value={content.pages.whoWeAre.hero.title}
                    onChange={(e) => updatePageText("whoWeAre", "hero", "title", e.target.value)}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 font-semibold text-gray-900 focus:bg-white focus:border-[#15CEFF] outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Hero Subtitle</label>
                  <textarea 
                    rows={3}
                    value={content.pages.whoWeAre.hero.subtitle}
                    onChange={(e) => updatePageText("whoWeAre", "hero", "subtitle", e.target.value)}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 font-medium text-gray-700 focus:bg-white focus:border-[#15CEFF] outline-none transition-all leading-relaxed"
                  />
                </div>
              </div>
            </div>
          )}

          {/* CAREERS EDITOR */}
          {activeTab === "careers" && (
            <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-8 space-y-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-1.5 h-6 bg-[#15CEFF] rounded-full" />
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">Recruitment Content</h2>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Expansion Headline</label>
                  <input 
                    type="text" 
                    value={content.pages.careers.recruitment.title}
                    onChange={(e) => setContent((prev: any) => ({
                      ...prev,
                      pages: {
                        ...prev.pages,
                        careers: {
                          ...prev.pages.careers,
                          recruitment: { ...prev.pages.careers.recruitment, title: e.target.value }
                        }
                      }
                    }))}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 font-semibold text-gray-900 focus:bg-white focus:border-[#15CEFF] outline-none transition-all"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Instruction Text (Line 1)</label>
                    <textarea 
                      rows={4}
                      value={content.pages.careers.recruitment.line1}
                      onChange={(e) => setContent((prev: any) => ({
                        ...prev,
                        pages: {
                          ...prev.pages,
                          careers: {
                            ...prev.pages.careers,
                            recruitment: { ...prev.pages.careers.recruitment, line1: e.target.value }
                          }
                        }
                      }))}
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 font-medium text-gray-700 focus:bg-white focus:border-[#15CEFF] outline-none transition-all leading-relaxed"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Email Requirement (Subject Line)</label>
                    <textarea 
                      rows={4}
                      value={content.pages.careers.recruitment.subject}
                      onChange={(e) => setContent((prev: any) => ({
                        ...prev,
                        pages: {
                          ...prev.pages,
                          careers: {
                            ...prev.pages.careers,
                            recruitment: { ...prev.pages.careers.recruitment, subject: e.target.value }
                          }
                        }
                      }))}
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 font-bold text-[#15CEFF] focus:bg-white focus:border-[#15CEFF] outline-none transition-all leading-relaxed"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SERVICES MANAGER */}
          {activeTab === "services" && (
            <div className="space-y-8">
              {/* Header Editor */}
              <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-6 bg-[#15CEFF] rounded-full" />
                  <h2 className="text-xl font-bold text-gray-900 tracking-tight">Services Overview Text</h2>
                </div>
                <div className="space-y-4">
                  <input 
                    type="text" 
                    value={content.pages.services.title}
                    onChange={(e) => updatePageText("services", "title" as any, "" as any, e.target.value)}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 font-bold text-[22px] text-[#15CEFF] focus:bg-white focus:border-[#15CEFF] outline-none transition-all"
                  />
                  <textarea 
                    rows={3}
                    value={content.pages.services.subtitle}
                    onChange={(e) => updatePageText("services", "subtitle" as any, "" as any, e.target.value)}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 font-semibold text-gray-800 focus:bg-white focus:border-[#15CEFF] outline-none transition-all"
                  />
                </div>
              </div>

              {/* Items Manager */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {content.pages.services.items.map((item: any, idx: number) => (
                  <div key={item.id} className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-8 group relative">
                    <div className="flex items-start justify-between mb-6">
                      <div className="px-4 py-1.5 bg-cyan-50 text-[#15CEFF] rounded-full text-[10px] font-bold uppercase tracking-widest">
                        Service #{idx + 1}
                      </div>
                      <button className="text-gray-300 hover:text-red-500 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <div className="space-y-6">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Card Title</label>
                        <input 
                          type="text" 
                          value={item.title}
                          onChange={(e) => updateService(item.id, "title", e.target.value)}
                          className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 font-bold text-lg text-[#15CEFF] focus:bg-white focus:border-[#15CEFF] outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Description</label>
                        <textarea 
                          rows={4}
                          value={item.description}
                          onChange={(e) => updateService(item.id, "description", e.target.value)}
                          className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm text-gray-600 focus:bg-white focus:border-[#15CEFF] outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Key Features</label>
                        {item.features.map((f: string, fIdx: number) => (
                          <input 
                            key={fIdx}
                            type="text" 
                            value={f}
                            onChange={(e) => {
                              const newFeatures = [...item.features];
                              newFeatures[fIdx] = e.target.value;
                              updateService(item.id, "features", newFeatures);
                            }}
                            className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-[15px] font-bold text-gray-900 focus:bg-white focus:border-[#15CEFF] outline-none transition-all"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Add New Service Placeholder */}
                <button 
                  onClick={() => {
                    const newId = `service-${Date.now()}`;
                    const newItem = {
                      id: newId,
                      icon: "Code2",
                      title: "New Service Pillar",
                      description: "Enter service description here...",
                      features: ["Feature 1", "Feature 2", "Feature 3"]
                    };
                    setContent((prev: any) => ({
                      ...prev,
                      pages: {
                        ...prev.pages,
                        services: {
                          ...prev.pages.services,
                          items: [...prev.pages.services.items, newItem]
                        }
                      }
                    }));
                  }}
                  className="bg-white rounded-[32px] border-2 border-dashed border-gray-100 p-8 flex flex-col items-center justify-center gap-4 group hover:border-[#15CEFF]/30 transition-all hover:bg-cyan-50/20"
                >
                  <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-[#15CEFF] group-hover:text-white transition-all shadow-sm group-hover:shadow-cyan-100">
                    <Plus size={32} />
                  </div>
                  <span className="font-bold text-gray-400 group-hover:text-[#15CEFF] transition-colors">Add New Service Pillar</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Footer Info */}
      <div className="fixed bottom-0 right-0 left-72 bg-white/80 backdrop-blur-md border-t border-gray-100 p-4 px-10 flex justify-between items-center z-40">
        <div className="flex items-center gap-2 text-gray-400 text-[10px] font-bold tracking-widest uppercase">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          System Active • Version 1.0.4
        </div>
        <div className="flex items-center gap-6">
          <div className="text-gray-400 text-[10px] font-bold tracking-widest uppercase flex items-center gap-2">
            Auto-save: <span className="text-green-500">Enabled</span>
          </div>
          <Link href="/" target="_blank" className="text-[#15CEFF] text-[10px] font-bold tracking-widest uppercase hover:underline flex items-center gap-1">
            Preview Site <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
