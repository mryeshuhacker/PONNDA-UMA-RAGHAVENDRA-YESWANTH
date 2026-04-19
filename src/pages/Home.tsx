import { motion } from "motion/react";
import Hero from "../components/Hero.tsx";
import Services from "../components/Services.tsx";
import Work from "../components/Work.tsx";
import BrandingPosters from "../components/BrandingPosters.tsx";
import Store from "../components/Store.tsx";
import PartnerPromo from "../components/PartnerPromo.tsx";
import Contact from "../components/Contact.tsx";
import { Star, MessageSquareQuote } from "lucide-react";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-luxury-black"
    >
      <Hero />
      <Services />
      <Work />
      <BrandingPosters />
      
      {/* Testimonials */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
             <MessageSquareQuote className="text-lumina-yellow mx-auto mb-6" size={48} />
             <h2 className="text-4xl md:text-6xl font-display font-bold">Client Love</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "John Doe", role: "Creative Director", text: "Lumina Digital transformed our YouTube presence. Their edits are world-class." },
              { name: "Sarah Smith", role: "Ecom Owner", text: "The production quality of our brand shoot was INSANE. Highly recommend!" },
              { name: "Raj Vyas", role: "Content Creator", text: "The assets pack is a life-saver. Every transition is smooth and pro." }
            ].map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-10 rounded-3xl space-y-4"
              >
                <div className="flex text-lumina-yellow">
                   {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-white/60 italic">&quot;{t.text}&quot;</p>
                <div>
                   <div className="font-bold">{t.name}</div>
                   <div className="text-white/40 text-sm">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Store />
      <PartnerPromo />
      <Contact />
    </motion.div>
  );
}
