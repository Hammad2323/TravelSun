import React, { useState } from "react";
import FlightSearchForm from "../components/FlightSearchForm";
import FlightsResult from "../components/FlightsResult";

const Flights = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleResults = (data) => {
    setFlights(Array.isArray(data) ? data : []); 
  };

  return (
    <div className="p-6">
      <FlightSearchForm onResults={handleResults} />
      <FlightsResult flights={flights} loading={loading} />
    </div>
  );
};

export default Flights;
