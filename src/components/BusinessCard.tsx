import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

interface BusinessCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
  gradient?: string;
}

const BusinessCard = ({
  title,
  description,
  image,
  link,
  gradient = "gradient-luxury",
}: BusinessCardProps) => {
  return (
    <Link
      to={link}
      className="group relative overflow-hidden rounded-3xl shadow-luxury hover:shadow-gold-lg transition-all duration-500 h-[550px] block transform hover:-translate-y-2"
    >
      {/* Shine Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-cream/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      </div>

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className={`absolute inset-0 ${gradient} opacity-70 group-hover:opacity-80 transition-all duration-500`} />
      </div>

      {/* Top Badge */}
      <div className="absolute top-6 right-6 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
        <div className="px-4 py-2 bg-gold/20 backdrop-blur-md border border-gold/30 rounded-full flex items-center gap-2">
          <Sparkles className="text-gold" size={14} />
          <span className="text-cream text-sm font-medium">Premium</span>
        </div>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-8 text-cream">
        {/* Decorative Line */}
        <div className="w-16 h-1 bg-gold mb-4 transform origin-left group-hover:scale-x-150 transition-transform duration-500" />
        
        <h3 className="text-3xl md:text-4xl font-serif font-bold mb-4 group-hover:text-gold transition-all duration-300 transform group-hover:translate-x-2">
          {title}
        </h3>
        
        <p className="text-cream/90 mb-6 text-lg leading-relaxed transform transition-all duration-300 group-hover:text-cream">
          {description}
        </p>
        
        <div className="flex items-center gap-3 text-gold font-semibold group-hover:gap-5 transition-all duration-300">
          <span className="text-base">Discover More</span>
          <ArrowRight className="transform group-hover:translate-x-2 transition-transform duration-300" size={22} />
        </div>
      </div>

      {/* Bottom Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </Link>
  );
};

export default BusinessCard;
