import React, { useState } from "react";
import { motion } from "motion/react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";
import { DollarSign, Gift, TrendingUp, CheckCircle, ArrowRight } from "lucide-react";

export default function Commission() {
  const [formData, setFormData] = useState({
    referrerName: "",
    referrerEmail: "",
    clientName: "",
    projectType: "Full Project",
    note: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await addDoc(collection(db, "referrals"), {
        ...formData,
        status: "pending",
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
        className="pt-40 pb-20 px-6 min-h-screen flex items-center justify-center text-center bg-luxury-black"
      >
        <div className="max-w-xl">
          <div className="w-20 h-20 bg-lumina-yellow rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(255,255,0,0.3)]">
            <CheckCircle className="text-black" size={40} />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Referral Submitted!</h1>
          <p className="text-white/60 mb-10 text-lg">
            Thanks for referring a client to Lumina Digital. Our team will verify the lead. Once the project is closed, you &apos;ll receive your commission.
          </p>
          <button onClick={() => setStatus("idle")} className="btn-primary">Submit Another Referral</button>
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
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div className="space-y-12">
          <div>
            <div className="text-lumina-yellow font-bold uppercase tracking-[0.3em] text-sm mb-4">Partner Program</div>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">Earn With <span className="text-lumina-yellow">Lumina Digital</span></h1>
            <p className="text-white/40 text-lg max-w-lg">
              Refer a client to our agency and earn up to <span className="text-lumina-yellow font-bold">20% commission</span> on successful project closures. No limits, pure growth.
            </p>
          </div>

          <div className="space-y-8">
            {[
              { icon: Gift, title: "10-20% Commission", desc: "Earn a significant cut of every project you bring to us." },
              { icon: TrendingUp, title: "Monthly Payouts", desc: "Get paid directly to your bank/UPI every month." },
              { icon: DollarSign, title: "Tiered Rewards", desc: "Refer more, earn more. High volume partners get premium rates." }
            ].map((benefit, i) => (
              <div key={i} className="flex items-start space-x-4">
                <div className="p-3 bg-lumina-yellow/10 rounded-xl text-lumina-yellow">
                  <benefit.icon size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold">{benefit.title}</h3>
                  <p className="text-white/40 text-sm">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="glass p-8 space-y-4 max-w-md">
            <h4 className="font-bold flex items-center text-lumina-yellow">
               <ArrowRight className="mr-2" size={18} />
               How it works
            </h4>
            <ol className="space-y-4 text-sm text-white/50">
               <li>1. Fill out the referral form with your details and client details.</li>
               <li>2. Our team schedules a discovery call with the client.</li>
               <li>3. Once the project starts and payment is received, your commission is locked.</li>
               <li>4. Monthly settlement of all locked commissions.</li>
            </ol>
          </div>
        </div>

        <div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass p-10 rounded-[2.5rem]"
          >
            <h2 className="text-2xl font-display font-bold mb-8">Refer A Client</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="text-xs font-bold uppercase tracking-widest text-white/40 px-2">Your Information</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    required
                    value={formData.referrerName}
                    onChange={e => setFormData({...formData, referrerName: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-lumina-yellow transition-colors"
                  />
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    required
                    value={formData.referrerEmail}
                    onChange={e => setFormData({...formData, referrerEmail: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-lumina-yellow transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-xs font-bold uppercase tracking-widest text-white/40 px-2">Client Information</div>
                <input 
                  type="text" 
                  placeholder="Client/Company Name" 
                  required
                  value={formData.clientName}
                  onChange={e => setFormData({...formData, clientName: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-lumina-yellow transition-colors"
                />
                <select 
                  value={formData.projectType}
                  onChange={e => setFormData({...formData, projectType: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-lumina-yellow transition-colors appearance-none"
                >
                  <option className="bg-luxury-black">Video Editing Package</option>
                  <option className="bg-luxury-black">Branding & Kit</option>
                  <option className="bg-luxury-black">Full Marketing Project</option>
                  <option className="bg-luxury-black">Product Shoot</option>
                </select>
              </div>

              <textarea 
                placeholder="Additional Notes (Optional)" 
                rows={3}
                value={formData.node}
                onChange={e => setFormData({...formData, note: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-lumina-yellow transition-colors resize-none"
              />

              <button 
                type="submit" 
                disabled={status === "loading"}
                className="w-full btn-primary disabled:opacity-50"
              >
                {status === "loading" ? "Submitting..." : "Submit Referral Lead"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
