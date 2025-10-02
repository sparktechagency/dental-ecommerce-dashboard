import React, { useState } from "react";
import { Modal, Form, Input, Select, Upload, Button, message } from "antd";
import { useAddProductsMutation, useGetBrandsQuery, useGetCategroyAllQuery, useGetProcedureQuery } from "../redux/api/productManageApi";

const { Option } = Select;

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

const AddProduct = ({ openAddModal, setOpenAddModal }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);

  const { data: brands } = useGetBrandsQuery();
  const { data: category } = useGetCategroyAllQuery();
  const { data: procedure } = useGetProcedureQuery();

  const [addProduct] = useAddProductsMutation();

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  // ✅ Submit Form
  const handleSubmit = async (values) => {
  try {
    setLoading(true);

    const formData = new FormData();

    // Append images as an array using `image[]`
    fileList.forEach((file) => {
      formData.append("image[]", file.originFileObj); // Use `image[]` to indicate an array
    });

    // Other fields
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("stock", values.stock);
    formData.append("brand", values.brand);
    formData.append("category", values.category);
    formData.append("procedure", values.procedure);
    formData.append("availability", values.availability);

    const res = await addProduct(formData).unwrap();
    message.success(res.message || "Product added successfully!");
    setOpenAddModal(false);
    form.resetFields();
    setFileList([]);
    setLoading(false);
  } catch (error) {
    console.error(error);
    message.error(error?.data?.message || "Failed to add product");
    setLoading(false);
  }
};

  const handleCancel = () => {
    setOpenAddModal(false);
    form.resetFields();
    setFileList([]);
  };

  return (
    <Modal
      title="Add New Product"
      open={openAddModal}
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
        {/* Images */}
        <Form.Item label="Photos">
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
            multiple
          >
            {fileList.length < 5 && "+ Upload"} {/* max 5 images */}
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

        {/* Submit */}
        <div className="flex justify-end">
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="px-6 py-2 text-base font-semibold rounded-lg"
          >
            Submit
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddProduct;
