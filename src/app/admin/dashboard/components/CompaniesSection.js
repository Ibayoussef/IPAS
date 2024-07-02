"use client"
import { useState } from 'react';

export default function CompaniesSection({ data, onChange }) {
  const [localData, setLocalData] = useState(data);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogoChange = (index, value) => {
    const newLogos = [...localData.companylogos];
    newLogos[index] = value;
    setLocalData(prev => ({ ...prev, companylogos: newLogos }));
  };

  const handleSave = () => {
    onChange(localData);
  };

  return (
    <div className="p-6 mb-6 bg-white rounded-lg shadow">
      <h2 className="mb-4 text-2xl font-semibold">Companies Section</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={localData.title}
            onChange={handleInputChange}
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            id="description"
            rows="3"
            value={localData.description}
            onChange={handleInputChange}
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          ></textarea>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="mb-2 text-lg font-medium text-gray-900">Company Logos</h3>
        {localData.companylogos.map((logo, index) => (
          <div key={index} className="mb-2">
            <input
              type="text"
              value={logo}
              onChange={(e) => handleLogoChange(index, e.target.value)}
              placeholder={`Logo URL ${index + 1}`}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        ))}
      </div>
      <div className="mt-4">
        <button
          onClick={handleSave}
          className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Save Companies Section
        </button>
      </div>
    </div>
  );
}