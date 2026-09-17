import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import CapabilityGrid from '../components/CapabilityGrid';
import CaseShowcase from '../components/CaseShowcase';
import ContactPanel from '../components/ContactPanel';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 antialiased selection:bg-rose-500 selection:text-white overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <CapabilityGrid />
        <CaseShowcase />
        <ContactPanel />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
