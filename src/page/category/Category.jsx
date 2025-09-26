import { useState, useEffect } from "react";
import { Form, Input, Modal, message, Button, Upload } from "antd";
import { FiEdit3, FiTrash2, FiPlus } from "react-icons/fi";
import PageHeading from "../../shared/PageHeading";
import { useAddCategoryMutation, useDeleteCategoryMutation, useGetCategroyAllQuery, useUpdateCategoryMutation } from "../redux/api/productManageApi";
import { imageUrl } from "../redux/api/baseApi";

export default function Category() {
  const { data: getAllCategory, refetch } = useGetCategroyAllQuery();
  const [addCategory] = useAddCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  console.log(currentCategory)
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);

  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();

  const onChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const onPreview = async (file) => {
    let src = file.url || await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj);
      reader.onload = () => resolve(reader.result);
    });
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  // Populate edit form when currentCategory changes
  useEffect(() => {
    if (currentCategory) {
      editForm.setFieldsValue({
        name: currentCategory.name,
      });
          setFileList([
        {
          uid: "-1",
          name: "category-image.png",
          status: "done",
          url: `${imageUrl}${currentCategory.imageUrl}`,
        },
      ]);
    }
  }, [currentCategory, editForm]);

  // Add Category
  const handleAddCategory = async (values) => {
    try {
      const formData = new FormData();
      fileList.forEach(file => formData.append("image", file.originFileObj));
      formData.append("name", values.name);

      const res = await addCategory(formData).unwrap();
      message.success(res.message || "Category added successfully");
      setIsAddModalVisible(false);
      setFileList([]);
      addForm.resetFields();
      refetch();
    } catch (err) {
      console.error(err);
      message.error(err?.data?.message || "Failed to add category");
    }
  };

  // Update Category
  const handleEditCategory = async (values) => {
    try {
      const formData = new FormData();
      fileList.forEach(file => formData.append("image", file.originFileObj));
      formData.append("name", values.name);

      const res = await updateCategory({ id: currentCategory._id, data: formData }).unwrap();
      message.success(res.message || "Category updated successfully");
      setIsEditModalVisible(false);
      setFileList([]);
      editForm.resetFields();
      setCurrentCategory(null);
      refetch();
    } catch (err) {
      console.error(err);
      message.error(err?.data?.message || "Failed to update category");
    }
  };

  // Delete Category
  const handleDelete = async (category) => {
    try {
      const res = await deleteCategory(category._id).unwrap();
      message.success(res.message || "Category deleted successfully");
      refetch();
    } catch (err) {
      console.error(err);
      message.error(err?.data?.message || "Failed to delete category");
    }
  };

  const openEditModal = (category) => {
    setCurrentCategory(category);
    setFileList([]); // reset file list
    setIsEditModalVisible(true);
  };

  return (
    <main className="pb-10">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-5 gap-5">
        <PageHeading title="All Category" />
        <button
          onClick={() => setIsAddModalVisible(true)}
          className="w-full md:w-[200px] p-[10px] bg-[#136BFB] rounded text-white flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors"
        >
          <FiPlus className="w-5 h-5" />
          Add Category
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-5 md:px-0">
        {getAllCategory?.data?.map((item) => (
          <div key={item._id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 group">
            <div className="relative overflow-hidden rounded-t-xl">
              <img src={`${imageUrl}${item.imageUrl}`} alt={item.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="p-4 flex items-center justify-between">
              <p className="text-lg font-bold text-gray-700">{item.name}</p>
              <div className="flex items-center space-x-2">
                <button onClick={() => openEditModal(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                  <FiEdit3 className="h-4 w-4" />
                </button>
                <button onClick={() => handleDelete(item)} className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors">
                  <FiTrash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      <Modal
        title="Add Category"
        open={isAddModalVisible}
        onCancel={() => { setIsAddModalVisible(false); setFileList([]); addForm.resetFields(); }}
        footer={null}
        centered
      >
        <Form form={addForm} layout="vertical" onFinish={handleAddCategory}>
          <Form.Item label="Image">
            <Upload listType="picture-card" fileList={fileList} onChange={onChange} onPreview={onPreview}>
              {fileList.length < 1 && "+ Upload"}
            </Upload>
          </Form.Item>
          <Form.Item name="name" label="Category Name" rules={[{ required: true, message: "Enter category name" }]}>
            <Input placeholder="Category Name" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">Add Category</Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Modal */}
      <Modal
        title="Edit Category"
        open={isEditModalVisible}
        onCancel={() => { setIsEditModalVisible(false); setFileList([]); setCurrentCategory(null); editForm.resetFields(); }}
        footer={null}
        centered
      >
        <Form form={editForm} layout="vertical" onFinish={handleEditCategory}>
          <Form.Item label="Image">
            <Upload listType="picture-card" fileList={fileList} onChange={onChange} onPreview={onPreview}>
              {fileList.length < 1 && "+ Upload"}
            </Upload>
          </Form.Item>
          <Form.Item name="name" label="Category Name" rules={[{ required: true, message: "Enter category name" }]}>
            <Input placeholder="Category Name" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">Save Changes</Button>
          </Form.Item>
        </Form>
      </Modal>
    </main>
  );
}
