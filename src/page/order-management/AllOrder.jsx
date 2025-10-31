import { useState } from "react";
import { IoEyeOutline, IoSearch } from "react-icons/io5";
import PageHeading from "../../shared/PageHeading";
import { ConfigProvider, Modal, Table, Select, Pagination, Input } from "antd";
import { SearchInput } from "../../components/search/SearchInput";
import {
  useGetOrderQuery,
  useUpdateOrderMutation,
} from "../redux/api/metaDataApi";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { SearchOutlined } from "@ant-design/icons";
export default function AllOrder() {
  const [userDetailsModal, setUserDetailsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [searchText, setSearchText] = useState("");
    const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const handlePageChange = (page) => setCurrentPage(page);
  const { data: orderData, isLoading } = useGetOrderQuery({ status:statusFilter, search, page: currentPage, limit: pageSize });
  const [updateOrder] = useUpdateOrderMutation();
  const getStatusStyle = (status) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800",
      processing: "bg-blue-100 text-blue-800",
      shipped: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return styles[status?.toLowerCase()] || "bg-gray-100 text-gray-800";
  };

  // Map orderData to table dataSource format
  const tableData =
    orderData?.data?.map((order) => ({
      key: order?._id,
      customer: `${order?.user?.firstName} ${order?.user?.lastName}`,
      no: Math.floor(Math.random() * 100),
      products: order?.products?.map((p) => p.snapshot?.name).join(", "),
      qty: order?.products.reduce((sum, p) => sum + p.quantity, 0),
      total: order?.total,
      status: order?.status.charAt(0).toUpperCase() + order?.status.slice(1),
    })) || [];

  const columns = [
    { title: "Order Id", dataIndex: "key", key: "key" },
    {
      title: "Customer",
      key: "customer",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <img
            src={
              record.imageUrl ||
              `https://avatar.iran.liara.run/public/${record.no}`
            }
            className="w-10 h-10 object-cover rounded-full"
            alt="User Avatar"
          />
          <span>{record.customer}</span>
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
              const order = orderData.data.find((o) => o._id === record.key);
              setSelectedUser(order);
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
              { value: "pending", label: "Pending" },
              { value: "confirmed", label: "Confirmed" },
              { value: "processing", label: "Processing" },
              { value: "shipped", label: "Shipped" },
              { value: "cancelled", label: "Cancelled" },
            ]}
          />
        </div>
      ),
    },
  ];

  // ❌ Removed filtering logic — now just display all orders
  const filteredData = tableData;

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrder({ id: orderId, data: { status: newStatus } }).unwrap();
      alert(`Order ${orderId} status changed to ${newStatus}`);
    } catch (error) {
      console.error("Failed to update order status:", error);
      alert("Failed to update status. Please try again.");
    }
  };

  const modalStatusStyle = (status) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800",
      processing: "bg-blue-100 text-blue-800",
      shipped: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
      confirmed: "bg-red-100 text-green-500",
    };
    return styles[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <>
      {/* Header section */}
      <div className="my-5 md:my-10 flex flex-col md:flex-row gap-2 md:gap-5 justify-between items-start md:items-center">
        <PageHeading title="All Order" />
       
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative w-full md:w-[300px]">
            <ConfigProvider
              theme={{
                components: {
                  Select: {
                    selectorBg: "#3b3b3b",
                    activeOutlineColor: "#3b3b3b",
                    placeholderColor: "#3b3b3b",
                    colorText: "#FF9500",
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
                  { value: "", label: "All" },
                  { value: "pending", label: "Pending" },
                  { value: "confirmed", label: "Confirmed" },
                  { value: "processing", label: "Processing" },
                  { value: "shipped", label: "Shipped" },
                  { value: "cancelled", label: "Cancelled" },
                ]}
              />
            </ConfigProvider>
          </div>

          <Input
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name..."
            prefix={<SearchOutlined />}
            style={{ maxWidth: "300px", height: "40px" }}
          />
        </div>
      </div>

      {/* Table */}
      <ConfigProvider
        theme={{
          components: {
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
          pagination={false} // pagination removed
          scroll={{ x: true }}
          loading={isLoading}
        />
      <div className="mt-4 flex justify-center ">
        <div className="bg-white px-2 py-1 rounded-md shadow-md">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={orderData?.meta?.total || 0}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      </div>
        {/* Modal for Order Information */}
        <Modal
          centered
          open={userDetailsModal}
          onCancel={() => setUserDetailsModal(false)}
          footer={null}
          width={800}
        >
          {selectedUser && (
            <div className="bg-white p-5 w-full">
              <div className="mb-5">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-bold text-gray-900">
                    Order Details
                  </h1>
                </div>

                <div className="flex items-center justify-between mb-5">
                  <span className="text-gray-700 text-lg">
                    #{selectedUser._id}
                  </span>
                  <span
                    className={`${modalStatusStyle(
                      selectedUser.status.charAt(0).toUpperCase() +
                        selectedUser.status.slice(1)
                    )} px-3 py-1 rounded-md text-sm font-medium`}
                  >
                    {selectedUser.status.charAt(0).toUpperCase() +
                      selectedUser.status.slice(1)}
                  </span>
                </div>

                <div className="text-gray-600 mb-4">
                  Placed on:{" "}
                  {new Date(selectedUser?.createdAt).toLocaleDateString()}
                </div>

                <div className="space-y-3">
                  <div className="text-gray-900 font-medium">
                    {`${selectedUser?.user?.firstName} ${selectedUser?.user?.lastName}`}
                  </div>

                  {selectedUser?.user?.email && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <MdEmail className="w-4 h-4" />
                      <span>{selectedUser?.user?.email}</span>
                    </div>
                  )}

                  {selectedUser?.address?.phone && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <MdPhone className="w-4 h-4" />
                      <span>{selectedUser?.address?.phone}</span>
                    </div>
                  )}

                  {selectedUser?.address && (
                    <div className="flex items-start gap-2 text-gray-600">
                      <MdLocationOn className="w-4 h-4 mt-1 flex-shrink-0" />
                      <span>
                        Address:{" "}
                        {`${selectedUser?.address?.streetNo}, ${selectedUser?.address?.city}, ${selectedUser?.address?.state}, ${selectedUser?.address?.postalCode}, ${selectedUser?.address?.country}`}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                  <span className="text-green-600 font-medium">
                    {selectedUser.paymentMethod}
                  </span>
                  <span
                    className={`${
                      selectedUser?.paymentStatus === "paid"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    } px-3 py-1 rounded-md text-sm font-medium`}
                  >
                    {selectedUser.paymentStatus.charAt(0).toUpperCase() +
                      selectedUser.paymentStatus.slice(1)}
                  </span>
                </div>
              </div>

              <div className="mb-5 space-y-4">
                {selectedUser.products.map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-5 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center">
                      <div className="w-8 h-8 bg-gray-300 rounded"></div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-gray-900 font-medium">
                        {product.snapshot.name}
                      </h3>
                      <p className="text-blue-600 font-medium">
                        Price: ${product.snapshot.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-gray-700">
                      <span className="font-medium">
                        Qty: {product.quantity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-medium">
                    $
                    {selectedUser.products
                      .reduce(
                        (sum, item) =>
                          sum + item.snapshot.price * item.quantity,
                        0
                      )
                      .toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-gray-900 font-medium text-lg">
                    Total:
                  </span>
                  <span className="text-blue-600 font-bold text-xl">
                    $
                    {selectedUser.products
                      .reduce(
                        (sum, item) =>
                          sum + item.snapshot.price * item.quantity,
                        0
                      )
                      .toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <button
                  className="w-full bg-blue-600 text-white text-lg font-medium py-3 px-6 rounded-md"
                  onClick={() =>
                    console.log("Export invoice for order:", selectedUser._id)
                  }
                >
                  Export Invoice
                </button>
              </div>
            </div>
          )}
        </Modal>
      </ConfigProvider>
    </>
  );
}
