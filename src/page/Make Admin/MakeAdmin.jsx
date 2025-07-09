import { useState } from "react";
import { IoEyeOutline, IoSearch } from "react-icons/io5";
import { MdBlockFlipped } from "react-icons/md";
import PageHeading from "../../shared/PageHeading";
import { ConfigProvider, Modal, Table } from "antd";
import UserInformation from "../user-management/UserInformation";
import { FaTrash } from "react-icons/fa";
// import UserInformation from "./UserInformation";

const MakeAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userDetailsModal, setUserDetailsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const dataSource = [
    {
      key: "1",
      no: "1",
      userName: "Shah Aman",
      email: "shahaman@example.com",
      userType: "admin",
    },
    {
      key: "2",
      no: "2",
      userName: "Jane Doe",
      email: "janedoe@example.com",
      userType: "admin",
    },
    {
      key: "3",
      no: "3",
      userName: "John Smith",
      email: "johnsmith@example.com",
      userType: "admin",
    },
    {
      key: "4",
      no: "4",
      userName: "Alice Johnson",
      email: "alicej@example.com",
      userType: "admin",
    },
    {
      key: "5",
      no: "5",
      userName: "Bob Brown",
      email: "bobb@example.com",
      userType: "admin",
    },
  ];

  const columns = [
    { title: "No", dataIndex: "no", key: "no" },
    {
      title: "Name",
      key: "userName",
      dataIndex: "userName",
    },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "User Type",
      dataIndex: "userType",
      key: "userType",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <button
          onClick={() => {
            setIsModalOpen(true);
          }}
          className="border border-[#3b3b3b] text-[#3b3b3b] rounded-lg p-2"
        >
          <FaTrash className="w-6 h-6 text-[#3b3b3b]" />
        </button>
      ),
    },
  ];

  return (
    <>
      <div className="my-5 md:my-10 flex flex-col md:flex-row gap-5 justify-between items-center">
        <PageHeading title="All Admin" />
        <div className="relative w-full sm:w-[300px] mt-5 md:mt-0 lg:mt-0">
          <input
            type="text"
            placeholder="Search Admin"
            className="border-2 border-[#3b3b3b] py-3 pl-12 pr-[65px] outline-none w-full rounded-md"
          />
          <span className=" text-gray-600 absolute top-0 left-0 h-full px-5 flex items-center justify-center rounded-r-md cursor-pointer">
            <IoSearch className="text-[1.3rem]" />
          </span>
        </div>
      </div>
      <ConfigProvider
        theme={{
          components: {
            InputNumber: {
              activeBorderColor: "#14803c",
            },
            Pagination: {
              colorPrimaryBorder: "#3b3b3b",
              colorBorder: "#3b3b3b",
              colorTextPlaceholder: "#3b3b3b",
              colorTextDisabled: "#3b3b3b",
              colorBgTextActive: "#3b3b3b",
              itemActiveBgDisabled: "#3b3b3b",
              itemActiveColorDisabled: "#3b3b3b",
              itemBg: "#3b3b3b",
              colorBgTextHover: "#3b3b3b",
              colorPrimary: "#3b3b3b",
              colorPrimaryHover: "#3b3b3b",
            },
            Table: {
              headerBg: "#3b3b3b",
              headerColor: "#fff",
              cellFontSize: 16,
              headerSplitColor: "#3b3b3b",
            },
          },
        }}
      >
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 10 }}
          scroll={{ x: "max-content" }}
        />

        <Modal
          open={isModalOpen}
          centered
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
          <div className="p-5">
            <h1 className="text-4xl text-center text-[#0D0D0D]">
              Are you sure you want to block ?
            </h1>

            <div className="text-center py-5">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-[#3b3b3b] text-white font-semibold w-full py-2 rounded transition duration-200"
              >
                Yes,Block
              </button>
            </div>
            <div className="text-center pb-5">
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#3b3b3b] border-2 border-[#3b3b3b] bg-white font-semibold w-full py-2 rounded transition duration-200"
              >
                No,Don’t Block
              </button>
            </div>
          </div>
        </Modal>
        <Modal
          centered
          open={userDetailsModal}
          onCancel={() => setUserDetailsModal(false)}
          footer={null}
        >
          {selectedUser && <UserInformation user={selectedUser} />}
        </Modal>
      </ConfigProvider>
    </>
  );
};

export default MakeAdmin;
