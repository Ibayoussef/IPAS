"use client"
import { useState, useRef } from 'react';
import Image from 'next/image';

export default function ServicesSection({ data, onChange }) {
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

  const handleDropdownContentChange = (index, field, value) => {
    setLocalData(prev => ({
      ...prev,
      dropdownContent: prev.dropdownContent.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addDropdownItem = () => {
    setLocalData(prev => ({
      ...prev,
      dropdownContent: [...prev.dropdownContent, { img: "", title: "", description: "" }]
    }));
  };

  const removeDropdownItem = (index) => {
    setLocalData(prev => ({
      ...prev,
      dropdownContent: prev.dropdownContent.filter((_, i) => i !== index)
    }));
  };

  const handleImageUpload = async (e, index) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', `dropdown_${index}_${Date.now()}`);

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
        handleDropdownContentChange(index, 'img', imageUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Failed to upload image. Please try again.');
      } finally {
        setIsUploading(false);
      }
    }
  };

  const triggerFileInput = (index) => {
    fileInputRef.current.click();
    fileInputRef.current.dataset.index = index;
  };

  const handleSave = () => {
    onChange(localData);
  };

  return (
    <div className="p-6 mb-6 bg-white rounded-lg shadow">
      <h2 className="mb-4 text-2xl font-semibold">Services Section</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="Title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="Title"
            id="Title"
            value={localData.Title}
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
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Dropdown Content</label>
          {localData.dropdownContent.map((item, index) => (
            <div key={index} className="grid grid-cols-3 gap-4 p-4 mt-4 border border-gray-200 rounded-md">
              <div className="col-span-1">
                <div className="relative w-full h-32 mb-2">
                  {item.img ? (
                    <Image src={item.img} alt={`Dropdown ${index + 1}`} layout="fill" objectFit="cover" className="rounded-md" />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-100 rounded-md">
                      <span className="text-gray-400">No image</span>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => triggerFileInput(index)}
                  className="w-full px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {item.img ? 'Change Image' : 'Upload Image'}
                </button>
              </div>
              <div className="col-span-2 space-y-2">
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => handleDropdownContentChange(index, 'title', e.target.value)}
                  placeholder="Title"
                  className="block w-full text-black border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <textarea
                  value={item.description}
                  onChange={(e) => handleDropdownContentChange(index, 'description', e.target.value)}
                  placeholder="Description"
                  rows="3"
                  className="block w-full text-black border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <button
                  onClick={() => removeDropdownItem(index)}
                  className="px-2 py-1 text-sm text-red-600 border border-red-600 rounded-md hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Remove Item
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={addDropdownItem}
            className="px-4 py-2 mt-4 text-sm text-blue-600 border border-blue-600 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add Dropdown Item
          </button>
        </div>
      </div>
      <div className="mt-4">
        <button
          onClick={handleSave}
          className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Save Services Section
        </button>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => handleImageUpload(e, fileInputRef.current.dataset.index)}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
}