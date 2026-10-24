import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import PerspectiveTunnelHero from '@/components/ui/perspective-tunnel-hero';
import BentoFeatures from './components/BentoFeatures';
import ComparisonSplitSection from './components/ComparisonSplitSection';
import TimelineDemo from '@/components/ui/demo';
import TestimonialsMarqueeSection from './components/TestimonialsMarqueeSection';
import FAQSection from './components/FAQSection';
import TrustMarquee from './components/TrustMarquee';
import MultiStepCTA from './components/MultiStepCTA';
import LiveTrackingSection from './components/LiveTrackingSection';
import CinematicFooter from '@/components/ui/motion-footer';
import ServicePage from './components/ServicePage';
import ContactPage from './components/ContactPage';
import NosotrosPage from './components/NosotrosPage';
import FlotillasSection from './components/FlotillasSection';
import { SERVICES_DATA } from '@/data/servicesData';

class SectionErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(err) { console.error("Section error:", err); }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

export default function App() {
  const parseCurrentRoute = () => {
    if (typeof window === 'undefined') return { page: 'home' };
    const path = window.location.pathname;
    const hash = window.location.hash;

    // Check contact page
    if (path === '/contacto' || path === '/contacto/' || hash === '#contacto') {
      return { page: 'contact' };
    }

    // Check nosotros page
    if (path === '/nosotros' || path === '/nosotros/' || hash === '#nosotros') {
      return { page: 'nosotros' };
    }

    // Check path /servicios/:slug
    if (path.startsWith('/servicios/')) {
      const slug = path.replace('/servicios/', '').replace(/\/$/, '');
      if (SERVICES_DATA[slug]) return { page: 'service', slug };
    }
    // Check hash fallback #servicios/:slug
    if (hash.startsWith('#servicios/')) {
      const slug = hash.replace('#servicios/', '').replace(/\/$/, '');
      if (SERVICES_DATA[slug]) return { page: 'service', slug };
    }
    return { page: 'home' };
  };

  const [route, setRoute] = useState(parseCurrentRoute);

  useEffect(() => {
    const handlePopState = () => {
      setRoute(parseCurrentRoute());
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigateToService = (slug) => {
    setRoute({ page: 'service', slug });
    window.history.pushState(null, '', `/servicios/${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    setRoute({ page: 'home' });
    window.history.pushState(null, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToContact = () => {
    setRoute({ page: 'contact' });
    window.history.pushState(null, '', '/contacto');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToNosotros = () => {
    setRoute({ page: 'nosotros' });
    window.history.pushState(null, '', '/nosotros');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dedicated Contact Page View
  if (route.page === 'contact') {
    return (
      <ContactPage
        onNavigateHome={navigateToHome}
        onSelectService={navigateToService}
        onNavigateNosotros={navigateToNosotros}
      />
    );
  }

  // Dedicated Nosotros Page View
  if (route.page === 'nosotros') {
    return (
      <NosotrosPage
        onNavigateHome={navigateToHome}
        onSelectService={navigateToService}
        onNavigateContact={navigateToContact}
        onNavigateNosotros={navigateToNosotros}
      />
    );
  }

  // Dedicated Service Page View
  if (route.page === 'service') {
    return (
      <ServicePage
        serviceSlug={route.slug}
        onNavigateHome={navigateToHome}
        onSelectService={navigateToService}
        onNavigateContact={navigateToContact}
        onNavigateNosotros={navigateToNosotros}
      />
    );
  }

  // Master Home Page View
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 relative flex flex-col font-sans selection:bg-[#AFF94F] selection:text-slate-950">
      {/* Light Mode Floating Navigation Bar */}
      <Navbar 
        onNavigateHome={navigateToHome} 
        onSelectService={navigateToService} 
        onNavigateContact={navigateToContact}
        onNavigateNosotros={navigateToNosotros}
      />

      {/* 3D Model Perspective Tunnel Hero (21st.dev with GLTFs) */}
      <main className="flex-1 relative z-10 bg-slate-50 shadow-2xl border-b border-slate-200/80">
        <PerspectiveTunnelHero />

        {/* Infinite Trust Metrics Marquee */}
        <TrustMarquee />

        {/* 3D Isometric Bento Grid Section with Continuous Looping Animations */}
        <BentoFeatures onSelectService={navigateToService} />

        {/* Scroll-Driven Split-Screen Contrast: El Coyote vs Ciclonatura */}
        <SectionErrorBoundary>
          <ComparisonSplitSection />
        </SectionErrorBoundary>

        {/* Dedicated B2B Fleet Section for Uber, Constructoras, Corporativos & Arrendadoras */}
        <SectionErrorBoundary>
          <FlotillasSection onSelectService={navigateToService} />
        </SectionErrorBoundary>

        {/* Real-Time Live Tracking Panel Section */}
        <SectionErrorBoundary>
          <LiveTrackingSection />
        </SectionErrorBoundary>

        {/* 21st.dev Horizontal Scroll-Pinned Timeline Section */}
        <SectionErrorBoundary>
          <TimelineDemo />
        </SectionErrorBoundary>

        {/* Dual Vertical Infinite Testimonials Marquees Section */}
        <SectionErrorBoundary>
          <TestimonialsMarqueeSection />
        </SectionErrorBoundary>

        {/* 21st.dev Interactive FAQ Tabs Card Section */}
        <SectionErrorBoundary>
          <FAQSection />
        </SectionErrorBoundary>

        {/* Final Multi-Step Interactive CTA Section with Lotties */}
        <SectionErrorBoundary>
          <MultiStepCTA />
        </SectionErrorBoundary>
      </main>

      {/* Cinematic Curtain Reveal Motion Footer */}
      <SectionErrorBoundary>
        <CinematicFooter />
      </SectionErrorBoundary>
    </div>
  );
}
