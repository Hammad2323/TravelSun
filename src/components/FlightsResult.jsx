import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Plane, Clock, ArrowRight, Wallet, Search, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

const airlineNames = {   
  EK: "Emirates",
  QR: "Qatar Airways",
  EY: "Etihad Airways",
  TK: "Turkish Airlines",
  PK: "Pakistan International Airlines",
  BA: "British Airways",
  LH: "Lufthansa",
  AF: "Air France",
  KL: "KLM Royal Dutch Airlines",
  SQ: "Singapore Airlines",
  CX: "Cathay Pacific",
  SV: "Saudia",
  GF: "Gulf Air",
  WY: "Oman Air",
  KU: "Kuwait Airways",
  AI: "Air India",
  UL: "SriLankan Airlines",
  J9: "Jazeera Airways",
  A3: "Aegean Airlines",
  AZ: "ITA Airways",
  ET: "Ethiopian Airlines",
  MS: "EgyptAir",
  RJ: "Royal Jordanian",
  AC: "Air Canada",
  AA: "American Airlines",
  UA: "United Airlines",
  DL: "Delta Air Lines",
  IB: "Iberia",
  VY: "Vueling",
  W6: "Wizz Air",
  FR: "Ryanair",
  U2: "easyJet",
  LX: "SWISS",
  OS: "Austrian Airlines",
  SN: "Brussels Airlines",
  LO: "LOT Polish Airlines",
  AY: "Finnair",
  SK: "SAS Scandinavian Airlines",
  MH: "Malaysia Airlines",
  TG: "Thai Airways",
  JL: "Japan Airlines",
  NH: "ANA",
  KE: "Korean Air",
  OZ: "Asiana Airlines",
  QF: "Qantas",
  NZ: "Air New Zealand",
  VS: "Virgin Atlantic",
  B6: "JetBlue",
  WN: "Southwest",
  NK: "Spirit",
  FZ: "FlyDubai",
  IX: "Air India Express",
  G8: "Go First",
  UK: "Vistara",
  SG: "SpiceJet",
  G9: "Air Arabia",
  XY: "Flynas",
  PR: "Philippine Airlines",
  BI: "Royal Brunei",
  VN: "Vietnam Airlines",
  VJ: "VietJet",
  SU: "Aeroflot",
  TP: "TAP Portugal",
  AT: "Royal Air Maroc",
  CM: "Copa Airlines",
  AM: "AeroMexico",
  AV: "Avianca",
  LA: "LATAM Airlines",
  UX: "Air Europa",
  BT: "AirBaltic",
  RO: "TAROM",
  HY: "Uzbekistan Airways",
  ME: "Middle East Airlines",
  PC: "Pegasus Airlines",
  XQ: "SunExpress",
  D8: "Norwegian Air",
  EW: "Eurowings",
  DE: "Condor",
  SA: "South African Airways",
  FA: "FlySafair",
  WS: "WestJet",
  AS: "Alaska Airlines",
  F9: "Frontier Airlines",
  SY: "Sun Country",
  HA: "Hawaiian Airlines", 
};

const airports = { 
  ISB: { name: "Islamabad International Airport", flag: "🇵🇰" },
  LHE: { name: "Lahore Allama Iqbal Intl Airport", flag: "🇵🇰" },
  KHI: { name: "Karachi Jinnah Intl Airport", flag: "🇵🇰" },
  PEW: { name: "Peshawar Bacha Khan Intl Airport", flag: "🇵🇰" },
  UET: { name: "Quetta Intl Airport", flag: "🇵🇰" },
  SKT: { name: "Sialkot Intl Airport", flag: "🇵🇰" },
  MUX: { name: "Multan Intl Airport", flag: "🇵🇰" },
  DEL: { name: "Delhi Indira Gandhi Intl Airport", flag: "🇮🇳" },
  BOM: { name: "Mumbai Chhatrapati Shivaji Airport", flag: "🇮🇳" },
  BLR: { name: "Bengaluru Kempegowda Intl Airport", flag: "🇮🇳" },
  HYD: { name: "Hyderabad Rajiv Gandhi Intl Airport", flag: "🇮🇳" },
  MAA: { name: "Chennai Intl Airport", flag: "🇮🇳" },
  CCU: { name: "Kolkata Netaji Subhas Chandra Bose Airport", flag: "🇮🇳" },
  GOI: { name: "Goa Dabolim Airport", flag: "🇮🇳" },
  COK: { name: "Cochin Intl Airport", flag: "🇮🇳" },
  DAC: { name: "Dhaka Hazrat Shahjalal Intl Airport", flag: "🇧🇩" },
  CGP: { name: "Chittagong Shah Amanat Intl Airport", flag: "🇧🇩" },
  ZYL: { name: "Sylhet Osmani Intl Airport", flag: "🇧🇩" },
  CMB: { name: "Colombo Bandaranaike Intl Airport", flag: "🇱🇰" },
  DXB: { name: "Dubai Intl Airport", flag: "🇦🇪" },
  AUH: { name: "Abu Dhabi Intl Airport", flag: "🇦🇪" },
  SHJ: { name: "Sharjah Intl Airport", flag: "🇦🇪" },
  LHR: { name: "London Heathrow Airport", flag: "🇬🇧" },
  LGW: { name: "London Gatwick Airport", flag: "🇬🇧" },
  MAN: { name: "Manchester Airport", flag: "🇬🇧" },
  BHX: { name: "Birmingham Airport", flag: "🇬🇧" },
  EDI: { name: "Edinburgh Airport", flag: "🇬🇧" },
  GLA: { name: "Glasgow Airport", flag: "🇬🇧" },
  FRA: { name: "Frankfurt Airport", flag: "🇩🇪" },
  MUC: { name: "Munich Airport", flag: "🇩🇪" },
  DUS: { name: "Düsseldorf Airport", flag: "🇩🇪" },
  HAM: { name: "Hamburg Airport", flag: "🇩🇪" },
  CDG: { name: "Paris Charles de Gaulle Airport", flag: "🇫🇷" },
  ORY: { name: "Paris Orly Airport", flag: "🇫🇷" },
  NCE: { name: "Nice Côte d’Azur Airport", flag: "🇫🇷" },
  JFK: { name: "New York JFK Intl Airport", flag: "🇺🇸" },
  LGA: { name: "New York LaGuardia Airport", flag: "🇺🇸" },
  EWR: { name: "Newark Liberty Intl Airport", flag: "🇺🇸" },
  IAD: { name: "Washington Dulles Intl Airport", flag: "🇺🇸" },
  ORD: { name: "Chicago O’Hare Intl Airport", flag: "🇺🇸" },
  DFW: { name: "Dallas Fort Worth Intl Airport", flag: "🇺🇸" },
  MIA: { name: "Miami Intl Airport", flag: "🇺🇸" },
  ATL: { name: "Atlanta Intl Airport", flag: "🇺🇸" },
  LAX: { name: "Los Angeles Intl Airport", flag: "🇺🇸" },
  SFO: { name: "San Francisco Intl Airport", flag: "🇺🇸" },
  SEA: { name: "Seattle-Tacoma Intl Airport", flag: "🇺🇸" },
  PEK: { name: "Beijing Capital Intl Airport", flag: "🇨🇳" },
  PVG: { name: "Shanghai Pudong Intl Airport", flag: "🇨🇳" },
  CAN: { name: "Guangzhou Baiyun Intl Airport", flag: "🇨🇳" },
  CTU: { name: "Chengdu Shuangliu Intl Airport", flag: "🇨🇳" },
  HKG: { name: "Hong Kong Intl Airport", flag: "🇭🇰" }
};

const getAirport = (code) => airports[code] || { name: code, flag: "🏳️" };

export default function FlightsResult({ flights, loading, searchMade }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const displayedFlights = useMemo(() => {
    if (!flights) return [];
    return flights.filter((f) =>
      [f.airline, f.from, f.to].some((v) =>
        v?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [flights, searchQuery]);

  if (!searchMade) return null;
  if (loading)
    return (
      <div className="text-center mt-20 text-[#0a2540]/80 animate-pulse text-lg">
        ✈️ Loading flights...
      </div>
    );

  if (!displayedFlights.length)
    return (
      <div className="text-center mt-20 text-[#0a2540]/70">
        <Plane className="inline w-6 h-6 text-[#0a2540]/60 mr-2" />
        No flights found. Try another route or date.
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4 space-y-8">
      <div className="flex justify-center">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-4 top-3 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search airline, airport, or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-gray-300 bg-white/70 backdrop-blur-lg rounded-full pl-11 pr-4 py-3 text-sm shadow-md focus:ring-2 focus:ring-[#0a2540] focus:outline-none transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {displayedFlights.map((f, i) => {
          const from = getAirport(f.from);
          const to = getAirport(f.to);

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="
                relative bg-white/70 backdrop-blur-2xl 
                border border-gray-200 shadow-[0_8px_32px_rgba(10,37,64,0.15)]
                hover:shadow-[0_8px_40px_rgba(10,37,64,0.25)]
                rounded-3xl transition-all duration-500 p-6 sm:p-8 
                flex flex-col sm:flex-row justify-between items-center gap-6 overflow-hidden
              "
            >
              <div className="text-center sm:text-left sm:w-1/3">
                <h3 className="text-lg sm:text-xl font-semibold text-[#0a2540] tracking-tight">
                  {f.airline.split("+").map((a, idx) => (
                    <span key={idx}>
                      {a.trim()}
                      {idx < f.airline.split("+").length - 1 && " + "}
                    </span>
                  ))}
                </h3>
                <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                  {from.flag} {from.name} ({f.from}) → {to.flag} {to.name} ({f.to})
                </p>
              </div>

              <div className="flex flex-col items-center text-gray-700 text-sm sm:w-1/3">
                <div className="flex items-center gap-2 font-medium text-[#0a2540]">
                  <Clock className="w-4 h-4 text-[#1f3b73]" />
                  {f.departureTime}
                  <ArrowRight className="w-4 h-4 mx-1 text-[#1f3b73]" />
                  {f.arrivalTime}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Duration: {f.duration || "N/A"} • {f.stops || "Direct"}
                </p>

                {f.returnDepartureTime && (
                  <div className="mt-4 text-center sm:text-left border-t border-gray-200 pt-3">
                    <div className="flex items-center justify-center gap-2 text-[#0a2540] font-medium">
                      <RefreshCw className="w-4 h-4 text-[#1f3b73]" />
                      {f.to} → {f.from}
                    </div>

                    {f.returnAirline && (
                      <p className="text-xs text-gray-500 mt-1 font-semibold">
                        Airlines: {f.returnAirline.split("+").map((a, idx) => (
                          <span key={idx}>
                            {a.trim()}
                            {idx < f.returnAirline.split("+").length - 1 && " + "}
                          </span>
                        ))}
                      </p>
                    )}

                    <div className="flex items-center gap-2 text-sm text-gray-700 mt-1">
                      <Clock className="w-4 h-4 text-[#1f3b73]" />
                      {f.returnDepartureTime}
                      <ArrowRight className="w-4 h-4 mx-1 text-[#1f3b73]" />
                      {f.returnArrivalTime}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Return Duration: {f.returnDuration || "N/A"} • {f.returnStops || "Direct"}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-col items-center sm:items-end sm:w-1/3">
                <div className="text-[#0a2540] font-bold text-xl mb-2 flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-[#1f3b73]" />
                  <span>{f.price}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate("/book", { state: f })}
                  className="
                    bg-[#0a2540] hover:bg-[#1f3b73] text-white 
                    px-8 py-2.5 rounded-full text-sm font-medium 
                    shadow-md transition-all duration-300
                  "
                >
                  Book Now
                </motion.button>
              </div>

              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#0a2540]/5 via-transparent to-[#1f3b73]/5 pointer-events-none"></div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
