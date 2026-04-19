import { motion } from "motion/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { CheckCircle, Download, MessageSquare, Home } from "lucide-react";

export default function Success() {
  const location = useLocation();
  const navigate = useNavigate();
  const { product, orderId } = location.state || {};

  useEffect(() => {
    if (!product) {
      navigate("/");
      return;
    }

    const timer = setTimeout(() => {
      window.location.href = `https://wa.me/916300727919?text=Hi%20Lumina%20Digital,%20I%20completed%20payment%20for%20${encodeURIComponent(product.name)}.%20Order%20ID:%20${orderId}.%20Please%20send%20my%20order.`;
    }, 4000);

    return () => clearTimeout(timer);
  }, [product, orderId, navigate]);

  if (!product) return null;

  const handleManualRedirect = () => {
     window.location.href = `https://wa.me/916300727919?text=Hi%20Lumina%20Digital,%20I%20completed%20payment%20for%20${encodeURIComponent(product.name)}.%20Order%20ID:%20${orderId}.%20Please%20send%20my%20order.`;
  };

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-40 pb-20 px-6 min-h-screen flex items-center justify-center bg-luxury-black"
    >
      <div className="max-w-2xl w-full text-center">
        <motion.div
           initial={{ scale: 0 }}
           animate={{ scale: 1 }}
           transition={{ type: "spring", damping: 12 }}
           className="w-24 h-24 bg-lumina-yellow rounded-full flex items-center justify-center mx-auto mb-10 shadow-[0_0_80px_rgba(255,255,0,0.3)]"
        >
          <CheckCircle className="text-black" size={48} />
        </motion.div>

        <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
          Thank You For Purchasing From <span className="text-lumina-yellow">Lumina Digital</span>
        </h1>
        
        <p className="text-white/40 text-lg mb-12">
          Your order for <span className="text-white font-bold">{product.name}</span> was successful. 
          Redirecting you to WhatsApp to claim your assets in a few seconds...
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
          <button 
            onClick={() => window.print()} 
            className="flex items-center justify-center space-x-2 bg-white/5 border border-white/10 p-4 rounded-2xl hover:bg-white/10 transition-all font-bold"
          >
            <Download size={20} />
            <span>Download Receipt</span>
          </button>
          <button 
            onClick={handleManualRedirect}
            className="flex items-center justify-center space-x-2 bg-[#25D366] text-white p-4 rounded-2xl hover:brightness-110 transition-all font-bold"
          >
            <MessageSquare size={20} />
            <span>Chat on WhatsApp</span>
          </button>
        </div>

        <button 
          onClick={() => navigate("/")}
          className="mt-8 text-white/40 hover:text-lumina-yellow transition-colors flex items-center mx-auto"
        >
          <Home size={18} className="mr-2" />
          Back to Home
        </button>
      </div>
    </motion.section>
  );
}
