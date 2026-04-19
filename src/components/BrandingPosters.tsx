import { motion } from "motion/react";

const POSTERS = [
  {
    title: "Stephen",
    tagline: "A gripping story built on intense thrills",
    image: "https://picsum.photos/seed/stephen-poster/800/1200",
    color: "#8B0000"
  },
  {
    title: "Cyber City",
    tagline: "The future is dark and neon",
    image: "https://picsum.photos/seed/cyber/800/1200",
    color: "#00CED1"
  },
  {
    title: "Silent Echo",
    tagline: "Every silence hides a secret",
    image: "https://picsum.photos/seed/silent/800/1200",
    color: "#2F4F4F"
  }
];

export default function BrandingPosters() {
  return (
    <section className="py-24 px-6 bg-luxury-black relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-lumina-yellow/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lumina-yellow font-bold uppercase tracking-[0.3em] text-sm mb-4"
          >
            Creative Direction
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">Brand Posters</h2>
          <p className="text-white/40 max-w-2xl mx-auto text-lg leading-relaxed">
            High-end cinematic poster designs that capture the soul of the story. From concept to final color grade.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {POSTERS.map((poster, idx) => (
            <motion.div
              key={poster.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.8 }}
              className="group relative"
            >
              <div className="relative aspect-[2/3] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5 group-hover:border-lumina-yellow/30 transition-all duration-500">
                <img 
                  src={poster.image} 
                  alt={poster.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Dynamic Gradient Overlay */}
                <div 
                  className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500"
                  style={{ background: `linear-gradient(to top, ${poster.color}, transparent)` }}
                />

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-10 translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="space-y-3">
                    <h3 className="text-4xl font-display font-bold text-white tracking-tighter uppercase whitespace-normal break-words">
                      {poster.title}
                    </h3>
                    <p className="text-white/70 text-sm font-medium leading-tight opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {poster.tagline}
                    </p>
                    <div className="w-12 h-1 bg-lumina-yellow rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </div>
                </div>
              </div>

              {/* Poster Glow Effect */}
              <div 
                className="absolute inset-0 -z-10 blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-700"
                style={{ backgroundColor: poster.color }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
