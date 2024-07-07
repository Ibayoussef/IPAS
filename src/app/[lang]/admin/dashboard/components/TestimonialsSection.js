"use client";
import { useState } from "react";

export default function TestimonialsSection({ data, onChange }) {
  const [localData, setLocalData] = useState(data);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTestimonialChange = (index, field, value) => {
    const newTestimonials = [...localData.testi];
    newTestimonials[index] = { ...newTestimonials[index], [field]: value };
    setLocalData((prev) => ({ ...prev, testi: newTestimonials }));
  };

  const handleSave = () => {
    onChange(localData);
  };

  return (
    <div className="p-8 mb-8 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-3xl shadow-lg">
      <h2 className="mb-6 text-4xl font-bold text-orange-800">
        Testimonials Section
      </h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="p-6 bg-white rounded-2xl shadow-md">
          <label
            htmlFor="title"
            className="block mb-2 text-xl font-semibold text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={localData.title}
            onChange={handleInputChange}
            className="block w-full px-4 py-3 mt-1 text-lg text-black border-2 border-orange-300 rounded-xl focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-md">
          <label
            htmlFor="description"
            className="block mb-2 text-xl font-semibold text-gray-700"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            rows="4"
            value={localData.description}
            onChange={handleInputChange}
            className="block w-full px-4 py-3 mt-1 text-lg text-black border-2 border-orange-300 rounded-xl focus:ring-orange-500 focus:border-orange-500"
          ></textarea>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="mb-4 text-2xl font-semibold text-orange-800">
          Testimonials
        </h3>
        {localData.testi.map((testimonial, index) => (
          <div key={index} className="p-6 mb-6 bg-white rounded-2xl shadow-md">
            <input
              type="text"
              value={testimonial.name}
              onChange={(e) =>
                handleTestimonialChange(index, "name", e.target.value)
              }
              placeholder="Name"
              className="block w-full px-4 py-3 mb-4 text-lg text-black border-2 border-orange-300 rounded-xl focus:ring-orange-500 focus:border-orange-500"
            />
            <textarea
              value={testimonial.text}
              onChange={(e) =>
                handleTestimonialChange(index, "text", e.target.value)
              }
              placeholder="Testimonial text"
              rows="4"
              className="block w-full px-4 py-3 text-lg text-black border-2 border-orange-300 rounded-xl focus:ring-orange-500 focus:border-orange-500"
            ></textarea>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <button
          onClick={handleSave}
          className="px-10 py-4 text-2xl font-bold text-white bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl hover:from-yellow-600 hover:to-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-300 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
        >
          Save Testimonials Section
        </button>
      </div>
    </div>
  );
}
