import React, { useEffect, useState } from "react";
import { MdCalendarToday } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom";
import { blogsData } from "./Blog";
import PageHeading from "../../shared/PageHeading";

const ViewBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(blog);
  useEffect(() => {
    const fetchBlog = () => {
      try {
        setTimeout(() => {
          const foundBlog = blogsData.find((blog) => blog.id === id);
          if (foundBlog) {
            setBlog(foundBlog);
          } else {
            setError("Blog post not found");
          }
          setIsLoading(false);
        }, 500);
      } catch (err) {
        setError("Failed to load blog post");
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          onClick={() => navigate('/blog')} 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Blog
        </button>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 mb-4">Blog post not found</p>
        <button 
          onClick={() => navigate('/blog')} 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Blog
        </button>
      </div>
    );
  }

  return (
    <div>
      <PageHeading title="Blog" />

      <main className="px-5 md:px-0 pt-5 pb-10">
        <article className="rounded-2xl shadow-lg overflow-hidden">
          <div className="h-80 bg-gray-100 overflow-hidden">
            {blog?.imageUrl ? (
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                <span className="text-gray-400 text-lg">
                  No image available
                </span>
              </div>
            )}
          </div>
          <div className="my-5 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white mb-6 leading-tight">
              {blog.title}
            </h1>
            <div className="flex items-center gap-2 text-[#9F9C96] mb-6">
              <MdCalendarToday className="w-4 h-4" />
              <span className="text-sm">{formatDate(blog.date)}</span>
            </div>
          </div>
          <div className="prose prose-lg max-w-none text-[#9F9C96] leading-relaxed">
            <p className="mb-5">
              Stay ahead with expert insights, clinical tips, and the latest
              product updates for modern dental professionals. Relaxing dental
              appointment" might sound like an oxymoron. But when dental
              sedation is involved it proves true. Discomfort, dental anxiety,
              or the general desire to experience a relaxed and comfortable
              procedure make sedation a viable option. Knowing your sedation
              options and being aware of how each applies to your dental
              procedures can help you have a positive experience at your next
              appointment.
            </p>
            <p className="mb-5">
              Discomfort, dental anxiety, or the general desire to experience a
              relaxed and comfortable procedure make sedation a viable option.
            </p>
            <p className="mb-5">
              Knowing your sedation options and being aware of how each applies
              to your dental procedures can help you have a positive experience
              at your next appointment.
            </p>

            <p className="mb-5">
              This is among the mildest sedation solutions. The safe gas is
              gently inhaled by breathing normally through a small nose
              covering.
            </p>

            <p className="mb-5">
              Nitrous provides a quick sedation result. You will feel relaxed
              while being fully awake.
            </p>

            <p className="mb-5">
              The effects of nitrous sedation also wears off quickly. You will
              be able to depart the dental office within minutes following your
              appointment.
            </p>

            <p className="mb-5">
              Nitrous oxide sedation is commonly used during dental procedures
              to provide a level of comfort and relaxation. It is also effective
              if you have mild to moderate anxiety associated with dental
              appointments.
            </p>

            <p className="mb-5">
              Nitrous sedation is safe for adults and children as well.
            </p>
          </div>
        </article>
      </main>
    </div>
  );
};

export default ViewBlog;
