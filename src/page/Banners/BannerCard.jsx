import React from "react";

export const BannerCard = ({ id, imageUrl, onEdit, onDelete }) => {
  return (
    <div className="rounded-lg shadow-sm overflow-hidden">
      <div className="">
        <img
          src={imageUrl}
          alt={id}
          className="w-full h-[160px] object-cover"
        />
      </div>
      <div className="flex items-center justify-between mt-5">
        <button
          onClick={onDelete}
          className="px-5 py-2 text-[#FF3B30] font-semibold border border-[#FF3B30] rounded-lg"
          title="Delete"
        >
          Delete
        </button>
        <button
          onClick={onEdit}
          className="px-5 py-2 bg-[#017FF4] text-white font-semibold border border-[#017FF4] rounded-lg"
          title="Edit"
        >
          Edit
        </button>
      </div>
    </div>
  );
};
