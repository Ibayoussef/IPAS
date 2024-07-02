"use client"
import { useState } from 'react';

export default function TestimonialsSection({ data, onChange }) {
  const [localData, setLocalData] = useState(data);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTestimonialChange = (index, field, value) => {
    const newTestimonials = [...localData.testi];
    newTestimonials[index] = { ...newTestimonials[index], [field]: value };
    setLocalData(prev => ({ ...prev, testi: newTestimonials }));
  };

  const handleSave = () => {
    onChange(localData);
  };

  return (
    <div className="p-6 mb-6 bg-white rounded-lg shadow">
      <h2 className="mb-4 text-2xl font-semibold">Testimonials Section</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={localData.title}
            onChange={handleInputChange}
            className="block w-full mt-1 text-black border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
            className="block w-full mt-1 text-black border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          ></textarea>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="mb-2 text-lg font-medium text-gray-900">Testimonials</h3>
        {localData.testi.map((testimonial, index) => (
          <div key={index} className="p-4 mb-4 border border-gray-200 rounded-md">
            <input
              type="text"
              value={testimonial.name}
              onChange={(e) => handleTestimonialChange(index, 'name', e.target.value)}
              placeholder="Name"
              className="block w-full mb-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <textarea
              value={testimonial.text}
              onChange={(e) => handleTestimonialChange(index, 'text', e.target.value)}
              placeholder="Testimonial text"
              rows="3"
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            ></textarea>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <button
          onClick={handleSave}
          className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Save Testimonials Section
        </button>
      </div>
    </div>
  );
}