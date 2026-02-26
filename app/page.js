import Hero from "./components/Hero";
import TechMarquee from "./components/TechMarquee";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <TechMarquee />
      <About />
      <Services />
      <Projects />
      <Experience />
      {/* <Contact /> */}
      <Footer />
    </main>
  );
}
