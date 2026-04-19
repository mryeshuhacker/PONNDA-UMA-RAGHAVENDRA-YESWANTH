import { motion } from "motion/react";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ShoppingBag, ShieldCheck, ArrowLeft, Loader2 } from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });

  useEffect(() => {
    // If no product selected, go back to home store
    if (!product) {
      navigate("/");
    }
  }, [product, navigate]);

  if (!product) return null;

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Create a pending order in Firestore
      const orderRef = await addDoc(collection(db, "orders"), {
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone,
        productId: product.id,
        productName: product.name,
        amount: product.price,
        status: "paid", // For this demo, we assume success after clicking.
        createdAt: serverTimestamp()
      });

      // 2. Notify Admin via API
      await fetch("/api/notify-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          order: { 
            id: orderRef.id,
            ...formData, 
            productName: product.name, 
            amount: product.price 
          } 
        })
      });

      // 3. Open Razorpay Payment Link
      // Since it's a fixed link, we'll wait a brief moment to show progress then redirect
      setTimeout(() => {
        window.location.href = `https://razorpay.me/@umaraghavendrayeswanthponnada`;
        // In reality, we'd handle the callback, but here the user will be redirected manually
        // for better simulation of the flow requested
        // Let's store a flag to show success when they come back? 
        // Actually, user requested Success Page after clicking Buy Now.
        navigate("/success", { state: { product, orderId: orderRef.id } });
      }, 1500);

    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-40 pb-20 px-6 min-h-screen bg-luxury-black"
    >
      <div className="max-w-5xl mx-auto">
        <button 
          onClick={() => navigate("/")}
          className="flex items-center text-white/40 hover:text-lumina-yellow mb-8 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Store
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Summary */}
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl font-display font-bold">Checkout</h1>
            <div className="glass p-8 rounded-[2.5rem] space-y-6">
              <div className="flex items-center space-x-4">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-24 h-24 rounded-2xl object-cover border border-white/10"
                />
                <div>
                  <h3 className="text-xl font-bold">{product.name}</h3>
                  <p className="text-white/40 text-sm">Digital Download</p>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-white/40">Subtotal</span>
                  <span>₹{product.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">Tax</span>
                  <span>₹0</span>
                </div>
                <div className="flex justify-between text-2xl font-bold border-t border-white/10 pt-4">
                  <span>Total</span>
                  <span className="text-lumina-yellow">₹{product.price}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-xs text-white/40 bg-white/5 p-4 rounded-xl">
                <ShieldCheck className="text-[#25D366]" size={20} />
                <p>Secure payment processed via Razorpay. Accepting UPI, Cards, and Net Banking.</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="glass p-8 md:p-12 rounded-[2.5rem]">
             <div className="flex items-center space-x-3 mb-8">
               <div className="p-3 bg-lumina-yellow/10 rounded-xl text-lumina-yellow">
                 <ShoppingBag size={24} />
               </div>
               <h2 className="text-2xl font-bold">Buyer Details</h2>
             </div>

             <form onSubmit={handlePayment} className="space-y-6">
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

               <button 
                type="submit" 
                disabled={loading}
                className="w-full btn-primary disabled:opacity-50 flex items-center justify-center"
               >
                 {loading ? (
                   <>
                     <Loader2 className="mr-2 animate-spin" size={20} />
                     Processing...
                   </>
                 ) : (
                   `Pay ₹${product.price} Now`
                 )}
               </button>
             </form>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
