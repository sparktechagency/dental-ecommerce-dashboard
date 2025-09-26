import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline, IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, Checkbox, message } from "antd";
import { useLoginAdminMutation } from "../page/redux/api/userApi";
import { useDispatch } from "react-redux";
import { setToken } from "../page/redux/features/auth/authSlice";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginAdmin, { isLoading }] = useLoginAdminMutation();
  const onFinish = async (values) => {
    console.log("Form Values:", values);
    try {
      const payload = await loginAdmin(values).unwrap();
      console.log(payload);
      if (payload) {
        dispatch(setToken(payload?.data?.accessToken));
        message.success(payload?.message);
        navigate("/");
      } else {
        message.error(payload?.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      message.error(error?.data?.message || "Server is down");
    } finally {
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Column - Form */}
      <div className="w-full md:w-1/2 bg-[#171717] p-8 flex flex-col justify-center relative">
        <div className="max-w-md mx-auto w-full">
          <h1 className="text-center text-3xl font-bold text-white mb-2">
            Welcome Back !
          </h1>
          <p className="text-center text-[#9F9C96] mb-8">
            Please enter your email and password to continue
          </p>

          <Form
            name="signin"
            layout="vertical"
            onFinish={onFinish}
            className="space-y-6"
          >
            {/* Email */}
            <Form.Item
              label={
                <span className="text-white font-bold text-lg">Email</span>
              }
              name="email"
              rules={[
                { required: true, message: "Please enter your email!" },
                { type: "email", message: "Enter a valid email!" },
              ]}
            >
              <Input
                placeholder="Enter your email"
                className="bg-[#2D2D2D] text-white border-gray-600 rounded-lg"
              />
            </Form.Item>

            {/* Password */}
            <Form.Item
              label={
                <span className="text-white font-bold text-lg">Password</span>
              }
              name="password"
              rules={[
                { required: true, message: "Please enter your password!" },
              ]}
            >
              <Input.Password
                placeholder="Enter your password"
                iconRender={(visible) =>
                  visible ? (
                    <IoEyeOffOutline className="text-gray-400" />
                  ) : (
                    <IoEyeOutline className="text-gray-400" />
                  )
                }
                className="bg-[#2D2D2D] text-white border-gray-600 rounded-lg"
                visibilityToggle={{
                  visible: showPassword,
                  onVisibleChange: setShowPassword,
                }}
              />
            </Form.Item>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox className="text-gray-300">Remember Me</Checkbox>
              </Form.Item>
              <Link
                to="/forget-password"
                className="text-red-500 hover:underline text-sm"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full font-bold py-3 rounded-lg mt-5"
              >
                Log In
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>

      {/* Right Column - Illustration */}
      <div className="hidden md:flex md:w-1/2 bg-[#162236] items-center justify-center relative">
        <div className="absolute top-4 right-4">
          <button className="text-white hover:bg-blue-700 p-2 rounded-full">
            <IoClose size={24} />
          </button>
        </div>
        <div className="text-center px-12">
          <div className="w-[500px] h-[500px] mx-auto">
            <img src="./signin.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
