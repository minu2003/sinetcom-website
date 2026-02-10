import CoreSolutions from "./components/core-solutions";
import Hero from "./components/hero";
import WeAreSinetcom from "./components/we-are-sinetcom";
import WhyChooseUsSection from "./components/why-choose-us";
import Testimonials from "./components/testimonials";
    

export default function Home() {
  return (
    <div>
      <Hero/>
      <WeAreSinetcom />
      <CoreSolutions/>
      <Testimonials/>
    </div>
  );
}