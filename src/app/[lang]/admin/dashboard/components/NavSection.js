"use client";
import Image from "next/image";
import { useState, useRef } from "react";

export default function NavSection({ data, onChange, lang }) {
  const [localData, setLocalData] = useState(data);
  const [previewUrl, setPreviewUrl] = useState(data.logo);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLinkChange = (index, value) => {
    const newLinks = [...localData.links];
    newLinks[index] = { ...newLinks[index], [lang]: value };
    setLocalData((prev) => ({ ...prev, links: newLinks }));
  };

  const addLink = () => {
    setLocalData((prev) => ({ ...prev, links: [...prev.links, ""] }));
  };

  const removeLink = (index) => {
    const newLinks = localData.links.filter((_, i) => i !== index);
    setLocalData((prev) => ({ ...prev, links: newLinks }));
  };

  const handleSave = () => {
    onChange(localData);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", "logo");

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
        setPreviewUrl(imageUrl);
        setLocalData((prev) => ({ ...prev, logo: imageUrl }));
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

  return (
    <div className="p-8 mb-8 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl shadow-lg">
      <h2 className="mb-6 text-4xl font-bold text-gray-800">
        Navigation Section
      </h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="p-6 bg-white rounded-xl shadow-md">
          <label className="block mb-3 text-xl font-semibold text-gray-700">
            Logo
          </label>
          <div className="flex flex-col items-center space-y-4">
            <div className="relative w-40 h-40 overflow-hidden border-4 border-blue-300 rounded-2xl">
              {previewUrl ? (
                <Image
                  src={previewUrl}
                  alt="Logo preview"
                  layout="fill"
                  objectFit="cover"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-gray-100">
                  <span className="text-lg text-gray-400">No image</span>
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
                className="px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
              >
                Upload Logo
              </button>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="p-6 bg-white rounded-xl shadow-md">
            <label
              htmlFor="phone"
              className="block mb-2 text-xl font-semibold text-gray-700"
            >
              Phone
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={localData.phone}
              onChange={handleInputChange}
              className="block w-full px-4 py-3 text-lg text-black border-2 border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md">
            <label
              htmlFor="email"
              className="block mb-2 text-xl font-semibold text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={localData.email}
              onChange={handleInputChange}
              className="block w-full px-4 py-3 text-lg text-black border-2 border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
      <div className="mt-8 p-6 bg-white rounded-xl shadow-md">
        <label className="block mb-4 text-2xl font-semibold text-gray-700">
          Links
        </label>
        {localData.links.map((link, index) => (
          <div key={index} className="flex mt-4">
            <input
              type="text"
              value={link[lang]}
              onChange={(e) => handleLinkChange(index, e.target.value)}
              className="flex-grow block w-full px-4 py-3 text-lg text-black border-2 border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500"
              placeholder={`Link ${index + 1}`}
            />
            <button
              onClick={() => removeLink(index)}
              className="px-4 py-2 ml-4 text-lg font-semibold text-white bg-red-500 rounded-xl hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 transition duration-300 ease-in-out"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={addLink}
          className="px-6 py-3 mt-6 text-lg font-semibold text-white bg-green-500 rounded-xl hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
        >
          Add Link
        </button>
      </div>
      <div className="mt-8 text-center">
        <button
          onClick={handleSave}
          className="px-8 py-4 text-xl font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
        >
          Save Navigation Section
        </button>
      </div>
    </div>
  );
}
