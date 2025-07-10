import { Input, Modal, message } from "antd";
import PageHeading from "../../shared/PageHeading";
import { FiPlus } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { useState, useRef } from "react";
import { FiUpload, FiX } from "react-icons/fi";
import { BannerCard } from "./BannerCard";

export const bannersData = [
  {
    id: "1",
    title: "The Dental Dispatch",
    description:
      "Stay ahead with expert insights, clinical tips, and the latest product updates for modern dental professionals.",
    date: "20/05/2025",
    imageUrl:
      "https://images.pexels.com/photos/3845457/pexels-photo-3845457.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
  },
  {
    id: "2",
    title: "Chairside Journal",
    description:
      "Stay ahead with expert insights, clinical tips, and the latest product updates for modern dental professionals.",
    date: "20/05/2025",
    imageUrl:
      "https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
  },
  {
    id: "3",
    title: "Smarter Smiles",
    description:
      "Stay ahead with expert insights, clinical tips, and the latest product updates for modern dental professionals.",
    date: "20/05/2025",
    imageUrl:
      "https://images.pexels.com/photos/3779709/pexels-photo-3779709.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
  },
];

const Banners = () => {
  const [blogs, setBlogs] = useState(bannersData);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
  const [newBlogData, setNewBlogData] = useState({
    title: "",
    imageUrl: "",
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setNewBlogData((prev) => ({
          ...prev,
          imageUrl: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const showAddModal = () => {
    setCurrentBlog(null);
    setPreviewImage(null);
    setNewBlogData({
      title: "",
      imageUrl: "",
    });
    setIsAddModalVisible(true);
  };

  const handleEdit = (id) => {
    const blogToEdit = blogs.find((blog) => blog.id === id);
    if (blogToEdit) {
      setCurrentBlog(blogToEdit);
      setPreviewImage(blogToEdit.imageUrl || null);
      setNewBlogData({
        title: blogToEdit.title,
        imageUrl: blogToEdit.imageUrl,
      });
      setIsEditModalVisible(true);
    }
  };

  const handleSave = () => {
    if (!newBlogData.title.trim()) return;

    if (currentBlog) {
      setBlogs(
        blogs.map((blog) =>
          blog.id === currentBlog.id
            ? { ...blog, ...newBlogData, id: currentBlog.id }
            : blog
        )
      );
      message.success("Banner updated successfully");
    } else {
      const newBlog = {
        ...newBlogData,
        id: Date.now().toString(),
      };
      setBlogs([...blogs, newBlog]);
      message.success("Banner created successfully");
    }

    setPreviewImage(null);
    setCurrentBlog(null);
    setIsAddModalVisible(false);
    setIsEditModalVisible(false);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBlogs = blogs.filter((blog) => {
    const searchLower = searchTerm.toLowerCase();
    return blog.title.toLowerCase().includes(searchLower);
  });

  const handleDelete = (id) => {
    const blog = blogs.find((blog) => blog.id === id);
    setCurrentBlog(blog);
    setIsDeleteModalVisible(true);
  };

  return (
    <main>
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-5">
        <PageHeading title="Banners" />
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-[300px]">
            <Input
              placeholder="Search by title or description..."
              value={searchTerm}
              onChange={handleSearch}
              prefix={<IoSearch className="text-gray-400" />}
              className="w-full h-12 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>
          <button
            onClick={showAddModal}
            className="w-full md:w-auto px-6 py-3 bg-[#136BFB] rounded-lg text-white flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors whitespace-nowrap"
          >
            <FiPlus className="w-5 h-5" />
            Add New Blog
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((banner) => (
            <BannerCard
              key={banner?.id}
              {...banner}
              onEdit={() => handleEdit(banner?.id)}
              onDelete={() => handleDelete(banner?.id)}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-400">
              No banners found matching your search.
            </p>
          </div>
        )}
      </div>

      <Modal
        title={currentBlog ? "Edit Banner" : "Add New Banner"}
        open={isAddModalVisible || isEditModalVisible}
        onCancel={() => {
          if (isAddModalVisible) setIsAddModalVisible(false);
          if (isEditModalVisible) setIsEditModalVisible(false);
          setCurrentBlog(null);
          setPreviewImage(null);
        }}
        footer={null}
        centered
      >
        <div className="p-5">
          <div className="mb-5">
            <div
              onClick={triggerFileInput}
              className="border-2 border-dashed border-gray-300 rounded-lg p-5 text-center cursor-pointer"
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
                      setNewBlogData((prev) => ({
                        ...prev,
                        imageUrl: "",
                      }));
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
                    Upload Blog Cover Image
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

          <button
            onClick={handleSave}
            disabled={
              !newBlogData.title?.trim() || !newBlogData.description?.trim()
            }
            className={`w-full mt-6 py-2 px-4 rounded-lg font-medium text-white ${
              newBlogData.title?.trim() && newBlogData.description?.trim()
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            } transition-colors`}
          >
            {currentBlog ? "Update" : "Publish"} Banner
          </button>
        </div>
      </Modal>

      <Modal
        title="Delete Banner"
        open={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        footer={null}
      >
        <div className="p-5">
          <h1 className="text-4xl text-center text-[#0D0D0D]">
            Are you sure you want to delete ?
          </h1>

          <div className="text-center py-5">
            <button
              onClick={() => setIsDeleteModalVisible(false)}
              className="bg-[#3b3b3b] text-white font-semibold w-full py-2 rounded transition duration-200"
            >
              Yes,Delete
            </button>
          </div>
          <div className="text-center pb-5">
            <button
              onClick={() => setIsDeleteModalVisible(false)}
              className="text-[#3b3b3b] border-2 border-[#3b3b3b] bg-white font-semibold w-full py-2 rounded transition duration-200"
            >
              No,Don’t Delete
            </button>
          </div>
        </div>
      </Modal>
    </main>
  );
};

export default Banners;
