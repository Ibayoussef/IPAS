"use client"
import { useState, useRef } from 'react';
import Image from 'next/image';

export default function HeroSection({ data, onChange }) {
  const [localData, setLocalData] = useState(data);
  const [previewUrl, setPreviewUrl] = useState(data.heroImg);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', 'hero');

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Upload failed');
        }

        const result = await response.json();
        const imageUrl = `/images/${result.filename}`;
        setPreviewUrl(imageUrl);
        setLocalData(prev => ({ ...prev, heroImg: imageUrl }));
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Failed to upload image. Please try again.');
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
    <div className="p-6 mb-6 bg-white rounded-lg shadow">
      <h2 className="mb-4 text-2xl font-semibold">Hero Section</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="bigText" className="block text-sm font-medium text-black text-gray-700">Big Text</label>
          <input
            type="text"
            name="bigText"
            id="bigText"
            value={localData.bigText}
            onChange={handleInputChange}
            className="block w-full mt-1 text-black border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="smallText" className="block text-sm font-medium text-gray-700">Small Text</label>
          <input
            type="text"
            name="smallText"
            id="smallText"
            value={localData.smallText}
            onChange={handleInputChange}
            className="block w-full mt-1 text-black border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Hero Image</label>
          <div className="flex items-center mt-1 space-x-4">
            <div className="relative w-32 h-24 overflow-hidden border border-gray-300 rounded-md">
              {previewUrl ? (
                <Image src={previewUrl} alt="Hero image preview" layout="fill" objectFit="cover" />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-gray-100">
                  <span className="text-gray-400">No image</span>
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
                className="px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {isUploading ? 'Uploading...' : 'Upload Hero Image'}
              </button>
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="buttonText" className="block text-sm font-medium text-gray-700">Button Text</label>
          <input
            type="text"
            name="buttonText"
            id="buttonText"
            value={localData.buttonText}
            onChange={handleInputChange}
            className="block w-full mt-1 text-black border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="sm:col-span-2">
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
      <div className="mt-4">
        <button
          onClick={handleSave}
          className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Save Hero Section
        </button>
      </div>
    </div>
  );
}