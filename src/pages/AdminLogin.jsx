import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const ADMIN_PASSWORD = "travelsun123"; 

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("isAdmin", "true");
      navigate("/queries");
    } else {
      alert("Incorrect password!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-lg rounded-2xl p-8 border border-blue-100 w-full max-w-md text-center"
      >
        <div className="flex justify-center mb-4">
          <Lock size={36} className="text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-blue-700 mb-4">
          Admin Login
        </h2>
        <form onSubmit={handleLogin}>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-blue-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 mb-4"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 w-full transition"
          >
            Login
          </button>
        </form>
      </motion.div>
    </div>
  );
}
