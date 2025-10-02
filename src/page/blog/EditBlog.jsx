import { Form, Input, message, Modal, Spin, Upload } from "antd";
import React, { useEffect, useState } from "react";

import { useAddBlogMutation } from "../redux/api/blogApi";
import { imageUrl } from "../redux/api/baseApi";
// import { useAddCategoryMutation } from "../redux/api/productManageApi";
const onPreview = async (file) => {
  let src = file.url;
  if (!src) {
    src = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj);
      reader.onload = () => resolve(reader.result);
    });
  }
  const image = new Image();
  image.src = src;
  const imgWindow = window.open(src);
  imgWindow?.document.write(image.outerHTML);
};
const EditBlog = ({ editModal, setEditModal, selectedBlogs }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [addcategory] = useAddBlogMutation();
  const [loading, setLoading] = useState(false);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    setEditModal(false);
  };

   useEffect(() => {
      if (selectedBlogs) {
        form.setFieldsValue({
          title: selectedBlogs?.title,
          content: selectedBlogs?.content,
        });
  
        setFileList([
          {
            uid: "-1",
            name: "category-image.png",
            status: "done",
            url: `${imageUrl}${selectedBlogs?.imageUrl}`,
          },
        ]);
      }
    }, [selectedBlogs, form]);

  const handleSubmit = async (values) => {
    console.log("Submitted values:", values);
    setLoading(true);

    try {
      const formData = new FormData();

   
      fileList.forEach((file) => {
        formData.append("image", file.originFileObj);
      });
      formData.append("content", values.content);
      formData.append("title", values.title);

      const res = await addcategory(formData);
      console.log(res);
      message.success(res.data.message);
      setLoading(false);
      setEditModal(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
      message.error(message?.data?.error);
      setEditModal(false);
    } finally {
      setLoading(false);
      setEditModal(false);
    }
  };

  return (
    <Modal
      centered
      open={editModal}
      onCancel={handleCancel}
      footer={null}
      width={600}
    >
      <div className="mb-20 mt-4">
        <div>
          <div className="font-bold text-center mb-11">Edit Blogs</div>

        <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="px-2"
          >
            <Form.Item
              label="Name"
              name="title"
              rules={[{ required: true, message: "Please input name!" }]}
            >
              <Input placeholder="Enter title" style={{ height: "40px" }} />
            </Form.Item>

            <Form.Item
              label="Description"
              name="content"
              rules={[{ required: true, message: "Please input Description!" }]}
            >
              <Input.TextArea placeholder="Enter Description" />
            </Form.Item>

            <Form.Item label="Photos">
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
                multiple={true}
              >
                {fileList.length < 1 && "+ Upload"}
              </Upload>
            </Form.Item>

            {/* Save Button */}
            <Form.Item>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 mt-2 bg-[#E63946] text-white rounded-md"
              >
                {loading ? <Spin size="small" /> : "Add"}
              </button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default EditBlog;
