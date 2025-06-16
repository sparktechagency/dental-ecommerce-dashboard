import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline, IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Column - Form */}
      <div className="w-full md:w-1/2 bg-[#171717] p-8 flex flex-col justify-center relative">
        <div className="max-w-md mx-auto w-full">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome Back !</h1>
          <p className="text-gray-300 mb-8">Please enter your email and password to continue</p>

          <form className="space-y-6">
            <div>
              <label className="block text-gray-300 text-sm mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-[#2D2D2D] text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 bg-[#2D2D2D] text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-blue-600 rounded border-gray-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-300">Remember Me</span>
              </label>
              <Link to="/forget-password" className="text-red-500 hover:underline text-sm">
                Forgot Password?
              </Link>
            </div>


            <Link to="/">
              <button
                type="submit"
                className="w-full bg-[#136BFB] text-white font-medium py-3 px-4 rounded-lg transition mt-5"
              >
                Log In
              </button>
            </Link>

          </form>
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
          <div className="w-[500px] h-[500px] mx-auto mb-8">
            <img src="./signin.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
