import React, { useState } from "react";
import { Card, Modal, Form, message, Spin } from "antd";
import { IoSearch, IoEyeOutline, IoTrashOutline } from "react-icons/io5";
import { BiEditAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import PageHeading from "../../shared/PageHeading";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import { SearchInput } from "../../components/search/SearchInput";
import { useGetProductsQuery } from "../redux/api/productManageApi";
import { imageUrl } from "../redux/api/baseApi";

export default function AllProducts() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [form] = Form.useForm();

  // ✅ API Call
  const { data: getAllProducts, isLoading, isError } = useGetProductsQuery();

  // ✅ Product Data from API
  const products = getAllProducts?.data || [];

  // ✅ Add Modal Open
  const showAddModal = () => {
    form.resetFields();
    setOpenAddModal(true);
  };

  // ✅ Edit Product
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setEditModal(true);
  };

  // ✅ Delete Product
  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this product?",
      okText: "Yes",
      cancelText: "No",
      onOk: () => {
        message.success("Product deleted successfully!");
        // এখানে চাইলে delete API hit করতে পারো
      },
    });
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Spin size="large" />
      </div>
    );

  if (isError)
    return (
      <div className="text-center text-red-500 mt-10">
        Failed to load products!
      </div>
    );

  return (
    <main className="pb-10">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <PageHeading title="All Products" />
        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          {/* Search Bar (UI only) */}
          <div className="relative w-full mt-5 md:mt-0">
            <SearchInput />
            <span className="text-gray-600 absolute top-0 left-0 h-full px-5 flex items-center justify-center rounded-r-md cursor-pointer">
              <IoSearch className="text-[1.3rem]" />
            </span>
          </div>

          {/* Add Product Button */}
          <button
            onClick={showAddModal}
            className="w-full md:w-[200px] p-[10px] bg-[#136BFB] rounded text-white"
          >
            + Add Product
          </button>
        </div>
      </header>

      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {products.map((product) => (
          <Card
            key={product._id}
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
                  src={`${imageUrl}${product.imageUrl[0]}`}
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
                    ${product.price?.toFixed(2)}
                  </span>
                  <p className="m-0 text-[#29A366] font-semibold">
                    {product.brand?.name}
                  </p>
                </div>
                <p className="m-0 text-[#9F9C96]">
                  {product.category || "Uncategorized"}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-start gap-2 mt-4">
              <Link to={`/view-product/${product._id}`}>
                <button
                  className="border-2 border-[#3b3b3b] rounded-lg p-2 hover:bg-gray-100 transition"
                  title="View Details"
                >
                  <IoEyeOutline className="w-6 h-6 text-[#3b3b3b]" />
                </button>
              </Link>

              <button
                onClick={() => handleEdit(product)}
                className="border-2 border-[#3b3b3b] rounded-lg p-2 hover:bg-blue-50 transition"
                title="Edit"
              >
                <BiEditAlt className="w-6 h-6 text-[#3b3b3b]" />
              </button>

              <button
                onClick={() => handleDelete(product._id)}
                className="border-2 border-[#3b3b3b] rounded-lg p-2 hover:bg-red-50 hover:border-red-500 hover:text-red-500 transition"
                title="Delete"
              >
                <IoTrashOutline className="w-6 h-6" />
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Product Modal */}
      <AddProduct
        openAddModal={openAddModal}
        setOpenAddModal={setOpenAddModal}
      />

      {/* Edit Product Modal */}
      <EditProduct
        editModal={editModal}
        setEditModal={setEditModal}
        selectedProduct={selectedProduct}
      />
    </main>
  );
}
