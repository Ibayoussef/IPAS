"use client";
import { useState, useRef } from "react";

export default function ServicesSection({ data, onChange, lang }) {
  const [localData, setLocalData] = useState(data);
  const [uploadingIndex, setUploadingIndex] = useState(null);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalData((prev) => ({
      ...prev,
      [name]: { ...prev[name], [lang]: value },
    }));
  };
  const handleDropdownContentChange = (index, field, value) => {
    setLocalData((prev) => ({
      ...prev,
      dropdownContent: prev.dropdownContent.map((item, i) =>
        i === index
          ? { ...item, [field]: { ...item[field], [lang]: value } }
          : item
      ),
    }));
  };

  const addDropdownItem = () => {
    setLocalData((prev) => ({
      ...prev,
      dropdownContent: [
        ...prev.dropdownContent,
        { img: "", title: "", description: "" },
      ],
    }));
  };

  const removeDropdownItem = (index) => {
    setLocalData((prev) => ({
      ...prev,
      dropdownContent: prev.dropdownContent.filter((_, i) => i !== index),
    }));
  };

  const handleImageUpload = async (e, index) => {
    const file = e.target.files[0];
    if (file) {
      setUploadingIndex(index);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", `dropdown_${index}_${Date.now()}`);

      try {
        const response = await fetch("https://ipadviceandservices.com/api/upload-file.php", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Upload failed");
        }

        const result = await response.json();
        const updatedData = {
          ...localData,
          dropdownContent: localData.dropdownContent.map((item, i) =>
            i === parseInt(index) ? { ...item, img: result.url } : item
          ),
        };
        setLocalData(updatedData);
        onChange(updatedData);
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Failed to upload image. Please try again.");
      } finally {
        setUploadingIndex(null);
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
    <div className="p-8 mb-8 bg-gradient-to-r from-green-100 to-teal-100 rounded-3xl shadow-lg">
      <h2 className="mb-6 text-4xl font-bold text-green-800">
        Services Section
      </h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="p-6 bg-white rounded-2xl shadow-md">
          <label
            htmlFor="Title"
            className="block mb-2 text-xl font-semibold text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            name="Title"
            id="Title"
            value={localData.Title[lang]}
            onChange={handleInputChange}
            className="block w-full px-4 py-3 mt-1 text-lg text-black border-2 border-green-300 rounded-xl focus:ring-green-500 focus:border-green-500"
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
            className="block w-full px-4 py-3 mt-1 text-lg text-black border-2 border-green-300 rounded-xl focus:ring-green-500 focus:border-green-500"
          ></textarea>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="mb-4 text-2xl font-semibold text-green-800">
          Dropdown Content
        </h3>
        {localData.dropdownContent.map((item, index) => (
          <div key={index} className="p-6 mb-6 bg-white rounded-2xl shadow-md">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="col-span-1">
                <div className="relative w-full h-48 mb-4 overflow-hidden border-4 border-green-300 rounded-xl">
                  {item.img ? (
                    <img
                    lazy
                      src={item.img}
                    
                      alt={`Dropdown ${index + 1}`}
                      objectFit="cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-100">
                      <span className="text-xl text-gray-400">No image</span>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => triggerFileInput(index)}
                  disabled={uploadingIndex !== null}
                  className="w-full px-6 py-3 text-lg font-semibold text-white bg-green-600 rounded-xl hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploadingIndex === index ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Uploading...
                    </span>
                  ) : item.img ? (
                    "Change Image"
                  ) : (
                    "Upload Image"
                  )}
                </button>
              </div>
              <div className="col-span-2 space-y-4">
                <input
                  type="text"
                  value={item.title[lang]}
                  onChange={(e) =>
                    handleDropdownContentChange(index, "title", e.target.value)
                  }
                  placeholder="Title"
                  className="block w-full px-4 py-3 text-lg text-black border-2 border-green-300 rounded-xl focus:ring-green-500 focus:border-green-500"
                />
                <textarea
                  value={item.description[lang]}
                  onChange={(e) =>
                    handleDropdownContentChange(
                      index,
                      "description",
                      e.target.value
                    )
                  }
                  placeholder="Description"
                  rows="4"
                  className="block w-full px-4 py-3 text-lg text-black border-2 border-green-300 rounded-xl focus:ring-green-500 focus:border-green-500"
                />
                <button
                  onClick={() => removeDropdownItem(index)}
                  className="px-6 py-3 text-lg font-semibold text-white bg-red-500 rounded-xl hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 transition duration-300 ease-in-out"
                >
                  Remove Item
                </button>
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={addDropdownItem}
          className="px-8 py-4 mt-6 text-xl font-bold text-white bg-green-600 rounded-xl hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
        >
          Add Dropdown Item
        </button>
      </div>
      <div className="mt-8 text-center">
        <button
          onClick={handleSave}
          className="px-10 py-4 text-2xl font-bold text-white bg-gradient-to-r from-green-600 to-teal-600 rounded-xl hover:from-green-700 hover:to-teal-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
        >
          Save Services Section
        </button>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) =>
          handleImageUpload(e, fileInputRef.current.dataset.index)
        }
        accept="image/*"
        className="hidden"
      />
    </div>
  );
}
