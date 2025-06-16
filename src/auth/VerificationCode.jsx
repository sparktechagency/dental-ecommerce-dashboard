import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";

function VerificationCode() {
  const [code, setCode] = useState(new Array(5).fill(""));
  const navigate = useNavigate();

  const handleChange = (value, index) => {
    if (!isNaN(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      
      // Move to next input
      if (value && index < 4) {
        document.getElementById(`code-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      // Move to previous input on backspace
      document.getElementById(`code-${index - 1}`).focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/reset-password");
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Column - Form */}
      <div className="w-full md:w-1/2 bg-[#171717] p-8 flex flex-col justify-center relative">
        <div className="max-w-md mx-auto w-full">
          <h1 className="text-4xl font-bold text-white mb-2">Verification Code</h1>
          <p className="text-gray-300 mb-8">
            We have sent the verification code to your email
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between max-w-md mx-auto mb-8">
              {code.map((digit, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-14 h-14 text-2xl text-center bg-[#2D2D2D] text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full bg-[#136BFB] text-white font-medium py-3 px-4 rounded-lg transition hover:bg-blue-700"
            >
              Verify Code
            </button>

            <div className="text-center mt-4">
              <span className="text-gray-400">Didn't receive a code? </span>
              <button 
                type="button" 
                className="text-blue-400 hover:underline"
                onClick={() => console.log('Resend code')}
              >
                Resend
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Right Column - Illustration */}
      <div className="hidden md:flex md:w-1/2 bg-[#162236] items-center justify-center relative">
        <div className="absolute top-4 right-4">
          <Link to="/signin" className="text-white hover:bg-blue-700 p-2 rounded-full inline-block">
            <IoClose size={24} />
          </Link>
        </div>
        <div className="text-center px-12">
          <div className="w-[400px] h-[400px] mx-auto mb-8">
            <img src="/otp.svg" alt="Verification" className="w-full h-full object-contain" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerificationCode;
