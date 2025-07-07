import { Input } from "antd";
import PageHeading from "../../shared/PageHeading";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";
import { FiSearch, FiEdit3, FiTrash2 } from "react-icons/fi";

const Category = () => {
  const [searchText, setSearchText] = useState("");
  const [items, setItems] = useState([
    {
      id: 1,
      category: "Prosthetics",
      image:
        "https://images.pexels.com/photos/6812546/pexels-photo-6812546.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: 2,
      category: "Orthodontics",
      image:
        "https://images.pexels.com/photos/6812513/pexels-photo-6812513.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: 3,
      category: "Hygiene",
      image:
        "https://images.pexels.com/photos/6812502/pexels-photo-6812502.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: 4,
      category: "Surgery",
      image:
        "https://images.pexels.com/photos/6812544/pexels-photo-6812544.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: 5,
      category: "Endodontics",
      image:
        "https://images.pexels.com/photos/6812539/pexels-photo-6812539.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: 6,
      category: "Periodontics",
      image:
        "https://images.pexels.com/photos/6812521/pexels-photo-6812521.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: 7,
      category: "Restorative",
      image:
        "https://images.pexels.com/photos/6812535/pexels-photo-6812535.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: 8,
      category: "Diagnostics",
      image:
        "https://images.pexels.com/photos/6812531/pexels-photo-6812531.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
  ]);

  const filteredItems = items.filter((item) =>
    item.category.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-5 gap-5">
        <PageHeading title="All Category" />
        <div className="flex flex-col md:flex-row justify-center items-center md:items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-[200px] h-[46px]">
            <Input
              placeholder="Search category..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full h-[46px] pl-12 pr-4 rounded-md border-2 border-[#3b3b3b]"
              prefix={
                <IoSearch
                  className="text-gray-400 absolute left-3 top-3.5"
                  size={20}
                />
              }
            />
          </div>

          <button
            //   onClick={showAddModal}
            className="w-full md:w-[200px] p-[10px] bg-[#136BFB] rounded text-white"
          >
            + Add Category
          </button>
        </div>
      </div>
      <div className="px-5 md:px-0 my-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 group"
            >
              <div className="relative overflow-hidden rounded-t-xl">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-4 flex items-center justify-between">
                <p className="text-lg font-bold">
                  <span className="text-gray-700">{item.category}</span>
                </p>

                <div className="flex items-center space-x-2">
                  <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 transition-colors">
                    <FiEdit3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="flex items-center space-x-1 text-red-600 hover:text-red-700 transition-colors"
                  >
                    <FiTrash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiSearch className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No items found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search terms or add new categories.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Category;
