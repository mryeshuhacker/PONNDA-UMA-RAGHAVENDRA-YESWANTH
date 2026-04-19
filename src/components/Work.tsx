import { motion } from "motion/react";
import { PORTFOLIO } from "../constants.ts";
import { ExternalLink, Play } from "lucide-react";

export default function Work() {
  return (
    <section id="work" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="text-lumina-yellow font-bold uppercase tracking-[0.3em] text-sm mb-4">Case Studies</div>
            <h2 className="text-4xl md:text-6xl font-display font-bold">Selected Work</h2>
          </div>
          <p className="text-white/40 max-w-sm text-lg border-l border-lumina-yellow/30 pl-6 py-2">
            A glimpse into the cinematic excellence we &apos;ve delivered for our global clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {PORTFOLIO.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative h-[450px] rounded-[2.5rem] overflow-hidden bg-white/5 cursor-pointer"
            >
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/0 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
              
              {/* Content */}
              <div className="absolute inset-x-10 bottom-10 flex items-end justify-between">
                <div>
                  <div className="text-lumina-yellow text-sm font-bold uppercase tracking-widest mb-2 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                    {item.type}
                  </div>
                  <h3 className="text-3xl font-display font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform">
                    {item.title}
                  </h3>
                </div>
                
                <div className="p-4 rounded-full bg-lumina-yellow text-black opacity-0 group-hover:opacity-100 transition-all scale-50 group-hover:scale-100 translate-x-4 group-hover:translate-x-0">
                  {item.type === "Video" ? <Play size={24} fill="currentColor" /> : <ExternalLink size={24} />}
                </div>
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 border-2 border-lumina-yellow/0 group-hover:border-lumina-yellow/20 rounded-[2.5rem] transition-all pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
