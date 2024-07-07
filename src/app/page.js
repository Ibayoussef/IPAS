"use client";
import About from "./_components/About";
import Companies from "./_components/Companies";
import Contact from "./_components/Contact";
import Footer from "./_components/Footer";
import Hero from "./_components/Hero";
import Navbar from "./_components/Navbar";
import Services from "./_components/Services";
import Testimonials from "./_components/Testimonials";
import { data } from "./data";
import { motion } from "framer-motion";
const AnimatedSection = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};
export default function Home() {
  const storyData = data;

  return (
    <div className={`bg-primary overflow-hidden`}>
      <Navbar
        links={storyData.nav_section.links}
        data={storyData.nav_section}
      />
      <AnimatedSection>
        {" "}
        <Hero links={storyData.nav_section.links} data={storyData.hero} />
      </AnimatedSection>
      <AnimatedSection>
        {" "}
        <Services
          links={storyData.nav_section.links}
          data={storyData.services}
        />
      </AnimatedSection>
      <AnimatedSection>
        {" "}
        <Companies
          links={storyData.nav_section.links}
          data={storyData.companies}
        />
      </AnimatedSection>
      <AnimatedSection>
        {" "}
        {storyData.testimonials.testi.length > 0 && (
          <Testimonials data={storyData.testimonials} />
        )}
      </AnimatedSection>
      <AnimatedSection>
        {" "}
        <About links={storyData.nav_section.links} data={storyData.about} />
      </AnimatedSection>
      <AnimatedSection>
        {" "}
        <Contact links={storyData.nav_section.links} data={storyData.contact} />
      </AnimatedSection>
      <Footer data={storyData.nav_section} />
    </div>
  );
}
