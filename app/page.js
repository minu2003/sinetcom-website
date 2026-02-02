import Hero from "./components/hero";
import Navbar from "./components/navbar";
import WeAreSinetcom from "./components/we-are-sinetcom";
import WhyChooseUs from "./components/why-choose-us";

export default function Home() {
  return (
    <div>
      <Hero/>
      <WeAreSinetcom />
      <WhyChooseUs />
    </div>
  );
}
