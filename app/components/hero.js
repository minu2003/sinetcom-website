'use client';

import Navbar from './navbar';

export default function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>

      {/* Navbar ON TOP of VIDEO */}
      <div className="absolute top-0 left-0 w-full z-20">
        <Navbar />
      </div>
    </section>
  );
}
