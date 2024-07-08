"use client";
import { useState, useRef } from "react";
import Image from "next/image";

export default function CompaniesSection({ data, onChange, lang }) {
  const [localData, setLocalData] = useState(data);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalData((prev) => ({
      ...prev,
      [name]: { ...prev[name], [lang]: value },
    }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    setIsUploading(true);

    try {
      const uploadedUrls = [];
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append("file", files[i]);
        formData.append("name", `company${i}`);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Upload failed");
        }

        const result = await response.json();
        uploadedUrls.push(`/images/${result.filename}`);
      }

      setLocalData((prev) => ({
        ...prev,
        companylogos: [...prev.companylogos, ...uploadedUrls],
      }));
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Failed to upload one or more images. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (index) => {
    setLocalData((prev) => ({
      ...prev,
      companylogos: prev.companylogos.filter((_, i) => i !== index),
    }));
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSave = () => {
    onChange(localData);
  };

  return (
    <div className="p-8 mb-8 bg-gradient-to-r from-cyan-100 to-blue-100 rounded-3xl shadow-lg">
      <h2 className="mb-6 text-4xl font-bold text-blue-800">
        Companies Section
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
            value={localData.title[lang]}
            onChange={handleInputChange}
            className="block w-full px-4 py-3 mt-1 text-lg text-black border-2 border-blue-300 rounded-xl focus:ring-blue-500 focus:border-blue-500"
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
            value={localData.description[lang]}
            onChange={handleInputChange}
            className="block w-full px-4 py-3 mt-1 text-lg text-black border-2 border-blue-300 rounded-xl focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>
      </div>
      <div className="p-6 mt-8 bg-white rounded-2xl shadow-md">
        <h3 className="mb-4 text-2xl font-semibold text-blue-800">
          Company Logos
        </h3>
        <div className="grid grid-cols-2 gap-6 mb-6 md:grid-cols-3 lg:grid-cols-4">
          {localData.companylogos.map((logo, index) => (
            <div
              key={index}
              className="relative p-4 border-2 border-blue-200 rounded-xl"
            >
              <Image
                src={logo}
                alt={`Company logo ${index + 1}`}
                width={150}
                height={75}
                objectFit="contain"
                className="mx-auto"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 w-8 h-8 text-xl text-white bg-red-500 rounded-full hover:bg-red-600 focus:outline-none transition duration-300 ease-in-out transform hover:scale-110"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <div className="text-center">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            multiple
            className="hidden"
          />
          <button
            onClick={triggerFileInput}
            disabled={isUploading}
            className="px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          >
            {isUploading ? "Uploading..." : "Upload Company Logos"}
          </button>
        </div>
      </div>
      <div className="mt-8 text-center">
        <button
          onClick={handleSave}
          className="px-10 py-4 text-2xl font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl hover:from-cyan-700 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
        >
          Save Companies Section
        </button>
      </div>
    </div>
  );
}
