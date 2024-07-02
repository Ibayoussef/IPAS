"use client"
import { useState } from 'react';

export default function ServicesSection({ data, onChange }) {
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
      <h2 className="mb-4 text-2xl font-semibold">Services Section</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="Title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="Title"
            id="Title"
            value={localData.Title}
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
        <div>
          <label htmlFor="dropdownContect" className="block text-sm font-medium text-gray-700">Dropdown Content</label>
          <textarea
            name="dropdownContect"
            id="dropdownContect"
            rows="3"
            value={localData.dropdownContect}
            onChange={handleInputChange}
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          ></textarea>
        </div>
        <div>
          <label htmlFor="dropdownImgs" className="block text-sm font-medium text-gray-700">Dropdown Images (comma-separated URLs)</label>
          <input
            type="text"
            name="dropdownImgs"
            id="dropdownImgs"
            value={localData.dropdownImgs.join(',')}
            onChange={(e) => handleInputChange({target: {name: 'dropdownImgs', value: e.target.value.split(',')}})}
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>
      <div className="mt-4">
        <button
          onClick={handleSave}
          className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Save Services Section
        </button>
      </div>
    </div>
  );
}