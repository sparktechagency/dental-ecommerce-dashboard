import React from "react";

export const BannerCard = ({ id, imageUrl, onEdit, onDelete }) => {
  return (
    <div className="bg-[#1c1c1c] rounded-lg shadow-sm overflow-hidden">
      <div className="min-w-[400px] min-h-[160px]">
        <img
          src={imageUrl}
          alt={id}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="py-5">
        <div className="flex items-center justify-between mt-5">
          <div className="flex items-center space-x-1">
            <button
              onClick={onDelete}
              className="px-5 py-2 text-[#FF3B30] font-semibold border border-[#FF3B30] rounded-lg"
              title="Delete"
            >
              Delete
            </button>
            <button
              onClick={onEdit}
              className="px-5 py-2 text-[#017FF4] font-semibold border border-[#017FF4] rounded-lg"
              title="Edit"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
