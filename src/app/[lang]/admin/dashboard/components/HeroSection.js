"use client";
import { useState, useRef } from "react";
import Image from "next/image";

export default function HeroSection({ data, onChange, lang }) {
  const [localData, setLocalData] = useState(data);
  const [previewUrl, setPreviewUrl] = useState(data.heroImg);
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
      formData.append("name", "hero");

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Upload failed");
        }

        const result = await response.json();

        setPreviewUrl(result.url);
        setLocalData((prev) => ({ ...prev, heroImg: result.url }));
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
    <div className="p-8 mb-8 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-3xl shadow-lg">
      <h2 className="mb-6 text-4xl font-bold text-indigo-800">Hero Section</h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="p-6 bg-white rounded-2xl shadow-md">
          <label
            htmlFor="bigText"
            className="block mb-2 text-xl font-semibold text-gray-700"
          >
            Big Text
          </label>
          <input
            type="text"
            name="bigText"
            id="bigText"
            value={localData.bigText[lang]}
            onChange={handleInputChange}
            className="block w-full px-4 py-3 mt-1 text-lg text-black border-2 border-indigo-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-md">
          <label
            htmlFor="smallText"
            className="block mb-2 text-xl font-semibold text-gray-700"
          >
            Small Text
          </label>
          <input
            type="text"
            name="smallText"
            id="smallText"
            value={localData.smallText[lang]}
            onChange={handleInputChange}
            className="block w-full px-4 py-3 mt-1 text-lg text-black border-2 border-indigo-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-md">
          <label className="block mb-4 text-xl font-semibold text-gray-700">
            Hero Image
          </label>
          <div className="flex flex-col items-center space-y-4">
            <div className="relative w-full h-48 overflow-hidden border-4 border-indigo-300 rounded-xl">
              {previewUrl ? (
                <Image
                  src={previewUrl}
                  alt="Hero image preview"
                  layout="fill"
                  objectFit="cover"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-gray-100">
                  <span className="text-xl text-gray-400">No image</span>
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
                className="px-6 py-3 text-lg font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 disabled:opacity-50 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
              >
                {isUploading ? "Uploading..." : "Upload Hero Image"}
              </button>
            </div>
          </div>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-md">
          <label
            htmlFor="buttonText"
            className="block mb-2 text-xl font-semibold text-gray-700"
          >
            Button Text
          </label>
          <input
            type="text"
            name="buttonText"
            id="buttonText"
            value={localData.buttonText[lang]}
            onChange={handleInputChange}
            className="block w-full px-4 py-3 mt-1 text-lg text-black border-2 border-indigo-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="p-6 col-span-1 md:col-span-2 bg-white rounded-2xl shadow-md">
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
            className="block w-full px-4 py-3 mt-1 text-lg text-black border-2 border-indigo-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500"
          ></textarea>
        </div>
      </div>
      <div className="mt-8 text-center">
        <button
          onClick={handleSave}
          className="px-8 py-4 text-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
        >
          Save Hero Section
        </button>
      </div>
    </div>
  );
}
