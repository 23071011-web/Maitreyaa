import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Waves, Wifi, Coffee, Mountain } from "lucide-react";
import Navbar from "@/components/Navbar";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ScrollSandEffect from "@/pages/ScrollSandEffect";

import tentImage from "@/assets/tent-accommodation.jpg";
import acRoomImage from "@/assets/ac-room.jpg";
import nonAcRoomImage from "@/assets/non-ac-room.jpg";
import dormImage from "@/assets/dorm-room.jpg";

const GokarnaStay = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const bg = document.getElementById("hero-bg");
      if (bg) {
        bg.style.transform = `translateY(${scrollY * 0.3}px)`; // Parallax speed: 0.3
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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

  return (
    <div className="min-h-screen">
      <ScrollSandEffect />
      <Navbar />
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden mt-16">
        {/* Animated Sand Particles */}
        <div className="absolute inset-0 pointer-events-none z-[5]">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 bg-gold/50 rounded-full animate-float blur-sm"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${3 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        {/* Background image with blur + parallax */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-105  transition-transform duration-500"
          style={{
            backgroundImage: "url('/go.png')",
            transform: `translateY(0px)`,
          }}
          id="hero-bg"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/40 to-navy/80" />
        </div>

        {/* Animated Wave Overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden z-[5]">
          <svg className="absolute bottom-0 w-[200%] h-full animate-wave" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,50 C300,100 500,0 800,50 L800,120 L0,120 Z" fill="rgba(139, 116, 73, 0.1)" />
          </svg>
          <svg className="absolute bottom-0 w-[200%] h-full animate-wave-slow" viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ animationDelay: '-2s' }}>
            <path d="M0,70 C300,20 500,100 800,70 L800,120 L0,120 Z" fill="rgba(139, 116, 73, 0.05)" />
          </svg>
        </div>

        <div
          className={`relative z-10 text-center px-4 transition-slow ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="mb-4">
            <span className="inline-block px-6 py-2 bg-gold/20 backdrop-blur-sm border border-gold/30 rounded-full text-gold text-sm font-medium mb-4">
              Premium Beach Experience
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-serif font-bold text-cream mb-6 animate-fade-in-up tracking-tight">
            Gokarna Stay
          </h1>
          <p className="text-xl md:text-2xl text-cream/90 max-w-3xl mx-auto animate-fade-in leading-relaxed">
            Your sanctuary by the sea. Where coastal luxury meets authentic Gokarna charm.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <a
              href="#pricing"
              className="px-8 py-4 bg-gold text-navy font-semibold rounded-lg hover:bg-gold/90 transition-smooth hover:scale-105 shadow-gold"
            >
              View Accommodations
            </a>
            <a
              href="#contact"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-cream border border-white/30 font-semibold rounded-lg hover:bg-white/20 transition-smooth"
            >
              Contact Us
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-cream/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-cream/50 rounded-full mt-2" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-32 bg-gradient-to-b from-cream to-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gold rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-navy rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <span className="inline-block px-4 py-1 bg-gold/10 text-gold rounded-full text-sm font-medium mb-4">
                WHY CHOOSE US
              </span>
              <h2 className="text-5xl md:text-6xl font-serif font-bold text-navy mb-6">
                Coastal Luxury Redefined
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Nestled on the serene shores of Gokarna, our boutique property offers
                an intimate escape where modern comfort harmonizes with nature's beauty.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-20">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group relative p-8 bg-white rounded-2xl shadow-luxury hover:shadow-2xl transition-all duration-300 animate-fade-in border border-transparent hover:border-gold/20"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="bg-gradient-to-br from-gold to-gold/70 p-4 rounded-xl inline-flex mb-4 group-hover:scale-110 transition-transform">
                      <feature.icon className="text-white" size={28} />
                    </div>
                    <h3 className="font-bold text-navy mb-3 text-xl">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20 animate-fade-in">
              <span className="inline-block px-4 py-1 bg-navy/5 text-navy rounded-full text-sm font-medium mb-4">
                ACCOMMODATION
              </span>
              <h2 className="text-5xl md:text-6xl font-serif font-bold text-navy mb-6">
                Choose Your Experience
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                From beachside tents to premium rooms, find your perfect coastal retreat
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16 perspective-1000">
              {/* Tents */}
              <div className="group relative bg-gradient-to-br from-cream to-white rounded-3xl shadow-2xl hover:shadow-gold transition-all duration-500 overflow-hidden border border-gold/10 animate-fade-in transform-3d hover:scale-105 hover:-translate-y-4" style={{ transformStyle: 'preserve-3d', transition: 'all 0.5s ease-out' }}>
                <div className="absolute top-0 right-0 w-40 h-40 bg-gold/5 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-500" />
                <div className="relative h-72 overflow-hidden">
                  <img 
                    src={tentImage} 
                    alt="Beach camping tents at Gokarna" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                  {/* Beach sparkle effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-3 h-3 bg-gold/60 rounded-full animate-float blur-sm"
                        style={{
                          left: `${20 + i * 10}%`,
                          top: `${30 + i * 5}%`,
                          animationDelay: `${i * 0.2}s`,
                          animationDuration: `${2 + Math.random() * 2}s`,
                        }}
                      />
                    ))}
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-3xl font-serif font-bold text-white mb-2">Beach Tents</h3>
                    <p className="text-cream/90 text-sm">Glamping under the stars</p>
                  </div>
                </div>
                <div className="p-8 relative">
                  <div className="space-y-5 mb-6">
                    <div className="flex justify-between items-center pb-4 border-b-2 border-gold/10">
                      <div>
                        <span className="block text-sm text-muted-foreground mb-1">Standard</span>
                        <span className="text-xs text-muted-foreground/60">Per person</span>
                      </div>
                      <div className="text-right">
                        <span className="text-3xl font-bold text-navy">₹550</span>
                        <span className="text-sm text-muted-foreground">/night</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b-2 border-gold/10">
                      <div>
                        <span className="block text-sm text-muted-foreground mb-1">With Breakfast</span>
                        <span className="text-xs text-muted-foreground/60">Per person</span>
                      </div>
                      <div className="text-right">
                        <span className="text-3xl font-bold text-navy">₹700</span>
                        <span className="text-sm text-muted-foreground">/night</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => navigate("/Booking")}
                    className="block w-full text-center px-6 py-4 bg-yellow-400 text-black font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    Book Now
                  </button>
                </div>
              </div>

              {/* AC Rooms */}
              <div className="group relative bg-gradient-to-br from-cream to-white rounded-3xl shadow-2xl hover:shadow-gold transition-all duration-500 overflow-hidden border border-gold/10 animate-fade-in transform-3d hover:scale-105 hover:-translate-y-4" style={{ transformStyle: 'preserve-3d', transition: 'all 0.5s ease-out' }}>
                <div className="absolute top-6 right-6 z-10 flex flex-col gap-2">
                  <span className="px-4 py-2 bg-gold text-navy text-xs font-bold rounded-full shadow-lg">
                    MOST POPULAR
                  </span>
                  <span className="px-4 py-2 bg-coastal text-white text-xs font-bold rounded-full shadow-lg">
                    AIR CONDITIONED
                  </span>
                </div>
                <div className="absolute top-0 right-0 w-40 h-40 bg-gold/5 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-500" />
                <div className="relative h-72 overflow-hidden">
                  <img 
                    src={acRoomImage} 
                    alt="Modern AC room with beach view" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                  {/* Beach sparkle effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-3 h-3 bg-gold/60 rounded-full animate-float blur-sm"
                        style={{
                          left: `${15 + i * 10}%`,
                          top: `${25 + i * 6}%`,
                          animationDelay: `${i * 0.25}s`,
                          animationDuration: `${2 + Math.random() * 2}s`,
                        }}
                      />
                    ))}
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-3xl font-serif font-bold text-white mb-2">AC Rooms</h3>
                    <p className="text-cream/90 text-sm">Climate-controlled premium comfort</p>
                  </div>
                </div>
                <div className="p-8 relative">
                  <div className="mb-4 text-xs text-muted-foreground">
                    ✓ Air Conditioning • ✓ Premium Bedding • ✓ Beach View
                  </div>
                  <div className="space-y-5 mb-6">
                    <div className="flex justify-between items-center pb-4 border-b-2 border-gold/10">
                      <div>
                        <span className="block text-sm text-muted-foreground mb-1">Standard</span>
                        <span className="text-xs text-muted-foreground/60">Per room</span>
                      </div>
                      <div className="text-right">
                        <span className="text-3xl font-bold text-navy">₹2,500</span>
                        <span className="text-sm text-muted-foreground">/night</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b-2 border-gold/10">
                      <div>
                        <span className="block text-sm text-muted-foreground mb-1">With Breakfast</span>
                        <span className="text-xs text-muted-foreground/60">Per room</span>
                      </div>
                      <div className="text-right">
                        <span className="text-3xl font-bold text-navy">₹3,000</span>
                        <span className="text-sm text-muted-foreground">/night</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => navigate("/Booking")}
                    className="block w-full text-center px-6 py-4 bg-yellow-400 text-black font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    Book Now
                  </button>
                </div>
              </div>

              {/* Non-AC Rooms */}
              <div className="group relative bg-gradient-to-br from-cream to-white rounded-3xl shadow-2xl hover:shadow-gold transition-all duration-500 overflow-hidden border border-gold/10 animate-fade-in transform-3d hover:scale-105 hover:-translate-y-4" style={{ transformStyle: 'preserve-3d', transition: 'all 0.5s ease-out' }}>
                <div className="absolute top-6 right-6 z-10">
                  <span className="px-4 py-2 bg-accent/90 text-navy text-xs font-bold rounded-full shadow-lg">
                    NATURAL BREEZE
                  </span>
                </div>
                <div className="absolute top-0 right-0 w-40 h-40 bg-gold/5 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-500" />
                <div className="relative h-72 overflow-hidden">
                  <img 
                    src={nonAcRoomImage} 
                    alt="Charming non-AC room with ocean view" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                  {/* Beach sparkle effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-3 h-3 bg-gold/60 rounded-full animate-float blur-sm"
                        style={{
                          left: `${25 + i * 9}%`,
                          top: `${35 + i * 4}%`,
                          animationDelay: `${i * 0.22}s`,
                          animationDuration: `${2 + Math.random() * 2}s`,
                        }}
                      />
                    ))}
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-3xl font-serif font-bold text-white mb-2">Non-AC Rooms</h3>
                    <p className="text-cream/90 text-sm">Natural ventilation & authentic coastal charm</p>
                  </div>
                </div>
                <div className="p-8 relative">
                  <div className="mb-4 text-xs text-muted-foreground">
                    ✓ Natural Ventilation • ✓ Ceiling Fan • ✓ Eco-Friendly
                  </div>
                  <div className="space-y-5 mb-6">
                    <div className="flex justify-between items-center pb-4 border-b-2 border-gold/10">
                      <div>
                        <span className="block text-sm text-muted-foreground mb-1">Standard</span>
                        <span className="text-xs text-muted-foreground/60">Per room</span>
                      </div>
                      <div className="text-right">
                        <span className="text-3xl font-bold text-navy">₹2,000</span>
                        <span className="text-sm text-muted-foreground">/night</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b-2 border-gold/10">
                      <div>
                        <span className="block text-sm text-muted-foreground mb-1">With Breakfast</span>
                        <span className="text-xs text-muted-foreground/60">Per room</span>
                      </div>
                      <div className="text-right">
                        <span className="text-3xl font-bold text-navy">₹2,500</span>
                        <span className="text-sm text-muted-foreground">/night</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => navigate("/Booking")}
                    className="block w-full text-center px-6 py-4 bg-yellow-400 text-black font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    Book Now
                  </button>
                </div>
              </div>

              {/* Dorms Coming Soon */}
              <div className="group relative bg-gradient-to-br from-cream to-white rounded-3xl shadow-2xl hover:shadow-gold transition-all duration-500 overflow-hidden border-2 border-dashed border-gold/30 animate-fade-in transform-3d hover:scale-105 hover:-translate-y-4" style={{ transformStyle: 'preserve-3d', transition: 'all 0.5s ease-out' }}>
                <div className="absolute top-0 right-0 w-40 h-40 bg-gold/5 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-500" />
                <div className="relative h-72 overflow-hidden">
                  <img 
                    src={dormImage} 
                    alt="Modern dormitory accommodation" 
                    className="w-full h-full object-cover opacity-50 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-navy/40" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="inline-block px-6 py-3 bg-gold text-navy text-sm font-bold rounded-full shadow-2xl mb-4 animate-pulse">
                        COMING SOON
                      </div>
                    </div>
                  </div>
                  {/* Beach sparkle effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-50 transition-opacity duration-500">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-3 h-3 bg-gold/40 rounded-full animate-float blur-sm"
                        style={{
                          left: `${10 + i * 11}%`,
                          top: `${20 + i * 8}%`,
                          animationDelay: `${i * 0.3}s`,
                          animationDuration: `${2 + Math.random() * 2}s`,
                        }}
                      />
                    ))}
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-3xl font-serif font-bold text-white mb-2">Dormitory</h3>
                    <p className="text-cream/90 text-sm">Budget-friendly backpacker haven</p>
                  </div>
                </div>
                <div className="p-8 relative">
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Perfect for solo travelers and backpackers. Modern dormitory accommodation with personal lockers, reading lights, and a vibrant social atmosphere.
                  </p>
                  <button 
                    disabled
                    className="w-full px-6 py-4 bg-gray-100 text-gray-400 font-semibold rounded-xl cursor-not-allowed"
                  >
                    Launching Soon
                  </button>
                </div>
              </div>
            </div>

            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                <span className="inline-block w-2 h-2 bg-gold rounded-full mr-2" />
                All prices are subject to applicable taxes
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Wifi size={16} className="text-gold" />
                  Free WiFi
                </span>
                <span className="flex items-center gap-2">
                  <Coffee size={16} className="text-gold" />
                  Breakfast Available
                </span>
                <span className="flex items-center gap-2">
                  <Waves size={16} className="text-gold" />
                  Beach Access
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-32 bg-gradient-to-b from-cream via-background to-cream relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-40 right-20 w-96 h-96 bg-gold rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center animate-fade-in mb-16">
              <span className="inline-block px-4 py-1 bg-gold/10 text-gold rounded-full text-sm font-medium mb-4">
                THE EXPERIENCE
              </span>
              <h2 className="text-5xl md:text-6xl font-serif font-bold text-navy mb-8">
                Live the Gokarna Dream
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Wake up to the sound of waves, practice sunrise yoga on the beach,
                explore hidden coves and ancient temples, savor fresh coastal cuisine,
                and end your day with spectacular sunsets over the Arabian Sea.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="text-center p-8 bg-white rounded-2xl shadow-luxury hover:shadow-gold transition-all group">
                <div className="w-16 h-16 bg-gradient-to-br from-gold to-gold/70 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Waves className="text-white" size={32} />
                </div>
                <h3 className="font-bold text-navy mb-2 text-lg">Beach Life</h3>
                <p className="text-muted-foreground text-sm">Direct access to pristine beaches</p>
              </div>
              
              <div className="text-center p-8 bg-white rounded-2xl shadow-luxury hover:shadow-gold transition-all group">
                <div className="w-16 h-16 bg-gradient-to-br from-gold to-gold/70 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Mountain className="text-white" size={32} />
                </div>
                <h3 className="font-bold text-navy mb-2 text-lg">Adventure</h3>
                <p className="text-muted-foreground text-sm">Treks, yoga & water sports</p>
              </div>
              
              <div className="text-center p-8 bg-white rounded-2xl shadow-luxury hover:shadow-gold transition-all group">
                <div className="w-16 h-16 bg-gradient-to-br from-gold to-gold/70 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Coffee className="text-white" size={32} />
                </div>
                <h3 className="font-bold text-navy mb-2 text-lg">Dining</h3>
                <p className="text-muted-foreground text-sm">Fresh coastal & local cuisine</p>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => navigate("/Booking")}
                className="inline-block px-10 py-5 bg-gradient-to-r from-gold to-gold/80 text-navy font-bold text-lg rounded-xl hover:shadow-2xl transition-all hover:scale-105"
              >
                Book Your Stay Now
              </button>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
      <Footer />

      {/* Back Button */}
      <Link
        to="/"
        className="fixed bottom-8 left-8 bg-gold text-navy p-3 rounded-full shadow-gold hover:scale-110 transition-smooth z-40"
      >
        <ArrowLeft size={24} />
      </Link>
    </div>
  );
};

export default GokarnaStay;
