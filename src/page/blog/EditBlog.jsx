'use client';

import { Form, Input, message, Modal, Spin, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { useUpdateBlogMutation } from '../redux/api/blogApi'; // Changed to useUpdateBlogMutation
import { imageUrl } from '../redux/api/baseApi';

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
  const [initialFileList, setInitialFileList] = useState([]);
  const [changedFields, setChangedFields] = useState({});
  const [updateBlog] = useUpdateBlogMutation(); // Changed to update mutation
  const [loading, setLoading] = useState(false);

  // Track form field changes
  const onValuesChange = (changedValues) => {
    setChangedFields((prev) => ({ ...prev, ...changedValues }));
  };

  // Handle file list changes
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    // Mark images as changed if fileList differs from initial
    if (
      JSON.stringify(newFileList.map((f) => f.uid)) !==
      JSON.stringify(initialFileList.map((f) => f.uid))
    ) {
      setChangedFields((prev) => ({ ...prev, image: true }));
    }
  };

  // Prefill form and set initial file list
  useEffect(() => {
    if (selectedBlogs) {
      form.setFieldsValue({
        title: selectedBlogs?.title,
        content: selectedBlogs?.content,
      });

      const initialFiles = selectedBlogs?.imageUrl
        ? [
            {
              uid: '-1',
              name: 'blog-image.png',
              status: 'done',
              url: `${imageUrl}${selectedBlogs?.imageUrl}`,
            },
          ]
        : [];
      setFileList(initialFiles);
      setInitialFileList(initialFiles);
      setChangedFields({}); // Reset changed fields on modal open
    }
  }, [selectedBlogs, form]);

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    setInitialFileList([]);
    setChangedFields({});
    setEditModal(false);
  };

  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      const formData = new FormData();

      // Append only changed fields
      if (changedFields.title && values.title !== selectedBlogs?.title) {
        formData.append('title', values.title);
      }
      if (changedFields.content && values.content !== selectedBlogs?.content) {
        formData.append('content', values.content);
      }
      if (
        changedFields.image &&
        fileList.length > 0 &&
        fileList[0].originFileObj
      ) {
        formData.append('images', fileList[0].originFileObj);
      }

      // Only make API call if there are changed fields
      if ([...formData.entries()].length > 0) {
        const res = await updateBlog({
          id: selectedBlogs?._id,
          data: formData,
        });
        if (res.data) {
          message.success(res.data.message);
        } else {
          throw new Error(res.error?.data?.message || 'Failed to update blog');
        }
      } else {
        message.info('No changes detected.');
      }

      setLoading(false);
      setEditModal(false);
      form.resetFields();
      setFileList([]);
      setInitialFileList([]);
      setChangedFields({});
    } catch (error) {
      console.error(error);
      message.error(error.message || 'Failed to update blog');
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
          <div className="font-bold text-center mb-11">Edit Blog</div>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            onValuesChange={onValuesChange}
            className="px-2"
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: 'Please input title!' }]}
            >
              <Input placeholder="Enter title" style={{ height: '40px' }} />
            </Form.Item>

            <Form.Item
              label="Content"
              name="content"
              rules={[{ required: true, message: 'Please input content!' }]}
            >
              <Input.TextArea placeholder="Enter content" rows={6} />
            </Form.Item>

            <Form.Item label="Photos">
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
                multiple={false} 
                beforeUpload={() => false} 
              >
                {fileList.length < 1 && '+ Upload'}
              </Upload>
            </Form.Item>

            <Form.Item>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 mt-2 bg-[#E63946] text-white rounded-md"
              >
                {loading ? <Spin size="small" /> : 'Update'}
              </button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default EditBlog;