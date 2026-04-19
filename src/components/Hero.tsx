import { motion } from "motion/react";
import { ArrowRight, Play, ShoppingCart, MessageSquare } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden px-6">
      {/* Background Lights */}
      <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-lumina-yellow/10 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] bg-white/5 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-16 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
            <span className="text-lumina-yellow text-[10px] font-bold uppercase tracking-[0.3em]">Turning Vision Into Digital Success</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-display font-bold leading-[1] tracking-tighter">
            Grow Your Brand <br />
            With <span className="text-lumina-yellow glow-text-yellow">Lumina Digital</span>
          </h1>

          <p className="text-xl text-white/50 max-w-lg leading-relaxed font-light">
            Premium Editing, Design, Marketing & Digital Products For Modern Creators And Businesses.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <a href="/#services" className="btn-primary">
              Get Started
            </a>
            <a href="/#work" className="btn-secondary">
              View Portfolio
            </a>
          </div>

          <div className="flex items-center space-x-4 pt-8 border-t border-white/5 w-fit">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-lumina-yellow to-white p-[1px] hover:scale-110 transition-transform duration-300">
              <div className="w-full h-full rounded-full bg-luxury-black flex items-center justify-center overflow-hidden">
                <img src="https://images.unsplash.com/photo-1614381100718-73817868617b?fit=crop&w=150&h=150" alt="Yeswanth" referrerPolicy="no-referrer" className="object-cover w-full h-full" />
              </div>
            </div>
            <div>
              <div className="text-base font-bold text-white">Yeswanth</div>
              <div className="text-[11px] text-lumina-yellow font-bold uppercase tracking-[0.2em]">Founder & Creative Director</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-6"
        >
          <div className="glass p-8 space-y-4">
            <h3 className="text-lumina-yellow text-xs font-bold uppercase tracking-[0.2em] mb-4">Digital Assets Store</h3>
            {[
              { name: "Premiere Pro Assets", desc: "Transitions & SFX Pack", price: "₹499" },
              { name: "After Effects Templates", desc: "Dynamic Promo Kits", price: "₹999" },
              { name: "LUT Color Pack", desc: "Cinematic Grading", price: "₹299" }
            ].map((p, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                <div>
                   <div className="text-sm font-semibold">{p.name}</div>
                   <div className="text-[10px] text-white/40">{p.desc}</div>
                </div>
                <div className="text-lumina-yellow font-bold text-sm">{p.price}</div>
              </div>
            ))}
          </div>

          <div className="glass p-8">
            <h3 className="text-lumina-yellow text-xs font-bold uppercase tracking-[0.2em] mb-6">Our Expertise</h3>
            <div className="grid grid-cols-2 gap-3">
               {["Video Editing", "Thumbnail Design", "Paid Ads", "Brand Shoots", "Motion Graphics", "Social Media"].map(s => (
                 <div key={s} className="bg-white/5 border border-white/5 rounded-lg py-2 px-3 text-[10px] font-medium text-center hover:border-lumina-yellow/30 transition-colors">
                   {s}
                 </div>
               ))}
            </div>
          </div>

          <div className="glass p-6 border-dashed border-white/20 flex flex-col items-center justify-center text-center">
             <div className="text-[10px] text-white/30 uppercase tracking-widest mb-1">Featured In</div>
             <div className="text-lg font-display font-bold tracking-[0.3em] opacity-80 uppercase">Yeswanth Vlogs</div>
          </div>
        </motion.div>
      </div>

      {/* Floating Particles Simulation (CSS) */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white animate-float"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`
            }}
          />
        ))}
      </div>
    </section>
  );
}
