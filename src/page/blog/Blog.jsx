import { Input } from "antd";
import PageHeading from "../../shared/PageHeading";
import { FiPlus } from "react-icons/fi";

const Blog = () => {
  return (
    <main>
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-5">
        <PageHeading title="Blog" />
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-[300px]">
            <Input
              placeholder="Search by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              prefix={<IoSearch className="text-gray-400" />}
              className="w-full h-12 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          <button
            onClick={handleAdd}
            className="w-full md:w-auto px-6 py-3 bg-[#136BFB] rounded-lg text-white flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors whitespace-nowrap"
          >
            <FiPlus className="w-5 h-5" />
            Add Blog
          </button>
        </div>
      </header>
      <div>
        
      </div>
    </main>
  );
};
export default Blog;





// import React, { useState } from 'react';
// import { Header } from './components/Header';
// import { BlogCard } from './components/BlogCard';
// import { blogsData, Blog } from './data/blogs';

// function App() {
//   const [blogs, setBlogs] = useState(blogsData);

//   const handleAddNew = () => {
//     console.log('Add new blog clicked');
//   };

//   const handleView = (id: string) => {
//     console.log('View blog:', id);
//   };

//   const handleEdit = (id: string) => {
//     console.log('Edit blog:', id);
//   };

//   const handleDelete = (id: string) => {
//     setBlogs(blogs.filter(blog => blog.id !== id));
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header onAddNew={handleAddNew} />
      
//       <main className="max-w-7xl mx-auto px-6 py-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {blogs.map((blog) => (
//             <BlogCard
//               key={blog.id}
//               title={blog.title}
//               description={blog.description}
//               date={blog.date}
//               imageUrl={blog.imageUrl}
//               onView={() => handleView(blog.id)}
//               onEdit={() => handleEdit(blog.id)}
//               onDelete={() => handleDelete(blog.id)}
//             />
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// }

// export default App;




// import React from 'react';
// import { Calendar, Eye, Edit, Trash2 } from 'lucide-react';

// interface BlogCardProps {
//   title: string;
//   description: string;
//   date: string;
//   imageUrl: string;
//   onView: () => void;
//   onEdit: () => void;
//   onDelete: () => void;
// }

// export const BlogCard: React.FC<BlogCardProps> = ({
//   title,
//   description,
//   date,
//   imageUrl,
//   onView,
//   onEdit,
//   onDelete,
// }) => {
//   return (
//     <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
//       <div className="relative h-48 overflow-hidden">
//         <img
//           src={imageUrl}
//           alt={title}
//           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
//         <div className="absolute bottom-0 left-0 right-0 p-4">
//           <h3 className="text-white text-xl font-semibold mb-2">{title}</h3>
//           <p className="text-white/90 text-sm line-clamp-2">{description}</p>
//         </div>
//       </div>
      
//       <div className="p-4">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center text-gray-500 text-sm">
//             <Calendar className="w-4 h-4 mr-2" />
//             {date}
//           </div>
          
//           <div className="flex items-center space-x-2">
//             <button
//               onClick={onView}
//               className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
//               title="View"
//             >
//               <Eye className="w-4 h-4" />
//             </button>
//             <button
//               onClick={onEdit}
//               className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
//               title="Edit"
//             >
//               <Edit className="w-4 h-4" />
//             </button>
//             <button
//               onClick={onDelete}
//               className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
//               title="Delete"
//             >
//               <Trash2 className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };