import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { HandCoins, ArrowRight, Users } from "lucide-react";

export default function PartnerPromo() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lumina-yellow/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass rounded-[3rem] p-12 md:p-20 relative overflow-hidden border border-lumina-yellow/10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <div className="text-lumina-yellow font-bold uppercase tracking-[0.3em] text-sm mb-4 flex items-center">
                  <HandCoins size={18} className="mr-2" />
                  Partnership Opportunity
                </div>
                <h2 className="text-4xl md:text-6xl font-display font-bold leading-tight">
                  Earn <span className="text-lumina-yellow">20% Commission</span> for Every Referral
                </h2>
              </div>
              
              <p className="text-white/60 text-lg leading-relaxed max-w-lg">
                Join our exclusive Partner Program. Refer high-ticket clients for video production or marketing services and get rewarded for every successful project.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/commission" 
                  className="btn-primary px-10 py-5 text-sm flex items-center justify-center group"
                >
                  Join Partner Program
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <div className="flex items-center space-x-3 px-6 py-4 bg-white/5 rounded-full border border-white/5">
                  <Users size={20} className="text-lumina-yellow" />
                  <span className="text-sm font-medium text-white/80">50+ Active Partners</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Step 1", title: "Join Program", desc: "Sign up and get approved" },
                  { label: "Step 2", title: "Refer Clients", desc: "Send us qualified leads" },
                  { label: "Step 3", title: "We Deliver", desc: "We close and execute" },
                  { label: "Step 4", title: "Get Paid", desc: "Receive your commission" },
                ].map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-6 bg-white/5 rounded-3xl border border-white/5"
                  >
                    <div className="text-lumina-yellow text-[10px] font-bold uppercase tracking-widest mb-1">{step.label}</div>
                    <div className="font-bold mb-1">{step.title}</div>
                    <div className="text-[10px] text-white/40 leading-tight">{step.desc}</div>
                  </motion.div>
                ))}
              </div>
              
              {/* Floating Badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 p-6 bg-lumina-yellow rounded-3xl text-black shadow-2xl rotate-12 hidden md:block"
              >
                <div className="text-xs font-bold uppercase tracking-wider">Top Tier</div>
                <div className="text-2xl font-black">Payouts</div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
