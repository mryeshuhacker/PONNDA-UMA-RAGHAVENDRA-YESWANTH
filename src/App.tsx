import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";
import Home from "./pages/Home.tsx";
import Hiring from "./pages/Hiring.tsx";
import Commission from "./pages/Commission.tsx";
import Payment from "./pages/Payment.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Success from "./pages/Success.tsx";
import { AnimatePresence } from "motion/react";

function AppContent() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/hiring" element={<Hiring />} />
            <Route path="/commission" element={<Commission />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/success" element={<Success />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      
      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/916300727919" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white px-6 py-4 rounded-full shadow-2xl hover:scale-105 transition-all active:scale-95 flex items-center space-x-3 group"
      >
        <span className="font-bold text-sm">Send Message</span>
        <svg className="w-6 h-6 fill-white group-hover:rotate-12 transition-transform" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.996-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.29-4.171c1.733.918 3.512 1.405 5.548 1.405 5.485 0 9.948-4.463 9.948-9.948 0-2.659-1.036-5.158-2.915-7.037-1.879-1.878-4.378-2.915-7.037-2.915-5.485 0-9.943 4.464-9.943 9.948 0 2.043.5 3.829 1.428 5.565L2.128 21.98l4.219-1.151z"/>
          <path d="M17.472 14.382c-.301-.15-1.781-.879-2.056-.979-.275-.1-.475-.15-.675.15-.2.3-.775 1.05-.95 1.25-.175.2-.35.225-.651.075-.301-.15-1.27-.468-2.42-1.494-.894-.797-1.498-1.782-1.673-2.081-.175-.3-.018-.462.13-.61.137-.133.301-.35.451-.525.15-.175.2-.3.301-.5.101-.2.05-.375-.025-.525-.075-.15-.675-1.625-.925-2.225-.244-.589-.493-.51-.675-.519-.175-.009-.375-.01-.575-.01-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5 0 1.475 1.075 2.895 1.225 3.1.15.2 2.112 3.224 5.115 4.526.714.31 1.271.496 1.706.635.717.228 1.369.196 1.884.119.574-.085 1.781-.728 2.031-1.43.25-.701.25-1.301.175-1.43-.075-.129-.275-.204-.576-.354z"/>
        </svg>
      </a>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
