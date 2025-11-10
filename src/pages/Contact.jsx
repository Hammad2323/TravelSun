import { motion } from "framer-motion";
import { Mail, MessageCircle } from "lucide-react";

export default function Contact() {
  const email = "choosetravelsun@gmail.com";
  const whatsapp = "+447405492338";
  const whatsappLink = `https://wa.me/${whatsapp.replace(/\D/g, "")}`;

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-20 bg-gradient-to-b from-[#E8F2FF] via-[#F5FAFF] to-[#EAF2FF] font-[Inter]">
    
      <motion.h1
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl sm:text-5xl font-extrabold text-[#0B1A3C] mb-4 drop-shadow-[0_2px_8px_rgba(13,27,76,0.2)]"
      >
        Contact Us
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-gray-700 max-w-xl mx-auto mb-12 text-base sm:text-lg opacity-90"
      >
        Have questions about your flight booking? Reach out to us anytime — we’re happy to help.
      </motion.p>

      
      <div className="flex flex-col sm:flex-row gap-10 sm:gap-16 justify-center items-center">
    
        <motion.a
          href={`mailto:${email}`}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.08, rotate: 2 }}
          whileTap={{ scale: 0.95 }}
          className="p-8 rounded-3xl bg-white/80 backdrop-blur-xl border-2 border-[#0B1A3C] shadow-[0_10px_40px_rgba(13,27,76,0.1)] hover:shadow-[0_10px_50px_rgba(13,27,76,0.25)] transition-all cursor-pointer flex flex-col items-center"
        >
          <Mail size={64} className="text-[#D93025] drop-shadow-[0_3px_6px_rgba(217,48,37,0.25)]" />
          <span className="text-[#0B1A3C] font-semibold text-lg mt-3">Email</span>
        </motion.a>


        <motion.a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.08, rotate: -2 }}
          whileTap={{ scale: 0.95 }}
          className="p-8 rounded-3xl bg-white/80 backdrop-blur-xl border-2 border-[#0B1A3C] shadow-[0_10px_40px_rgba(13,27,76,0.1)] hover:shadow-[0_10px_50px_rgba(13,27,76,0.25)] transition-all cursor-pointer flex flex-col items-center"
        >
          <MessageCircle size={64} className="text-[#25D366] drop-shadow-[0_3px_6px_rgba(37,211,102,0.25)]" />
          <span className="text-[#0B1A3C] font-semibold text-lg mt-3">WhatsApp</span>
        </motion.a>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-gray-600 mt-10 text-sm sm:text-base"
      >
        We’re available 24/7 to assist you with bookings and queries.
      </motion.p>
    </div>
  );
}
