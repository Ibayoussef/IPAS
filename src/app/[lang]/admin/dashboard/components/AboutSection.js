"use client";
import { useState, useRef } from "react";
import Image from "next/image";

export default function AboutSection({ data, onChange, lang }) {
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
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", `about`);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Upload failed");
        }

        const result = await response.json();
        const imageUrl = `/images/${result.filename}`;
        setLocalData((prev) => ({ ...prev, asset: imageUrl }));
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Failed to upload image. Please try again.");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSave = () => {
    onChange(localData);
  };

  return (
    <div className="p-8 mb-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl shadow-lg">
      <h2 className="mb-6 text-4xl font-bold text-purple-800">About Section</h2>
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
            className="block w-full px-4 py-3 mt-1 text-lg text-black border-2 border-purple-300 rounded-xl focus:ring-purple-500 focus:border-purple-500"
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
            rows="5"
            value={localData.description[lang]}
            onChange={handleInputChange}
            className="block w-full px-4 py-3 mt-1 text-lg text-black border-2 border-purple-300 rounded-xl focus:ring-purple-500 focus:border-purple-500"
          ></textarea>
        </div>
        <div className="col-span-1 p-6 md:col-span-2 bg-white rounded-2xl shadow-md">
          <label className="block mb-4 text-xl font-semibold text-gray-700">
            Asset Image
          </label>
          <div className="flex flex-col items-center space-y-4 md:flex-row md:space-x-8 md:space-y-0">
            <div className="relative w-64 h-64 overflow-hidden border-4 border-purple-300 rounded-2xl">
              {localData.asset ? (
                <Image
                  src={localData.asset}
                  alt="About section asset"
                  layout="fill"
                  objectFit="cover"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-gray-100">
                  <span className="text-2xl text-gray-400">No image</span>
                </div>
              )}
            </div>
            <div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
              <button
                onClick={triggerFileInput}
                disabled={isUploading}
                className="px-6 py-3 text-lg font-semibold text-white bg-purple-600 rounded-xl hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 disabled:opacity-50 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
              >
                {isUploading ? "Uploading..." : "Upload Asset"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center">
        <button
          onClick={handleSave}
          className="px-10 py-4 text-2xl font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-4 focus:ring-purple-300 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
        >
          Save About Section
        </button>
      </div>
    </div>
  );
}
