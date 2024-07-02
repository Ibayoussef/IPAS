// components/NavSection.js
"use client"
import { useState } from 'react';

export default function NavSection({ data, onChange }) {
  const [localData, setLocalData] = useState(data);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    onChange(localData);
  };

  return (
    <div className="p-6 mb-6 bg-white rounded-lg shadow">
      <h2 className="mb-4 text-2xl font-semibold">Navigation Section</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="logo" className="block text-sm font-medium text-gray-700">Logo URL</label>
          <input
            type="text"
            name="logo"
            id="logo"
            value={localData.logo}
            onChange={handleInputChange}
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            id="phone"
            value={localData.phone}
            onChange={handleInputChange}
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={localData.email}
            onChange={handleInputChange}
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="links" className="block text-sm font-medium text-gray-700">Links (comma-separated)</label>
          <input
            type="text"
            name="links"
            id="links"
            value={localData.links}
            onChange={handleInputChange}
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>
      <div className="mt-4">
        <button
          onClick={handleSave}
          className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Save Navigation Section
        </button>
      </div>
    </div>
  );
}