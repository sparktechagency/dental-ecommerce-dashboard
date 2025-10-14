import { useNavigate, Link } from "react-router-dom";
import { Form, Input, message } from "antd";
import { IoClose } from "react-icons/io5";
import { useForgotPasswordMutation } from "../page/redux/api/userApi";

function ForgetPassword() {
  const navigate = useNavigate();
  const [forgotPass] = useForgotPasswordMutation();

  const onFinish = async (values) => {
    forgotPass(values)
      .unwrap()
      .then((payload) => {
        message.success(payload?.message);
        localStorage.setItem("email", values?.email);
        navigate("/verify-mail");
      })
      .catch((error) => message.error(error?.data?.message));
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Column - Form */}
      <div className="w-full md:w-1/2 bg-[#171717] p-8 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <h1 className="text-center text-3xl font-bold text-white mb-4">
            Forgot Password
          </h1>
          <p className="text-center text-[#9F9C96] mb-8">
            Please enter your Email to reset your password.
          </p>

          <Form
            name="forgetPassword"
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              label={<span className="text-white">Email</span>}
              rules={[
                {
                  required: true,
                  message: "Email is required",
                },
                {
                  type: "email",
                  message: "Invalid email address",
                },
              ]}
            >
              <Input
                placeholder="Enter your Email"
                className="w-full px-4 py-2 border bg-white rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </Form.Item>

            <Form.Item>
              <button
                type="submit"
                className="w-full py-2 mt-6 bg-[#E63946] text-white rounded hover:bg-[#d1303d] transition focus:ring-2 focus:ring-gray-500"
              >
                Submit
              </button>
            </Form.Item>
          </Form>
        </div>
      </div>

      {/* Right Column - Illustration */}
      <div className="hidden md:flex md:w-1/2 bg-[#162236] items-center justify-center relative">
        <div className="absolute top-4 right-4">
          <Link to="/">
            <button className="text-white hover:bg-blue-700 p-2 rounded-full">
              <IoClose size={24} />
            </button>
          </Link>
        </div>
        <div className="text-center px-12">
          <div className="w-[500px] h-[500px] mx-auto">
            <img src="./forgot.svg" alt="Forgot Password Illustration" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
