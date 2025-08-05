import React, { useState } from "react";
import PageHeading from "../../shared/PageHeading";
import t1 from "../../assets/t1.png";
import t2 from "../../assets/t2.jpg";
import t3 from "../../assets/t3.jpg";
import t5 from "../../assets/t5.jpg";
import t6 from "../../assets/t6.png";
import t7 from "../../assets/t7.jpg";
import { Modal, message } from "antd";
import EditProduct from "./EditProduct";

export default function ViewProduct() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Mock product data - in real app, this would come from props or API
  const product = {
    id: 1,
    name: "PANORA 200",
    brand: "Panora",
    category: "Root Canal",
    price: 500.00,
    availability: "In Stock",
    description: "The NSK Ti-Max Z Micro SL High-Speed Handpiece is a premium dental instrument designed for precision and reliability. It features a micro head with dimensions of Ø 9 x 10.8 mm, offering enhanced visibility and maneuverability. This handpiece comes with a fibre-optic illumination system, providing clear and bright lighting for improved visibility during procedures. It uses a Sirona connection and is equipped with Quattro Spray for optimal cooling.",
    images: [t1, t2, t3, t5, t6, t7]
  };

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setIsDeleteModalVisible(true);
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setIsEditModalVisible(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      // Add your delete logic here
      // await deleteProduct(selectedProduct.id);
      message.success("Product deleted successfully");
      setIsDeleteModalVisible(false);
      setSelectedProduct(null);
      // Optionally redirect to products list after deletion
      // navigate('/products');
    } catch (error) {
      console.error("Error deleting product:", error);
      message.error("Failed to delete product");
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false);
    setSelectedProduct(null);
  };

  const handleEditClose = () => {
    setIsEditModalVisible(false);
    setSelectedProduct(null);
  };

  const handleEditUpdate = async (updatedProduct) => {
    try {
      // Add your update logic here
      // await updateProduct(updatedProduct);
      console.log("Updated product:", updatedProduct);
      message.success("Product updated successfully");
    } catch (error) {
      console.error("Error updating product:", error);
      message.error("Failed to update product");
    } finally {
      setIsEditModalVisible(false);
      setSelectedProduct(null);
    }
  };

  const productImages = product.images;

  return (
    <div className="w-full pb-10">
      <div className="flex justify-between items-start md:items-center mb-5 gap-5">
        <PageHeading title="Product Details" />
        <div className="flex gap-2">
          <button
            onClick={() => handleDeleteClick(product)}
            className="px-5 py-2 border border-red-600 text-red-600 rounded-lg"
          >
            Delete
          </button>
          <button
            onClick={() => handleEditClick(product)}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg"
          >
            Edit
          </button>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left Side - Product Images */}
        <div className="w-full space-y-5">
          <div className="w-full bg-gray-100 rounded-xl overflow-hidden group" style={{ maxHeight: '600px' }}>
            <img
              src={productImages[selectedImage]}
              alt="PANORA 200"
              className="w-full h-[500px] md:h-[600px] mx-auto object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <div className="w-full flex gap-3 overflow-x-auto pb-2">
            {productImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${selectedImage === index
                    ? "border-blue-500 ring-2 ring-blue-200"
                    : "border-gray-200 hover:border-gray-300"
                  }`}
              >
                <img
                  src={image}
                  alt={`Product view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Side - Product Details */}
        <div className="w-full space-y-5">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">{product.name}</h1>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#9F9C96]">Availability:</span>
            <span className="text-[#136BFB] font-semibold">{product.availability}</span>
          </div>

          <div className="space-y-2">
            <p className="text-[#9F9C96] leading-relaxed">{product.description}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[#9F9C96]">Brand:</span>
              <span className="text-[#136BFB] font-semibold">{product.brand}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#9F9C96]">Procedure:</span>
              <span className="text-[#136BFB] font-semibold">{product.category}</span>
            </div>
          </div>

          <div className="py-4">
            <p className="text-4xl font-bold text-[#136BFB]">${product.price}.00</p>
          </div>
        </div>
      </div>
      {/* Edit Product Modal */}
      {isEditModalVisible && (
        <EditProduct
          isVisible={isEditModalVisible}
          onClose={handleEditClose}
          product={selectedProduct}
          onUpdateProduct={handleEditUpdate}
        />
      )}
      
      {/* Delete Confirmation Modal */}
      <Modal
        title="Delete Product"
        open={isDeleteModalVisible}
        onCancel={handleDeleteCancel}
        footer={null}
        centered
      >
        <div className="p-5">
          <h1 className="text-2xl text-center text-[#0D0D0D] mb-6">
            Are you sure you want to delete "{selectedProduct?.name}"?
          </h1>

          <div className="text-center py-3">
            <button
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold w-full py-3 rounded transition duration-200"
            >
              Yes, Delete
            </button>
          </div>
          <div className="text-center">
            <button
              onClick={handleDeleteCancel}
              className="text-[#3b3b3b] border-2 border-[#3b3b3b] bg-white hover:bg-gray-50 font-semibold w-full py-3 rounded transition duration-200"
            >
              No, Don't Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
