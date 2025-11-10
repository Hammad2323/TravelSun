import { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import FlightSearchForm from "../components/FlightSearchForm";
import FlightsResult from "../components/FlightsResult";
import { Plane } from "lucide-react";

export default function Home() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden font-[Inter]">
    
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 1.03 }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="
          absolute inset-0 bg-no-repeat bg-[url('/pic.jpg')]
          sm:bg-cover bg-[length:auto_125%]
        "
        style={{
          backgroundAttachment: "fixed",
          backgroundPosition: "center 80%", 
          backgroundPositionY: "85%", 
          filter:
            "brightness(1.07) contrast(1.1) saturate(1.15) blur(2px)",
        }}
      ></motion.div>

      
      <motion.div
        className="absolute inset-0 bg-[url('/clouds1.png')] bg-repeat-x bg-top opacity-50 sm:opacity-40 blur-[3px] sm:blur-[1.5px]"
        initial={{ backgroundPositionX: 0 }}
        animate={{ backgroundPositionX: "1000px" }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      ></motion.div>

      <motion.div
        className="absolute inset-0 bg-[url('/clouds2.png')] bg-repeat-x bg-top opacity-40 sm:opacity-30 blur-[2.5px] sm:blur-[1px]"
        initial={{ backgroundPositionX: 0 }}
        animate={{ backgroundPositionX: "-1000px" }}
        transition={{ duration: 85, repeat: Infinity, ease: "linear" }}
      ></motion.div>

  
      <div className="absolute inset-0 bg-gradient-to-b from-[#ffffffee] via-[#ffffffcc] to-[#f8fafcaa] backdrop-blur-[3px] sm:backdrop-blur-[1.5px] mix-blend-soft-light"></div>

    
      <div className="relative z-10 flex flex-col flex-grow">
        
        <section className="text-center pt-28 sm:pt-36 pb-16 sm:pb-20 px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-3xl mx-auto"
          >
            <div className="flex justify-center mb-6">
              <div className="p-3 rounded-full bg-white/70 backdrop-blur-md shadow-md border border-[#d0e2ff]/60">
                <Plane className="w-12 h-12 text-[#0D3B8A]" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-6xl font-[Poppins] font-extrabold text-[#0B1A3C] mb-4 sm:mb-5 leading-tight drop-shadow-[0_2px_10px_rgba(255,255,255,0.6)]">
              Discover Your Next Adventure
            </h1>
            <p className="text-base sm:text-xl text-[#1f2937] max-w-2xl mx-auto leading-relaxed opacity-95 drop-shadow-[0_1px_8px_rgba(255,255,255,0.5)]">
              Search, compare, and book flights with elegance — the sky’s no limit.
            </p>
          </motion.div>
        </section>

      
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-20 max-w-5xl w-full mx-auto -mt-8 sm:-mt-12 px-4"
        >
          <div
            className="
              bg-white/85 backdrop-blur-2xl
              border border-[#a0c4ff]/50
              hover:border-[#2563EB]/70
              transition-all duration-500 ease-in-out
              shadow-[0_8px_40px_rgba(30,58,138,0.18)]
              hover:shadow-[0_8px_48px_rgba(30,58,138,0.28)]
              rounded-3xl p-6 sm:p-10
            "
          >
            <h2 className="text-xl sm:text-2xl font-[Poppins] text-[#1E3A8A] font-semibold mb-6 text-center drop-shadow-sm">
              Find the Best Flights
            </h2>
            <FlightSearchForm onResults={setFlights} setLoading={setLoading} />
          </div>
        </motion.section>

      
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-[#1E3A8A] font-semibold mt-12 animate-pulse"
          >
            Searching for your perfect flights...
          </motion.div>
        )}

      
        <div className="flex-grow px-4 sm:px-8 pb-20">
          <FlightsResult flights={flights} />
        </div>
      </div>
    </div>
  );
}
