import React from "react";
import { Calendar, Eye, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const BlogCard = ({
  id,
  title,
  description,
  date,
  imageUrl,
  onEdit,
  onDelete,
}) => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#1c1c1c] rounded-lg shadow-sm overflow-hidden">
      <div className="min-h-[250px] min-w-[387px]">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-5">
        <div className="">
          <h3 className="text-white text-xl font-semibold mb-2">{title}</h3>
          <p className="text-[#9F9C96] text-sm line-clamp-2">{description}</p>
        </div>
        <div className="flex items-center justify-between mt-5">
          <div className="flex items-center text-[#9F9C96] text-sm">
            <Calendar className="w-4 h-4 mr-2" />
            {date}
          </div>

          <div className="flex items-center space-x-1">
            <button
              onClick={() => navigate(`/view-blog/${id}`)}
              className="p-2 text-[#017FF4]"
              title="View"
            >
              <Eye className="w-5 h-5" />
            </button>
            <button
              onClick={onEdit}
              className="p-2 text-[#017FF4]"
              title="Edit"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={onDelete}
              className="p-2 text-red-600"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
