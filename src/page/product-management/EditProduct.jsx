// In EditProduct.jsx
import React, { useState, useEffect } from "react";
import { message } from "antd";
import { MdCloudUpload, MdKeyboardArrowDown } from "react-icons/md";

const EditProduct = ({ isVisible, onClose, product, onUpdateProduct }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    brand: "Squre Pharma",
    category: "Endodontics",
    procedureGuide: "Root canal",
    availability: "In Stock",
    price: "",
    image: null,
  });

  // Initialize form with product data when component mounts or product prop changes
  useEffect(() => {
    if (product) {
      setFormData({
        productName: product.name || "",
        description: product.description || "",
        brand: product.brand || "Squre Pharma",
        category: product.category || "Endodontics",
        procedureGuide: product.procedureGuide || "Root canal",
        availability: product.availability || "In Stock",
        price: product.price || "",
        image: product.image || null,
      });
    }
  }, [product]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prev) => ({ ...prev, image: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onUpdateProduct({
        ...formData,
        id: product.id,
      });
    } catch (error) {
      console.error("Error updating product:", error);
      message.error("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl p-5">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Side - Image Upload */}
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Product Image
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="product-image-upload"
                />
                <label
                  htmlFor="product-image-upload"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-200"
                >
                  {formData.image ? (
                    <img
                      src={formData.image}
                      alt="Product"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <MdCloudUpload className="w-12 h-12 text-gray-400" />
                      <span className="text-gray-500 font-medium">
                        Upload Product Image
                      </span>
                      <span className="text-xs text-gray-400">
                        Click to upload or drag and drop
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                required
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
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none"
                required
              />
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                step="0.01"
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                required
              />
            </div>

            {/* Select Brand */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Brand
              </label>
              <div className="relative">
                <select
                  value={formData.brand}
                  onChange={(e) => handleInputChange("brand", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 appearance-none bg-white"
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
                Category
              </label>
              <div className="relative">
                <select
                  value={formData.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 appearance-none bg-white"
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
                Procedure Guide
              </label>
              <div className="relative">
                <select
                  value={formData.procedureGuide}
                  onChange={(e) =>
                    handleInputChange("procedureGuide", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 appearance-none bg-white"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 appearance-none bg-white"
                >
                  <option value="In Stock">In Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                  <option value="Limited Stock">Limited Stock</option>
                  <option value="Pre-order">Pre-order</option>
                </select>
                <MdKeyboardArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
