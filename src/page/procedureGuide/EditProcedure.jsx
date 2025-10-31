'use client';

import { Form, Input, message, Modal, Spin, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { useUpdateProcedureMutation } from '../redux/api/productManageApi';
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

const EditProcedure = ({ editModal, setEditModal, selectedProcedure }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [changedFields, setChangedFields] = useState({});
  const [initialFileList, setInitialFileList] = useState([]);
  const [updateProcedure] = useUpdateProcedureMutation();
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
    if (selectedProcedure) {
      form.setFieldsValue({
        name: selectedProcedure?.name,
        description: selectedProcedure?.description,
      });

      const initialFiles = selectedProcedure?.imageUrl
        ? [
            {
              uid: '-1',
              name: 'category-image.png',
              status: 'done',
              url: `${imageUrl}${selectedProcedure?.imageUrl}`,
            },
          ]
        : [];
      setFileList(initialFiles);
      setInitialFileList(initialFiles);
 
    }
  }, [selectedProcedure, form]);

  const handleCancel = () => {
  form.resetFields();
    setFileList([]);
    setEditModal(false);
  };

  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      const formData = new FormData();

      // Append only changed fields
      if (changedFields.name && values.name !== selectedProcedure?.name) {
        formData.append('name', values.name);
      }
      if (
        changedFields.description &&
        values.description !== selectedProcedure?.description
      ) {
        formData.append('description', values.description);
      }
      if (
        changedFields.image &&
        fileList.length > 0 &&
        fileList[0].originFileObj
      ) {
        formData.append('image', fileList[0].originFileObj);
      }

      // Only make API call if there are changed fields
      if ([...formData.entries()].length > 0) {
        const res = await updateProcedure({
          id: selectedProcedure?._id,
          data: formData,
        });
        if (res.data) {
          message.success(res.data.message);
        } else {
          throw new Error(res.error?.data?.message || 'Failed to update procedure');
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
      message.error(error.message || 'Failed to update procedure');
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
      width={500}
      title="Update Procedure"

      
    >
      <div className="">
        <div>
          <div className="font-bold text-center mb-7">Update Procedure</div>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            onValuesChange={onValuesChange}
            className="px-2"
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input name!' }]}
            >
              <Input placeholder="Enter title" style={{ height: '40px' }} />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: 'Please input Description!' }]}
            >
              <Input.TextArea placeholder="Enter Description" />
            </Form.Item>

            <Form.Item label="Photos">
              <Upload
                style={{ width: '100%', height: '160px' }}
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
                multiple={false} // Single image for simplicity
                beforeUpload={() => false} // Prevent auto-upload
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

export default EditProcedure;