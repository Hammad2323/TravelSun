import { useState } from "react";
import { Loader2 } from "lucide-react";
import FlightsResult from "./FlightsResult";

const airports = [{ code: "LHR", name: "London Heathrow, United Kingdom" },
  { code: "LGW", name: "London Gatwick, United Kingdom" },
  { code: "MAN", name: "Manchester, United Kingdom" },
  { code: "STN", name: "London Stansted, United Kingdom" },
  { code: "LTN", name: "London Luton, United Kingdom" },
  { code: "EDI", name: "Edinburgh, United Kingdom" },
  { code: "GLA", name: "Glasgow, United Kingdom" },
  { code: "DUB", name: "Dublin, Ireland" },
  { code: "CDG", name: "Paris Charles de Gaulle, France" },
  { code: "ORY", name: "Paris Orly, France" },
  { code: "AMS", name: "Amsterdam Schiphol, Netherlands" },
  { code: "FRA", name: "Frankfurt, Germany" },
  { code: "MUC", name: "Munich, Germany" },
  { code: "ZRH", name: "Zurich, Switzerland" },
  { code: "VIE", name: "Vienna, Austria" },
  { code: "BRU", name: "Brussels, Belgium" },
  { code: "CPH", name: "Copenhagen, Denmark" },
  { code: "ARN", name: "Stockholm Arlanda, Sweden" },
  { code: "HEL", name: "Helsinki, Finland" },
  { code: "OSL", name: "Oslo, Norway" },
  { code: "MAD", name: "Madrid Barajas, Spain" },
  { code: "BCN", name: "Barcelona El Prat, Spain" },
  { code: "LIS", name: "Lisbon, Portugal" },
  { code: "OPO", name: "Porto, Portugal" },
  { code: "ATH", name: "Athens International, Greece" },
  { code: "IST", name: "Istanbul, Turkey" },
  { code: "SAW", name: "Istanbul Sabiha Gökçen, Turkey" },
  { code: "BEY", name: "Beirut Rafic Hariri, Lebanon" },
  { code: "AMM", name: "Amman Queen Alia, Jordan" },
  { code: "CAI", name: "Cairo International, Egypt" },
  { code: "JED", name: "Jeddah King Abdulaziz, Saudi Arabia" },
  { code: "RUH", name: "Riyadh King Khalid, Saudi Arabia" },
  { code: "MED", name: "Madinah Prince Mohammad bin Abdulaziz, Saudi Arabia" },
  { code: "DXB", name: "Dubai International, UAE" },
  { code: "SHJ", name: "Sharjah International, UAE" },
  { code: "AUH", name: "Abu Dhabi International, UAE" },
  { code: "MCT", name: "Muscat International, Oman" },
  { code: "DOH", name: "Doha Hamad International, Qatar" },
  { code: "BAH", name: "Bahrain International, Bahrain" },
  { code: "KWI", name: "Kuwait International, Kuwait" },
  { code: "ISB", name: "Islamabad International, Pakistan" },
  { code: "LHE", name: "Lahore Allama Iqbal, Pakistan" },
  { code: "KHI", name: "Karachi Jinnah International, Pakistan" },
  { code: "MUX", name: "Multan International, Pakistan" },
  { code: "PEW", name: "Peshawar Bacha Khan, Pakistan" },
  { code: "SKT", name: "Sialkot International, Pakistan" },
  { code: "UET", name: "Quetta International, Pakistan" },
  { code: "DEL", name: "Delhi Indira Gandhi, India" },
  { code: "BOM", name: "Mumbai Chhatrapati Shivaji, India" },
  { code: "MAA", name: "Chennai International, India" },
  { code: "BLR", name: "Bangalore Kempegowda, India" },
  { code: "HYD", name: "Hyderabad Rajiv Gandhi, India" },
  { code: "CCU", name: "Kolkata Netaji Subhas Chandra Bose, India" },
  { code: "COK", name: "Cochin International, India" },
  { code: "GOI", name: "Goa Dabolim, India" },
  { code: "TRV", name: "Trivandrum International, India" },
  { code: "PNQ", name: "Pune International, India" },
  { code: "AMD", name: "Ahmedabad Sardar Vallabhbhai Patel, India" },
  { code: "NAG", name: "Nagpur Dr. Babasaheb Ambedkar, India" },
  { code: "PAT", name: "Patna Jay Prakash Narayan, India" },
  { code: "GAU", name: "Guwahati Lokpriya Gopinath Bordoloi, India" },
  { code: "IXC", name: "Chandigarh International, India" },
  { code: "DAC", name: "Dhaka Hazrat Shahjalal, Bangladesh" },
  { code: "CGP", name: "Chittagong Shah Amanat, Bangladesh" },
  { code: "KTM", name: "Kathmandu Tribhuvan, Nepal" },
  { code: "BKK", name: "Bangkok Suvarnabhumi, Thailand" },
  { code: "HKT", name: "Phuket International, Thailand" },
  { code: "SIN", name: "Singapore Changi, Singapore" },
  { code: "KUL", name: "Kuala Lumpur International, Malaysia" },
  { code: "PEN", name: "Penang International, Malaysia" },
  { code: "HKG", name: "Hong Kong International, Hong Kong" },
  { code: "CAN", name: "Guangzhou Baiyun, China" },
  { code: "PEK", name: "Beijing Capital, China" },
  { code: "PVG", name: "Shanghai Pudong, China" },
  { code: "ICN", name: "Seoul Incheon, South Korea" },
  { code: "GMP", name: "Seoul Gimpo, South Korea" },
  { code: "NRT", name: "Tokyo Narita, Japan" },
  { code: "HND", name: "Tokyo Haneda, Japan" },
  { code: "KIX", name: "Osaka Kansai, Japan" },
  { code: "MNL", name: "Manila Ninoy Aquino, Philippines" },
  { code: "CEB", name: "Cebu Mactan, Philippines" },
  { code: "SGN", name: "Ho Chi Minh Tan Son Nhat, Vietnam" },
  { code: "HAN", name: "Hanoi Noi Bai, Vietnam" },
  { code: "CGK", name: "Jakarta Soekarno-Hatta, Indonesia" },
  { code: "DPS", name: "Bali Denpasar, Indonesia" },
  { code: "PER", name: "Perth International, Australia" },
  { code: "SYD", name: "Sydney Kingsford Smith, Australia" },
  { code: "MEL", name: "Melbourne Tullamarine, Australia" },
  { code: "AKL", name: "Auckland International, New Zealand" },
  { code: "JFK", name: "New York JFK, USA" },
  { code: "EWR", name: "Newark Liberty, USA" },
  { code: "LAX", name: "Los Angeles International, USA" },
  { code: "SFO", name: "San Francisco International, USA" },
  { code: "ORD", name: "Chicago O’Hare, USA" },
  { code: "ATL", name: "Atlanta Hartsfield-Jackson, USA" },
  { code: "DFW", name: "Dallas/Fort Worth, USA" },
  { code: "YYZ", name: "Toronto Pearson, Canada" },
  { code: "YVR", name: "Vancouver International, Canada" },
  { code: "MEX", name: "Mexico City International, Mexico" },
  { code: "GRU", name: "São Paulo Guarulhos, Brazil" },
  { code: "EZE", name: "Buenos Aires Ezeiza, Argentina" },
  { code: "JNB", name: "Johannesburg OR Tambo, South Africa" },
  { code: "NBO", name: "Nairobi Jomo Kenyatta, Kenya" },
  { code: "LOS", name: "Lagos Murtala Muhammed, Nigeria" },
  { code: "ADD", name: "Addis Ababa Bole, Ethiopia" },
  { code: "CMN", name: "Casablanca Mohammed V, Morocco" },];

export default function FlightSearchForm() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [flights, setFlights] = useState([]);
  const [searchMade, setSearchMade] = useState(false);
  const [showFromList, setShowFromList] = useState(false);
  const [showToList, setShowToList] = useState(false);

  const filteredFrom = airports.filter(
    (a) =>
      a.code.toLowerCase().includes(from.toLowerCase()) ||
      a.name.toLowerCase().includes(from.toLowerCase())
  );
  const filteredTo = airports.filter(
    (a) =>
      a.code.toLowerCase().includes(to.toLowerCase()) ||
      a.name.toLowerCase().includes(to.toLowerCase())
  );

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    if (!from || !to || !date) {
      setError("Please fill all fields.");
      return;
    }
    setSearchMade(true);
    try {
      setLoading(true);
      const response = await fetch(
        `/.netlify/functions/getFlights?from=${from}&to=${to}&date=${date}`
      );
      if (!response.ok) throw new Error("Failed to fetch flights");
      const data = await response.json();
      const flightsArray =
        data?.flights ||
        data?.data?.flights ||
        data?.data?.itineraries ||
        data?.results ||
        [];
      setFlights(flightsArray);
    } catch (err) {
      console.error("Error fetching flights:", err);
      setError("No flights found or failed to fetch.");
      setFlights([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white/70 backdrop-blur-lg border border-gray-200 shadow-2xl rounded-2xl p-8 transition-all duration-300 hover:shadow-3xl">
      <h2 className="text-3xl font-bold text-[#0a2540] text-center mb-6 tracking-wide">
        Search for Flights
      </h2>

      <form
        onSubmit={handleSearch}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
  
        <div className="relative">
          <label className="text-sm text-gray-600 mb-1 block">From</label>
          <input
            type="text"
            value={from}
            onChange={(e) => {
              setFrom(e.target.value);
              setShowFromList(true);
            }}
            onBlur={() => setTimeout(() => setShowFromList(false), 150)}
            placeholder="e.g. LHR or London"
            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-[#0a2540] outline-none bg-white/80"
          />
          {showFromList && from && (
            <ul className="absolute z-10 bg-white/95 border border-gray-200 rounded-lg shadow-lg mt-1 max-h-56 overflow-y-auto w-full">
              {filteredFrom.length > 0 ? (
                filteredFrom.map((a) => (
                  <li
                    key={a.code}
                    onMouseDown={() => setFrom(a.code)}
                    className="px-4 py-2 hover:bg-[#e8f0ff] cursor-pointer text-gray-700"
                  >
                    <span className="font-semibold text-[#0a2540]">
                      {a.code}
                    </span>{" "}
                    – {a.name}
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-gray-500 text-sm">
                  No airports found
                </li>
              )}
            </ul>
          )}
        </div>

      
        <div className="relative">
          <label className="text-sm text-gray-600 mb-1 block">To</label>
          <input
            type="text"
            value={to}
            onChange={(e) => {
              setTo(e.target.value);
              setShowToList(true);
            }}
            onBlur={() => setTimeout(() => setShowToList(false), 150)}
            placeholder="e.g. ISB or Islamabad"
            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-[#0a2540] outline-none bg-white/80"
          />
          {showToList && to && (
            <ul className="absolute z-10 bg-white/95 border border-gray-200 rounded-lg shadow-lg mt-1 max-h-56 overflow-y-auto w-full">
              {filteredTo.length > 0 ? (
                filteredTo.map((a) => (
                  <li
                    key={a.code}
                    onMouseDown={() => setTo(a.code)}
                    className="px-4 py-2 hover:bg-[#e8f0ff] cursor-pointer text-gray-700"
                  >
                    <span className="font-semibold text-[#0a2540]">
                      {a.code}
                    </span>{" "}
                    – {a.name}
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-gray-500 text-sm">
                  No airports found
                </li>
              )}
            </ul>
          )}
        </div>

    
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Departure Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#0a2540] outline-none bg-white/80"
          />
        </div>

    
        <button
          type="submit"
          disabled={loading}
          className="bg-[#0a2540] hover:bg-[#1f3b73] disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold px-6 py-2 rounded-lg shadow-md flex items-center justify-center transition-all duration-300"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin w-5 h-5 mr-2" />
              Searching...
            </>
          ) : (
            "Search Flights"
          )}
        </button>
      </form>

      {error && (
        <p className="text-red-600 text-center font-medium mt-4">{error}</p>
      )}

      {searchMade && (
        <FlightsResult
          flights={flights}
          loading={loading}
          searchMade={searchMade}
        />
      )}
    </div>
  );
}
