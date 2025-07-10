import { useState, useMemo } from "react";
import { IoSearch } from "react-icons/io5";
import PageHeading from "../../shared/PageHeading";
import {
  ConfigProvider,
  Input,
  Modal,
  Table,
  Form,
  message,
  Select,
} from "antd";
import UserInformation from "../user-management/UserInformation";
import { FaTrash } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { SearchInput } from "../../components/search/SearchInput";
import { RiDeleteBin6Line } from "react-icons/ri";

const MakeAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [userDetailsModal, setUserDetailsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [form] = Form.useForm();

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

  const filteredDataSource = useMemo(() => {
    if (!searchTerm) return dataSource;
    const searchLower = searchTerm.toLowerCase();
    return dataSource.filter(
      (user) =>
        user.userName.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower)
    );
  }, [searchTerm]);

  const handleAdd = () => {
    setIsAddModalOpen(true);
  };

  const handleAddAdmin = async () => {
    try {
      const values = await form.validateFields();
      console.log("Adding admin:", values);
      message.success("Admin added successfully");
      setIsAddModalOpen(false);
      form.resetFields();
    } catch (errorInfo) {
      console.log("Validation Failed:", errorInfo);
    }
  };

  const handleCancel = () => {
    setIsAddModalOpen(false);
    form.resetFields();
  };

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
        // <button
        //   onClick={() => {
        //     setIsModalOpen(true);
        //   }}
        //   className="border border-[#3b3b3b] text-[#3b3b3b] rounded-lg p-2"
        // >
        //   <FaTrash className="w-6 h-6 text-[#3b3b3b]" />
        // </button>
      <button
      onClick={() => openDeleteModal(record)}
      className="border border-red-500 text-red-500 rounded-lg p-2 hover:bg-red-50 transition-colors"
    >
      <RiDeleteBin6Line className="w-5 h-5" />
    </button>
      ),
    },
  ];

  return (
    <>
      <div className="my-5 md:my-10 flex flex-col md:flex-row gap-5 justify-between items-center">
        <PageHeading title="All Admin" />
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 w-full md:w-auto">
          <div className="relative w-full mt-5 md:mt-0 lg:mt-0">
            <SearchInput />
            <span className=" text-gray-600 absolute top-0 left-0 h-full px-5 flex items-center justify-center rounded-r-md cursor-pointer">
              <IoSearch className="text-[1.3rem]" />
            </span>
          </div>
          <button
            onClick={handleAdd}
            className="w-full md:w-auto px-6 py-3 bg-[#136BFB] rounded-lg text-white flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors whitespace-nowrap"
          >
            <FiPlus className="w-5 h-5" />
            Add New Admin
          </button>
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
          dataSource={filteredDataSource}
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
              Are you sure you want to delete this admin ?
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

        {/* Add Admin Modal */}
        <Modal
          title="Add New Admin"
          open={isAddModalOpen}
          onOk={handleAddAdmin}
          onCancel={handleCancel}
          okText="Add Admin"
          cancelText="Cancel"
          okButtonProps={{
            className: "bg-[#136BFB] hover:bg-blue-600",
            size: "large",
          }}
          cancelButtonProps={{
            className:
              "border-[#3b3b3b] text-[#3b3b3b] hover:border-[#136BFB] hover:text-[#136BFB]",
            size: "large",
          }}
        >
          <Form form={form} layout="vertical" className="mt-6">
            <Form.Item
              name="name"
              label="Full Name"
              rules={[
                {
                  required: true,
                  message: "Please input the admin's full name!",
                },
              ]}
            >
              <Input size="large" placeholder="Enter full name" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  type: "email",
                  message: "Please enter a valid email!",
                },
                {
                  required: true,
                  message: "Please input the admin's email!",
                },
              ]}
            >
              <Input size="large" placeholder="Enter email address" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input a password!",
                },
                {
                  min: 6,
                  message: "Password must be at least 6 characters!",
                },
              ]}
              hasFeedback
            >
              <Input.Password size="large" placeholder="Enter password" />
            </Form.Item>

            <Form.Item
              name="userType"
              label="User Type"
              rules={[
                {
                  required: true,
                  message: "Please select user type!",
                },
              ]}
            >
              <Select
                size="large"
                placeholder="Select user type"
                className="w-full"
              >
                <Option value="admin">Admin</Option>
                <Option value="super_admin">Super Admin</Option>
                <Option value="moderator">Moderator</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </ConfigProvider>
    </>
  );
};

export default MakeAdmin;
