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
import { supabase } from "@/app/api/lib/supabaseClient";

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
const LanguageSelector = ({ currentLang, onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: "en", label: "English" },
    { code: "fr", label: "Français" },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-40 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <span>
          {languages.find((lang) => lang.code === currentLang)?.label}
        </span>
        <svg
          className="w-5 h-5 ml-2 -mr-1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute right-0 w-40 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  onLanguageChange(lang.code);
                  setIsOpen(false);
                }}
                className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default function Dashboard({ params: { lang } }) {
  const [data, setData] = useState(initialData);
  const [activeTab, setActiveTab] = useState(0);
  const [currentLang, setCurrentLang] = useState(lang);
  const isLoggedIn = getCookie("isLoggedIn") === "true";
  const router = useRouter();
  useEffect(() => {
    async function fetchData() {
      const { data: result, error } = await supabase
        .from("app_data")
        .select()
        .eq("id", 1)
        .single();

      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setData(result.content);
      }
    }

    fetchData();
  }, []);
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

      alert("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Error saving data. Please try again.");
    }
  };

  const handleLanguageChange = (newLang) => {
    setCurrentLang(newLang);
    router.push(`/${newLang}/admin/dashboard`);
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100">
      <header className="bg-white shadow-lg">
        <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
          <LanguageSelector
            currentLang={currentLang}
            onLanguageChange={handleLanguageChange}
          />
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
                  lang={currentLang}
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
