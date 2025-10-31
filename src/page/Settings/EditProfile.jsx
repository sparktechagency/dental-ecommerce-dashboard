import React from "react";
import { Form, Input, Button, Typography } from "antd";

const { Title } = Typography;

const EditProfile = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("✅ Form submitted:", values);
  };

  return (
    <section className="bg-white px-5 md:px-20 w-full md:w-[715px] py-5 rounded-md">
      <Title
        level={3}
        className="text-[#0D0D0D] text-center font-bold !text-2xl mb-5"
      >
        Edit Your Profile
      </Title>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="space-y-4"
      >
        {/* User Name */}
        <Form.Item
          label={<span className="text-xl text-[#0D0D0D] font-bold">User Name</span>}
          name="fullName"
          rules={[{ required: true, message: "Please enter your full name!" }]}
        >
          <Input
            placeholder="Enter full name"
            size="large"
            className="border-2 border-[#6A6D76] rounded-md py-2 placeholder:text-xl"
          />
        </Form.Item>

        {/* Email */}
        <Form.Item
          label={<span className="text-xl text-[#0D0D0D] font-bold">Email</span>}
          name="email"
          rules={[
            { required: true, message: "Please enter your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input
            placeholder="Enter email address"
            size="large"
            className="border-2 border-[#6A6D76] rounded-md py-2 placeholder:text-xl"
          />
        </Form.Item>

        {/* Contact No */}
        <Form.Item
          label={<span className="text-xl text-[#0D0D0D] font-bold">Contact No</span>}
          name="contactNo"
          rules={[{ required: true, message: "Please enter your contact number!" }]}
        >
          <Input
            placeholder="Enter contact number"
            size="large"
            className="border-2 border-[#6A6D76] rounded-md py-2 placeholder:text-xl"
          />
        </Form.Item>

        {/* Address */}
        <Form.Item
          label={<span className="text-xl text-[#0D0D0D] font-bold">Address</span>}
          name="address"
          rules={[{ required: true, message: "Please enter your address!" }]}
        >
          <Input
            placeholder="Enter address"
            size="large"
            className="border-2 border-[#6A6D76] rounded-md py-2 placeholder:text-xl"
          />
        </Form.Item>

        <Form.Item className="text-center py-5 mb-0">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="bg-[#136BFB] text-white font-semibold w-full py-3 rounded-lg"
          >
            Save & Change
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
};

export default EditProfile;
