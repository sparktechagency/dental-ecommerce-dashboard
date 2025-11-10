import { useState } from "react";
import { IoEyeOutline, IoSearch } from "react-icons/io5";
import { MdBlockFlipped } from "react-icons/md";
import PageHeading from "../../shared/PageHeading";
import { ConfigProvider, Input, Modal, Pagination, Table, Tag, message } from "antd";
import UserInformation from "./UserInformation";
import { SearchInput } from "../../components/search/SearchInput";
import {
  useBlockUnblockMutation,
  useGetUserAllQuery,
} from "../redux/api/metaDataApi";
import { SearchOutlined } from "@ant-design/icons";
const AllUser = () => {
  const [userDetailsModal, setUserDetailsModal] = useState(false);
    const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const handlePageChange = (page) => setCurrentPage(page);
  const [selectedUser, setSelectedUser] = useState(null);

  const { data: userData, refetch } = useGetUserAllQuery({    search,
    page: currentPage,
    limit: pageSize,});
  const [blockUnblock, { isLoading }] = useBlockUnblockMutation();

  const users = userData?.data?.users || [];
  console.log(users)

  const dataSource = users.map((user, index) => ({
    key: user._id,
    no: index + 1,
    userName: `${user.firstName} ${user.lastName}`,
    email: user.email,
    role: user.role,
    phone:user?.phone,
    gdcNumber:user?.gdcNumber,
    status: user.status,
    imageUrl: user.imageUrl,
  }));

  const handleBlockToggle = async (user) => {
    console.log(user);
    try {
      const newStatus = user.status === "approved" ? "blocked" : "approved";
      const res = await blockUnblock({ id: user.key });
      if (res?.data?.success || res?.data?.message) {
        message.success(
          `User ${
            newStatus === "blocked" ? "blocked" : "unblocked"
          } successfully!`
        );
        refetch();
      } else {
        message.error("Failed to update user status");
      }
    } catch (error) {
      console.error(error);
      message.error("Something went wrong");
    }
  };

  const columns = [
    { title: "No", dataIndex: "no", key: "no" },
    {
      title: "Name",
      key: "userName",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <img
            src={
              record?.imageUrl
                ? record.imageUrl
                : `https://avatar.iran.liara.run/public/${record.no}`
            }
            className="w-10 h-10 object-cover rounded-full"
            alt="User Avatar"
          />
          <span>{record?.userName}</span>
        </div>
      ),
    },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={
            status === "approved"
              ? "green"
              : status === "blocked"
              ? "red"
              : "default"
          }
          className="text-[14px] font-medium capitalize"
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          {/* 👁️ View Details */}
          <button
            onClick={() => {
              setSelectedUser(record);
              setUserDetailsModal(true);
            }}
            className="border border-[#3b3b3b] text-[#3b3b3b] rounded-lg p-2"
          >
            <IoEyeOutline className="w-6 h-6 text-[#3b3b3b]" />
          </button>

          {/* 🟥🟩 Block/Unblock Toggle */}
          <button
            onClick={() => handleBlockToggle(record)}
            disabled={isLoading}
            className={`border rounded-lg p-2 ${
              record.status === "blocked"
                ? "border-red-500 text-red-500"
                : "border-green-500 text-green-500"
            }`}
          >
            <MdBlockFlipped
              className={`w-6 h-6 ${
                record.status === "blocked" ? "text-red-500" : "text-green-500"
              }`}
            />
          </button>
        </div>
      ),
    },
  ];

  return (
    <main>
      <div className="my-5 flex flex-col md:flex-row gap-2 md:gap-5 justify-between items-start md:items-center">
  
         <PageHeading title="All User" />
         <Input
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name..."
            prefix={<SearchOutlined />}
            style={{ maxWidth: "300px", height: "40px" }}
          />
      
      </div>

      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#3b3b3b",
              headerColor: "#fff",
              cellFontSize: 16,
            },
          },
        }}
      >
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          scroll={{ x: "max-content" }}
        />
<div className="mt-4 flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={userData?.data?.total || 0}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
        {/* User Details Modal */}
        <Modal
          centered
          open={userDetailsModal}
          onCancel={() => setUserDetailsModal(false)}
          footer={null}
        >
          {selectedUser && <UserInformation user={selectedUser} />}
        </Modal>
      </ConfigProvider>
    </main>
  );
};

export default AllUser;
