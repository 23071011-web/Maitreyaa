import { useEffect, useState } from "react";
import { ChevronDown, Sparkles } from "lucide-react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContent = () => {
    const element = document.getElementById("businesses");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/95 to-primary/90 animate-gradient" />

      {/* Triple Background Images (each one-third width) */}
      <div
        className="absolute inset-0 flex opacity-50"
        style={{
          transform: `translateY(${scrollY * 0.5}px) scale(1.05)`,
        }}
      >
        <div
          className="w-1/3 h-full bg-cover bg-center"
          style={{ backgroundImage: `url('/imgg2.png')` }}
        />
        <div
          className="w-1/3 h-full bg-cover bg-center"
          style={{ backgroundImage: `url('/imgg3.png')` }}
        />
        <div
          className="w-1/3 h-full bg-cover bg-center"
          style={{ backgroundImage: `url('/imgg.jpeg')` }}
        />
      </div>

      {/* Subtle overlay gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/50 to-navy/80" />

      {/* Floating Sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-slow opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          >
            <Sparkles className="text-gold" size={12 + Math.random() * 12} />
          </div>
        ))}
      </div>

      {/* Content */}
      <div
        className={`relative z-10 text-center px-4 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-gold/10 backdrop-blur-sm border border-gold/20 rounded-full">
          <Sparkles className="text-gold" size={16} />
          <span className="text-gold text-sm font-medium">
            Premium Experiences
          </span>
        </div>

        <h1
          className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold mb-6 tracking-tight transition-colors duration-500"
          style={{
            color: "#1a1a1a",
            textShadow:
              "0 0 40px rgba(255, 255, 255, 0.9), 0 0 20px rgba(255, 255, 255, 0.8)",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "hsl(43, 74%, 66%)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.color = "#1a1a1a")}
        >
          Maitreya
        </h1>

        <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-gold to-transparent mb-8" />

        <p className="text-xl md:text-2xl lg:text-3xl text-cream/90 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
          Where luxury meets authenticity. Three exceptional experiences, one
          premium brand.
        </p>

        <div className="flex justify-center items-center">
         <button
  onClick={scrollToContent}
  className="px-10 py-4 bg-yellow-400 text-black font-semibold rounded-xl 
             border-2 border-yellow-400 
             hover:bg-yellow-500 hover:border-yellow-500 
             transition-all duration-300 hover:scale-105 
             backdrop-blur-sm"
>
  Discover Our Services
</button>

        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/60 hover:text-gold transition-all duration-300 animate-bounce-slow group"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            Scroll
          </span>
          <ChevronDown size={32} className="group-hover:scale-125 transition-transform" />
        </div>
      </button>
    </section>
  );
};

export default Hero;


# AI edit: change ui and add new feature 
