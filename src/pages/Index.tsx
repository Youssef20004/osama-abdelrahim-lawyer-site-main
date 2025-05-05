
import { Preloader } from '@/components/Preloader';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { Testimonials } from '@/components/Testimonials';
import { Market } from '@/components/Market';
import { Articles } from '@/components/Articles';
import { Questions } from '@/components/Questions';
import { Footer } from '@/components/Footer';
import { useEffect } from 'react';

const Index = () => {
  useEffect(() => {
    // Add script logic here if needed
    const handleScroll = () => {
      // You could add scroll animations here
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen font-cairo" dir="rtl">
      <Preloader />
      <Header />
      <Hero />
      <Services />
      <Testimonials />
      <Articles />
      <Questions />
      <Footer />
    </div>
  );
};

export default Index;
