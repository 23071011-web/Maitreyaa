import { useLocation, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";

const BookingPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const roomType = queryParams.get("room") || "Unknown";

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Booking confirmed for ${roomType} from ${checkIn} to ${checkOut} for ${guests} guest(s).`);
    // Here you could integrate Razorpay / Stripe / backend booking logic
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Navbar />

      <section className="flex-grow py-20 bg-gradient-to-b from-cream to-white">
        <div className="container mx-auto px-4 max-w-3xl bg-white rounded-3xl shadow-2xl p-10">
          <h1 className="text-4xl font-serif font-bold text-navy mb-2">
            Book Your Stay
          </h1>
          <p className="text-muted-foreground mb-8">
            You are booking: <span className="font-semibold text-gold">{roomType}</span>
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-navy mb-1">Check-in Date</label>
              <input
                type="date"
                required
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                placeholder="Select check-in date"
                title="Check-in date"
                className="w-full border border-gray-300 rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-navy mb-1">Check-out Date</label>
              <input
                type="date"
                required
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                placeholder="Select check-out date"
                title="Check-out date"
                className="w-full border border-gray-300 rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-navy mb-1">Guests</label>
              <input
                type="number"
                min="1"
                max="10"
                required
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                placeholder="Number of guests"
                title="Number of guests"
                className="w-full border border-gray-300 rounded-lg p-3"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gold text-navy font-semibold rounded-lg hover:scale-105 transition-transform"
            >
              Proceed to Payment
            </button>
          </form>
        </div>
      </section>

      <Footer />

      <Link
        to="/stay/gokarna"
        className="fixed bottom-8 left-8 bg-gold text-navy p-3 rounded-full shadow-gold hover:scale-110 transition-smooth z-40"
      >
        <ArrowLeft size={24} />
      </Link>
    </div>
  );
};

export default BookingPage;
