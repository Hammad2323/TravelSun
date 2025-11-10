import React, { useState } from "react";

export default function Booking() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [from, setFrom] = useState("LHR");
  const [to, setTo] = useState("ISB");
  const [date, setDate] = useState("2025-11-12");

  const fetchFlights = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/.netlify/functions/getFlights?from=${from}&to=${to}&date=${date}`
      );
      const data = await res.json();
      setFlights(data);
    } catch (err) {
      console.error("Error fetching flights:", err);
    } finally {
      setLoading(false);
    }
  };

  const getAirlineLogo = (iataCode) => {
    if (!iataCode) return null;
    return `https://content.airhex.com/content/logos/airlines_${iataCode.toLowerCase()}_100_100_s.png`;
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 p-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">
        ✈️ Search Flights
      </h1>

      <div className="flex flex-wrap gap-3 justify-center mb-8">
        <input
          className="border px-3 py-2 rounded-lg"
          placeholder="From (IATA code)"
          value={from}
          onChange={(e) => setFrom(e.target.value.toUpperCase())}
        />
        <input
          className="border px-3 py-2 rounded-lg"
          placeholder="To (IATA code)"
          value={to}
          onChange={(e) => setTo(e.target.value.toUpperCase())}
        />
        <input
          type="date"
          className="border px-3 py-2 rounded-lg"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button
          onClick={fetchFlights}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          {loading ? "Searching..." : "Search Flights"}
        </button>
      </div>

      {flights.length === 0 && !loading && (
        <p className="text-center text-gray-500">
          No flights found yet — try searching!
        </p>
      )}

      <div className="grid grid-cols-1 gap-5">
        {flights.map((f, i) => (
          <div
            key={i}
            className="border rounded-2xl shadow p-5 flex flex-col sm:flex-row sm:items-center justify-between"
          >
            <div className="flex items-center gap-4">
              {f.airlineCode && (
                <img
                  src={getAirlineLogo(f.airlineCode)}
                  alt={f.airline}
                  className="w-12 h-12 object-contain"
                  onError={(e) => (e.target.style.display = "none")}
                />
              )}
              <div>
                <h2 className="text-lg font-semibold">{f.airline}</h2>
                <p className="text-gray-600">{f.route}</p>
                <p className="text-gray-500">Duration: {f.duration}</p>
              </div>
            </div>
            <div className="text-right mt-3 sm:mt-0">
              <p className="text-2xl font-bold text-green-600">{f.price}</p>
              <button className="bg-blue-600 text-white px-4 py-2 mt-2 rounded-lg hover:bg-blue-700">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
