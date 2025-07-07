import React, { useState } from "react";
import { Input } from "antd";
import PageHeading from "../../shared/PageHeading";
import { IoSearch } from "react-icons/io5";
import { FiSearch, FiPlus, FiEye, FiEdit3, FiTrash2 } from "react-icons/fi";

const ProcedureGuide = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [procedures, setProcedures] = useState([
    {
      id: 1,
      title: "Endodontic Therapy",
      description:
        "All the essentials for a standard endodontic procedure, ready to review",
      productsIncluded: 8,
      image:
        "https://images.pexels.com/photos/6812539/pexels-photo-6812539.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      id: 2,
      title: "Pulpotomy and Pulp Capping",
      description:
        "All the essentials for a standard endodontic procedure, ready to review",
      productsIncluded: 8,
      image:
        "https://images.pexels.com/photos/6812544/pexels-photo-6812544.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      id: 3,
      title: "Apicoectomy Procedure",
      description:
        "All the essentials for a standard endodontic procedure, ready to review",
      productsIncluded: 8,
      image:
        "https://images.pexels.com/photos/6812546/pexels-photo-6812546.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      id: 4,
      title: "Dental Implant Placement",
      description:
        "Complete set of tools and materials for dental implant placement",
      productsIncluded: 12,
      image:
        "https://images.pexels.com/photos/6812513/pexels-photo-6812513.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      id: 5,
      title: "Braces Adjustment Session",
      description:
        "Essential instruments for routine orthodontic maintenance and adjustments",
      productsIncluded: 6,
      image:
        "https://images.pexels.com/photos/6812502/pexels-photo-6812502.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      id: 6,
      title: "Advanced Gum Surgery",
      description:
        "Specialized tools for advanced periodontal surgical procedures",
      productsIncluded: 10,
      image:
        "https://images.pexels.com/photos/6812521/pexels-photo-6812521.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
  ]);

  const filteredProcedures = procedures.filter(
    (procedure) =>
      procedure.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      procedure.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    setProcedures(procedures.filter((procedure) => procedure.id !== id));
  };

  const handleView = (id) => {
    console.log("Viewing procedure:", id);
  };

  const handleEdit = (id) => {
    console.log("Editing procedure:", id);
  };
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-5 gap-5">
        <PageHeading title="Procedure Guide" />
        <div className="flex flex-col md:flex-row justify-center items-center md:items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-[300px]">
            <Input
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              prefix={<IoSearch className="text-gray-400" />}
              className="w-full h-[46px] px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          <button
            //   onClick={() => {
            //     setBrandName("");
            //     setIsAddModalVisible(true);
            //   }}
            className="w-full md:w-[200px] p-[10px] bg-[#136BFB] rounded text-white flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors"
          >
            <FiPlus className="w-5 h-5" />
            Add Procedure Guide
          </button>
        </div>
      </div>
      {/* Procedure Cards */}
      <div className="space-y-6">
        {filteredProcedures.map((procedure) => (
          <div
            key={procedure.id}
            className="relative bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group"
          >
            {/* Background Image with Overlay */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={procedure.image}
                alt={procedure.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>

              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-between p-8">
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-white mb-3">
                    {procedure.title}
                  </h3>
                  <p className="text-white/90 text-lg mb-4 max-w-2xl leading-relaxed">
                    {procedure.description}
                  </p>
                  <p className="text-white/80 text-base font-medium">
                    Products Included: {procedure.productsIncluded} Items
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleView(procedure.id)}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
                  >
                    <FiEye className="h-4 w-4" />
                    <span>View</span>
                  </button>

                  <button
                    onClick={() => handleEdit(procedure.id)}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
                  >
                    <FiEdit3 className="h-4 w-4" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => handleDelete(procedure.id)}
                    className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
                  >
                    <FiTrash2 className="h-4 w-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProcedures.length === 0 && (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiSearch className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            No procedures found
          </h3>
          <p className="text-gray-500 text-lg">
            Try adjusting your search terms or add new procedures.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProcedureGuide;
