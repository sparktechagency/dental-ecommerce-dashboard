import React, { useState } from "react";
import PageHeading from "../../shared/PageHeading";

export default function ViewProduct() {
  const [selectedImage, setSelectedImage] = useState(0);

  const productImages = [
    "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=600",
  ];
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-5 gap-5">
        <PageHeading title="Product Details" />
        <div className="flex gap-2">
          <button className="px-5 py-2 border border-red-600 text-red-600 rounded-lg">
            Delete
          </button>
          <button className="px-5 py-2 bg-blue-600 text-white rounded-lg">
            Edit
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left Side - Product Images */}
        <div className="space-y-5">
          <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden group">
            <img
              src={productImages[selectedImage]}
              alt="PANORA 200"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2">
            {productImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  selectedImage === index
                    ? "border-blue-500 ring-2 ring-blue-200"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <img
                  src={image}
                  alt={`Product view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Side - Product Details */}
        <div className="space-y-5">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">PANORA 200</h1>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#9F9C96]">Availability:</span>
            <span className="text-[#136BFB] font-semibold">In Stock</span>
          </div>

          <div className="space-y-2">
            <p className="text-[#9F9C96] leading-relaxed">
              The NSK Ti-Max Z Micro SL High-Speed Handpiece is a premium dental
              instrument designed for precision and reliability. It features a
              micro head with dimensions of Ø 9 x 10.8 mm, offering enhanced
              visibility and maneuverability. This handpiece comes with a
              fibre-optic illumination system, providing clear and bright
              lighting for improved visibility during procedures. It uses a
              Sirona connection and is equipped with Quattro Spray for optimal
              cooling.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[#9F9C96]">Brand:</span>
              <span className="text-[#136BFB] font-semibold">Panora</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#9F9C96]">Procedure:</span>
              <span className="text-[#136BFB] font-semibold">Root Canal</span>
            </div>
          </div>

          <div className="py-4">
            <p className="text-4xl font-bold text-[#136BFB]">$500.00</p>
          </div>
        </div>
      </div>
    </>
  );
}
