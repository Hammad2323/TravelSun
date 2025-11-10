import { useState } from "react";
import { Loader2, CheckCircle } from "lucide-react";

export default function BookingForm({ flight }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      
      await fetch("/.netlify/functions/sendEmail", {
        method: "POST",
        body: JSON.stringify({ ...formData, flight }),
      });

      
      await fetch("/.netlify/functions/sendWhatsApp", {
        method: "POST",
        body: JSON.stringify({ ...formData, flight }),
      });

      setSubmitted(true);
    } catch (err) {
      console.error("❌ Booking submission failed:", err);
      alert("Something went wrong while submitting your booking.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-2xl mx-auto mt-10">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Booking Submitted Successfully!
        </h2>
        <p className="text-gray-600 mb-6">
          We’ve received your booking for <strong>{flight?.airline}</strong>.  
          Our team will contact you shortly today.
        </p>
        <button
          onClick={() => window.print()}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium shadow transition"
        >
          Download Receipt
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-3xl shadow-xl mt-10 max-w-3xl mx-auto border border-gray-100"
    >
      <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
        Passenger Information
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {["name", "email", "phone", "address"].map((field) => (
          <div key={field} className="relative">
            <input
              type={field === "email" ? "email" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
              className="peer border border-gray-300 w-full rounded-lg px-4 py-3 text-gray-700 placeholder-transparent focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder={field}
            />
            <label
              className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all"
            >
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-8 w-full bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 text-white py-3 rounded-xl font-semibold shadow-lg flex items-center justify-center transition"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin w-5 h-5 mr-2" /> Submitting...
          </>
        ) : (
          "Submit Booking"
        )}
      </button>
    </form>
  );
}
