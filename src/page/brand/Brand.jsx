import { ConfigProvider, Input, Table, Modal, message } from "antd";
import PageHeading from "../../shared/PageHeading";
import { IoSearch } from "react-icons/io5";
import { FiEdit, FiPlus, FiX } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState, useMemo } from "react";

const Brand = () => {
  const [searchText, setSearchText] = useState("");
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentBrand, setCurrentBrand] = useState(null);
  const [brandName, setBrandName] = useState("");
  
  // Sample data - in a real app, this would come from an API
  const [brands, setBrands] = useState([
    {
      key: "1",
      id: "1",
      brandName: "Shah Aman",
    },
    {
      key: "2",
      id: "2",
      brandName: "Jane Doe",
    },
    {
      key: "3",
      id: "3",
      brandName: "John Smith",
    },
  ]);

  // Filter brands based on search text
  const filteredBrands = useMemo(() => {
    if (!searchText) return brands;
    return brands.filter(brand => 
      brand.brandName.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, brands]);

  // Handle Add Brand
  const handleAddBrand = () => {
    if (!brandName.trim()) {
      message.error("Please enter a brand name");
      return;
    }

    const newBrand = {
      key: Date.now().toString(),
      id: Date.now().toString(),
      brandName: brandName.trim(),
    };

    setBrands([...brands, newBrand]);
    message.success("Brand added successfully");
    setBrandName("");
    setIsAddModalVisible(false);
  };

  // Handle Edit Brand
  const handleEditBrand = () => {
    if (!brandName.trim()) {
      message.error("Please enter a brand name");
      return;
    }

    setBrands(
      brands.map(brand =>
        brand.id === currentBrand.id 
          ? { ...brand, brandName: brandName.trim() }
          : brand
      )
    );
    
    message.success("Brand updated successfully");
    setIsEditModalVisible(false);
    setBrandName("");
    setCurrentBrand(null);
  };

  // Handle Delete Brand
  const handleDeleteBrand = () => {
    setBrands(brands.filter(brand => brand.id !== currentBrand?.id));
    message.success("Brand deleted successfully");
    setIsDeleteModalVisible(false);
    setCurrentBrand(null);
  };

  // Open Edit Modal
  const openEditModal = (brand) => {
    setCurrentBrand(brand);
    setBrandName(brand.brandName);
    setIsEditModalVisible(true);
  };

  // Open Delete Confirmation
  const openDeleteModal = (brand) => {
    setCurrentBrand(brand);
    setIsDeleteModalVisible(true);
  };

  const columns = [
    {
      title: "Name",
      key: "brandName",
      dataIndex: "brandName",
    },
    {
      title: "Action",
      key: "action",
      align: "right",
      render: (_, record) => (
        <div className="flex gap-2 justify-end">
          <button 
            onClick={() => openEditModal(record)}
            className="border border-[#3b3b3b] text-[#3b3b3b] rounded-lg p-2 hover:bg-gray-100 transition-colors"
          >
            <FiEdit className="w-5 h-5" />
          </button>
          <button 
            onClick={() => openDeleteModal(record)}
            className="border border-red-500 text-red-500 rounded-lg p-2 hover:bg-red-50 transition-colors"
          >
            <RiDeleteBin6Line className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-5 gap-5">
        <PageHeading title="Brands" />
        <div className="flex flex-col md:flex-row justify-center items-center md:items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-[300px]">
            <Input
              placeholder="Search by name..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              prefix={<IoSearch className="text-gray-400" />}
              className="w-full h-[46px] px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          <button 
            onClick={() => {
              setBrandName("");
              setIsAddModalVisible(true);
            }}
            className="w-full md:w-[200px] p-[10px] bg-[#136BFB] rounded text-white flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors"
          >
            <FiPlus className="w-5 h-5" />
            Add Brand
          </button>
        </div>
      </div>

      <ConfigProvider
        theme={{
          components: {
            InputNumber: {
              activeBorderColor: "#14803c",
            },
            Pagination: {
              colorPrimaryBorder: "#3b3b3b",
              colorBorder: "#3b3b3b",
              colorTextPlaceholder: "#3b3b3b",
              colorTextDisabled: "#3b3b3b",
              colorBgTextActive: "#3b3b3b",
              itemActiveBgDisabled: "#3b3b3b",
              itemActiveColorDisabled: "#3b3b3b",
              itemBg: "#3b3b3b",
              colorBgTextHover: "#3b3b3b",
              colorPrimary: "#3b3b3b",
              colorPrimaryHover: "#3b3b3b",
            },
            Table: {
              headerBg: "#3b3b3b",
              headerColor: "#fff",
              cellFontSize: 16,
              headerSplitColor: "#3b3b3b",
            },
          },
        }}
      >
        <Table
          dataSource={filteredBrands}
          columns={columns}
          pagination={{ pageSize: 10 }}
          scroll={{ x: "max-content" }}
        />
      </ConfigProvider>

      {/* Add Brand Modal */}
      <Modal
        title="Add New Brand"
        open={isAddModalVisible}
        onCancel={() => {
          setIsAddModalVisible(false);
          setBrandName("");
        }}
        footer={null}
        centered
      >
        <div className="p-4">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Brand Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter brand name"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          <button
            onClick={handleAddBrand}
            className={`w-full py-2 px-4 rounded-lg font-medium text-white ${
              brandName.trim()
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            } transition-colors`}
          >
            Add Brand
          </button>
        </div>
      </Modal>

      {/* Edit Brand Modal */}
      <Modal
        title="Edit Brand"
        open={isEditModalVisible}
        onCancel={() => {
          setIsEditModalVisible(false);
          setBrandName("");
          setCurrentBrand(null);
        }}
        footer={null}
        centered
      >
        <div className="p-4">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Brand Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter brand name"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          <button
            onClick={handleEditBrand}
            className={`w-full py-2 px-4 rounded-lg font-medium text-white ${
              brandName.trim()
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            } transition-colors`}
          >
            Save Changes
          </button>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Delete Brand"
        open={isDeleteModalVisible}
        onCancel={() => {
          setIsDeleteModalVisible(false);
          setCurrentBrand(null);
        }}
        footer={null}
        centered
      >
        <div className="p-5">
          <h1 className="text-xl text-center text-gray-800 mb-6">
            Are you sure you want to delete "{currentBrand?.brandName}"?
          </h1>
          <p className="text-center text-gray-600 mb-6">
            This action cannot be undone.
          </p>
          <div className="flex flex-col space-y-3">
            <button
              onClick={handleDeleteBrand}
              className="w-full py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition-colors"
            >
              Yes, Delete
            </button>
            <button
              onClick={() => {
                setIsDeleteModalVisible(false);
                setCurrentBrand(null);
              }}
              className="w-full py-2 border border-gray-300 bg-white text-gray-700 font-semibold rounded hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Brand;
