import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, Upload, Button, message } from "antd";
import {
  useGetBrandsQuery,
  useGetCategroyAllQuery,
  useGetProcedureQuery,
  useUpdateProductsMutation,
} from "../redux/api/productManageApi";
import { PlusOutlined } from "@ant-design/icons";
import { imageUrl } from "../redux/api/baseApi";

const { Option } = Select;

const EditProduct = ({ editModal, setEditModal, selectedProduct }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);

  const { data: brands } = useGetBrandsQuery();
  const { data: category } = useGetCategroyAllQuery();
  const { data: procedure } = useGetProcedureQuery();
  const [updateProduct] = useUpdateProductsMutation();

  // ✅ useEffect to set default values
  useEffect(() => {
    if (selectedProduct && editModal) {
      form.setFieldsValue({
        name: selectedProduct.name,
        description: selectedProduct.description,
        price: selectedProduct.price,
        stock: selectedProduct.stock,
        brand: selectedProduct?.brand?._id,
        category: selectedProduct?.category?._id,
        procedure: selectedProduct?.procedure?._id,
        availability: selectedProduct.availability,
      });

      if (selectedProduct.images?.length) {
        const mappedImages = selectedProduct.images.map((url, index) => ({
          uid: `existing-${index}`,
          name: `image-${index + 1}.png`,
          status: "done",
          url: `${imageUrl}${url}`,
        }));
        setFileList(mappedImages);
      }
    }
  }, [selectedProduct, editModal, form]);

  // ✅ Handle upload and remove
  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleRemove = (file) => {
    setFileList((prev) => prev.filter((f) => f.uid !== file.uid));
  };

  // ✅ Submit form data
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const formData = new FormData();

      // Separate existing and new images
      const existingImages = fileList
        .filter((file) => file.url)
        .map((file) => file.url.replace(imageUrl, ""));

      const newImages = fileList.filter((file) => file.originFileObj);

      // ✅ append product data
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("price", values.price);
      formData.append("stock", values.stock);
      formData.append("brand", values.brand);
      formData.append("category", values.category);
      formData.append("procedure", values.procedure);
      formData.append("availability", values.availability);

    
      formData.append("images", JSON.stringify(existingImages));

 
      newImages.forEach((file) => {
        formData.append("images", file.originFileObj);
      });

    
      const res = await updateProduct({
        id: selectedProduct._id,
        data: formData,
      }).unwrap();

      message.success(res.message || "Product updated successfully!");
      setEditModal(false);
      form.resetFields();
      setFileList([]);
    } catch (error) {
      console.error(error);
      message.error(error?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle Cancel
  const handleCancel = () => {
    setEditModal(false);
    form.resetFields();
    setFileList([]);
  };

  return (
    <Modal
      title="Edit Product"
      open={editModal}
      onCancel={handleCancel}
      footer={null}
      width={700}
      centered
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        className="p-2 space-y-4"
      >
        {/* Photos */}
        <Form.Item label="Photos">
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={handleUploadChange}
            onRemove={handleRemove}
            beforeUpload={() => false}
            multiple
          >
            {fileList.length >= 10 ? null : (
              <div>
                <PlusOutlined />
                <div>Add Image</div>
              </div>
            )}
          </Upload>
        </Form.Item>

        {/* Product Name */}
        <Form.Item
          label="Product Name"
          name="name"
          rules={[{ required: true, message: "Please enter product name!" }]}
        >
          <Input placeholder="Enter product name" size="large" />
        </Form.Item>

        {/* Description */}
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter description!" }]}
        >
          <Input.TextArea rows={4} placeholder="Enter description" size="large" />
        </Form.Item>

        {/* Price */}
        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please enter price!" }]}
        >
          <Input type="number" placeholder="Enter price" size="large" />
        </Form.Item>

        {/* Stock */}
        <Form.Item
          label="Stock"
          name="stock"
          rules={[{ required: true, message: "Please enter stock!" }]}
        >
          <Input type="number" placeholder="Enter stock" size="large" />
        </Form.Item>

        {/* Brand */}
        <Form.Item
          label="Select Brand"
          name="brand"
          rules={[{ required: true, message: "Please select a brand!" }]}
        >
          <Select placeholder="Select brand" size="large">
            {brands?.data?.map((b) => (
              <Option key={b._id} value={b._id}>
                {b.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* Category */}
        <Form.Item
          label="Select Category"
          name="category"
          rules={[{ required: true, message: "Please select a category!" }]}
        >
          <Select placeholder="Select category" size="large">
            {category?.data?.map((c) => (
              <Option key={c._id} value={c._id}>
                {c.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* Procedure */}
        <Form.Item
          label="Procedure Guide"
          name="procedure"
          rules={[{ required: true, message: "Please select a procedure!" }]}
        >
          <Select placeholder="Select procedure" size="large">
            {procedure?.data?.map((p) => (
              <Option key={p._id} value={p._id}>
                {p.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* Availability */}
        <Form.Item
          label="Availability"
          name="availability"
          rules={[{ required: true, message: "Please select availability!" }]}
        >
          <Select placeholder="Select availability" size="large">
            <Option value="In Stock">In Stock</Option>
            <Option value="Out of Stock">Out of Stock</Option>
            <Option value="Limited Stock">Limited Stock</Option>
            <Option value="Pre-order">Pre-order</Option>
          </Select>
        </Form.Item>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="px-6 py-2 text-base font-semibold rounded-lg"
          >
            Update
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default EditProduct;
