// components/NavSection.js
"use client"
import Image from 'next/image';
import { useState, useRef } from 'react';

export default function NavSection({ data, onChange }) {
  const [localData, setLocalData] = useState(data);
  const [previewUrl, setPreviewUrl] = useState(data.logo);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLinkChange = (index, value) => {
    const newLinks = [...localData.links];
    newLinks[index] = value;
    setLocalData(prev => ({ ...prev, links: newLinks }));
  };

  const addLink = () => {
    setLocalData(prev => ({ ...prev, links: [...prev.links, ''] }));
  };

  const removeLink = (index) => {
    const newLinks = localData.links.filter((_, i) => i !== index);
    setLocalData(prev => ({ ...prev, links: newLinks }));
  };

  const handleSave = () => {
    onChange(localData);
  };
 
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', 'logo')

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
        setLocalData(prev => ({ ...prev, logo: imageUrl }));
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

  return (
    <div className="p-6 mb-6 bg-white rounded-lg shadow">
      <h2 className="mb-4 text-2xl font-semibold">Navigation Section</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Logo</label>
          <div className="flex items-center space-x-4">
            <div className="relative w-24 h-24 overflow-hidden border border-gray-300 rounded-md">
              {previewUrl ? (
                <Image src={previewUrl} alt="Logo preview" layout="fill" objectFit="cover" />
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
                className="px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Upload Logo
              </button>
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            id="phone"
            value={localData.phone}
            onChange={handleInputChange}
            className="block w-full mt-1 text-black border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={localData.email}
            onChange={handleInputChange}
            className="block w-full mt-1 text-black border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700">Links</label>
        {localData.links.map((link, index) => (
          <div key={index} className="flex mt-2">
            <input
              type="text"
              value={link}
              onChange={(e) => handleLinkChange(index, e.target.value)}
              className="flex-grow block w-full text-black border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder={`Link ${index + 1}`}
            />
            <button
              onClick={() => removeLink(index)}
              className="px-2 py-1 ml-2 text-sm text-red-600 border border-red-600 rounded-md hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={addLink}
          className="px-4 py-2 mt-2 text-sm text-blue-600 border border-blue-600 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Link
        </button>
      </div>
      <div className="mt-6">
        <button
          onClick={handleSave}
          className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Save Navigation Section
        </button>
      </div>
    </div>
  );
}