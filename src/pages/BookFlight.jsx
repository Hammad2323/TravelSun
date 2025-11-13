import { useLocation } from "react-router-dom";
import { useState } from "react";
import emailjs from "emailjs-com";
import html2canvas from "html2canvas";
import { motion } from "framer-motion";
import { CheckCircle, PlaneTakeoff, PlaneLanding, Clock4, Wallet, RefreshCw } from "lucide-react";

export default function BookFlight() {
  const location = useLocation();
  const flight = location.state || {};
  const [formData, setFormData] = useState({
    fullName: "",
    contact: "",
    city: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = `
✈️ *New Flight Booking Request*

👤 Name: ${formData.fullName}
📞 Contact: ${formData.contact}
🏙️ City: ${formData.city}

--- Flight Details ---
🛫 Airline: ${flight.airline || "Unknown"}
🌍 Route: ${flight.from} → ${flight.to}
⏰ Departure: ${flight.departureTime || "--"}
🕓 Arrival: ${flight.arrivalTime || "--"}
⏱ Duration: ${flight.duration || "N/A"}
💷 Price: £${flight.price || "N/A"}
${flight.returnDepartureTime ? `
--- Return Flight Details ---
🛫 Airline: ${flight.returnAirline || flight.airline || "Unknown"}
🌍 Route: ${flight.to} → ${flight.from}
⏰ Departure: ${flight.returnDepartureTime || "--"}
🕓 Arrival: ${flight.returnArrivalTime || "--"}
⏱ Duration: ${flight.returnDuration || "N/A"}
` : ""}
`;

    try {
      const emailData = {
        from_name: formData.fullName,
        contact_number: formData.contact,
        city_name: formData.city,
        airline: flight.airline,
        route: `${flight.from} → ${flight.to}`,
        departure: flight.departureTime,
        arrival: flight.arrivalTime,
        duration: flight.duration,
        price: `£${flight.price}`,
      };

      if (flight.returnDepartureTime) {
        emailData.return_airline = flight.returnAirline || flight.airline;
        emailData.return_route = `${flight.to} → ${flight.from}`;
        emailData.return_departure = flight.returnDepartureTime;
        emailData.return_arrival = flight.returnArrivalTime;
        emailData.return_duration = flight.returnDuration;
      }

      await emailjs.send(
        "service_sypybsn",
        "template_2ct7z4k",
        emailData,
        "_D--vHi3PuyyjzodL"
      );

      window.open(
        `https://wa.me/447405492338?text=${encodeURIComponent(message)}`,
        "_blank"
      );

      setSubmitted(true);
    } catch (error) {
      console.error("EmailJS Error:", error);
      alert("Failed to send. Please try again.");
    }
  };

  const handleDownload = async () => {
    const element = document.getElementById("booking-summary");
    if (!element) return alert("Booking summary not found!");

    try {
      const clone = element.cloneNode(true);
      clone.style.position = "absolute";
      clone.style.left = "-9999px";
      clone.style.top = "0";
      clone.style.background = "#ffffff";
      clone.style.filter = "none";
      clone.style.backdropFilter = "none";
      document.body.appendChild(clone);

      const fixColors = (el) => {
        const computed = window.getComputedStyle(el);
        const cssProps = [
          "color",
          "backgroundColor",
          "borderColor",
          "outlineColor",
          "boxShadow",
        ];
        cssProps.forEach((prop) => {
          const val = computed[prop];
          if (val && (val.includes("oklab(") || val.includes("oklch("))) {
            el.style[prop] = val.includes("oklch")
              ? val.replace(/oklch\([^)]+\)/g, "rgb(0,0,0)")
              : val.replace(/oklab\([^)]+\)/g, "rgb(0,0,0)");
          }
        });
      };

      clone.querySelectorAll("*").forEach(fixColors);
      fixColors(clone);

      await new Promise((r) => setTimeout(r, 150));

      const canvas = await html2canvas(clone, {
        useCORS: true,
        backgroundColor: "#ffffff",
        scale: 2,
        logging: false,
        allowTaint: true,
      });

      document.body.removeChild(clone);

      canvas.toBlob((blob) => {
        if (!blob) return alert("Failed to create image!");
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "flight-booking-summary.jpg";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
      }, "image/jpeg", 1.0);
    } catch (error) {
      console.error("Error downloading JPG:", error);
      alert("Failed to download image. Please try again.");
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-100 via-white to-sky-50 p-6"
      >
        <div className="max-w-lg w-full bg-white/80 backdrop-blur-lg border border-navy-200 rounded-3xl shadow-2xl p-8 sm:p-10 text-center">
          <CheckCircle className="text-green-500 w-14 h-14 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#0a1f44] mb-2">
            Booking Request Sent Successfully!
          </h2>
          <p className="text-gray-600 mb-6">
            Thank you. We’ll contact you soon to confirm your booking.
          </p>

          
          <div
            id="booking-summary"
            className="bg-white p-6 rounded-2xl shadow-lg max-w-md mx-auto text-left"
            style={{ fontFamily: "'Segoe UI', sans-serif", lineHeight: 1.5 }}
          >
            <h2 className="text-center text-indigo-600 font-bold text-xl mb-4">
              ✈️ TravelSun Flight Booking Request
            </h2>

            <div className="mb-4">
              <p><span className="font-semibold text-gray-700">👤 Name:</span> <span className="text-gray-600">{formData.fullName}</span></p>
              <p><span className="font-semibold text-gray-700">📞 Contact:</span> <span className="text-gray-600">{formData.contact}</span></p>
              <p><span className="font-semibold text-gray-700">🏙️ City:</span> <span className="text-gray-600">{formData.city}</span></p>
            </div>

            <div className="border-t border-gray-200 pt-3 mb-3">
              <h3 className="text-indigo-600 font-semibold mb-2">Flight Details</h3>
              <p><span className="font-semibold text-gray-700">🛫 Airline:</span> <span className="text-gray-600">{flight.airline}</span></p>
              <p><span className="font-semibold text-gray-700">🌍 Route:</span> <span className="text-gray-600">{flight.from} → {flight.to}</span></p>
              <p><span className="font-semibold text-gray-700">⏰ Departure:</span> <span className="text-gray-600">{flight.departureTime}</span></p>
              <p><span className="font-semibold text-gray-700">🕓 Arrival:</span> <span className="text-gray-600">{flight.arrivalTime}</span></p>
              <p><span className="font-semibold text-gray-700">⏱ Duration:</span> <span className="text-gray-600">{flight.duration}</span></p>
              <p><span className="font-semibold text-indigo-600">💷 Price:</span> <span className="text-indigo-600 font-bold">£{flight.price}</span></p>
            </div>

            {flight.returnDepartureTime && (
              <div className="border-t border-gray-200 pt-3">
                <h3 className="text-indigo-600 font-semibold mb-2">Return Flight Details</h3>
                <p><span className="font-semibold text-gray-700">🛫 Airline:</span> <span className="text-gray-600">{flight.returnAirline || flight.airline}</span></p>
                <p><span className="font-semibold text-gray-700">🌍 Route:</span> <span className="text-gray-600">{flight.to} → {flight.from}</span></p>
                <p><span className="font-semibold text-gray-700">⏰ Departure:</span> <span className="text-gray-600">{flight.returnDepartureTime}</span></p>
                <p><span className="font-semibold text-gray-700">🕓 Arrival:</span> <span className="text-gray-600">{flight.returnArrivalTime}</span></p>
                <p><span className="font-semibold text-gray-700">⏱ Duration:</span> <span className="text-gray-600">{flight.returnDuration}</span></p>
              </div>
            )}

            <p className="text-center text-gray-400 text-sm mt-4">
              ✈️ TravelSun Flight Booking System – Thank you for choosing us!
            </p>
          </div>

          <button
            onClick={handleDownload}
            className="mt-6 bg-[#0a1f44] hover:bg-[#0c2555] text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-transform hover:scale-105"
          >
            Download Summary (JPG)
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-100 via-white to-sky-50 py-10 px-4"
    >
      <div className="max-w-3xl w-full bg-white/80 backdrop-blur-lg border border-[#0a1f44]/30 rounded-3xl shadow-2xl p-8 sm:p-10">
        <h2 className="text-3xl font-bold text-center text-[#0a1f44] mb-8">
          Complete Your Booking
        </h2>

        <div className="bg-white/70 border border-[#0a1f44]/30 rounded-2xl p-6 mb-10 shadow-inner">
          <h3 className="text-lg font-semibold text-[#0a1f44] mb-4 border-b border-gray-200 pb-2">
            Flight Summary
          </h3>

          <div className="space-y-3 text-gray-700 text-sm sm:text-base">
            <div className="flex justify-between">
              <span className="font-medium">Airline:</span>
              <span>{flight.airline}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium flex items-center gap-1">
                <PlaneTakeoff className="w-4 h-4 text-[#0a1f44]" /> Departure:
              </span>
              <span>{flight.from} – {flight.departureTime}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium flex items-center gap-1">
                <PlaneLanding className="w-4 h-4 text-[#0a1f44]" /> Arrival:
              </span>
              <span>{flight.to} – {flight.arrivalTime}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium flex items-center gap-1">
                <Clock4 className="w-4 h-4 text-[#0a1f44]" /> Duration:
              </span>
              <span>{flight.duration}</span>
            </div>

            {flight.returnDepartureTime && (
              <>
                <div className="flex justify-between mt-2 border-t border-gray-200 pt-2">
                  <span className="font-medium flex items-center gap-1">
                    <RefreshCw className="w-4 h-4 text-[#0a1f44]" /> Return Departure:
                  </span>
                  <span>{flight.to} – {flight.returnDepartureTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium flex items-center gap-1">
                    <PlaneLanding className="w-4 h-4 text-[#0a1f44]" /> Return Arrival:
                  </span>
                  <span>{flight.from} – {flight.returnArrivalTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium flex items-center gap-1">
                    <Clock4 className="w-4 h-4 text-[#0a1f44]" /> Return Duration:
                  </span>
                  <span>{flight.returnDuration}</span>
                </div>
              </>
            )}

            <div className="flex justify-between mt-2">
              <span className="font-medium flex items-center gap-1">
                <Wallet className="w-4 h-4 text-[#0a1f44]" /> Price:
              </span>
              <span className="font-semibold text-[#0a1f44]">£{flight.price}</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border border-[#0a1f44]/40 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#0a1f44] outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Number
            </label>
            <input
              type="tel"
              name="contact"
              required
              value={formData.contact}
              onChange={handleChange}
              className="w-full border border-[#0a1f44]/40 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#0a1f44] outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              type="text"
              name="city"
              required
              value={formData.city}
              onChange={handleChange}
              className="w-full border border-[#0a1f44]/40 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#0a1f44] outline-none transition"
            />
          </div>

          <p className="text-gray-500 text-sm italic mt-3 text-center">
            Thank you for choosing our service! We’ll contact you soon to confirm your booking.
          </p>

          <button
            type="submit"
            className="w-full bg-[#0a1f44] hover:bg-[#0c2555] text-white font-semibold py-3 rounded-full shadow-lg mt-6 transition-transform hover:scale-105"
          >
            Submit Booking
          </button>
        </form>
      </div>
    </motion.div>
  );
}
