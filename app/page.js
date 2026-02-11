import CoreSolutions from "./components/core-solutions";
import Hero from "./components/hero";
import Navbar from "./components/navbar";
import WeAreSinetcom from "./components/we-are-sinetcom";
import WhyChooseUsSection from "./components/why-choose-us";
    

export default function Home() {
  return (
    <div>
      <Hero/>
      <WeAreSinetcom />
      <CoreSolutions/>
    </div>
  );
}