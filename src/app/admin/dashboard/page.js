'use client';

import { useState } from 'react';
import { data as initialData } from '../../data';
import NavSection from './components/NavSection';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import TestimonialsSection from './components/TestimonialsSection';
import AboutSection from './components/AboutSection';
import CompaniesSection from './components/CompaniesSection';
import ContactSection from './components/ContactSection';

export default function Dashboard() {
  const [data, setData] = useState(initialData);

  const handleDataChange = (section, newData) => {
    setData(prevData => ({
      ...prevData,
      [section]: newData
    }));
  };

  const handleSave = () => {
    // Here you would typically send the data to your backend
    console.log('Saving data:', data);
    const dataToSave = `export const data = ${JSON.stringify(data, null, 2)}`;
    alert('Data saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
      </header>
      <main className="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <NavSection data={data.nav_section} onChange={(newData) => handleDataChange('nav_section', newData)} />
          <HeroSection data={data.hero} onChange={(newData) => handleDataChange('hero', newData)} />
          <ServicesSection data={data.services} onChange={(newData) => handleDataChange('services', newData)} />
          <TestimonialsSection data={data.testimonials} onChange={(newData) => handleDataChange('testimonials', newData)} />
          <AboutSection data={data.about} onChange={(newData) => handleDataChange('about', newData)} />
          <CompaniesSection data={data.companies} onChange={(newData) => handleDataChange('companies', newData)} />
          <ContactSection data={data.contact} onChange={(newData) => handleDataChange('contact', newData)} />
          
          <div className="mt-8">
            <button
              onClick={handleSave}
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Save All Changes
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}