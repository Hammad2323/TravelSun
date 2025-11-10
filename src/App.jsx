import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "react-hot-toast"; 
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Queries from "./pages/Queries";
import Contact from "./pages/Contact";
import BookFlight from "./pages/BookFlight";
import AdminLogin from "./pages/AdminLogin"; 
import Footer from "./components/Footer"; 

export default function App() {
  return (
    <Router>
      <div className="font-sans bg-gradient-to-b from-blue-50 to-white min-h-screen flex flex-col justify-between">
        <div>
          <Navbar />
          <div className="pt-20">
            <AnimatePresence mode="wait">
              <Routes>
                <Route
                  path="/"
                  element={
                    <PageTransition>
                      <Home />
                    </PageTransition>
                  }
                />
                <Route
                  path="/booking"
                  element={
                    <PageTransition>
                      <Booking />
                    </PageTransition>
                  }
                />
                <Route
                  path="/queries"
                  element={
                    <PageTransition>
                      <Queries />
                    </PageTransition>
                  }
                />
                <Route
                  path="/contact"
                  element={
                    <PageTransition>
                      <Contact />
                    </PageTransition>
                  }
                />
                <Route
                  path="/book"
                  element={
                    <PageTransition>
                      <BookFlight />
                    </PageTransition>
                  }
                />
              
                <Route
                  path="/admin"
                  element={
                    <PageTransition>
                      <AdminLogin />
                    </PageTransition>
                  }
                />
              </Routes>
            </AnimatePresence>
          </div>
        </div>

        
        <Footer />

    
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 2500,
            style: {
              background: "#ffffff",
              color: "#0d47a1",
              border: "1px solid #bfdbfe",
              borderRadius: "12px",
              boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)",
              fontWeight: 500,
            },
          }}
        />
      </div>
    </Router>
  );
}

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="px-4"
    >
      {children}
    </motion.div>
  );
}
