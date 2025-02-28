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
import { EyeIcon, EyeOffIcon } from 'lucide-react';

const sections = [
  { name: "Navigation", component: NavSection, dataKey: "nav_section" },
  { name: "Hero", component: HeroSection, dataKey: "hero" },
  { name: "Services", component: ServicesSection, dataKey: "services" },
  { name: "Testimonials", component: TestimonialsSection, dataKey: "testimonials" },
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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibility, setVisibility] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  
  const isLoggedIn = getCookie("isLoggedIn") === "true";
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://ipadviceandservices.com/api/get-data.php');
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const result = await response.json();
        
        if (result.data && result.data.content) {
          setData(result.data.content);
          // Initialize visibility state from the fetched data
          const initialVisibility = {};
          sections.forEach(section => {
            initialVisibility[section.dataKey] = 
              result.data.content[section.dataKey]?.isVisible ?? true;
          });
          setVisibility(initialVisibility);
          setError(null);
        } else {
          throw new Error('Invalid data format');
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
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
      [section]: {
        ...newData,
        isVisible: visibility[section]
      }
    }));
  };

  const toggleVisibility = (sectionKey) => {
    setVisibility(prev => {
      const newVisibility = { ...prev, [sectionKey]: !prev[sectionKey] };
      
      // Update the data state with new visibility
      setData(prevData => ({
        ...prevData,
        [sectionKey]: {
          ...prevData[sectionKey],
          isVisible: newVisibility[sectionKey]
        }
      }));
      
      return newVisibility;
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch("https://ipadviceandservices.com/api/save-data.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to save data");
      }

      const result = await response.json();
      alert("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Error saving data. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLanguageChange = (newLang) => {
    setCurrentLang(newLang);
    router.push(`/${newLang}/admin/dashboard`);
  };

  if (!isLoggedIn) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-xl">Error loading dashboard data. Please try again later.</div>
      </div>
    );
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
                <div key={index} className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab(index)}
                    className={`px-6 py-3 text-lg font-semibold rounded-xl transition duration-300 ease-in-out ${
                      activeTab === index
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {section.name}
                  </button>
                  <button
                    onClick={() => toggleVisibility(section.dataKey)}
                    className={`p-2 rounded-lg transition-colors ${
                      visibility[section.dataKey]
                        ? 'bg-green-100 text-green-600 hover:bg-green-200'
                        : 'bg-red-100 text-red-600 hover:bg-red-200'
                    }`}
                    title={visibility[section.dataKey] ? 'Section visible' : 'Section hidden'}
                  >
                    {visibility[section.dataKey] ? (
                      <EyeIcon className="w-5 h-5" />
                    ) : (
                      <EyeOffIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
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
              disabled={isSaving}
              className="px-10 py-4 text-2xl font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSaving ? (
                <div className="flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Saving...
                </div>
              ) : (
                'Save All Changes'
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}