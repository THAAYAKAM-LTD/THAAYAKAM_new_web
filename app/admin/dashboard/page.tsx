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
  ChevronRight,
  Image as ImageIcon,
  Paintbrush
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [serviceInputs, setServiceInputs] = useState<Record<string, string>>({});
  const [featureInputs, setFeatureInputs] = useState<Record<string, string>>({});
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

  const updatePortfolioItem = (id: string, field: string, value: any) => {
    setContent((prev: any) => ({
      ...prev,
      portfolioItems: (prev.portfolioItems || []).map((item: any) => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const addOfferedService = (itemId: string) => {
    const newVal = serviceInputs[itemId]?.trim();
    if (!newVal) return;
    
    setContent((prev: any) => ({
      ...prev,
      portfolioItems: prev.portfolioItems.map((item: any) => 
        item.id === itemId 
          ? { ...item, offeredServices: [...(item.offeredServices || []), newVal] }
          : item
      )
    }));
    
    setServiceInputs(prev => ({ ...prev, [itemId]: "" }));
  };

  const removeOfferedService = (itemId: string, serviceToRemove: string) => {
    setContent((prev: any) => ({
      ...prev,
      portfolioItems: prev.portfolioItems.map((item: any) => 
        item.id === itemId 
          ? { ...item, offeredServices: (item.offeredServices || []).filter((s: string) => s !== serviceToRemove) }
          : item
      )
    }));
  };

  const addKeyFeature = (itemId: string) => {
    const newVal = featureInputs[itemId]?.trim();
    if (!newVal) return;
    
    setContent((prev: any) => ({
      ...prev,
      portfolioItems: prev.portfolioItems.map((item: any) => 
        item.id === itemId 
          ? { 
              ...item, 
              keyFeatures: { 
                ...item.keyFeatures, 
                items: [...(item.keyFeatures.items || []), { title: newVal, description: "" }] 
              } 
            }
          : item
      )
    }));
    
    setFeatureInputs(prev => ({ ...prev, [itemId]: "" }));
  };

  const removeKeyFeature = (itemId: string, featureTitleToRemove: string) => {
    setContent((prev: any) => ({
      ...prev,
      portfolioItems: prev.portfolioItems.map((item: any) => 
        item.id === itemId 
          ? { 
              ...item, 
              keyFeatures: { 
                ...item.keyFeatures, 
                items: (item.keyFeatures.items || []).filter((f: any) => f.title !== featureTitleToRemove) 
              } 
            }
          : item
      )
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, onUploadSuccess: (url: string) => void, fieldId: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingField(fieldId);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        onUploadSuccess(data.url);
        setStatus({ type: "success", message: "Image uploaded successfully! ✨" });
        setTimeout(() => setStatus(null), 3000);
      } else {
        throw new Error("Upload failed");
      }
    } catch (err) {
      console.error("Upload error:", err);
      setStatus({ type: "error", message: "Failed to upload image. Please try again." });
    } finally {
      setUploadingField(null);
    }
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
          <button 
            onClick={() => setActiveTab("portfolio")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "portfolio" ? "bg-cyan-50 text-[#15CEFF] shadow-sm" : "text-gray-500 hover:bg-gray-50"}`}
          >
            <Briefcase size={20} />
            <span className="font-semibold text-sm">Portfolio Hub</span>
          </button>
          <button 
            onClick={() => setActiveTab("brandDetail")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "brandDetail" ? "bg-cyan-50 text-[#15CEFF] shadow-sm" : "text-gray-500 hover:bg-gray-50"}`}
          >
            <Paintbrush size={20} />
            <span className="font-semibold text-sm">Brand Design Page</span>
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

          {/* PORTFOLIO MANAGER */}
          {activeTab === "portfolio" && (
            <div className="space-y-8 pb-12">
              <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-6 bg-[#15CEFF] rounded-full" />
                  <h2 className="text-xl font-bold text-gray-900 tracking-tight">Portfolio Page Header</h2>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2 text-left">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Page Title</label>
                    <input 
                      type="text" 
                      value={content.portfolioPage?.title || ""}
                      onChange={(e) => setContent((prev: any) => ({
                        ...prev,
                        portfolioPage: { ...prev.portfolioPage, title: e.target.value }
                      }))}
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 font-bold text-[22px] text-[#15CEFF] focus:bg-white focus:border-[#15CEFF] outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2 text-left">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Page Subtitle</label>
                    <textarea 
                      rows={3}
                      value={content.portfolioPage?.subtitle || ""}
                      onChange={(e) => setContent((prev: any) => ({
                        ...prev,
                        portfolioPage: { ...prev.portfolioPage, subtitle: e.target.value }
                      }))}
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 font-semibold text-gray-800 focus:bg-white focus:border-[#15CEFF] outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8">
                {(content.portfolioItems || []).map((item: any, idx: number) => (
                  <div key={item.id} className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-8 group relative flex flex-col gap-8">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="px-4 py-1.5 bg-cyan-50 text-[#15CEFF] rounded-full text-[10px] font-bold uppercase tracking-widest">
                          Project #{idx + 1}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                      </div>
                      <button 
                        onClick={() => {
                          if(confirm("Are you sure you want to delete this case study?")) {
                            setContent((prev: any) => ({
                              ...prev,
                              portfolioItems: prev.portfolioItems.filter((i: any) => i.id !== item.id)
                            }));
                          }
                        }}
                        className="text-gray-300 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={24} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                      <div className="space-y-6">
                        <div className="space-y-1 text-left">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Project Title</label>
                          <input 
                            type="text" 
                            value={item.title}
                            onChange={(e) => updatePortfolioItem(item.id, "title", e.target.value)}
                            className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 font-bold text-lg text-gray-800 focus:bg-white focus:border-[#15CEFF] outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-1 text-left">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Country</label>
                          <input 
                            type="text" 
                            value={item.country}
                            placeholder="e.g. United Kingdom 🇬🇧"
                            onChange={(e) => updatePortfolioItem(item.id, "country", e.target.value)}
                            className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 font-semibold text-gray-700 focus:bg-white focus:border-[#15CEFF] outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-1 text-left">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Category</label>
                          <input 
                            type="text" 
                            value={item.category}
                            onChange={(e) => updatePortfolioItem(item.id, "category", e.target.value)}
                            className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 font-semibold text-gray-700 focus:bg-white focus:border-[#15CEFF] outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-1 text-left">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Short Description (Subtitle)</label>
                          <textarea 
                            rows={2}
                            value={item.shortDescription}
                            placeholder="Briefly describe the project..."
                            onChange={(e) => updatePortfolioItem(item.id, "shortDescription", e.target.value)}
                            className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm text-gray-700 focus:bg-white focus:border-[#15CEFF] outline-none transition-all"
                          />
                        </div>

                        <div className="space-y-4 text-left">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Offered Services</label>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {(item.offeredServices || []).map((service: string, sIdx: number) => (
                              <span key={sIdx} className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-50 text-[#15CEFF] text-[12px] font-bold rounded-full border border-cyan-100 group/tag">
                                {service}
                                <button 
                                  onClick={() => removeOfferedService(item.id, service)}
                                  className="text-[#15CEFF] hover:text-red-500 transition-colors"
                                >
                                  <Plus size={12} className="rotate-45" />
                                </button>
                              </span>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <input 
                              type="text" 
                              value={serviceInputs[item.id] || ""}
                              placeholder="Add a service (e.g. UI / UX Design)"
                              onChange={(e) => setServiceInputs(prev => ({ ...prev, [item.id]: e.target.value }))}
                              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addOfferedService(item.id))}
                              className="flex-1 bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm text-gray-800 focus:bg-white focus:border-[#15CEFF] outline-none transition-all"
                            />
                            <button 
                              onClick={() => addOfferedService(item.id)}
                              className="px-4 bg-gray-50 text-gray-400 hover:text-[#15CEFF] hover:bg-[#15CEFF]/5 rounded-xl border border-gray-100 transition-all font-bold text-sm"
                            >
                              Add
                            </button>
                          </div>
                        </div>

                        <div className="space-y-1 text-left">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Thumbnail Image</label>
                          <div className="flex gap-2">
                            <input 
                              type="text" 
                              value={item.thumbnail}
                              placeholder="/portfolio/thumbnail.svg"
                              onChange={(e) => updatePortfolioItem(item.id, "thumbnail", e.target.value)}
                              className="flex-1 bg-gray-50 border border-gray-100 rounded-xl p-3 font-mono text-sm text-[#22C55E] focus:bg-white focus:border-[#15CEFF] outline-none transition-all"
                            />
                            <div className="relative">
                              <input 
                                type="file" 
                                id={`thumbnail-upload-${item.id}`}
                                className="hidden" 
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, (url) => updatePortfolioItem(item.id, "thumbnail", url), `thumbnail-${item.id}`)}
                              />
                              <label 
                                htmlFor={`thumbnail-upload-${item.id}`}
                                className={`h-full aspect-square flex items-center justify-center rounded-xl border border-gray-100 cursor-pointer transition-all ${uploadingField === `thumbnail-${item.id}` ? "bg-gray-100 animate-pulse" : "bg-white hover:bg-gray-50 text-gray-400 hover:text-[#15CEFF]"}`}
                              >
                                {uploadingField === `thumbnail-${item.id}` ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-1 text-left">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Main Hero Image</label>
                          <div className="flex gap-2">
                            <input 
                              type="text" 
                              value={item.heroImage}
                              placeholder="/portfolio/project-hero.svg"
                              onChange={(e) => updatePortfolioItem(item.id, "heroImage", e.target.value)}
                              className="flex-1 bg-gray-50 border border-gray-100 rounded-xl p-3 font-mono text-sm text-[#22C55E] focus:bg-white focus:border-[#15CEFF] outline-none transition-all"
                            />
                            <div className="relative">
                              <input 
                                type="file" 
                                id={`hero-upload-${item.id}`}
                                className="hidden" 
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, (url) => updatePortfolioItem(item.id, "heroImage", url), `hero-${item.id}`)}
                              />
                              <label 
                                htmlFor={`hero-upload-${item.id}`}
                                className={`h-full aspect-square flex items-center justify-center rounded-xl border border-gray-100 cursor-pointer transition-all ${uploadingField === `hero-${item.id}` ? "bg-gray-100 animate-pulse" : "bg-white hover:bg-gray-50 text-gray-400 hover:text-[#15CEFF]"}`}
                              >
                                {uploadingField === `hero-${item.id}` ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div className="space-y-1 text-left">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Introduction Image</label>
                          <div className="flex gap-2">
                            <input 
                              type="text" 
                              value={item.introduction.image}
                              placeholder="/portfolio/intro.svg"
                              onChange={(e) => {
                                const newIntro = { ...item.introduction, image: e.target.value };
                                updatePortfolioItem(item.id, "introduction", newIntro);
                              }}
                              className="flex-1 bg-gray-50 border border-gray-100 rounded-xl p-3 font-mono text-sm text-[#22C55E] focus:bg-white focus:border-[#15CEFF] outline-none transition-all"
                            />
                            <div className="relative">
                              <input 
                                type="file" 
                                id={`intro-upload-${item.id}`}
                                className="hidden" 
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, (url) => {
                                  const newIntro = { ...item.introduction, image: url };
                                  updatePortfolioItem(item.id, "introduction", newIntro);
                                }, `intro-${item.id}`)}
                              />
                              <label 
                                htmlFor={`intro-upload-${item.id}`}
                                className={`h-full aspect-square flex items-center justify-center rounded-xl border border-gray-100 cursor-pointer transition-all ${uploadingField === `intro-${item.id}` ? "bg-gray-100 animate-pulse" : "bg-white hover:bg-gray-50 text-gray-400 hover:text-[#15CEFF]"}`}
                              >
                                {uploadingField === `intro-${item.id}` ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}
                              </label>
                            </div>
                          </div>
                        </div>


                        <div className="space-y-1 text-left">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Introduction (HTML)</label>
                          <textarea 
                            rows={8}
                            value={item.introduction.text}
                            onChange={(e) => {
                              const newIntro = { ...item.introduction, text: e.target.value };
                              updatePortfolioItem(item.id, "introduction", newIntro);
                            }}
                            className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm text-gray-600 focus:bg-white focus:border-[#15CEFF] outline-none transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 pt-8 border-t border-gray-50">
                      <div className="space-y-1 text-left">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Key Features Illustration</label>
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            value={item.keyFeatures.image}
                            placeholder="/portfolio/features.svg"
                            onChange={(e) => {
                              const newFeatures = { ...item.keyFeatures, image: e.target.value };
                              updatePortfolioItem(item.id, "keyFeatures", newFeatures);
                            }}
                            className="flex-1 bg-gray-50 border border-gray-100 rounded-xl p-3 font-mono text-sm text-[#22C55E] focus:bg-white focus:border-[#15CEFF] outline-none transition-all"
                          />
                          <div className="relative">
                            <input 
                              type="file" 
                              id={`features-upload-${item.id}`}
                              className="hidden" 
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, (url) => {
                                const newFeatures = { ...item.keyFeatures, image: url };
                                updatePortfolioItem(item.id, "keyFeatures", newFeatures);
                              }, `features-${item.id}`)}
                            />
                            <label 
                              htmlFor={`features-upload-${item.id}`}
                              className={`h-full aspect-square flex items-center justify-center rounded-xl border border-gray-100 cursor-pointer transition-all ${uploadingField === `features-${item.id}` ? "bg-gray-100 animate-pulse" : "bg-white hover:bg-gray-50 text-gray-400 hover:text-[#15CEFF]"}`}
                            >
                              {uploadingField === `features-${item.id}` ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}
                            </label>
                          </div>
                        </div>
                      </div>

                        <div className="space-y-4 pt-4 border-t border-gray-50/50">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Key Features (Points)</label>
                          <div className="grid grid-cols-1 gap-4">
                            {(item.keyFeatures.items || []).map((feature: any, fIdx: number) => (
                              <div key={fIdx} className="space-y-3 p-4 bg-gray-50 rounded-2xl border border-gray-100 group relative">
                                <button 
                                  onClick={() => removeKeyFeature(item.id, feature.title)}
                                  className="absolute top-3 right-3 text-gray-300 hover:text-red-500 transition-colors"
                                >
                                  <Trash2 size={16} />
                                </button>
                                <div className="space-y-1">
                                  <label className="text-[8px] font-bold text-gray-400 uppercase">Feature Title</label>
                                  <input 
                                    type="text"
                                    value={feature.title}
                                    onChange={(e) => {
                                      const newItems = [...item.keyFeatures.items];
                                      newItems[fIdx] = { ...newItems[fIdx], title: e.target.value };
                                      const newFeatures = { ...item.keyFeatures, items: newItems };
                                      updatePortfolioItem(item.id, "keyFeatures", newFeatures);
                                    }}
                                    className="w-full bg-white border border-gray-100 rounded-lg p-2 font-bold text-sm text-gray-800 outline-none focus:border-[#15CEFF]"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[8px] font-bold text-gray-400 uppercase">Feature Description</label>
                                  <textarea 
                                    rows={2}
                                    value={feature.description}
                                    onChange={(e) => {
                                      const newItems = [...item.keyFeatures.items];
                                      newItems[fIdx] = { ...newItems[fIdx], description: e.target.value };
                                      const newFeatures = { ...item.keyFeatures, items: newItems };
                                      updatePortfolioItem(item.id, "keyFeatures", newFeatures);
                                    }}
                                    className="w-full bg-white border border-gray-100 rounded-lg p-2 text-[12px] text-gray-500 outline-none focus:border-[#15CEFF]"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            value={featureInputs[item.id] || ""}
                            placeholder="Add a feature (e.g. Real-time notifications)"
                            onChange={(e) => setFeatureInputs(prev => ({ ...prev, [item.id]: e.target.value }))}
                            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addKeyFeature(item.id))}
                            className="flex-1 bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm text-gray-800 focus:bg-white focus:border-[#15CEFF] outline-none transition-all"
                          />
                          <button 
                            onClick={() => addKeyFeature(item.id)}
                            className="px-4 bg-gray-50 text-gray-400 hover:text-[#15CEFF] hover:bg-[#15CEFF]/5 rounded-xl border border-gray-100 transition-all font-bold text-sm"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>



                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-8 border-t border-gray-50">
                      <div className="space-y-2 text-left">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Challenge</label>
                        <textarea 
                          rows={6}
                          value={item.challenge}
                          onChange={(e) => updatePortfolioItem(item.id, "challenge", e.target.value)}
                          className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm text-gray-600 focus:bg-white focus:border-[#15CEFF] outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-2 text-left">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Solution</label>
                        <textarea 
                          rows={6}
                          value={item.solution}
                          onChange={(e) => updatePortfolioItem(item.id, "solution", e.target.value)}
                          className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm text-gray-600 focus:bg-white focus:border-[#15CEFF] outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <button 
                  onClick={() => {
                    const newId = `project-${Date.now()}`;
                    const newItem = {
                      id: newId,
                      title: "New Case Study",
                      category: "Platform Development",
                      shortDescription: "Enter intro pitch...",
                      country: "United Kingdom 🇬🇧",
                      thumbnail: "/portfolio/placeholder.svg",
                      offeredServices: [],
                      heroImage: "/portfolio/placeholder-hero.svg",
                      introduction: { text: "Start story...", image: "/portfolio/placeholder-intro.svg" },
                      keyFeatures: { items: [], image: "/portfolio/placeholder-features.svg" },
                      challenge: "Hurdle...",
                      solution: "Fix..."
                    };
                    setContent((prev: any) => ({
                      ...prev,
                      portfolioItems: [...(prev.portfolioItems || []), newItem]
                    }));
                  }}
                  className="bg-white rounded-[32px] border-2 border-dashed border-gray-100 p-12 flex flex-col items-center justify-center gap-4 group hover:border-[#15CEFF]/30 transition-all hover:bg-cyan-50/20 shadow-sm"
                >
                  <div className="w-20 h-20 rounded-full bg-cyan-50 flex items-center justify-center text-[#15CEFF] group-hover:bg-[#15CEFF] group-hover:text-white transition-all shadow-sm group-hover:shadow-cyan-100">
                    <Plus size={40} />
                  </div>
                  <span className="font-bold text-gray-400 group-hover:text-[#15CEFF] transition-colors text-lg uppercase tracking-widest">Add New Case Study</span>
                </button>
              </div>
            </div>
          )}

          {/* BRAND DESIGN PAGE MANAGER */}
          {activeTab === "brandDetail" && (
            <div className="space-y-8 pb-12 text-left">
              <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-8 space-y-8 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-6 bg-[#15CEFF] rounded-full" />
                  <h2 className="text-xl font-bold text-gray-900 tracking-tight">Main Page Header</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Main Heading</label>
                      <input 
                        type="text" 
                        value={content.serviceDetails.brand.title}
                        onChange={(e) => setContent((prev: any) => ({
                          ...prev,
                          serviceDetails: { ...prev.serviceDetails, brand: { ...prev.serviceDetails.brand, title: e.target.value } }
                        }))}
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 font-bold text-xl text-[#15CEFF] focus:bg-white focus:border-[#15CEFF] outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Hero Illustration</label>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          value={content.serviceDetails.brand.illustration}
                          placeholder="/service/hero.svg"
                          onChange={(e) => setContent((prev: any) => ({
                            ...prev,
                            serviceDetails: { ...prev.serviceDetails, brand: { ...prev.serviceDetails.brand, illustration: e.target.value } }
                          }))}
                          className="flex-1 bg-gray-50 border border-gray-100 rounded-xl p-3 font-mono text-sm text-[#22C55E] focus:bg-white focus:border-[#15CEFF] outline-none transition-all"
                        />
                        <div className="relative">
                          <input 
                            type="file" 
                            id="brand-hero-upload"
                            className="hidden" 
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, (url) => setContent((prev: any) => ({
                              ...prev,
                              serviceDetails: { ...prev.serviceDetails, brand: { ...prev.serviceDetails.brand, illustration: url } }
                            })), "brand-hero")}
                          />
                          <label 
                            htmlFor="brand-hero-upload"
                            className={`h-full aspect-square flex items-center justify-center rounded-xl border border-gray-100 cursor-pointer transition-all ${uploadingField === "brand-hero" ? "bg-gray-100 animate-pulse" : "bg-white hover:bg-gray-50 text-gray-400 hover:text-[#15CEFF]"}`}
                          >
                            {uploadingField === "brand-hero" ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Hero Paragraph</label>
                      <textarea 
                        rows={6}
                        value={content.serviceDetails.brand.paragraphs[0]}
                        onChange={(e) => {
                          const newParams = [...content.serviceDetails.brand.paragraphs];
                          newParams[0] = e.target.value;
                          setContent((prev: any) => ({
                            ...prev,
                            serviceDetails: { ...prev.serviceDetails, brand: { ...prev.serviceDetails.brand, paragraphs: newParams } }
                          }));
                        }}
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm text-gray-600 focus:bg-white focus:border-[#15CEFF] outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Sections Manager */}
              <div className="space-y-6 text-left">
                <div className="flex items-center gap-3 px-4">
                  <div className="w-1.5 h-6 bg-[#15CEFF] rounded-full" />
                  <h2 className="text-xl font-bold text-gray-900 tracking-tight">Content Sections</h2>
                </div>
                
                <div className="grid grid-cols-1 gap-8">
                  {content.serviceDetails.brand.sections.map((section: any, sIdx: number) => (
                    section.type === "feature-list" && (
                      <div key={section.id} className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-8 group relative flex flex-col gap-8 text-left">
                        <div className="flex items-center gap-4">
                          <div className="px-4 py-1.5 bg-cyan-50 text-[#15CEFF] rounded-full text-[10px] font-bold uppercase tracking-widest">
                            Section #{sIdx + 1}
                          </div>
                          <input 
                            type="text"
                            value={section.title}
                            onChange={(e) => {
                              const newSections = [...content.serviceDetails.brand.sections];
                              newSections[sIdx] = { ...newSections[sIdx], title: e.target.value };
                              setContent((prev: any) => ({
                                ...prev,
                                serviceDetails: { ...prev.serviceDetails, brand: { ...prev.serviceDetails.brand, sections: newSections } }
                              }));
                            }}
                            className="text-xl font-bold text-gray-900 bg-transparent border-none outline-none focus:text-[#15CEFF]"
                          />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                          <div className="space-y-6">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Section Description</label>
                              <textarea 
                                rows={4}
                                value={section.description}
                                onChange={(e) => {
                                  const newSections = [...content.serviceDetails.brand.sections];
                                  newSections[sIdx] = { ...newSections[sIdx], description: e.target.value };
                                  setContent((prev: any) => ({
                                    ...prev,
                                    serviceDetails: { ...prev.serviceDetails, brand: { ...prev.serviceDetails.brand, sections: newSections } }
                                  }));
                                }}
                                className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm text-gray-600 focus:bg-white focus:border-[#15CEFF] outline-none transition-all"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Section Illustration</label>
                              <div className="flex gap-2">
                                <input 
                                  type="text" 
                                  value={section.illustration}
                                  placeholder="/service/illustration.svg"
                                  onChange={(e) => {
                                    const newSections = [...content.serviceDetails.brand.sections];
                                    newSections[sIdx] = { ...newSections[sIdx], illustration: e.target.value };
                                    setContent((prev: any) => ({
                                      ...prev,
                                      serviceDetails: { ...prev.serviceDetails, brand: { ...prev.serviceDetails.brand, sections: newSections } }
                                    }));
                                  }}
                                  className="flex-1 bg-gray-50 border border-gray-100 rounded-xl p-3 font-mono text-sm text-[#22C55E] focus:bg-white focus:border-[#15CEFF] outline-none transition-all"
                                />
                                <div className="relative">
                                  <input 
                                    type="file" 
                                    id={`brand-section-upload-${sIdx}`}
                                    className="hidden" 
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, (url) => {
                                      const newSections = [...content.serviceDetails.brand.sections];
                                      newSections[sIdx] = { ...newSections[sIdx], illustration: url };
                                      setContent((prev: any) => ({
                                        ...prev,
                                        serviceDetails: { ...prev.serviceDetails, brand: { ...prev.serviceDetails.brand, sections: newSections } }
                                      }));
                                    }, `brand-section-${sIdx}`)}
                                  />
                                  <label 
                                    htmlFor={`brand-section-upload-${sIdx}`}
                                    className={`h-full aspect-square flex items-center justify-center rounded-xl border border-gray-100 cursor-pointer transition-all ${uploadingField === `brand-section-${sIdx}` ? "bg-gray-100 animate-pulse" : "bg-white hover:bg-gray-50 text-gray-400 hover:text-[#15CEFF]"}`}
                                  >
                                    {uploadingField === `brand-section-${sIdx}` ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Bullets / Items</label>
                            {section.items.map((item: any, iIdx: number) => (
                              <div key={iIdx} className="space-y-2 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <input 
                                  type="text"
                                  value={item.title}
                                  onChange={(e) => {
                                    const newSections = [...content.serviceDetails.brand.sections];
                                    newSections[sIdx].items[iIdx].title = e.target.value;
                                    setContent((prev: any) => ({
                                      ...prev,
                                      serviceDetails: { ...prev.serviceDetails, brand: { ...prev.serviceDetails.brand, sections: newSections } }
                                    }));
                                  }}
                                  className="w-full bg-white border border-gray-100 rounded-lg p-2 font-bold text-sm text-gray-800 outline-none focus:border-[#15CEFF]"
                                />
                                <textarea 
                                  rows={2}
                                  value={item.description}
                                  onChange={(e) => {
                                    const newSections = [...content.serviceDetails.brand.sections];
                                    newSections[sIdx].items[iIdx].description = e.target.value;
                                    setContent((prev: any) => ({
                                      ...prev,
                                      serviceDetails: { ...prev.serviceDetails, brand: { ...prev.serviceDetails.brand, sections: newSections } }
                                    }));
                                  }}
                                  className="w-full bg-white border border-gray-100 rounded-lg p-2 text-[12px] text-gray-500 outline-none focus:border-[#15CEFF]"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )
                  ))}
                </div>
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
