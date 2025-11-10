import React from "react";
import { motion } from "framer-motion";

export default function FlightCard({ flight, onBook }) {
  
  const airline =
    flight.airline ||
    flight.carrier ||
    flight.marketingAirline ||
    "Unknown Airline";

  const departure =
    flight.departure_time ||
    flight.departureTime ||
    flight.departure ||
    flight.from ||
    "";

  const arrival =
    flight.arrival_time ||
    flight.arrivalTime ||
    flight.arrival ||
    flight.to ||
    "";

  const duration = flight.duration || flight.flightTime || "";

  const rawPrice =
    flight.price ||
    (flight.fare && flight.fare.total) ||
    (flight.price && flight.price.total) ||
    null;

  const currency = flight.currency || "GBP";

  const formatPrice = (price) => {
    if (!price || price === "N/A") return "Price not available";
    try {
      return new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 0,
      }).format(price);
    } catch {
      return `${currency} ${price}`;
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="bg-white p-5 rounded-xl shadow-md flex flex-col md:flex-row justify-between gap-4"
    >
      <div>
        <h3 className="text-lg font-semibold text-indigo-700">{airline}</h3>
        <p className="text-sm text-gray-600">
          {flight.origin || flight.departure_airport || ""} →{" "}
          {flight.destination || flight.arrival_airport || ""}
        </p>
        <p className="mt-2 text-gray-700">
          {departure} → {arrival}
        </p>
        <p className="text-sm text-gray-500">{duration}</p>
      </div>

      <div className="flex flex-col items-end justify-between">
        <div>
          <p className="text-xl font-bold text-green-600">
            {formatPrice(rawPrice)}
          </p>
        </div>
        <div className="mt-3 w-full md:w-auto">
          <button
            onClick={() => onBook(flight)}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg w-full hover:bg-orange-600 transition"
          >
            Book Now
          </button>
        </div>
      </div>
    </motion.div>
  );
}
