import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Typography, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone, CloseOutlined } from "@ant-design/icons";
import { useResetPasswordMutation } from "../page/redux/api/userApi";
import { Link, useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const ResetPassword = () => {
  const [resetPass] = useResetPasswordMutation();
  const navigate = useNavigate();
  const resetToken = localStorage.getItem("resetToken");

  const onFinish = async (values) => {
    const payload = {
      resetToken,
      newPassword: values.password,
    };

    try {
      const res = await resetPass(payload).unwrap();
      message.success("Password reset successfully!");
      navigate("/welcome");
    } catch (err) {
      message.error(err?.data?.message || "Something went wrong!");
    }
  };

  return (
    <Row className="min-h-screen bg-white">
      {/* Left Section */}
      <Col xs={24} md={12} className="bg-[#171717] flex justify-center items-center p-8">
        <div className="max-w-md w-full">
          <Title level={2} className="text-white text-center mb-2">
            Reset Password
          </Title>
          <Text className="block text-center text-[#9F9C96] mb-8">
            Your password must be 8-10 characters long.
          </Text>

          <Form layout="vertical" onFinish={onFinish}>
            {/* Password */}
            <Form.Item
              label={<span className="text-gray-300">Password</span>}
              name="password"
              rules={[{ required: true, message: "Please enter your password!" }]}
            >
              <Input.Password
                placeholder="Enter your password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                className="bg-[#2D2D2D] text-white border-gray-600 rounded-lg"
              />
            </Form.Item>

            {/* Confirm Password */}
            <Form.Item
              label={<span className="text-gray-300">Confirm Password</span>}
              name="confirm_password"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Passwords do not match!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="Enter your confirm password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                className="bg-[#2D2D2D] text-white border-gray-600 rounded-lg"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                className="bg-[#136BFB] text-white font-semibold py-3 rounded-lg mt-5"
              >
                Confirm
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Col>

      {/* Right Section */}
      <Col xs={0} md={12} className="bg-[#162236] flex items-center justify-center relative">
        <Button
          type="text"
          shape="circle"
          icon={<CloseOutlined />}
          className="absolute top-5 right-5 text-white hover:bg-blue-700"
        />
        <div className="text-center px-12">
          <img src="./reset.svg" alt="reset" className="w-[500px] h-[500px] mx-auto" />
        </div>
      </Col>
    </Row>
  );
};

export default ResetPassword;
