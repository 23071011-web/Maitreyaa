import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Waves, Wifi, Coffee, Mountain } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ScrollSandEffect from "@/pages/ScrollSandEffect";

import tentImage from "@/assets/tent-accommodation.jpg";
import acRoomImage from "@/assets/ac-room.jpg";
import nonAcRoomImage from "@/assets/non-ac-room.jpg";
import dormImage from "@/assets/dorm-room.jpg";

const tree1 = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80";
const tree2 = "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80";
const tree3 = "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80";

/**
 * GokarnaStay Component
 * Updated: Improved card visuals, modal detail, animations
 */
const GokarnaStay = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  // Modal state
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Experience Section Parallax logic
  const experienceSectionRef = useRef(null);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    // Parallax hero background
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const bg = document.getElementById("hero-bg");
      if (bg) {
        bg.style.transform = `translateY(${scrollY * 0.25}px) scale(1.03)`;
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Fade-in page content
    setTimeout(() => setIsVisible(true), 120);

    // Parallax images GSAP logic
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".parallax-img").forEach((img: any, i: number) => {
        gsap.fromTo(
          img,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            duration: 1.2,
            scrollTrigger: {
              trigger: img,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.to(img, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: img,
            scrub: true,
          },
        });
      });
    }, experienceSectionRef);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      ctx.revert();
    };
  }, []);

  const features = [
    {
      icon: Waves,
      title: "Beachfront Location",
      description: "Steps away from pristine Gokarna beaches",
    },
    {
      icon: Wifi,
      title: "Modern Amenities",
      description: "High-speed WiFi and premium facilities",
    },
    {
      icon: Coffee,
      title: "Café & Lounge",
      description: "Artisan coffee and coastal cuisine",
    },
    {
      icon: Mountain,
      title: "Nature Experiences",
      description: "Yoga, treks, and wellness programs",
    },
  ];

  const accommodations = [
    {
      id: "tent",
      title: "Luxury Tent Stay",
      image: tentImage,
      description:
        "Immerse yourself in nature with our luxury tented stays — a blend of comfort and adventure. Designed with premium mattress, bedside lighting, locking storage and private patio.",
      price: "₹2,999 / Night",
      features: "Ocean View • Bonfire • Private Patio • Cozy Setup",
      labels: [
        { label: "Standard", price: "₹2,999" },
        { label: "With Breakfast", price: "₹3,499" },
      ],
      tag: "Beachside Bliss",
    },
    {
      id: "ac",
      title: "AC Room",
      image: acRoomImage,
      description:
        "Enjoy coastal elegance and modern comfort in our air-conditioned rooms with premium linen, en-suite bathroom and balcony views.",
      price: "₹4,499 / Night",
      features: "Air Conditioning • Premium Bedding • Balcony View",
      labels: [
        { label: "Standard", price: "₹2,500" },
        { label: "With Breakfast", price: "₹3,000" },
      ],
      tag: "Most Popular",
      tag2: "Air Conditioned",
    },
    {
      id: "non-ac",
      title: "Non-AC Room",
      image: nonAcRoomImage,
      description:
        "A simple yet cozy stay option for travelers seeking peace and authenticity with natural ventilation and earthy design touches.",
      price: "₹3,199 / Night",
      features: "Natural Ventilation • Ceiling Fan • Eco-Friendly",
      labels: [
        { label: "Standard", price: "₹2,000" },
        { label: "With Breakfast", price: "₹2,500" },
      ],
      tag: "Natural Breeze",
    },
    {
      id: "dorm",
      title: "Dorm Room",
      image: dormImage,
      description:
        "Perfect for backpackers — meet fellow travelers and share stories under the stars. Modern dormitory with personal lockers and privacy curtains.",
      price: "₹1,199 / Night",
      features:
        "Personal Lockers • Reading Light • Social Lounge • Community Kitchen",
      comingSoon: true,
      tag: "Coming Soon",
    },
  ];

  const openModal = (room: any) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
    // lock scroll
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRoom(null);
    document.body.style.overflow = "";
  };

  return (
    <div className="min-h-screen bg-background text-[14px]">
      <ScrollSandEffect />
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden mt-16">
        {/* Floating sand particles */}
        <div className="absolute inset-0 pointer-events-none z-[5]">
          {[...Array(28)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 bg-gold/50 rounded-full animate-float blur-sm"
              style={{
                left: `${(i * 37) % 100}%`,
                top: `${(i * 73) % 100}%`,
                animationDelay: `${(i % 7) * 0.15}s`,
                animationDuration: `${3 + (i % 5) * 0.6}s`,
              }}
            />
          ))}
        </div>

        {/* Parallax background */}
        <div
          id="hero-bg"
          className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-700"
          style={{
            backgroundImage: "url('/go.png')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/40 to-navy/80" />
        </div>

        {/* Animated wave svgs */}
        <div className="absolute bottom-0 left-0 right-0 h-36 overflow-hidden z-[5] pointer-events-none">
          <svg
            className="absolute bottom-0 w-[200%] h-full animate-wave"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,50 C300,100 500,0 800,50 L1200,120 L0,120 Z"
              fill="rgba(139,116,73,0.06)"
            />
          </svg>
          <svg
            className="absolute bottom-0 w-[200%] h-full animate-wave-slow"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            style={{ animationDelay: "-2s" }}
          >
            <path
              d="M0,70 C300,20 500,100 800,70 L1200,120 L0,120 Z"
              fill="rgba(139,116,73,0.03)"
            />
          </svg>
        </div>

        {/* Hero Content */}
        <div
          className={`relative z-10 text-center px-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="inline-block px-6 py-2 bg-gold/20 backdrop-blur-sm border border-gold/30 rounded-full text-gold text-sm font-medium mb-4">
            Premium Beach Experience
          </span>

          <h1 className="text-6xl md:text-8xl font-serif font-bold text-cream mb-4 tracking-tight">
            Gokarna Stay
          </h1>

          <p className="text-xl md:text-2xl text-cream/90 max-w-3xl mx-auto leading-relaxed">
            Your sanctuary by the sea. Where coastal luxury meets authentic
            Gokarna charm.
          </p>

          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <a
              href="#pricing"
              className="px-8 py-4 bg-gold text-navy font-semibold rounded-lg hover:bg-gold/90 transition-transform hover:scale-105 shadow-gold"
            >
              View Accommodations
            </a>
            <a
              href="#contact"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-cream border border-white/30 font-semibold rounded-lg hover:bg-white/20 transition"
            >
              Contact Us
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-20">
          <div className="w-6 h-10 border-2 border-cream/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-cream/50 rounded-full mt-2" />
          </div>
        </div>
      </section>

      {/* About Section - modernized to match site theme */}
      <section className="py-28 bg-gradient-to-b from-[#fffaf3] to-[#f4f9fb] relative overflow-hidden">
        {/* Decorative soft lights */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-28 top-8 w-96 h-96 bg-[#FFD700]/10 rounded-full blur-3xl" />
          <div className="absolute right-8 bottom-8 w-[30rem] h-[30rem] bg-[#002B5B]/8 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Header */}
          <div className="text-center mb-10 max-w-3xl mx-auto">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="inline-block px-4 py-1 bg-[#FFD700]/10 text-[#B8860B] rounded-full text-sm font-semibold tracking-wide mb-4"
            >
              WHY CHOOSE US
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-serif font-bold text-[#002B5B] leading-tight"
            >
              Coastal Luxury — Thoughtfully Designed
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-lg text-gray-600 mt-4"
            >
              Handpicked amenities, curated experiences and warm hospitality set against Gokarna’s serene shores.
            </motion.p>
          </div>

          {/* Stats + CTA */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-12">
            <div className="flex gap-6 items-center">
              <div className="flex items-center gap-6 bg-white/60 backdrop-blur rounded-xl p-4 shadow-sm">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-[#0a2342]">120+</div>
                  <div className="text-xs text-gray-500">Guests / month</div>
                </div>
                <div className="border-l h-8 border-white/30" />
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-[#0a2342]">4.9</div>
                  <div className="text-xs text-gray-500">Avg rating</div>
                </div>
                <div className="border-l h-8 border-white/30" />
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-[#0a2342]">5</div>
                  <div className="text-xs text-gray-500">mins to beach</div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-auto">
              <button
                onClick={() => navigate("/Booking")}
                className="w-full lg:w-auto inline-flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-300 text-[#0a2342] font-semibold rounded-xl shadow-md hover:scale-[1.02] transition-transform"
              >
                Book Your Coastal Stay
              </button>
            </div>
          </div>

          {/* Features grid — glass cards with accent */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: idx * 0.06 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="relative bg-white/70 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 p-3 rounded-lg bg-gradient-to-br from-[#002B5B] to-[#004C91] text-white shadow">
                      <Icon size={20} strokeWidth={1.4} />
                    </div>

                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-[#002B5B]">{feature.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{feature.description}</p>

                      <div className="mt-3">
                        <span className="inline-flex items-center gap-2 text-xs text-[#B8860B] font-medium">
                          <span className="w-2 h-2 bg-[#FFD700] rounded-full inline-block" /> Featured
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br from-[#FFF7E0]/40 to-transparent" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing / Accommodations */}
      <section id="pricing" className="py-20 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-navy/5 text-navy rounded-full text-sm font-medium mb-4">
              ACCOMMODATION
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy mb-4">
              Choose Your Experience
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From beachside tents to premium rooms, find your perfect coastal
              retreat.
            </p>
          </div>

          <div className="w-full flex justify-center py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 w-[92%] max-w-7xl">
              {accommodations.map((item, idx) => (
                <motion.article
                  key={item.id || idx}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative group flex flex-col rounded-3xl overflow-hidden bg-white/90 backdrop-blur-lg border border-yellow-300/10 shadow-[0_6px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_50px_rgba(0,0,0,0.10)] transition-all duration-400"
                >
                  {/* Badge area */}
                  {item.tag && (
                    <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 items-end">
                      <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-300 text-[#0a2342] text-[10px] font-bold uppercase rounded-full shadow-md">
                        {item.tag}
                      </span>
                      {item.tag2 && (
                        <span className="px-3 py-1 bg-[#0a2342] text-white text-[10px] font-bold uppercase rounded-full shadow-md">
                          {item.tag2}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Image */}
                  <div
                    className="relative h-56 overflow-hidden bg-gray-100"
                    onClick={() => !item.comingSoon && openModal(item)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !item.comingSoon) openModal(item);
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white drop-shadow-sm">
                      <h3 className="text-2xl font-serif font-semibold mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm opacity-90">
                        {item.comingSoon
                          ? "Launching Soon"
                          : item.features.split(" • ").slice(0, 3).join(" • ")}
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-between flex-1 p-6">
                    {!item.comingSoon ? (
                      <>
                        <p className="text-xs text-gray-600 mb-4 border-b border-yellow-100 pb-3 leading-relaxed">
                          {item.features}
                        </p>

                        <div className="space-y-3 mb-5">
                          {item.labels &&
                            item.labels.map((lab: any, i: number) => (
                              <div key={i} className="flex justify-between items-center">
                                <div>
                                  <span className="block text-sm font-medium text-gray-700">
                                    {lab.label}
                                  </span>
                                  <span className="text-xs text-gray-400">
                                    Per person
                                  </span>
                                </div>
                                <div className="text-right">
                                  <span className="text-2xl font-bold text-[#0a2342]">
                                    {lab.price}
                                  </span>
                                  <span className="text-sm text-gray-500"> /night</span>
                                </div>
                              </div>
                            ))}
                        </div>

                        <div className="flex gap-3">
                          <button
                            onClick={() => openModal(item)}
                            className="flex-1 py-3 rounded-xl bg-white/80 border border-yellow-200 text-[#0a2342] font-semibold hover:scale-[1.02] transition-all"
                          >
                            View Details
                          </button>

                          <button
                            onClick={() => navigate("/Booking", { 
                              state: { 
                                selectedRoom: item,
                                dates: null 
                              }
                            })}
                            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-300 text-[#0a2342] font-semibold tracking-wide hover:scale-[1.03] hover:shadow-lg transition-all"
                          >
                            Book Now
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6">
                          {item.features}
                        </p>
                        <button
                          disabled
                          className="w-full py-3 rounded-xl bg-gray-100 text-gray-400 font-semibold cursor-not-allowed"
                        >
                          Launching Soon
                        </button>
                      </>
                    )}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          <div className="text-center mt-8 space-y-3">
            <p className="text-sm text-muted-foreground">
              <span className="inline-block w-2 h-2 bg-gold rounded-full mr-2" />
              All prices are subject to applicable taxes
            </p>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Wifi size={16} className="text-gold" /> Free WiFi
              </span>
              <span className="flex items-center gap-2">
                <Coffee size={16} className="text-gold" /> Breakfast Available
              </span>
              <span className="flex items-center gap-2">
                <Waves size={16} className="text-gold" /> Beach Access
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section - replaced */}
      <section
        ref={experienceSectionRef}
        className="relative overflow-hidden bg-gradient-to-b from-cream via-background to-cream py-20"
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-40 right-20 w-96 h-96 bg-gold rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1 bg-gold/10 text-gold rounded-full text-sm font-medium mb-4">
                THE EXPERIENCE
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy mb-6">
                Live the Gokarna Dream
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Wake up to waves, breathe under ancient trees, and feel the magic of
                nature unfold with every step.
              </p>
            </div>

            {/* Parallax Images */}
            <div className="space-y-20">
              <div className="parallax-img relative h-[70vh] overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src={tree1}
                  alt="Tree View 1"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="parallax-img relative h-[70vh] overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src={tree2}
                  alt="Tree View 2"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="parallax-img relative h-[70vh] overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src={tree3}
                  alt="Tree View 3"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="text-center mt-16">
              <button
                onClick={() => navigate("/Booking")}
                className="inline-block px-8 py-4 bg-gradient-to-r from-gold to-gold/80 text-navy font-bold rounded-xl hover:shadow-2xl transition-all hover:scale-105"
              >
                Book Your Stay Now
              </button>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
      <Footer />

      {/* Floating Back Button */}
      <Link
        to="/"
        className="fixed bottom-8 left-8 bg-gold text-navy p-3 rounded-full shadow-gold hover:scale-110 transition-transform z-40"
        aria-label="Go back"
      >
        <ArrowLeft size={20} />
      </Link>

      {/* Room Detail Modal */}
      <AnimatePresence>
        {isModalOpen && selectedRoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ y: 30, scale: 0.98 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 20, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="max-w-4xl w-full rounded-2xl overflow-hidden bg-white shadow-2xl"
              role="dialog"
              aria-modal="true"
            >
              <div className="relative h-64 md:h-80">
                <img
                  src={selectedRoom.image}
                  alt={selectedRoom.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 bg-white/80 rounded-full p-2 shadow"
                  aria-label="Close details"
                >
                  ✕
                </button>
                {selectedRoom.tag && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-300 text-[#0a2342] text-xs font-bold uppercase rounded-full shadow">
                      {selectedRoom.tag}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-navy mb-2">
                      {selectedRoom.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {selectedRoom.description}
                    </p>
                    <p className="text-sm text-gray-600 mb-4">
                      <strong>Highlights:</strong> {selectedRoom.features}
                    </p>

                    <div className="flex gap-3 mb-4">
                      {selectedRoom.labels?.map((lab: any, i: number) => (
                        <div key={i} className="px-3 py-2 bg-gray-50 border rounded-md">
                          <div className="text-sm font-medium">{lab.label}</div>
                          <div className="text-sm text-gray-600">{lab.price} / night</div>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          closeModal();
                          navigate("/Booking");
                        }}
                        className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-300 text-[#0a2342] rounded-lg font-semibold hover:scale-105 transition-transform"
                      >
                        Book Now
                      </button>

                      <button
                        onClick={closeModal}
                        className="px-6 py-3 border rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition"
                      >
                        Close
                      </button>
                    </div>
                  </div>

                  <div className="hidden md:block w-40">
                    <div className="mb-3 text-sm text-gray-600">Quick info</div>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li>✔ Free WiFi</li>
                      <li>✔ Breakfast available</li>
                      <li>✔ Beach access</li>
                      <li>✔ Daily housekeeping</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* backdrop */}
            <motion.div
              onClick={closeModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/40"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GokarnaStay;
