import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/src/lib/utils";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/#services" },
  { name: "Work", href: "/#work" },
  { name: "Store", href: "/#store" },
  { name: "Partners", href: "/commission" },
  { name: "Hiring", href: "/hiring" },
  { name: "Payment", href: "/payment" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Contact", href: "/#contact" }
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-10 h-[70px] flex items-center bg-luxury-black/80 backdrop-blur-xl border-b border-white/10"
      )}
    >
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <Link to="/" className="text-xl font-display font-bold tracking-[0.1em] flex items-center uppercase">
          <span className="text-lumina-yellow">LUMINA</span>
          <span className="text-white ml-2">DIGITAL</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={cn(
                "text-[10px] font-bold tracking-[0.15em] uppercase transition-all hover:text-lumina-yellow",
                location.pathname + location.hash === link.href ? "text-lumina-yellow" : "text-white/40"
              )}
            >
              {link.name}
            </a>
          ))}
          <a href="tel:6300727919" className="btn-primary py-2 px-6 text-[10px]">
            Call Now
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-luxury-black border-b border-white/10 p-6 md:hidden flex flex-col space-y-4"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-lg font-medium text-white/80 hover:text-lumina-yellow"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 border-t border-white/10">
              <a 
                href="tel:6300727919" 
                className="btn-primary w-full text-center py-4 rounded-2xl flex items-center justify-center"
              >
                <Phone size={18} className="mr-2" />
                Call +91 6300727919
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
