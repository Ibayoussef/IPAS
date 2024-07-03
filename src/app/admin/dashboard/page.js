"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { data as initialData } from "../../data";
import NavSection from "./components/NavSection";
import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";
import TestimonialsSection from "./components/TestimonialsSection";
import AboutSection from "./components/AboutSection";
import CompaniesSection from "./components/CompaniesSection";
import ContactSection from "./components/ContactSection";
import { getCookie } from "cookies-next";

const sections = [
  { name: "Navigation", component: NavSection, dataKey: "nav_section" },
  { name: "Hero", component: HeroSection, dataKey: "hero" },
  { name: "Services", component: ServicesSection, dataKey: "services" },
  {
    name: "Testimonials",
    component: TestimonialsSection,
    dataKey: "testimonials",
  },
  { name: "About", component: AboutSection, dataKey: "about" },
  { name: "Companies", component: CompaniesSection, dataKey: "companies" },
  { name: "Contact", component: ContactSection, dataKey: "contact" },
];

export default function Dashboard() {
  const [data, setData] = useState(initialData);
  const [activeTab, setActiveTab] = useState(0);
  const isLoggedIn = getCookie("isLoggedIn") === "true";
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/admin");
    }
  }, [router, isLoggedIn]);
  const handleDataChange = (section, newData) => {
    setData((prevData) => ({
      ...prevData,
      [section]: newData,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch("/api/save-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to save data");
      }

      console.log("Saving data:", data);
      alert("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Error saving data. Please try again.");
    }
  };
  if (!isLoggedIn) {
    return;
  }
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100">
      <header className="bg-white shadow-lg">
        <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
        </div>
      </header>
      <main className="py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="p-8 bg-white rounded-3xl shadow-xl">
          <div className="mb-6 overflow-x-auto">
            <div className="inline-flex space-x-2">
              {sections.map((section, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`px-6 py-3 text-lg font-semibold rounded-xl transition duration-300 ease-in-out ${
                    activeTab === index
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {section.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            {sections.map((section, index) => (
              <div
                key={index}
                className={activeTab === index ? "block" : "hidden"}
              >
                <section.component
                  data={data[section.dataKey]}
                  onChange={(newData) =>
                    handleDataChange(section.dataKey, newData)
                  }
                />
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={handleSave}
              className="px-10 py-4 text-2xl font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            >
              Save All Changes
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
