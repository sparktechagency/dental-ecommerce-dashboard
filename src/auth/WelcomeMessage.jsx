import { Link } from 'react-router-dom';
import { IoCheckmarkCircle } from 'react-icons/io5';

function WelcomeMessage() {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Column - Content */}
      <div className="w-full md:w-1/2 bg-[#171717] p-8 flex flex-col justify-center relative">
        <div className="max-w-md mx-auto w-full text-center">
          {/* Success Icon */}
          {/* <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <IoCheckmarkCircle className="text-green-500 text-5xl" />
          </div> */}
          
          <h1 className="text-5xl font-bold text-white mb-10">Congratulation !</h1>
          <p className="text-gray-300 mb-8 text-2xl">
          Your password has been updated, please change your password regularly to avoid this happening.
          </p>

          <Link 
            to="/login" 
            className="inline-block w-full bg-[#136BFB] hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition mt-5 text-center"
          >
          Continue
          </Link>
        </div>
      </div>

      {/* Right Column - Illustration */}
      <div className="hidden md:flex md:w-1/2 bg-[#162236] items-center justify-center relative">
        <div className="absolute top-4 right-4">
          <Link to="/" className="text-white hover:bg-blue-700 p-2 rounded-full inline-block">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Link>
        </div>
        <div className="text-center px-12">
          <div className="w-[400px] h-[400px] mx-auto">
            <img 
              src="/welcome.svg" 
              alt="Welcome" 
              className="w-full h-full object-contain" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomeMessage;