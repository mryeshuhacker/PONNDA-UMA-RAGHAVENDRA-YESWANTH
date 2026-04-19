import { motion } from "motion/react";
import { PRODUCTS } from "../constants.ts";
import { ShoppingCart, Star, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Store() {
  const navigate = useNavigate();

  const handleBuy = (product: any) => {
    // Navigate to payment page with product info
    navigate("/payment", { state: { product } });
  };

  return (
    <section id="store" className="py-24 px-6 bg-luxury-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lumina-yellow font-bold uppercase tracking-[0.3em] text-sm mb-4"
          >
            Digital Assets
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">Lumina Creators Store</h2>
          <p className="text-white/40 max-w-2xl mx-auto text-lg">
            Professional-grade resources to accelerate your creative workflow. Used by thousands of top-tier editors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-[2rem] overflow-hidden group hover:border-lumina-yellow/30 transition-all overflow-hidden"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-luxury-black/80 backdrop-blur-md px-3 py-1 rounded-full text-lumina-yellow font-bold text-sm border border-lumina-yellow/20">
                  ₹{product.price}
                </div>
              </div>

              <div className="p-8 space-y-6">
                <div className="flex items-center space-x-1 text-lumina-yellow">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                  <span className="text-xs text-white/40 ml-2">(4.9/5)</span>
                </div>

                <h3 className="text-2xl font-display font-bold">{product.name}</h3>
                
                <ul className="space-y-3">
                  {product.features.map((feature) => (
                    <li key={feature} className="text-white/50 text-sm flex items-center space-x-2">
                       <ArrowRight size={14} className="text-lumina-yellow" />
                       <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => handleBuy(product)}
                  className="w-full py-4 bg-white/5 hover:bg-lumina-yellow hover:text-black font-bold rounded-2xl border border-white/10 hover:border-transparent transition-all flex items-center justify-center group"
                >
                  <ShoppingCart className="mr-2 group-hover:rotate-12 transition-transform" size={18} />
                  Buy Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
