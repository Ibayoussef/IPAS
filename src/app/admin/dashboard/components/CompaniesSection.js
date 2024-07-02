"use client"
import { useState, useRef } from 'react';
import Image from 'next/image';

export default function CompaniesSection({ data, onChange }) {
  const [localData, setLocalData] = useState(data);
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
    const files = Array.from(e.target.files);
    setIsUploading(true);

    try {
      const uploadedUrls = [];
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append('file', files[i]);
        formData.append('name', `company${i}`);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Upload failed');
        }

        const result = await response.json();
        uploadedUrls.push(`/images/${result.filename}`);
      }

      setLocalData(prev => ({
        ...prev,
        companylogos: [...prev.companylogos, ...uploadedUrls]
      }));
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Failed to upload one or more images. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (index) => {
    setLocalData(prev => ({
      ...prev,
      companylogos: prev.companylogos.filter((_, i) => i !== index)
    }));
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSave = () => {
    onChange(localData);
  };

  return (
    <div className="p-6 mb-6 bg-white rounded-lg shadow">
      <h2 className="mb-4 text-2xl font-semibold">Companies Section</h2>
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
        <h3 className="mb-2 text-lg font-medium text-gray-900">Company Logos</h3>
        <div className="grid grid-cols-3 gap-4 mb-4">
          {localData.companylogos.map((logo, index) => (
            <div key={index} className="relative">
              <Image 
                src={logo} 
                alt={`Company logo ${index + 1}`} 
                width={100} 
                height={50} 
                objectFit="contain" 
                className="border rounded-md"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-0 right-0 p-1 text-white bg-red-500 rounded-full hover:bg-red-600 focus:outline-none"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <div>
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
            className="px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isUploading ? 'Uploading...' : 'Upload Company Logos'}
          </button>
        </div>
      </div>
      <div className="mt-4">
        <button
          onClick={handleSave}
          className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Save Companies Section
        </button>
      </div>
    </div>
  );
}