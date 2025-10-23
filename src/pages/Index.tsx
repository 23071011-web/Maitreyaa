import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BusinessCard from "@/components/BusinessCard";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import gokarnaImage from "@/assets/gokarna-hero.jpg";
import businessTwoImage from "@/assets/business-two.jpg";
import businessThreeImage from "@/assets/business-three.jpg";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />

      {/* Businesses Section */}
      <section id="businesses" className="py-32 bg-gradient-to-b from-background via-secondary/20 to-background relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-gold/10 border border-gold/20 rounded-full mb-6">
              <span className="text-gold text-sm font-semibold tracking-wider uppercase">Our Services</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-navy mb-6 tracking-tight">
              Excellence Across Industries
            </h2>
            
            <div className="h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-gold to-transparent mb-8" />
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Hospitality, Finance, and Construction—three distinct sectors united by our commitment to quality and innovation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
            <BusinessCard
              title="Path for your luxury stay in less cost"
              description="Boutique coastal hospitality on pristine Gokarna beaches. Experience beachfront accommodations, from luxury AC rooms to authentic beach tents."
              image={gokarnaImage}
              link="/gokarna-stay"
              gradient="gradient-coastal"
            />
            <BusinessCard
              title="Way to upgrade your financial needs"
              description="Comprehensive financial consulting and wealth management solutions. Expert guidance for personal investments, business finance, and strategic financial planning."
              image={businessTwoImage}
              link="/finance-services"
              gradient="gradient-luxury"
            />
            <BusinessCard
              title="Needs for you luxury affordable dream homes"
              description="Full-service construction and infrastructure development. From residential projects to commercial buildings, delivering quality craftsmanship and innovative design."
              image={businessThreeImage}
              link="/construction-services"
              gradient="gradient-gold"
            />
          </div>
        </div>
      </section>

      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
