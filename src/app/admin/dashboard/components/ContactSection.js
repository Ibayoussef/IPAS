"use client"
import { useState } from 'react';

export default function ContactSection({ data, onChange }) {
  const [localData, setLocalData] = useState(data);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInputsChange = (index, value) => {
    const newInputs = [...localData.inputs];
    newInputs[index] = value;
    setLocalData(prev => ({ ...prev, inputs: newInputs }));
  };

  const handleSave = () => {
    onChange(localData);
  };

  return (
    <div className="p-6 mb-6 bg-white rounded-lg shadow">
      <h2 className="mb-4 text-2xl font-semibold">Contact Section</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="asset" className="block text-sm font-medium text-gray-700">Asset URL</label>
          <input
            type="text"
            name="asset"
            id="asset"
            value={localData.asset}
            onChange={handleInputChange}
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
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
        <div>
          <label htmlFor="sendButton" className="block text-sm font-medium text-gray-700">Send Button Text</label>
          <input
            type="text"
            name="sendButton"
            id="sendButton"
            value={localData.sendButton}
            onChange={handleInputChange}
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>
      <div className="mt-6">
        <h3 className="mb-2 text-lg font-medium text-gray-900">Input Fields</h3>
        {localData.inputs.map((input, index) => (
          <div key={index} className="mb-2">
            <input
              type="text"
              value={input}
              onChange={(e) => handleInputsChange(index, e.target.value)}
              placeholder={`Input field ${index + 1}`}
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
          Save Contact Section
        </button>
      </div>
    </div>
  );
}