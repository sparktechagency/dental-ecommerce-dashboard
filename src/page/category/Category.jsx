import { Input, Modal, Form, message } from "antd";
import PageHeading from "../../shared/PageHeading";
import { IoSearch } from "react-icons/io5";
import { useState, useRef } from "react";
import { FiSearch, FiEdit3, FiTrash2, FiPlus, FiX, FiUpload } from "react-icons/fi";

const Category = () => {
  const [searchText, setSearchText] = useState("");
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  const [items, setItems] = useState([
    {
      id: 1,
      category: "Prosthetics",
      image:
        "https://images.pexels.com/photos/6812546/pexels-photo-6812546.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: 2,
      category: "Orthodontics",
      image:
        "https://images.pexels.com/photos/6812513/pexels-photo-6812513.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: 3,
      category: "Hygiene",
      image:
        "https://images.pexels.com/photos/6812502/pexels-photo-6812502.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: 4,
      category: "Surgery",
      image:
        "https://images.pexels.com/photos/6812544/pexels-photo-6812544.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: 5,
      category: "Endodontics",
      image:
        "https://images.pexels.com/photos/6812539/pexels-photo-6812539.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: 6,
      category: "Periodontics",
      image:
        "https://images.pexels.com/photos/6812521/pexels-photo-6812521.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: 7,
      category: "Restorative",
      image:
        "https://images.pexels.com/photos/6812535/pexels-photo-6812535.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: 8,
      category: "Diagnostics",
      image:
        "https://images.pexels.com/photos/6812531/pexels-photo-6812531.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
  ]);

  // Filter items based on search text
  const filteredItems = items.filter((item) =>
    item.category.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSubmitCategory = () => {
    if (newCategoryName.trim()) {
      // Here you would typically add the new category to your data
      console.log('New category:', newCategoryName);
      setNewCategoryName('');
      setIsAddModalVisible(false);
    }
  };

  // Handle Edit Category
  const handleEditCategory = () => {
    if (!newCategoryName.trim()) {
      message.error('Please enter a category name');
      return;
    }

    setItems(
      items.map((item) =>
        item.id === currentCategory.id 
          ? { ...item, category: newCategoryName.trim(), image: previewImage || item.image }
          : item
      )
    );
    
    message.success('Category updated successfully');
    setIsEditModalVisible(false);
    setNewCategoryName('');
    setPreviewImage(null);
    setCurrentCategory(null);
  };

  // Handle Delete Category
  const handleDelete = () => {
    setItems(items.filter((item) => item.id !== currentCategory?.id));
    message.success("Category deleted successfully");
    setIsDeleteModalVisible(false);
    setCurrentCategory(null);
  };

  // Open Edit Modal
  const openEditModal = (category) => {
    setCurrentCategory(category);
    setNewCategoryName(category.category);
    setPreviewImage(category.image);
    setIsEditModalVisible(true);
  };

  // Open Delete Confirmation
  const confirmDelete = (category) => {
    setCurrentCategory(category);
    setIsDeleteModalVisible(true);
  };

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) {
      message.error('Please enter a category name');
      return;
    }

    const newCategory = {
      id: Date.now(),
      category: newCategoryName.trim(),
      image: previewImage || "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
    };

    setItems([...items, newCategory]);
    message.success('Category added successfully');
    setNewCategoryName('');
    setPreviewImage(null);
    setIsAddModalVisible(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-5 gap-5">
        <PageHeading title="All Category" />
        <div className="flex flex-col md:flex-row justify-center items-center md:items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-[200px] h-[46px]">
            <Input
              placeholder="Search category..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full h-[46px] pl-12 pr-4 rounded-md border-2 border-[#3b3b3b]"
              prefix={
                <IoSearch
                  className="text-gray-400 absolute left-3 top-3.5"
                  size={20}
                />
              }
            />
          </div>

          <button
            onClick={() => setIsAddModalVisible(true)}
            className="w-full md:w-[200px] p-[10px] bg-[#136BFB] rounded text-white flex items-center justify-center gap-2"
          >
            <FiPlus /> Add Category
          </button>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="px-5 md:px-0 my-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 group"
            >
              <div className="relative overflow-hidden rounded-t-xl">
                <img
                  src={item.image}
                  alt={item.category}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-4 flex items-center justify-between">
                <p className="text-lg font-bold">
                  <span className="text-gray-700">{item.category}</span>
                </p>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => openEditModal(item)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                  >
                    <FiEdit3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => confirmDelete(item)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <FiTrash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiSearch className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No categories found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or add a new category.
            </p>
          </div>
        )}
      </div>

      {/* Add Category Modal */}
      <Modal
        title="Add New Category"
        open={isAddModalVisible}
        onCancel={() => {
          setIsAddModalVisible(false);
          setNewCategoryName('');
          setPreviewImage(null);
        }}
        footer={null}
        centered
      >
        <div className="p-4">
          {/* Upload Area */}
          <div className="mb-6">
            <div 
              onClick={triggerFileInput}
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer"
            >
              {previewImage ? (
                <div className="relative">
                  <img 
                    src={previewImage} 
                    alt="Preview" 
                    className="max-h-40 mx-auto mb-2 rounded"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewImage(null);
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <FiX className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <>
                  <FiUpload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">
                    Upload Category Thumbnail Image
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Click to upload or drag and drop
                  </p>
                </>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>

          {/* Category Name Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Category Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter category name"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleAddCategory}
            disabled={!newCategoryName.trim()}
            className={`w-full py-2 px-4 rounded-lg font-medium text-white ${
              newCategoryName.trim()
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-400 cursor-not-allowed'
            } transition-colors`}
          >
            Add Category
          </button>
        </div>
      </Modal>

      {/* Edit Category Modal */}
      <Modal
        title="Edit Category"
        open={isEditModalVisible}
        onCancel={() => {
          setIsEditModalVisible(false);
          setNewCategoryName('');
          setPreviewImage(null);
          setCurrentCategory(null);
        }}
        footer={null}
        centered
      >
        <div className="p-4">
          {/* Upload Area */}
          <div className="mb-6">
            <div 
              onClick={triggerFileInput}
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer"
            >
              {previewImage ? (
                <div className="relative">
                  <img 
                    src={previewImage} 
                    alt="Preview" 
                    className="max-h-40 mx-auto mb-2 rounded"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewImage(null);
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <FiX className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <>
                  <FiUpload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">
                    {currentCategory?.image ? 'Change Thumbnail' : 'Upload Category Thumbnail Image'}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Click to upload or drag and drop
                  </p>
                </>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>

          {/* Category Name Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Category Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter category name"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleEditCategory}
            disabled={!newCategoryName.trim()}
            className={`w-full py-2 px-4 rounded-lg font-medium text-white ${
              newCategoryName.trim()
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-400 cursor-not-allowed'
            } transition-colors`}
          >
            Save Changes
          </button>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Delete Category"
        open={isDeleteModalVisible}
        onOk={handleDelete}
        onCancel={() => {
          setIsDeleteModalVisible(false);
          setCurrentCategory(null);
        }}
        okText="Delete"
        cancelText="Cancel"
        okButtonProps={{ danger: true }}
      >
        <p>
          Are you sure you want to delete "{currentCategory?.category}"? This
          action cannot be undone.
        </p>
      </Modal>
    </>
  );
};

export default Category;
