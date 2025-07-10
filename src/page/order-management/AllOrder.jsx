import { useState } from "react";
import { IoEyeOutline, IoSearch } from "react-icons/io5";
import PageHeading from "../../shared/PageHeading";
import { ConfigProvider, Modal, Table, Select, Input } from "antd";
import OrderInformationModal from "./OrderInformationModal";
import { AllOrderData } from "../../../utils/data";
import { SearchInput } from "../../components/search/SearchInput";

export default function AllOrder() {
  const [userDetailsModal, setUserDetailsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchText, setSearchText] = useState("");

  const getStatusStyle = (status) => {
    const styles = {
      Pending: "bg-yellow-100 text-yellow-800",
      Processing: "bg-blue-100 text-blue-800",
      Shipped: "bg-green-100 text-green-800",
      Cancelled: "bg-red-100 text-red-800",
    };
    return styles[status] || "bg-gray-100 text-gray-800";
  };
  const columns = [
    { title: "Order Id", dataIndex: "key", key: "key" },

    {
      title: "Customer",
      key: "customer",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <img
            src={`https://avatar.iran.liara.run/public/${record?.no}`}
            className="w-10 h-10 object-cover rounded-full"
            alt="User Avatar"
          />
          <span>{record?.customer}</span>
        </div>
      ),
    },
    { title: "Products", dataIndex: "products", key: "products" },
    { title: "Qty", dataIndex: "qty", key: "qty" },
    { title: "Total", dataIndex: "total", key: "total" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <span
          className={`px-2 py-2 rounded text-sm font-medium ${getStatusStyle(
            record.status
          )}`}
        >
          {record.status}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setSelectedUser(record);
              setUserDetailsModal(true);
            }}
            className="border border-[#3b3b3b] text-[#3b3b3b] rounded-lg p-[6px]"
            title="View Details"
          >
            <IoEyeOutline className="w-6 h-6 text-[#3b3b3b]" />
          </button>
          <Select
            className="w-32 h-10"
            value={record.status}
            onChange={(value) => handleStatusChange(record.key, value)}
            options={[
              { value: "Pending", label: "Pending" },
              { value: "Processing", label: "Processing" },
              { value: "Shipped", label: "Shipped" },
              { value: "Cancelled", label: "Cancelled" },
            ]}
          />
        </div>
      ),
    },
  ];
  const filteredData = AllOrderData.filter((item) => {
    const matchesStatus =
      statusFilter === "all" || item.status === statusFilter;
    const matchesSearch =
      item.customer.toLowerCase().includes(searchText.toLowerCase()) ||
      item.products.toLowerCase().includes(searchText.toLowerCase()) ||
      item.key.toLowerCase().includes(searchText.toLowerCase());
    return matchesStatus && matchesSearch;
  });
  const handleStatusChange = (orderId, newStatus) => {
    console.log(`Order ${orderId} status updated to ${newStatus}`);
    alert(`Order ${orderId} status changed to ${newStatus}`);
  };

  return (
    <>
      <div className="my-5 md:my-10 flex flex-col md:flex-row gap-5 justify-between items-center">
        <PageHeading title="All Order" />
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative w-full md:w-[300px]">
            <ConfigProvider
              theme={{
                components: {
                  Select: {
                    selectorBg: "#3b3b3b",
                    activeOutlineColor: "#3b3b3b",
                    placeholderColor: "#fff",
                    colorText: "#fff",
                  },
                },
              }}
            >
              <Select
                className="w-full h-[46px] bg-[#3b3b3b] text-white placeholder:text-white"
                placeholder="Filter by status"
                value={statusFilter}
                onChange={setStatusFilter}
                options={[
                  { value: "all", label: "All" },
                  { value: "Pending", label: "Pending" },
                  { value: "Processing", label: "Processing" },
                  { value: "Shipped", label: "Shipped" },
                  { value: "Cancelled", label: "Cancelled" },
                ]}
              />
            </ConfigProvider>
          </div>
          <div className="relative w-full md:w-[300px]">
            <SearchInput />
            <span className=" text-gray-600 absolute top-0 left-0 h-full px-5 flex items-center justify-center rounded-r-md cursor-pointer">
              <IoSearch className="text-[1.3rem]" />
            </span>
          </div>
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
          dataSource={filteredData}
          columns={columns}
          pagination={{ pageSize: 10 }}
          scroll={{ x: true }}
        />

        <Modal
          centered
          open={userDetailsModal}
          onCancel={() => setUserDetailsModal(false)}
          footer={null}
          width={800}
        >
          {selectedUser && (
            <OrderInformationModal
              order={{
                key: selectedUser.key,
                orderNumber: selectedUser.key,
                status: selectedUser.status,
                date: new Date().toLocaleDateString(), // You might want to add a date field to your data
                customerName: selectedUser.customer,
                email: `${selectedUser.customer
                  .replace(/\s+/g, "")
                  .toLowerCase()}@example.com`,
                phone: `+1${Math.floor(
                  1000000000 + Math.random() * 9000000000
                )}`,
                address: "123 Dental St, Suite 100, New York, NY 10001", // Sample address
                paymentMethod: "Credit Card",
                paymentStatus:
                  selectedUser.status === "Shipped" ? "Paid" : "Unpaid",
                items: selectedUser.products
                  .split(", ")
                  .map((product, index) => ({
                    id: index + 1,
                    name: product,
                    price: Math.floor(Math.random() * 900) + 100, // Random price between 100-1000
                    quantity: parseInt(selectedUser.qty) || 1,
                  })),
              }}
            />
          )}
        </Modal>
      </ConfigProvider>
    </>
  );
}
