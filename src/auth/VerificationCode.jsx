import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import OTPInput from "react-otp-input";
import { message } from "antd";
import { useVerifyOtpMutation } from "../page/redux/api/userApi";

function VerificationCode() {
  const [otp, setOtp] = useState("");
  const [verifyOtp] = useVerifyOtpMutation();
  const navigate = useNavigate();

  const handleVerify = async () => {
    const data = {
      code: otp,
      email: localStorage.getItem("email"),
    };

    if (!otp || otp.length < 5) {
      return message.warning("Please enter the 6-digit code");
    }

    try {
      const response = await verifyOtp(data).unwrap();
      message.success(response?.message);
      localStorage.setItem("resetToken", response?.data?.resetToken);
 
      navigate("/reset-password");
    } catch (error) {
      console.error(error);
      message.error(error?.data?.message || "Invalid verification code");
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Column - Verification Form */}
      <div className="w-full md:w-1/2 bg-[#171717] p-8 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <h1 className="text-center text-3xl font-bold text-white mb-4">
            Verification Code
          </h1>
          <p className="text-center text-[#9F9C96] mb-8">
            We have sent the verification code to your email.
          </p>

          {/* OTP Input */}
          <div className="flex justify-center mb-6">
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span className="mx-1" />}
              renderInput={(props) => (
                <input
                  {...props}
                  className="w-[40px] h-16 text-center bg-white text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  style={{ width: "40px", height: "50px" }}
                />
              )}
            />
          </div>

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            className="w-full py-2 bg-[#D17C51] text-white font-semibold rounded-md hover:bg-[#b96940] transition-all duration-200"
          >
            Verify Code
          </button>

          {/* Resend Section */}
          <p className="text-center mt-4 text-sm text-white">
            Didn’t receive the email?{" "}
            <span
              // onClick={handleResend}
              className="text-[#D17C51] cursor-pointer font-medium hover:underline"
            >
              Resend
            </span>
          </p>
        </div>
      </div>

      {/* Right Column - Illustration */}
      <div className="hidden md:flex md:w-1/2 bg-[#162236] items-center justify-center relative">
        <div className="absolute top-4 right-4">
          <Link
            to="/signin"
            className="text-white hover:bg-blue-700 p-2 rounded-full inline-block"
          >
            <IoClose size={24} />
          </Link>
        </div>
        <div className="text-center px-12">
          <div className="w-[400px] h-[400px] mx-auto">
            <img
              src="/otp.svg"
              alt="Verification"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerificationCode;
