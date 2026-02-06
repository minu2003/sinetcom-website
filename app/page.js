import CoreSolutions from "./components/core-solutions";
import Hero from "./components/hero";
import Navbar from "./components/navbar";
import WeAreSinetcom from "./components/we-are-sinetcom";
import WhyChooseUsSection from "./components/why-choose-us";
import Testimonials from "./components/testimonials";
import Footer from "./components/footer";
    

export default function Home() {
  return (
    <div>
      <Hero/>
      <WeAreSinetcom />
      <CoreSolutions/>
      <Testimonials/>
      <Footer/>
    </div>
  );
}