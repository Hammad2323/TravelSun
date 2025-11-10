import { Mail, MessageCircle } from "lucide-react";

export default function Footer() {
  const email = "choosetravelsun@gmail.com";
  const whatsapp = "+447405492338";
  const whatsappLink = `https://wa.me/${whatsapp.replace(/\D/g, "")}`;

  return (
    <footer className="w-full bg-gradient-to-r from-[#001A4D] to-[#000B2F] text-white py-8 shadow-[0_-4px_20px_rgba(0,0,0,0.25)] mt-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-14 flex flex-col items-center space-y-6">
        
      
        <div className="flex items-center gap-10">
    
          <a
            href={`mailto:${email}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center group"
          >
            <Mail
              size={38}
              className="text-[#EA4335] group-hover:scale-110 transition-transform duration-300"
            />
            <span className="text-sm text-gray-300 mt-1 group-hover:text-sky-400">
              Email
            </span>
          </a>

          
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center group"
          >
            <MessageCircle
              size={38}
              className="text-[#25D366] group-hover:scale-110 transition-transform duration-300"
            />
            <span className="text-sm text-gray-300 mt-1 group-hover:text-sky-400">
              WhatsApp
            </span>
          </a>
        </div>

      
        <div className="text-xs sm:text-sm text-gray-400 text-center tracking-wide">
          Developer | <span className="text-sky-400 font-medium">Hammad Azeem</span>
        </div>

    
        <div className="text-xs sm:text-sm text-gray-500 text-center">
          © {new Date().getFullYear()} TravelSun. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
