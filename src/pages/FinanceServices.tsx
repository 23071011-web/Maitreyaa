import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { TrendingUp, Shield, PiggyBank, LineChart, Users, Award, Sparkles, DollarSign, TrendingDown, BarChart3 } from "lucide-react";
import businessTwoImage from "@/assets/business-two.jpg";

const FinanceServices = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const services = [
    {
      icon: TrendingUp,
      title: "Investment Planning",
      description: "Strategic investment solutions designed to grow your wealth and achieve long-term financial goals.",
      gradient: "from-gold to-accent"
    },
    {
      icon: Shield,
      title: "Risk Management",
      description: "Protect your assets with comprehensive risk assessment and insurance planning strategies.",
      gradient: "from-navy to-primary"
    },
    {
      icon: PiggyBank,
      title: "Retirement Planning",
      description: "Secure your future with personalized retirement strategies and pension planning.",
      gradient: "from-gold via-accent to-gold"
    },
    {
      icon: LineChart,
      title: "Portfolio Management",
      description: "Expert portfolio optimization and diversification for maximum returns with controlled risk.",
      gradient: "from-navy to-coastal"
    },
    {
      icon: Users,
      title: "Corporate Finance",
      description: "Business financial consulting, cash flow management, and corporate restructuring services.",
      gradient: "from-primary to-navy"
    },
    {
      icon: Award,
      title: "Wealth Advisory",
      description: "Personalized wealth management advice for high-net-worth individuals and families.",
      gradient: "from-gold to-gold/70"
    }
  ];

  const stats = [
    { value: "20+", label: "Years Experience" },
    { value: "500+", label: "Satisfied Clients" },
    { value: "₹100Cr+", label: "Assets Managed" },
    { value: "98%", label: "Success Rate" }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-primary to-navy/90 animate-gradient" />
        
        {/* Background Image with Parallax */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ 
            backgroundImage: `url(${businessTwoImage})`,
            transform: `translateY(${scrollY * 0.5}px) scale(1.1)`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/60 to-navy/90" />
        </div>

        {/* Floating Financial Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[DollarSign, TrendingUp, TrendingDown, BarChart3, LineChart].map((Icon, i) => (
            <div
              key={i}
              className="absolute animate-float-slow opacity-10"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${10 + Math.random() * 5}s`,
              }}
            >
              <Icon className="text-gold" size={40 + Math.random() * 40} />
            </div>
          ))}
        </div>

        {/* Floating Numbers */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {["₹", "$", "€", "%", "↑"].map((symbol, i) => (
            <div
              key={i}
              className="absolute text-gold/20 font-bold animate-float-slow"
              style={{
                left: `${15 + i * 20}%`,
                top: `${20 + i * 15}%`,
                fontSize: `${30 + Math.random() * 30}px`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${12 + Math.random() * 4}s`,
              }}
            >
              {symbol}
            </div>
          ))}
        </div>

        <div 
          className={`relative z-10 container mx-auto px-4 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="mb-6 inline-flex items-center gap-2 px-5 py-2 bg-gold/10 backdrop-blur-sm border border-gold/20 rounded-full">
            <Sparkles className="text-gold" size={16} />
            <span className="text-gold text-sm font-semibold tracking-wider uppercase">Financial Excellence</span>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold text-cream mb-6 tracking-tight hover:text-gold transition-colors duration-500">
            Maitreya Finance
          </h1>
          
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-gold to-transparent mb-8" />
          
          <p className="text-xl md:text-2xl lg:text-3xl text-cream/90 max-w-4xl mx-auto leading-relaxed font-light mb-12">
            Expert wealth management and strategic financial consulting for your prosperity
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#services"
              className="group px-10 py-4 bg-gradient-to-r from-gold to-accent text-navy font-semibold rounded-xl hover:shadow-gold-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1 relative overflow-hidden"
            >
              <span className="relative z-10">Our Services</span>
              <div className="absolute inset-0 bg-cream/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>
            
            <a
              href="#contact"
              className="px-10 py-4 border-2 border-cream/30 text-cream font-semibold rounded-xl hover:bg-cream/10 hover:border-cream/50 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
            >
              Get Consultation
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-slow">
          <div className="w-6 h-10 border-2 border-cream/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-cream/50 rounded-full mt-2" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-b from-navy to-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center transform hover:scale-110 transition-transform duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-5xl md:text-6xl font-bold text-gold mb-2 font-serif">
                  {stat.value}
                </div>
                <div className="text-cream/80 text-sm md:text-base font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-32 bg-gradient-to-b from-background via-secondary/20 to-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-10 w-96 h-96 bg-gold rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-navy rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20 animate-fade-in">
            <span className="inline-block px-4 py-1 bg-navy/5 text-navy rounded-full text-sm font-medium mb-4">
              COMPREHENSIVE SOLUTIONS
            </span>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-navy mb-6 tracking-tight">
              Our Financial Services
            </h2>
            <div className="h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-gold to-transparent mb-8" />
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Comprehensive financial solutions tailored to your unique goals and aspirations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <div 
                key={index}
                className="group relative bg-white p-10 rounded-3xl shadow-luxury hover:shadow-gold-lg transition-all duration-500 hover:-translate-y-3 overflow-hidden border border-transparent hover:border-gold/20"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Shine Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-gold/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </div>

                {/* Decorative Circle */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
                
                <div className="relative">
                  <div className={`w-20 h-20 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                    <service.icon className="w-10 h-10 text-white" />
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-navy mb-4 group-hover:text-gold transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed text-base">
                    {service.description}
                  </p>

                  {/* Bottom accent line */}
                  <div className="mt-6 w-12 h-1 bg-gradient-to-r from-gold to-transparent group-hover:w-full transition-all duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-32 bg-gradient-to-br from-navy via-primary to-navy text-white relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gold rounded-full animate-float-slow"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${8 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

   <div className="container mx-auto px-4 relative z-10">
  <div className="max-w-5xl mx-auto">
    <div className="text-center mb-16">
      <span className="inline-block px-4 py-1 bg-gold/20 text-gold rounded-full text-sm font-medium mb-4">
        OUR COMMITMENT
      </span>
      <h2 className="text-5xl md:text-6xl font-serif font-bold mb-8 text-black">
        Why Choose Maitreya Finance?
      </h2>
      <div className="h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-gold to-transparent mb-8" />
    </div>

    <div className="grid md:grid-cols-3 gap-8 mb-12">
      <div className="text-center p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
        <div className="text-4xl font-bold text-gold mb-2">20+</div>
        <div className="text-black">Years of Excellence</div>
      </div>
      <div className="text-center p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
        <div className="text-4xl font-bold text-gold mb-2">100%</div>
        <div className="text-black">Client Satisfaction</div>
      </div>
      <div className="text-center p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
        <div className="text-4xl font-bold text-gold mb-2">24/7</div>
        <div className="text-black">Support Available</div>
      </div>
    </div>

    <div className="space-y-6 text-lg text-black leading-relaxed">
      <p className="text-center md:text-left">
        With over two decades of experience in financial services, we bring unparalleled expertise 
        and dedication to every client relationship. Our proven track record speaks for itself.
      </p>
      <p className="text-center md:text-left">
        Our team of certified financial planners and investment advisors work closely with you to 
        understand your unique financial situation and create tailored strategies that align with 
        your goals and risk tolerance.
      </p>
      <p className="text-center text-xl font-semibold text-gold mt-8">
        Your financial success is our commitment.
      </p>
    </div>
  </div>
</div>

      </section>

      <ContactSection />
      <Footer />
    </div>
  );
};

export default FinanceServices;
