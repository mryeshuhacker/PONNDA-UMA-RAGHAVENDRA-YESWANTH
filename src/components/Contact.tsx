import React, { useState } from "react";
import { motion } from "motion/react";
import { Send, Phone, Instagram, Youtube, Globe, MessageCircle } from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await addDoc(collection(db, "messages"), {
        ...formData,
        createdAt: serverTimestamp()
      });
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <div className="text-lumina-yellow font-bold uppercase tracking-[0.3em] text-sm mb-4">Connection</div>
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">Ready To <span className="text-lumina-yellow">Level Up?</span></h2>
            <p className="text-white/60 text-lg mb-12 max-w-md">
              Have a vision? Let &apos;s bring it to life. Contact our expert team for high-end production and growth marketing.
            </p>

            <div className="space-y-8">
              {[
                { icon: Phone, label: "Call Us", val: "6300727919", href: "tel:+916300727919" },
                { 
                  icon: MessageCircle, 
                  label: "WhatsApp", 
                  val: "+91 6300727919", 
                  href: "https://wa.me/916300727919", 
                  color: "#25D366" 
                },
                { icon: Send, label: "Email", val: "luminidigital77@gmail.com", href: "mailto:luminidigital77@gmail.com" },
                { icon: MapPinIcon, label: "Location", val: "Rajahmundry, India", href: "#" }
              ].map((item, i) => (
                <a key={i} href={item.href} target="_blank" rel="noreferrer" className="flex items-center space-x-4 group">
                  <div className="p-4 bg-lumina-yellow/10 rounded-2xl text-lumina-yellow group-hover:bg-lumina-yellow group-hover:text-black transition-all">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <div className="text-white/40 text-xs font-bold uppercase tracking-widest">{item.label}</div>
                    <div className="text-xl font-medium group-hover:text-lumina-yellow transition-colors">{item.val}</div>
                  </div>
                </a>
              ))}
            </div>

            <div className="flex space-x-6 mt-12">
               <a href="https://www.instagram.com/yeshu_efx_7" target="_blank" className="text-white/40 hover:text-lumina-yellow transition-colors"><Instagram size={28} /></a>
               <a href="https://youtube.com/@yeswanthvlogs44?si=4FqvQMSVx_2Onyaw" target="_blank" className="text-white/40 hover:text-lumina-yellow transition-colors"><Youtube size={28} /></a>
               <a href="#" className="text-white/40 hover:text-lumina-yellow transition-colors"><Globe size={28} /></a>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-10 rounded-[2.5rem] relative"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-lumina-yellow transition-colors" 
                />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-lumina-yellow transition-colors" 
                />
              </div>
              <input 
                type="tel" 
                placeholder="Phone Number" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-lumina-yellow transition-colors" 
              />
              <textarea 
                rows={5} 
                placeholder="Your Message" 
                required
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-lumina-yellow transition-colors resize-none"
              ></textarea>
              
              <div className="flex flex-col md:flex-row gap-4 pt-2">
                <button 
                  type="submit" 
                  disabled={status === "loading"}
                  className="flex-1 btn-primary disabled:opacity-50"
                >
                  {status === "loading" ? "Sending..." : "Send Message"}
                </button>
                <a 
                  href={`https://wa.me/916300727919?text=Hi Lumina Digital,%20I'm%20${encodeURIComponent(formData.name)}.%20I'd%20like%20to%20discuss:%20${encodeURIComponent(formData.message)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 px-8 py-4 bg-white/5 border border-white/10 rounded-full text-white font-bold uppercase tracking-widest hover:bg-[#25D366] hover:text-white transition-all text-center flex items-center justify-center group"
                >
                  <MessageCircle size={18} className="mr-2 group-hover:rotate-12 transition-transform" />
                  WhatsApp
                </a>
              </div>

              {status === "success" && (
                <p className="text-lumina-yellow text-center font-bold">Message sent successfully!</p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MapPinIcon({ size }: { size: number }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} height={size} 
      viewBox="0 0 24 24" fill="none" 
      stroke="currentColor" strokeWidth="2" 
      strokeLinecap="round" strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  );
}
