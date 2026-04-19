import { motion } from "motion/react";
import { SERVICES } from "../constants.ts";
import { CheckCircle2 } from "lucide-react";

export default function Services() {
  return (
    <section id="services" className="py-24 px-6 bg-luxury-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lumina-yellow font-bold uppercase tracking-[0.3em] text-sm mb-4"
          >
            What We Do
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-bold mb-6"
          >
            Premium Solutions For <br /> Your Brand
          </motion.h2>
          <p className="text-white/40 max-w-2xl mx-auto text-lg">
            We offer expert digital services designed to scale your business and elevate your creative vision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass p-10 rounded-[2.5rem] group hover:border-lumina-yellow/30 transition-all duration-500"
            >
              <div className="flex items-start justify-between mb-8">
                <div className="p-4 bg-lumina-yellow/10 rounded-2xl group-hover:bg-lumina-yellow group-hover:text-black transition-all">
                  <service.icon size={32} />
                </div>
                <span className="text-white/10 text-5xl font-display font-black leading-none group-hover:text-lumina-yellow/5 transition-colors">
                  0{index + 1}
                </span>
              </div>
              
              <h3 className="text-3xl font-display font-bold mb-6">{service.category}</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.items.map((item) => (
                  <div key={item} className="flex items-center space-x-3 text-white/60 group-hover:text-white/90 transition-colors">
                    <CheckCircle2 size={18} className="text-lumina-yellow shrink-0" />
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
