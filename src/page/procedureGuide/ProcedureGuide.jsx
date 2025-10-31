import React, { useState } from "react";
import { Modal, message } from "antd";
import PageHeading from "../../shared/PageHeading";
import { IoSearch } from "react-icons/io5";
import { FiPlus, FiEye, FiEdit3, FiTrash2 } from "react-icons/fi";
import { SearchInput } from "../../components/search/SearchInput";
import Addprocedue from "./Addprocedue";
import EditProcedure from "./EditProcedure";
import {
  useDeleteProcedureMutation,
  useGetProcedureQuery,
} from "../redux/api/productManageApi";
import { imageUrl } from "../redux/api/baseApi";

const ProcedureGuide = () => {
  // ✅ Fetch all procedure data
  const { data: getAllProcedure, isLoading, isError } = useGetProcedureQuery();
  const [deleteProcedure] = useDeleteProcedureMutation();
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedProcedure, setSelectedProcedure] = useState(null);
  const [currentProcedure, setCurrentProcedure] = useState(null);

  // ✅ Handle View
  const handleView = (record) => {
    setCurrentProcedure(record);
    setIsViewModalVisible(true);
  };

  // ✅ Handle Edit (Modal Open)
  const handleEdit = (record) => {
    setSelectedProcedure(record);
    setEditModal(true);
  };

  // ✅ Handle Delete (just UI for now)
  const handleDeleteClick = async (id) => {
    try {
      const res = await deleteProcedure(id).unwrap();
      message.success(res?.message);
    } catch (err) {
      message.error(err?.data?.message);
    }
  };

  // ✅ Show loading or error states
  if (isLoading)
    return <p className="text-center py-10">Loading procedures...</p>;
  if (isError)
    return (
      <p className="text-center text-red-500 py-10">
        Failed to fetch procedures.
      </p>
    );

  // ✅ Data safely accessed
  const procedures = getAllProcedure?.data || [];

  return (
    <main className="pb-10">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-5 gap-2">
        <PageHeading title="Procedure Guide" />
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 w-full md:w-auto">
         
          <button
            onClick={() => setOpenAddModal(true)}
            className="w-full md:w-auto px-6 py-3 bg-[#136BFB] rounded-lg text-white flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors whitespace-nowrap"
          >
            <FiPlus className="w-5 h-5" />
            Add Procedure Guide
          </button>
        </div>
      </header>

      {/* ✅ Procedure Cards */}
      <div className="space-y-5 flex flex-col gap-5">
        {procedures.length === 0 ? (
          <p className="text-center text-gray-500 py-10">
            No procedures found.
          </p>
        ) : (
          procedures.map((procedure) => (
            <div
              key={procedure._id}
              className="relative bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group"
            >
              <div className="relative h-[20rem] md:h-[25rem] overflow-hidden">
                <img
                  src={`${imageUrl}${procedure.imageUrl}`}
                  alt={procedure.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>

                <div className="absolute inset-0 flex flex-col justify-between p-8">
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold text-white mb-3">
                      {procedure.name}
                    </h3>
                    <p className="text-white/90 text-lg mb-4 max-w-2xl leading-relaxed">
                      {procedure.description}
                    </p>
                  </div>

                  <div className="flex gap-2 mt-5">
                    <button
                      onClick={() => handleView(procedure)}
                      className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white md:px-6 px-3 md:py-3 py-2 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
                    >
                      <FiEye className="h-4 w-4" />
                      <span>View</span>
                    </button>

                    <button
                      onClick={() => handleEdit(procedure)}
                      className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white md:px-6 px-3 md:py-3 py-2 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
                    >
                      <FiEdit3 className="h-4 w-4" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => handleDeleteClick(procedure?._id)}
                      className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white md:px-6 px-3 md:py-3 py-2 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
                    >
                      <FiTrash2 className="h-4 w-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Modal */}
      <Addprocedue
        openAddModal={openAddModal}
        setOpenAddModal={setOpenAddModal}
      />

      {/* Edit Modal */}
      <EditProcedure
        editModal={editModal}
        setEditModal={setEditModal}
        selectedProcedure={selectedProcedure}
      />

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
                src={`${imageUrl}${currentProcedure.imageUrl}`}
                alt={currentProcedure.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">
                  {currentProcedure.name}
                </h2>
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
    </main>
  );
};

export default ProcedureGuide;
