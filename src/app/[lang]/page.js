"use client";
import About from "./_components/About";
import Companies from "./_components/Companies";
import Contact from "./_components/Contact";
import Footer from "./_components/Footer";
import Hero from "./_components/Hero";
import Navbar from "./_components/Navbar";
import Services from "./_components/Services";
import Testimonials from "./_components/Testimonials";
import Loader from "./_components/Loader";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import StructuredData from "./_components/StruturedData";
import { supabase } from "../api/lib/supabaseClient";
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

export default function Home({ params: { lang } }) {
  const [storyData, setStoryData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      try {
        const { data, error } = await supabase
          .from("app_data")
          .select("content")
          .eq("id", 1)
          .single();

        if (error) {
          throw error;
        }

        setStoryData(data.content);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (!storyData) {
    return (
      <div className="text-center text-white p-8">
        Failed to load data. Please try again later.
      </div>
    );
  }
  return (
    <div className={`bg-primary overflow-hidden`}>
      <Navbar
        lang={lang}
        links={storyData.nav_section.links}
        data={storyData.nav_section}
      />
      <AnimatedSection>
        {" "}
        <Hero
          lang={lang}
          links={storyData.nav_section.links}
          data={storyData.hero}
        />
      </AnimatedSection>
      <AnimatedSection>
        {" "}
        <Services
          lang={lang}
          links={storyData.nav_section.links}
          data={storyData.services}
        />
      </AnimatedSection>
      <AnimatedSection>
        {" "}
        <Companies
          lang={lang}
          links={storyData.nav_section.links}
          data={storyData.companies}
        />
      </AnimatedSection>
      <AnimatedSection>
        {" "}
        {storyData.testimonials.testi.length > 0 && (
          <Testimonials lang={lang} data={storyData.testimonials} />
        )}
      </AnimatedSection>
      <AnimatedSection>
        {" "}
        <About
          lang={lang}
          links={storyData.nav_section.links}
          data={storyData.about}
        />
      </AnimatedSection>
      <AnimatedSection>
        {" "}
        <Contact
          lang={lang}
          links={storyData.nav_section.links}
          data={storyData.contact}
        />
      </AnimatedSection>
      <StructuredData />
      <Footer lang={lang} data={storyData.nav_section} />
    </div>
  );
}
