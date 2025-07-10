import React, { useState } from "react";
import { Card, Select, ConfigProvider } from "antd";
import { Modal, Form, message } from "antd";
import {
  IoSearch,
  IoEyeOutline,
  IoTrashOutline,
} from "react-icons/io5";
import PageHeading from "../../shared/PageHeading";
import { BiEditAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import { SearchInput } from "../../components/search/SearchInput";
import { products } from "../../../utils/data";

export default function AllProducts() {
  const [searchText, setSearchText] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [form] = Form.useForm();

  const categories = [...new Set(products.map((product) => product.category))];
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchText.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const showAddModal = () => {
    form.resetFields();
    setIsAddModalVisible(true);
  };

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      // Add your delete logic here
      // await deleteProduct(selectedProduct.id);
      message.success("Product deleted successfully");
      setIsDeleteModalVisible(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error("Error deleting product:", error);
      message.error("Failed to delete product");
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false);
    setSelectedProduct(null);
  };

  return (
    <div className="p-5">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <PageHeading title="All Products" />
        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          <div className="flex gap-2">
            <div className="relative w-full mt-5 md:mt-0 lg:mt-0">
              <SearchInput />
              <span className=" text-gray-600 absolute top-0 left-0 h-full px-5 flex items-center justify-center rounded-r-md cursor-pointer">
                <IoSearch className="text-[1.3rem]" />
              </span>
            </div>
            <ConfigProvider
              theme={{
                components: {
                  Select: {
                    selectorBg: "#3b3b3b",
                    activeOutlineColor: "#3b3b3b",
                    placeholderColor: "#3b3b3b",
                    colorText: "#FF9500",
                  },
                },
              }}
            >
              <Select
                className="w-full h-[46px] bg-[#3b3b3b] text-white placeholder:text-white"
                placeholder="Filter by status"
                value={categoryFilter}
                onChange={setCategoryFilter}
                options={[
                  { value: "all", label: "All Categories" },
                  ...categories.map((category) => ({
                    value: category,
                    label: category,
                  })),
                ]}
              />
            </ConfigProvider>
          </div>
          <button
            onClick={showAddModal}
            className="w-full md:w-[200px] p-[10px] bg-[#136BFB] rounded text-white"
          >
            + Add Product
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-5">
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300"
            bodyStyle={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              padding: "16px",
            }}
            cover={
              <div className="h-48 bg-gray-50 flex items-center justify-center">
                <img
                  alt={product.name}
                  src={product.image}
                  className="h-full w-full object-contain p-4"
                />
              </div>
            }
          >
            <div className="flex-grow flex flex-col">
              <h1 className="font-medium text-gray-900 line-clamp-2 h-10">
                {product.name}
              </h1>

              <h3 className="font-medium text-[#9F9C96] line-clamp-2 h-14">
                {product.description}
              </h3>
              <div className="mt-auto pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-[#136BFB]">
                    ${product.price.toFixed(2)}
                  </span>
                  <p className="m-0 text-[#29A366] font-semibold">
                    {product.brand}
                  </p>
                </div>
                <p className="m-0 text-[#9F9C96]">{product.category}</p>
              </div>
            </div>
            <div className="flex justify-start gap-2 mt-4">
              <Link to={`/view-product/${product.id}`}>
                <button
                  className="border-2 border-[#3b3b3b] text-[#3b3b3b] rounded-lg p-2"
                  title="View Details"
                >
                  <IoEyeOutline className="w-6 h-6 text-[#3b3b3b]" />
                </button>
              </Link>
              <button
                onClick={() => {
                  setSelectedProduct(product);
                  setIsEditModalVisible(true);
                }}
                className="border-2 border-[#3b3b3b] text-[#3b3b3b] rounded-lg p-2"
              >
                <BiEditAlt className="w-6 h-6 text-[#3b3b3b]" />
              </button>
              <button
                onClick={() => handleDeleteClick(product)}
                className="border-2 border-[#3b3b3b] text-[#3b3b3b] rounded-lg p-2 hover:bg-red-50 hover:border-red-500 hover:text-red-500 transition-colors"
              >
                <IoTrashOutline className="w-6 h-6" />
              </button>
            </div>
          </Card>
        ))}
      </div>
      {/* Add Product Modal */}
      {isAddModalVisible && (
        <AddProduct
          isVisible={isAddModalVisible}
          onClose={() => setIsAddModalVisible(false)}
          onAddProduct={(newProduct) => {
            console.log("New product:", newProduct);
            setIsAddModalVisible(false);
          }}
        />
      )}
      {/* Edit Product Modal */}
      {isEditModalVisible && (
        <EditProduct
          isVisible={isEditModalVisible}
          onClose={() => {
            setIsEditModalVisible(false);
            setSelectedProduct(null);
          }}
          product={selectedProduct}
          onUpdateProduct={async (updatedProduct) => {
            try {
              console.log("Updated product:", updatedProduct);
              message.success("Product updated successfully");
            } catch (error) {
              console.error("Error updating product:", error);
              message.error("Failed to update product");
            } finally {
              setIsEditModalVisible(false);
              setSelectedProduct(null);
            }
          }}
        />
      )}
      {/* Delete Confirmation Modal */}
      <Modal
        title="Delete Product"
        open={isDeleteModalVisible}
        onCancel={handleDeleteCancel}
        onOk={handleDeleteConfirm}
        // okText="Delete"
        okButtonProps={{ danger: true }}
        // cancelText="Cancel"
        footer={null}
      >
        <div className="p-5">
          <h1 className="text-4xl text-center text-[#0D0D0D]">
            Are you sure you want to delete ?
          </h1>

          <div className="text-center py-5">
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-[#3b3b3b] text-white font-semibold w-full py-2 rounded transition duration-200"
            >
              Yes,Delete
            </button>
          </div>
          <div className="text-center pb-5">
            <button
              onClick={() => setIsModalOpen(false)}
              className="text-[#3b3b3b] border-2 border-[#3b3b3b] bg-white font-semibold w-full py-2 rounded transition duration-200"
            >
              No,Don’t Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
