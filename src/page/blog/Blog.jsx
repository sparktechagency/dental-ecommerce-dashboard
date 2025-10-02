import { Calendar, Eye, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageHeading from "../../shared/PageHeading"; 
import { SearchInput } from "../../components/search/SearchInput";
import { IoSearch } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import AddBlog from "./AddBlog";
import { useState } from "react";
import { useGetBlogQuery } from "../redux/api/blogApi";
import { Modal, message } from "antd";
import { imageUrl } from "../redux/api/baseApi";
import EditBlog from "./EditBlog";

const Blog = () => {
  const { data: blogData } = useGetBlogQuery();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const navigate = useNavigate();
const [selectedBlogs, setSelectedCategory] = useState(null);
  const showAddModal = () => {
    setCurrentBlog(null);
    setOpenAddModal(true);
  };

  const handleEdit = (blog) => {
setSelectedCategory(blog);
    setEditModal(true);
  };

  const handleDelete = (blog) => {
    Modal.confirm({
      title: "Are you sure you want to delete this blog?",
      okText: "Yes",
      cancelText: "No",
      onOk: () => {
        // API call for delete
        message.success("Blog deleted successfully!");
      },
    });
  };


  const handleView = (blog) => {
    setCurrentBlog(blog);
    setViewModal(true);
  };
  return (
    <main className="p-6">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-5 gap-2">
        <PageHeading title="Blog" />
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 w-full md:w-auto">
          <div className="relative w-full mt-5 md:mt-0 lg:mt-0">
            <SearchInput />
            <span className=" text-gray-600 absolute top-0 left-0 h-full px-5 flex items-center justify-center rounded-r-md cursor-pointer">
              <IoSearch className="text-[1.3rem]" />
            </span>
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
        {blogData?.data.length > 0 ? (
          blogData.data.map((blog) => (
            <div
              key={blog._id}
              className="bg-[#1c1c1c] rounded-lg shadow-sm overflow-hidden"
            >
              <div className="min-h-[250px] min-w-[387px]">
                <img
                  src={`${imageUrl}${blog.imageUrl[0]}`}
                  alt={blog.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5">
                <div>
                  <h3 className="text-white text-xl font-semibold mb-2">
                    {blog.title}
                  </h3>
                  <p className="text-[#9F9C96] text-sm line-clamp-2">
                    {blog.content}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-5">
                  <div className="flex items-center text-[#9F9C96] text-sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </div>

                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => handleView(blog)}
                      className="p-2 text-[#017FF4]"
                      title="View"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleEdit(blog)}
                      className="p-2 text-[#017FF4]"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(blog)}
                      className="p-2 text-red-600"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-400">No blog posts available.</p>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <AddBlog
        openAddModal={openAddModal}
        setOpenAddModal={setOpenAddModal}
        currentBlog={currentBlog}
      />

      <EditBlog editModal={editModal}
        setEditModal={setEditModal}
        selectedBlogs={selectedBlogs}></EditBlog>

      {/* View Modal */}
      <Modal
        open={viewModal}
        title={currentBlog?.title}
        onCancel={() => setViewModal(false)}
        footer={null}
        width={700}
        centered
      >
        {currentBlog && (
          <div>
            <img
              src={`${imageUrl}${currentBlog.imageUrl[0]}`}
              alt={currentBlog.title}
              className="w-full h-64 object-cover mb-4 rounded-md"
            />
            <p className="text-black">{currentBlog.content}</p>
            <p className="mt-2 text-gray-500">
              Published on:{" "}
              {new Date(currentBlog.createdAt).toLocaleDateString()}
            </p>
          </div>
        )}
      </Modal>
    </main>
  );
};

export default Blog;
