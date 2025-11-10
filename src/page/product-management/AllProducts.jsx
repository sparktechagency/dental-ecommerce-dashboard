import React, { useState } from "react";
import {
  Table,
  Modal,
  Form,
  message,
  Spin,
  Pagination,
  Input,
  Button,
  Image,
} from "antd";
import { IoEyeOutline, IoTrashOutline } from "react-icons/io5";
import { BiEditAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import PageHeading from "../../shared/PageHeading";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import {
  useDeleteProductsMutation,
  useGetProductsQuery,
} from "../redux/api/productManageApi";
import { imageUrl } from "../redux/api/baseApi";
import { SearchOutlined } from "@ant-design/icons";

export default function AllProducts() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [form] = Form.useForm();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const handlePageChange = (page) => setCurrentPage(page);

  const {
    data: getAllProducts,
    isLoading,
    isError,
  } = useGetProductsQuery({ search, page: currentPage, limit: pageSize });

  const [deleteData] = useDeleteProductsMutation();
  const products = getAllProducts?.data || [];

  const showAddModal = () => {
    form.resetFields();
    setOpenAddModal(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setEditModal(true);
  };

  const handleDelete = async (id) => {
    try {
      const res = await deleteData(id).unwrap();
      message.success(res?.message);
    } catch (err) {
      message.error(err?.data?.message);
    }
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

  // Table Columns
  const columns = [
    {
      title: "Image",
      dataIndex: "images",
      key: "image",
      render: (images) => (
        <Image
          src={`${imageUrl}${images?.[0]}`}
          alt="product"
          width={60}
          height={60}
          className="object-contain rounded-md border"
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <span className="font-medium">{text}</span>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Brand",
      dataIndex: ["brand", "name"],
      key: "brand",
    },
    {
      title: "Category",
      dataIndex: ["category", "name"],
      key: "category",
    },
    {
      title: "Price ($)",
      dataIndex: "price",
      key: "price",
      render: (price) => (
        <span className="text-[#136BFB] font-semibold">
          ${price?.toFixed(2)}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          <Link to={`/view-product/${record?.productId}`}>
            <Button
              icon={<IoEyeOutline />}
              title="View"
              className="flex items-center justify-center"
            />
          </Link>

          <Button
            icon={<BiEditAlt />}
            onClick={() => handleEdit(record)}
            title="Edit"
            className="flex items-center justify-center"
          />

          <Button
            icon={<IoTrashOutline />}
            onClick={() => handleDelete(record?._id)}
            danger
            title="Delete"
            className="flex items-center justify-center"
          />
        </div>
      ),
    },
  ];

  return (
    <main className="pb-10">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <PageHeading title="All Products" />

        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          <Input
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name..."
            prefix={<SearchOutlined />}
            style={{ maxWidth: "300px", height: "40px" }}
          />

          <Button
            type="primary"
            onClick={showAddModal}
            style={{ height: "40px" }}
          >
            + Add Product
          </Button>
        </div>
      </header>

      {/* Product Table */}
      <Table
        dataSource={products}
        columns={columns}
        rowKey={(record) => record._id}
        pagination={false}
        bordered
        className="shadow-sm rounded-md"
      />

      {/* Pagination */}
      <div className="mt-4 flex justify-center ">
        <div className="bg-white px-2 py-1 rounded-md shadow-md">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={getAllProducts?.meta?.total || 0}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      </div>

      {/* Modals */}
      <AddProduct
        openAddModal={openAddModal}
        setOpenAddModal={setOpenAddModal}
      />
      <EditProduct
        editModal={editModal}
        setEditModal={setEditModal}
        selectedProduct={selectedProduct}
      />
    </main>
  );
}
