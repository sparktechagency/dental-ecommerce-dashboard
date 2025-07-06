// AddProduct.jsx
import React, { useState } from "react";
import { Modal } from "antd";
import { MdCloudUpload, MdKeyboardArrowDown } from "react-icons/md";

export default AddProduct = ({ isVisible, onClose, onAddProduct }) => {
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    brand: "Squre Pharma",
    category: "Endodontics",
    procedureGuide: "Root canal",
    availability: "In Stock",
  });

  const [mainImage, setMainImage] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageUpload = (event, isMain = true) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (isMain) {
          setMainImage(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add any validation here
    onAddProduct({ ...formData, image: mainImage });
  };

  return (
    <Modal
      title="Add New Product"
      open={isVisible}
      onCancel={onClose}
      footer={null}
      width={700}
    >
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="p-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Left Side - Image Upload */}
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Upload Product Thumbnail Image
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="main-image-upload"
                  />
                  <label
                    htmlFor="main-image-upload"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-200"
                  >
                    {mainImage ? (
                      <img
                        src={mainImage}
                        alt="Main product"
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <MdCloudUpload className="w-12 h-12 text-gray-400" />
                        <span className="text-gray-500 font-medium">
                          Upload Product Thumbnail Image
                        </span>
                      </div>
                    )}
                  </label>
                </div>
              </div>
            </div>

            {/* Right Side - Form Fields */}
            <div className="space-y-5">
              {/* Product Name */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <input
                  type="text"
                  value={formData.productName}
                  onChange={(e) =>
                    handleInputChange("productName", e.target.value)
                  }
                  placeholder="Type here"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  placeholder="Type here"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none"
                />
              </div>

              {/* Select Brand */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Select Brand
                </label>
                <div className="relative">
                  <select
                    value={formData.brand}
                    onChange={(e) => handleInputChange("brand", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 appearance-none bg-white"
                  >
                    <option value="Squre Pharma">Squre Pharma</option>
                    <option value="Panora">Panora</option>
                    <option value="MedTech">MedTech</option>
                    <option value="DentalCare">DentalCare</option>
                  </select>
                  <MdKeyboardArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Select Category */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Select Category
                </label>
                <div className="relative">
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      handleInputChange("category", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 appearance-none bg-white"
                  >
                    <option value="Endodontics">Endodontics</option>
                    <option value="Orthodontics">Orthodontics</option>
                    <option value="Periodontics">Periodontics</option>
                    <option value="Oral Surgery">Oral Surgery</option>
                  </select>
                  <MdKeyboardArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Select Procedure Guide */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Select Procedure guide
                </label>
                <div className="relative">
                  <select
                    value={formData.procedureGuide}
                    onChange={(e) =>
                      handleInputChange("procedureGuide", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 appearance-none bg-white"
                  >
                    <option value="Root canal">Root canal</option>
                    <option value="Crown placement">Crown placement</option>
                    <option value="Tooth extraction">Tooth extraction</option>
                    <option value="Dental implant">Dental implant</option>
                  </select>
                  <MdKeyboardArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Availability */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Availability
                </label>
                <div className="relative">
                  <select
                    value={formData.availability}
                    onChange={(e) =>
                      handleInputChange("availability", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 appearance-none bg-white"
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                    <option value="Limited Stock">Limited Stock</option>
                    <option value="Pre-order">Pre-order</option>
                  </select>
                  <MdKeyboardArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-5 pt-5">
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
