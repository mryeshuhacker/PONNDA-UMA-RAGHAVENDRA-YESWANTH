import React, { useState } from "react";
import { motion } from "motion/react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";
import { Briefcase, CheckCircle } from "lucide-react";

export default function Hiring() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Video Editor",
    skills: "",
    portfolioLink: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const ROLES = [
    "Video Editor",
    "Graphic Designer",
    "Social Media Manager",
    "Content Creator",
    "Marketing Expert"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await addDoc(collection(db, "hiringApplications"), {
        ...formData,
        createdAt: serverTimestamp()
      });
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-40 pb-20 px-6 min-h-screen flex items-center justify-center text-center"
      >
        <div className="max-w-xl">
          <div className="w-20 h-20 bg-lumina-yellow rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(255,255,0,0.3)]">
            <CheckCircle className="text-black" size={40} />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Application Received!</h1>
          <p className="text-white/60 mb-10 text-lg">
            Thanks for applying to Lumina Digital. Our team will review your portfolio and get back to you soon.
          </p>
          <a href="/" className="btn-primary inline-block">Back to Home</a>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-40 pb-20 px-6 min-h-screen bg-luxury-black"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <Briefcase className="text-lumina-yellow mx-auto mb-6" size={48} />
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">Join The <span className="text-lumina-yellow">Elite Team</span></h1>
          <p className="text-white/40 text-lg">We are always looking for top-tier creative talent to help us push boundaries.</p>
        </div>

        <div className="glass p-8 md:p-12 rounded-[2.5rem]">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-lumina-yellow transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-lumina-yellow transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40">Phone Number</label>
                <input 
                  type="tel" 
                  required
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-lumina-yellow transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40">Role Applying For</label>
                <select 
                  value={formData.role}
                  onChange={e => setFormData({...formData, role: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-lumina-yellow transition-colors appearance-none"
                >
                  {ROLES.map(role => <option key={role} value={role} className="bg-luxury-black">{role}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40">Skills & Experience</label>
              <textarea 
                rows={4}
                required
                placeholder="What sets you apart?"
                value={formData.skills}
                onChange={e => setFormData({...formData, skills: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-lumina-yellow transition-colors resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40">Portfolio Link (YouTube/Behance/Drive)</label>
              <input 
                type="url" 
                required
                placeholder="https://..."
                value={formData.portfolioLink}
                onChange={e => setFormData({...formData, portfolioLink: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-lumina-yellow transition-colors"
              />
            </div>

            <button 
              type="submit" 
              disabled={status === "loading"}
              className="w-full btn-primary disabled:opacity-50"
            >
              {status === "loading" ? "Submitting..." : "Submit Application"}
            </button>
          </form>
        </div>
      </div>
    </motion.section>
  );
}
