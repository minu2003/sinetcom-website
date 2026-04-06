import dynamic from 'next/dynamic';
import Hero from "@/components/hero";

const WeAreSinetcom = dynamic(() => import("@/components/we-are-sinetcom"), {
  loading: () => <div className="min-h-screen bg-white" />
});

const Testimonials = dynamic(() => import("@/components/testimonials"), {
  loading: () => <div className="h-64 bg-gray-50" />
});
    

export default function Home() {
  return (
    <div>
      <Hero/>
      <WeAreSinetcom />
      <Testimonials/>
    </div>
  );
}