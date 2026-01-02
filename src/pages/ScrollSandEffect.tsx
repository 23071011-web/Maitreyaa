import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const ScrollSandEffect = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollDelta = Math.abs(scrollY - lastScrollY.current);
      
      // Only create particles if scrolling enough
      if (scrollDelta > 5) {
        createSandParticles();
        lastScrollY.current = scrollY;
      }
    };

    const createSandParticles = () => {
      if (!containerRef.current) return;

      // Create 3-5 particles per scroll
      const particleCount = Math.floor(Math.random() * 3) + 3;

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'sand-particle';
        
        // Random starting position at top of viewport
        const startX = Math.random() * window.innerWidth;
        const size = Math.random() * 8 + 4; // 4-12px
        const rotation = Math.random() * 360;
        
        particle.style.cssText = `
          position: fixed;
          left: ${startX}px;
          top: -20px;
          width: ${size}px;
          height: ${size}px;
          background: hsl(43 74% 66% / ${Math.random() * 0.4 + 0.3});
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          filter: blur(${Math.random() * 2}px);
          box-shadow: 0 0 ${size * 2}px hsl(43 74% 66% / 0.4);
        `;
        
        containerRef.current.appendChild(particle);
        particlesRef.current.push(particle);

        // GSAP animation with gravity effect
        const fallDistance = window.innerHeight + 50;
        const duration = Math.random() * 2 + 2; // 2-4 seconds
        const drift = (Math.random() - 0.5) * 200; // Horizontal drift

        gsap.to(particle, {
          y: fallDistance,
          x: drift,
          rotation: rotation + 360,
          opacity: 0,
          duration: duration,
          ease: 'power2.in', // Gravity acceleration
          onComplete: () => {
            particle.remove();
            particlesRef.current = particlesRef.current.filter(p => p !== particle);
          }
        });
      }

      // Cleanup old particles if too many
      if (particlesRef.current.length > 50) {
        const oldParticles = particlesRef.current.slice(0, 10);
        oldParticles.forEach(p => {
          gsap.killTweensOf(p);
          p.remove();
        });
        particlesRef.current = particlesRef.current.slice(10);
      }
    };

    // Add scroll listener with throttle
    let scrollTimeout: NodeJS.Timeout;
    const throttledScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 50);
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      // Cleanup all particles
      particlesRef.current.forEach(p => {
        gsap.killTweensOf(p);
        p.remove();
      });
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[9999]" />;
};

export default ScrollSandEffect;


# AI edit: change ui and add new feature 
