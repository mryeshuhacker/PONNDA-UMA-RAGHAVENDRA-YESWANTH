import { motion } from "motion/react";
import { Send, Phone, Youtube, Instagram, MapPin, MessageSquare } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-luxury-black border-t border-white/10 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Logo & Info */}
          <div className="space-y-6">
            <div className="text-2xl font-display font-bold tracking-tighter">
              <span className="text-lumina-yellow">LUMINA</span>
              <span className="text-white ml-2">DIGITAL</span>
            </div>
            <p className="text-white/60 leading-relaxed">
              Turning Vision Into Digital Success. Premium marketing and production agency for the next generation of brands.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/yeshu_efx_7" target="_blank" className="p-2 bg-white/5 rounded-full hover:bg-lumina-yellow hover:text-black transition-all">
                <Instagram size={20} />
              </a>
              <a href="https://youtube.com/@yeswanthvlogs44?si=4FqvQMSVx_2Onyaw" target="_blank" className="p-2 bg-white/5 rounded-full hover:bg-lumina-yellow hover:text-black transition-all">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-display font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-white/60">
              <li><a href="/" className="hover:text-lumina-yellow transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-lumina-yellow transition-colors">Services</a></li>
              <li><a href="/commission" className="hover:text-lumina-yellow transition-colors">Partner Program</a></li>
              <li><a href="#work" className="hover:text-lumina-yellow transition-colors">Portfolios</a></li>
              <li><a href="/hiring" className="hover:text-lumina-yellow transition-colors">Join Us</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-display font-bold mb-6">Services</h4>
            <ul className="space-y-4 text-white/60">
              <li>Video Editing</li>
              <li>Graphic Design</li>
              <li>SMM & Ads</li>
              <li>Production</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4 text-white/60">
            <h4 className="text-lg font-display font-bold mb-6 text-white">Get In Touch</h4>
            <div className="flex items-start space-x-3">
              <MapPin className="text-lumina-yellow shrink-0" size={20} />
              <span>Rajahmundry, Andhra Pradesh, India</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="text-lumina-yellow shrink-0" size={20} />
              <a href="tel:+916300727919" className="hover:text-lumina-yellow transition-colors">+91 6300727919</a>
            </div>
            <div className="flex items-center space-x-3">
              <MessageSquare className="text-lumina-yellow shrink-0" size={20} />
              <a href="https://wa.me/916300727919" target="_blank" rel="noreferrer" className="hover:text-lumina-yellow transition-colors">WhatsApp Us</a>
            </div>
            <div className="flex items-center space-x-3">
              <Send className="text-lumina-yellow shrink-0" size={20} />
              <span>luminidigital77@gmail.com</span>
            </div>
          </div>
        </div>

        {/* Partner Program CTA */}
        <div className="mt-16 p-10 rounded-[2rem] bg-white/5 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="space-y-2">
            <h4 className="text-2xl font-display font-bold text-white">Join Our Partner Program</h4>
            <p className="text-white/40 text-sm">Refer high-ticket clients and earn 20% commission on every successful project.</p>
          </div>
          <a href="/commission" className="btn-primary px-10 py-4 text-xs">
            Join Now
          </a>
        </div>

        <div className="pt-10 border-t border-white/5 text-center text-white/40 text-sm">
          © 2026 Lumina Digital. All Rights Reserved. Founded by Yeswanth.
        </div>
      </div>
    </footer>
  );
}
