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

const sections = [
  {
    key: "hero",
    Component: Hero,
    dataKey: "hero",
  },
  {
    key: "services",
    Component: Services,
    dataKey: "services",
  },
  {
    key: "companies",
    Component: Companies,
    dataKey: "companies",
  },
  {
    key: "testimonials",
    Component: Testimonials,
    dataKey: "testimonials",
    condition: (data) => data.testi.length > 0,
  },
  {
    key: "about",
    Component: About,
    dataKey: "about",
  },
  {
    key: "contact",
    Component: Contact,
    dataKey: "contact",
  },
];

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
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Changed API endpoint to use PHP script instead of Next.js API route
        const response = await fetch('https://ipadviceandservices.com/api/get-data.php');
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        
        if (!data.data || !data.data.content) {
          throw new Error('Invalid data format');
        }

        setStoryData(data.data.content);
        setError(null);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (error || !storyData) {
    return (
      <div className="text-center text-white p-8">
        Failed to load data. Please try again later.
      </div>
    );
  }

  // Always show navbar regardless of visibility
  return (
    <div className={`bg-primary overflow-hidden`}>
      <Navbar
        lang={lang}
        sections={storyData}
        links={storyData.nav_section.links}
        data={storyData.nav_section}
      />
      
      {sections.map(({ key, Component, dataKey, condition }) => {
        // Check if section data exists and is set to visible
        const sectionData = storyData[dataKey];
        if (!sectionData || sectionData.isVisible === false) {
          return null;
        }

        // Check additional conditions if they exist
        if (condition && !condition(sectionData)) {
          return null;
        }

        return (
          <AnimatedSection key={key}>
            <Component
              lang={lang}
              links={storyData.nav_section.links}
              data={sectionData}
            />
          </AnimatedSection>
        );
      })}

      <StructuredData />
      <Footer sections={storyData} lang={lang} data={storyData.nav_section} />
    </div>
  );
}