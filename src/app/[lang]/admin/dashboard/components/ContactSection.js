"use client";
import { useState, useRef } from "react";
import Image from "next/image";

export default function ContactSection({ data, onChange }) {
  const [localData, setLocalData] = useState(data);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInputsChange = (index, value) => {
    const newInputs = [...localData.inputs];
    newInputs[index] = value;
    setLocalData((prev) => ({ ...prev, inputs: newInputs }));
  };

  const addInputField = () => {
    setLocalData((prev) => ({
      ...prev,
      inputs: [...prev.inputs, ""],
    }));
  };

  const removeInputField = (index) => {
    setLocalData((prev) => ({
      ...prev,
      inputs: prev.inputs.filter((_, i) => i !== index),
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", `contact_asset_${Date.now()}`);

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
    <div className="p-8 mb-8 bg-gradient-to-r from-red-100 to-pink-100 rounded-3xl shadow-lg">
      <h2 className="mb-6 text-4xl font-bold text-red-800">Contact Section</h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="p-6 bg-white rounded-2xl shadow-md">
          <label className="block mb-2 text-xl font-semibold text-gray-700">
            Asset Image
          </label>
          <div className="flex flex-col items-center space-y-4">
            <div className="relative w-64 h-64 overflow-hidden border-4 border-red-300 rounded-2xl">
              {localData.asset ? (
                <Image
                  src={localData.asset}
                  alt="Contact section asset"
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
                className="px-6 py-3 text-lg font-semibold text-white bg-red-600 rounded-xl hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 disabled:opacity-50 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
              >
                {isUploading ? "Uploading..." : "Upload Asset"}
              </button>
            </div>
          </div>
        </div>
        <div className="space-y-6">
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
              className="block w-full px-4 py-3 mt-1 text-lg text-black border-2 border-red-300 rounded-xl focus:ring-red-500 focus:border-red-500"
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
              className="block w-full px-4 py-3 mt-1 text-lg text-black border-2 border-red-300 rounded-xl focus:ring-red-500 focus:border-red-500"
            ></textarea>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-md">
            <label
              htmlFor="sendButton"
              className="block mb-2 text-xl font-semibold text-gray-700"
            >
              Send Button Text
            </label>
            <input
              type="text"
              name="sendButton"
              id="sendButton"
              value={localData.sendButton}
              onChange={handleInputChange}
              className="block w-full px-4 py-3 mt-1 text-lg text-black border-2 border-red-300 rounded-xl focus:ring-red-500 focus:border-red-500"
            />
          </div>
        </div>
      </div>
      <div className="p-6 mt-8 bg-white rounded-2xl shadow-md">
        <h3 className="mb-4 text-2xl font-semibold text-red-800">
          Input Fields
        </h3>
        {localData.inputs.map((input, index) => (
          <div key={index} className="flex items-center mb-4 space-x-4">
            <input
              type="text"
              value={input}
              onChange={(e) => handleInputsChange(index, e.target.value)}
              placeholder={`Input field ${index + 1}`}
              className="flex-grow px-4 py-3 text-lg text-black border-2 border-red-300 rounded-xl focus:ring-red-500 focus:border-red-500"
            />
            <button
              onClick={() => removeInputField(index)}
              className="px-4 py-2 text-lg font-semibold text-white bg-red-500 rounded-xl hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 transition duration-300 ease-in-out"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={addInputField}
          className="px-6 py-3 mt-4 text-lg font-semibold text-white bg-red-600 rounded-xl hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
        >
          Add Input Field
        </button>
      </div>
      <div className="mt-8 text-center">
        <button
          onClick={handleSave}
          className="px-10 py-4 text-2xl font-bold text-white bg-gradient-to-r from-red-600 to-pink-600 rounded-xl hover:from-red-700 hover:to-pink-700 focus:outline-none focus:ring-4 focus:ring-red-300 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
        >
          Save Contact Section
        </button>
      </div>
    </div>
  );
}
