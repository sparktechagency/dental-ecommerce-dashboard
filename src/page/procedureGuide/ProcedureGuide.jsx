import React, { useState, useRef } from "react";
import { Input, Modal, message } from "antd";
import PageHeading from "../../shared/PageHeading";
import { IoSearch } from "react-icons/io5";
import {
  FiPlus,
  FiEye,
  FiEdit3,
  FiTrash2,
  FiX,
  FiUpload,
} from "react-icons/fi";

const ProcedureGuide = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentProcedure, setCurrentProcedure] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [newProcedureData, setNewProcedureData] = useState({
    title: "",
    description: "",
    productsIncluded: 1,
  });
  const fileInputRef = useRef(null);

  const procedures = [
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
  ];

  const filteredProcedures = procedures.filter(
    (procedure) =>
      procedure.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      procedure.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (procedure) => {
    setCurrentProcedure(procedure);
    setIsViewModalVisible(true);
  };

  const handleEdit = (procedure) => {
    setCurrentProcedure(procedure);
    setPreviewImage(procedure.image);
    setNewProcedureData({
      title: procedure.title,
      description: procedure.description,
      productsIncluded: procedure.productsIncluded,
    });
    setIsEditModalVisible(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleAdd = () => {
    setNewProcedureData({
      title: "",
      description: "",
      productsIncluded: 1,
    });
    setPreviewImage(null);
    setIsAddModalVisible(true);
  };

  const handleSave = () => {
    if (!newProcedureData.title.trim()) {
      message.error("Please enter a procedure title");
      return;
    }

    if (currentProcedure) {
      // Update existing procedure
      setProcedures(
        procedures.map((proc) =>
          proc.id === currentProcedure.id
            ? {
                ...proc,
                ...newProcedureData,
                image: previewImage || proc.image,
              }
            : proc
        )
      );
      message.success("Procedure updated successfully");
      setIsEditModalVisible(false);
    } else {
      // Add new procedure
      const newProcedure = {
        ...newProcedureData,
        id: Date.now(),
        image:
          previewImage || "https://via.placeholder.com/800x400?text=No+Image",
      };
      setProcedures([...procedures, newProcedure]);
      message.success("Procedure added successfully");
      setIsAddModalVisible(false);
    }
    setCurrentProcedure(null);
    setPreviewImage(null);
  };

  const handleDeleteClick = (procedure) => {
    setCurrentProcedure(procedure);
    setIsDeleteModalVisible(true);
  };

  return (
    <div className="p-6">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-5">
        <PageHeading title="Procedure Guide" />
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
            Add Procedure Guide
          </button>
        </div>
      </header>

      {/* Procedure Cards */}
      <div className="space-y-6">
        {filteredProcedures.map((procedure) => (
          <div
            key={procedure.id}
            className="relative bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group"
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={procedure.image}
                alt={procedure.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>

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

                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleView(procedure)}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
                  >
                    <FiEye className="h-4 w-4" />
                    <span>View</span>
                  </button>

                  <button
                    onClick={() => handleEdit(procedure)}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
                  >
                    <FiEdit3 className="h-4 w-4" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => handleDeleteClick(procedure)}
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
        <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiPlus className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            No procedures found
          </h3>
          <p className="text-gray-500 text-lg mb-6">
            {searchTerm
              ? "No matching procedures found. Try different search terms or "
              : "Get started by adding a new procedure guide."}
          </p>
          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            <FiPlus className="w-5 h-5" />
            Add New Procedure
          </button>
        </div>
      )}

      {/* Add/Edit Procedure Modal */}
      <Modal
        title={currentProcedure ? "Edit Procedure" : "Add New Procedure"}
        open={isAddModalVisible || isEditModalVisible}
        onCancel={() => {
          if (isAddModalVisible) setIsAddModalVisible(false);
          if (isEditModalVisible) setIsEditModalVisible(false);
          setCurrentProcedure(null);
          setPreviewImage(null);
        }}
        footer={null}
        centered
      >
        <div className="p-4">
          {/* Upload Area */}
          <div className="mb-6">
            <div
              onClick={triggerFileInput}
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer"
            >
              {previewImage ? (
                <div className="relative">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="max-h-40 mx-auto mb-2 rounded"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewImage(null);
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <FiX className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <>
                  <FiUpload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">
                    Upload Procedure Image
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Click to upload or drag and drop
                  </p>
                </>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Procedure Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter procedure title"
                value={newProcedureData?.title || ""}
                onChange={(e) =>
                  setNewProcedureData({
                    ...newProcedureData,
                    title: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Description
              </label>
              <textarea
                rows={3}
                placeholder="Enter procedure description"
                value={newProcedureData?.description || ""}
                onChange={(e) =>
                  setNewProcedureData({
                    ...newProcedureData,
                    description: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Number of Products
              </label>
              <input
                type="number"
                min={1}
                placeholder="Enter number of products"
                value={newProcedureData?.productsIncluded || ""}
                onChange={(e) =>
                  setNewProcedureData({
                    ...newProcedureData,
                    productsIncluded: parseInt(e.target.value) || 1,
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSave}
            disabled={!newProcedureData?.title?.trim()}
            className={`w-full mt-6 py-2 px-4 rounded-lg font-medium text-white ${
              newProcedureData?.title?.trim()
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            } transition-colors`}
          >
            {currentProcedure ? "Update" : "Add"} Procedure
          </button>
        </div>
      </Modal>

      {/* View Procedure Modal */}
      <Modal
        title="Procedure Details"
        open={isViewModalVisible}
        onCancel={() => {
          setIsViewModalVisible(false);
          setCurrentProcedure(null);
        }}
        footer={null}
        centered
        className="max-w-3xl"
      >
        {currentProcedure && (
          <div className="space-y-6">
            <div className="relative h-64 rounded-xl overflow-hidden">
              <img
                src={currentProcedure.image}
                alt={currentProcedure.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">
                  {currentProcedure.title}
                </h2>
                <p className="text-blue-200 font-medium">
                  {currentProcedure.productsIncluded} Products Included
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {currentProcedure.description}
              </p>
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-100">
              <button
                onClick={() => {
                  setIsViewModalVisible(false);
                  setCurrentProcedure(null);
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Delete Procedure"
        open={isDeleteModalVisible}
        onCancel={() => {
          setIsDeleteModalVisible(false);
          setCurrentProcedure(null);
        }}
        footer={null}
        centered
        className="max-w-md"
      >
        <div className="p-5">
          <h1 className="text-4xl text-center text-[#0D0D0D]">
            Are you sure you want to delete ?
          </h1>

          <div className="text-center py-5">
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-[#3b3b3b] text-white font-semibold w-full py-2 rounded transition duration-200"
            >
              Yes,Delete
            </button>
          </div>
          <div className="text-center pb-5">
            <button
              onClick={() => setIsModalOpen(false)}
              className="text-[#3b3b3b] border-2 border-[#3b3b3b] bg-white font-semibold w-full py-2 rounded transition duration-200"
            >
              No,Don’t Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProcedureGuide;
