import { Table, Modal, Form, Input, Button, message, Popconfirm, Pagination } from "antd";
import PageHeading from "../../shared/PageHeading";
import { IoSearch } from "react-icons/io5";
import { FiEdit, FiPlus } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState, useMemo, useEffect } from "react";
import { SearchInput } from "../../components/search/SearchInput";
import { SearchOutlined } from "@ant-design/icons";
import {
  useAddBrandsMutation,
  useDeleteBrandsMutation,
  useGetBrandsAllQuery,
  useGetBrandsQuery,
  useUpdateBrandsMutation,
} from "../redux/api/productManageApi";

const Brand = () => {
  const [searchText, setSearchText] = useState("");
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentBrand, setCurrentBrand] = useState(null);

  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const handlePageChange = (page) => setCurrentPage(page);
  // API hooks
  const { data: getAllBrand, refetch, isLoading } = useGetBrandsAllQuery({ search, page: currentPage, limit: pageSize });
  const [addBrands] = useAddBrandsMutation();
  const [updateBrands] = useUpdateBrandsMutation();
  const [deleteBrands] = useDeleteBrandsMutation();

  // Format brand list from API
  const brands = getAllBrand?.data?.map((brand) => ({
    key: brand._id,
    id: brand._id,
    brandName: brand.name,
  })) || [];



  // ✅ Add brand
  const handleAddBrand = async (values) => {
    try {
      const res = await addBrands({ name: values.brandName }).unwrap();
      message.success(res?.message || "Brand added successfully");
      setIsAddModalVisible(false);
      form.resetFields();
      refetch();
    } catch (error) {
      console.error(error);
      message.error(error?.data?.message || "Failed to add brand");
    }
  };

  // ✅ Open Edit Modal
  const openEditModal = (brand) => {
    setCurrentBrand(brand);
    setIsEditModalVisible(true);
  };

  // ✅ When edit modal opens, set default value
  useEffect(() => {
    if (currentBrand) {
      editForm.setFieldsValue({
        brandName: currentBrand.brandName,
      });
    }
  }, [currentBrand, editForm]);

  // ✅ Update brand
  const handleEditBrand = async (values) => {
    try {
      const res = await updateBrands({
        id: currentBrand.id,
        data: { name: values.brandName },
      }).unwrap();

      message.success(res?.message || "Brand updated successfully");
      setIsEditModalVisible(false);
      editForm.resetFields();
      setCurrentBrand(null);
      refetch();
    } catch (error) {
      console.error(error);
      message.error(error?.data?.message || "Failed to update brand");
    }
  };

  // ✅ Delete brand
  const handleDeleteBrand = async (id) => {
    try {
      const res = await deleteBrands(id).unwrap();
      message.success(res?.message || "Brand deleted successfully");
      refetch();
    } catch (error) {
      console.error(error);
      message.error(error?.data?.message || "Failed to delete brand");
    }
  };

  // ✅ Table columns
  const columns = [
    {
      title: "Brand Name",
      dataIndex: "brandName",
      key: "brandName",
    },
    {
      title: "Action",
      key: "action",
      align: "right",
      render: (_, record) => (
        <div className="flex gap-2 justify-end">
          <Button
            type="default"
            icon={<FiEdit />}
            onClick={() => openEditModal(record)}
          />
          <Popconfirm
            title="Are you sure to delete this brand?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleDeleteBrand(record.id)}
          >
            <Button danger icon={<RiDeleteBin6Line />} />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <main>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-2">
        <PageHeading title="Brands" />

        {/* Search + Add Button */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-2 w-full md:w-auto">
           <Input
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name..."
            prefix={<SearchOutlined />}
            style={{ maxWidth: "300px", height: "40px" }}
          />

          <button
            type="primary"
            icon={<FiPlus />}
           className="w-full bg-[#136BFB] text-white p-2 rounded"
            onClick={() => setIsAddModalVisible(true)}
          >
            Add Brand
          </button>
        </div>
      </div>

      {/* Table */}
      <Table
        loading={isLoading}
        dataSource={brands}
        columns={columns}
        pagination={false}
      />
   <div className="mt-4 flex justify-center ">
        <div className="bg-white px-2 py-1 rounded-md shadow-md">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={getAllBrand?.meta?.total || 0}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      </div>
      {/* Add Brand Modal */}
      <Modal
        title="Add New Brand"
        open={isAddModalVisible}
        onCancel={() => {
          setIsAddModalVisible(false);
          form.resetFields();
        }}
        footer={null}
        centered
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddBrand}
          autoComplete="off"
        >
          <Form.Item
            label="Brand Name"
            name="brandName"
            rules={[
              { required: true, message: "Please enter brand name" },
              { min: 2, message: "Brand name must be at least 2 characters" },
            ]}
          >
            <Input placeholder="Enter brand name" />
          </Form.Item>

          <Form.Item>
            <button type="primary" htmlType="submit" className="w-full bg-[#136BFB] text-white p-2 rounded">
              Add Brand
            </button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Brand Modal */}
      <Modal
        title="Edit Brand"
        open={isEditModalVisible}
        onCancel={() => {
          setIsEditModalVisible(false);
          setCurrentBrand(null);
        }}
        footer={null}
        centered
      >
        <Form
          form={editForm}
          layout="vertical"
          onFinish={handleEditBrand}
        >
          <Form.Item
            label="Brand Name"
            name="brandName"
            rules={[
              { required: true, message: "Please enter brand name" },
              { min: 2, message: "Brand name must be at least 2 characters" },
            ]}
          >
            <Input placeholder="Enter brand name" />
          </Form.Item>

          <Form.Item>
            <button type="primary" htmlType="submit" className="w-full bg-[#136BFB] text-white p-2 rounded">
              Save Changes
            </button>
          </Form.Item>
        </Form>
      </Modal>
    </main>
  );
};

export default Brand;
