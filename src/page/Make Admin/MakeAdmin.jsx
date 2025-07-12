import { useState, useMemo } from "react";
import { IoSearch } from "react-icons/io5";
import PageHeading from "../../shared/PageHeading";
import { ConfigProvider, Table, Form, message, Modal, Input, Select } from "antd";
import { FiPlus } from "react-icons/fi";
import { SearchInput } from "../../components/search/SearchInput";
import { RiDeleteBin6Line } from "react-icons/ri";

const { Option } = Select;

const MakeAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [adminToDelete, setAdminToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [dataSource, setDataSource] = useState([
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
  ]);
  const [form] = Form.useForm();

  const filteredDataSource = useMemo(() => {
    if (!searchTerm) return dataSource;
    const searchLower = searchTerm.toLowerCase();
    return dataSource.filter(
      (user) =>
        user.userName.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower)
    );
  }, [searchTerm, dataSource]);

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

  const openDeleteModal = (admin) => {
    setAdminToDelete(admin);
    setIsModalOpen(true);
  };

  const handleDeleteAdmin = async () => {
    if (!adminToDelete) return;
    
    setIsDeleting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update the data source by filtering out the deleted admin
      setDataSource(prev => prev.filter(admin => admin.key !== adminToDelete.key));
      
      message.success(`Admin "${adminToDelete.userName}" has been deleted successfully`);
      setIsModalOpen(false);
      setAdminToDelete(null);
    } catch (error) {
      console.error("Error deleting admin:", error);
      message.error("Failed to delete admin. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const columns = [
    { title: "No", dataIndex: "no", key: "no" },
    {
      title: "Name",
      key: "userName",
      dataIndex: "userName",
    },
    { 
      title: "Email", 
      dataIndex: "email", 
      key: "email" 
    },
    {
      title: "User Type",
      dataIndex: "userType",
      key: "userType",
      render: (userType) => (
        <span className="capitalize">{userType}</span>
      )
    },
    {
      title: "Action",
      key: "action",
      align: 'right',
      render: (_, record) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            openDeleteModal(record);
          }}
          className="border border-red-500 text-red-500 rounded-lg p-2 hover:bg-red-50 transition-colors"
          aria-label={`Delete ${record.userName}`}
        >
          <RiDeleteBin6Line className="w-5 h-5" />
        </button>
      ),
    },
  ];

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6 md:mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <PageHeading title="All Admin" />
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <SearchInput 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search admins..."
            />
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
            Table: {
              headerBg: "#3b3b3b",
              headerColor: "#fff",
              cellFontSize: 16,
              headerSplitColor: "#3b3b3b",
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
          },
        }}
      >
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 10 }}
          scroll={{ x: "max-content" }}
        />
      </ConfigProvider>

      {/* Delete Confirmation Modal */}
      <Modal
        open={isModalOpen}
        centered
        onCancel={() => {
          setIsModalOpen(false);
          setAdminToDelete(null);
        }}
        footer={null}
        width={400}
        closable={false}
        className="delete-confirmation-modal"
      >
        <div className="p-6 text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <RiDeleteBin6Line className="h-6 w-6 text-red-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Delete Admin
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            Are you sure you want to delete <span className="font-semibold">{adminToDelete?.userName}</span>? 
            This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                setAdminToDelete(null);
              }}
              disabled={isDeleting}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDeleteAdmin}
              disabled={isDeleting}
              className="flex-1 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
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
    </div>
  );
};

export default MakeAdmin;
