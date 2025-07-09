import { Input, Modal, Form, Button, message } from "antd";
import PageHeading from "../../shared/PageHeading";
import { FiPlus } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { BlogCard } from "./BlogCard";
import { useState } from "react";

const blogsData = [
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
  {
    id: "4",
    title: "The Dental Dispatch",
    description:
      "Stay ahead with expert insights, clinical tips, and the latest product updates for modern dental professionals.",
    date: "20/05/2025",
    imageUrl:
      "https://images.pexels.com/photos/3845457/pexels-photo-3845457.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
  },
  {
    id: "5",
    title: "Chairside Journal",
    description:
      "Stay ahead with expert insights, clinical tips, and the latest product updates for modern dental professionals.",
    date: "20/05/2025",
    imageUrl:
      "https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
  },
  {
    id: "6",
    title: "Smarter Smiles",
    description:
      "Stay ahead with expert insights, clinical tips, and the latest product updates for modern dental professionals.",
    date: "20/05/2025",
    imageUrl:
      "https://images.pexels.com/photos/3779709/pexels-photo-3779709.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
  },
];

const Blog = () => {
  const [blogs, setBlogs] = useState(blogsData);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [form] = Form.useForm();

  const handleAddNew = () => {
    setCurrentBlog(null);
    form.resetFields();
    setIsEditModalVisible(true);
  };

  const handleView = (id) => {
    const blog = blogs.find(blog => blog.id === id);
    setCurrentBlog(blog);
    setIsViewModalVisible(true);
  };

  const handleEdit = (id) => {
    const blog = blogs.find(blog => blog.id === id);
    setCurrentBlog(blog);
    form.setFieldsValue({
      title: blog.title,
      description: blog.description,
      date: blog.date,
      imageUrl: blog.imageUrl
    });
    setIsEditModalVisible(true);
  };

  const handleDelete = (id) => {
    const blog = blogs.find(blog => blog.id === id);
    setCurrentBlog(blog);
    setIsDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    setBlogs(blogs.filter(blog => blog.id !== currentBlog.id));
    setIsDeleteModalVisible(false);
    message.success('Blog post deleted successfully');
  };

  const handleSave = (values) => {
    if (currentBlog) {
      // Update existing blog
      setBlogs(blogs.map(blog => 
        blog.id === currentBlog.id ? { ...blog, ...values } : blog
      ));
      message.success('Blog post updated successfully');
    } else {
      // Add new blog
      const newBlog = {
        id: Date.now().toString(),
        ...values
      };
      setBlogs([...blogs, newBlog]);
      message.success('Blog post created successfully');
    }
    setIsEditModalVisible(false);
  };

  return (
    <main>
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-5">
        <PageHeading title="Blog" />
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-[300px]">
            <Input
              placeholder="Search by name or description..."
              // value={searchTerm}
              // onChange={(e) => setSearchTerm(e.target.value)}
              prefix={<IoSearch className="text-gray-400" />}
              className="w-full h-12 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          <button
            onClick={handleAddNew}
            className="w-full md:w-auto px-6 py-3 bg-[#136BFB] rounded-lg text-white flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors whitespace-nowrap"
          >
            <FiPlus className="w-5 h-5" />
            Add Blog
          </button>
        </div>
      </header>
      <section className="pt-5 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              {...blog}
              onView={() => handleView(blog.id)}
              onEdit={() => handleEdit(blog.id)}
              onDelete={() => handleDelete(blog.id)}
            />
          ))}
        </div>
      </section>

      {/* View Modal */}
      <Modal
        title="View Blog Post"
        open={isViewModalVisible}
        onCancel={() => setIsViewModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsViewModalVisible(false)}>
            Close
          </Button>
        ]}
      >
        {currentBlog && (
          <div className="space-y-4">
            <div className="h-64 overflow-hidden rounded-lg">
              <img
                src={currentBlog.imageUrl}
                alt={currentBlog.title}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-white">{currentBlog.title}</h3>
            <p className="text-gray-300">{currentBlog.description}</p>
            <div className="flex items-center text-gray-400 text-sm">
              <span>Posted on: {currentBlog.date}</span>
            </div>
          </div>
        )}
      </Modal>

      {/* Edit/Add Modal */}
      <Modal
        title={currentBlog ? "Edit Blog Post" : "Add New Blog Post"}
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
          initialValues={{
            title: currentBlog?.title || '',
            description: currentBlog?.description || '',
            date: currentBlog?.date || new Date().toLocaleDateString('en-GB'),
            imageUrl: currentBlog?.imageUrl || ''
          }}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter a title' }]}
          >
            <Input placeholder="Enter blog title" />
          </Form.Item>
          
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter a description' }]}
          >
            <Input.TextArea rows={4} placeholder="Enter blog description" />
          </Form.Item>
          
          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true, message: 'Please select a date' }]}
          >
            <Input type="date" />
          </Form.Item>
          
          <Form.Item
            name="imageUrl"
            label="Image URL"
            rules={[{ required: true, message: 'Please enter an image URL' }]}
          >
            <Input placeholder="Enter image URL" />
          </Form.Item>
          
          <div className="flex justify-end space-x-2 mt-6">
            <Button onClick={() => setIsEditModalVisible(false)}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              {currentBlog ? 'Update' : 'Create'} Post
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Delete Blog Post"
        open={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsDeleteModalVisible(false)}>
            Cancel
          </Button>,
          <Button 
            key="delete" 
            type="primary" 
            danger 
            onClick={confirmDelete}
          >
            Delete
          </Button>
        ]}
      >
        <p>Are you sure you want to delete the blog post "{currentBlog?.title}"?</p>
        <p className="text-gray-400">This action cannot be undone.</p>
      </Modal>
    </main>
  );
};

export default Blog;
