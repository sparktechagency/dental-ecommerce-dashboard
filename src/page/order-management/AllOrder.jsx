import { useState } from "react";
import { IoEyeOutline, IoSearch } from "react-icons/io5";
import { MdBlockFlipped } from "react-icons/md";
import PageHeading from "../../shared/PageHeading";
import { ConfigProvider, Modal, Table, Select, Input } from "antd";
import UserInformation from "../user-management/UserInformation";

const AllOrder = () => {
          const [userDetailsModal, setUserDetailsModal] = useState(false);
          const [selectedUser, setSelectedUser] = useState(null);
          const [statusFilter, setStatusFilter] = useState('all');
          const [searchText, setSearchText] = useState('');

          const getStatusStyle = (status) => {
                    const styles = {
                              Pending: 'bg-yellow-100 text-yellow-800',
                              Processing: 'bg-blue-100 text-blue-800',
                              Shipped: 'bg-green-100 text-green-800',
                              Cancelled: 'bg-red-100 text-red-800',
                    };
                    return styles[status] || 'bg-gray-100 text-gray-800';
          };


          const dataSource = [
                    { key: "#1201", no: "1", customer: "Shah Aman", products: "Root canal kit, Gloves", qty: "12", total: "123456", status: "Pending" },
                    { key: "#1202", no: "2", customer: "Liam Smith", products: "Dental Mirror", qty: "5", total: "45678", status: "Processing" },
                    { key: "#1203", no: "3", customer: "Emma Johnson", products: "Syringes", qty: "20", total: "98765", status: "Shipped" },
                    { key: "#1204", no: "4", customer: "Noah Brown", products: "Gloves, Masks", qty: "50", total: "12300", status: "Cancelled" },
                    { key: "#1205", no: "5", customer: "Olivia Jones", products: "X-ray Film", qty: "10", total: "23450", status: "Shipped" },
                    { key: "#1206", no: "6", customer: "Ava Garcia", products: "Dental Drill", qty: "3", total: "76543", status: "Processing" },
                    { key: "#1207", no: "7", customer: "William Martinez", products: "Face Shields", qty: "15", total: "11200", status: "Pending" },
                    { key: "#1208", no: "8", customer: "James Rodriguez", products: "Anesthetic", qty: "8", total: "22000", status: "Cancelled" },
                    { key: "#1209", no: "9", customer: "Sophia Lee", products: "Gloves", qty: "100", total: "15000", status: "Shipped" },
                    { key: "#1210", no: "10", customer: "Benjamin Walker", products: "Masks", qty: "60", total: "9000", status: "Pending" },
                    { key: "#1211", no: "11", customer: "Mia Hall", products: "Root canal kit", qty: "6", total: "54000", status: "Cancelled" },
                    { key: "#1212", no: "12", customer: "Lucas Allen", products: "Gloves", qty: "20", total: "3000", status: "Processing" },
                    { key: "#1213", no: "13", customer: "Charlotte Young", products: "Suction Tips", qty: "40", total: "6400", status: "Pending" },
                    { key: "#1214", no: "14", customer: "Amelia Hernandez", products: "Sterilizer", qty: "1", total: "200000", status: "Shipped" },
                    { key: "#1215", no: "15", customer: "Ethan King", products: "Cotton Rolls", qty: "70", total: "7000", status: "Processing" },
                    { key: "#1216", no: "16", customer: "Harper Wright", products: "Syringes", qty: "30", total: "15000", status: "Pending" },
                    { key: "#1217", no: "17", customer: "Daniel Lopez", products: "Face Shields", qty: "12", total: "1800", status: "Cancelled" },
                    { key: "#1218", no: "18", customer: "Evelyn Hill", products: "Gloves", qty: "75", total: "11250", status: "Shipped" },
                    { key: "#1219", no: "19", customer: "Matthew Scott", products: "Scalers", qty: "4", total: "3200", status: "Pending" },
                    { key: "#1220", no: "20", customer: "Abigail Green", products: "Handpieces", qty: "2", total: "85000", status: "Processing" },
                    { key: "#1221", no: "21", customer: "Henry Adams", products: "Gloves, Syringes", qty: "22", total: "4600", status: "Shipped" },
                    { key: "#1222", no: "22", customer: "Emily Nelson", products: "Root canal kit", qty: "7", total: "63000", status: "Pending" },
                    { key: "#1223", no: "23", customer: "Sebastian Carter", products: "Dental Mirror", qty: "9", total: "3400", status: "Cancelled" },
                    { key: "#1224", no: "24", customer: "Elizabeth Mitchell", products: "Masks", qty: "90", total: "13500", status: "Shipped" },
                    { key: "#1225", no: "25", customer: "Jack Perez", products: "Anesthetic", qty: "4", total: "8000", status: "Pending" },
                    { key: "#1226", no: "26", customer: "Avery Roberts", products: "Gloves", qty: "120", total: "18000", status: "Processing" },
                    { key: "#1227", no: "27", customer: "Logan Turner", products: "X-ray Film", qty: "6", total: "14000", status: "Shipped" },
                    { key: "#1228", no: "28", customer: "Ella Phillips", products: "Scalers", qty: "10", total: "8000", status: "Pending" },
                    { key: "#1229", no: "29", customer: "Harper Campbell", products: "Sterilizer", qty: "1", total: "195000", status: "Cancelled" },
                    { key: "#1230", no: "30", customer: "Lucas Parker", products: "Dental Drill", qty: "2", total: "50000", status: "Shipped" },
          ];

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
                                        <span className={`px-2 py-2 rounded text-sm font-medium ${getStatusStyle(record.status)}`}>
                                                  {record.status}
                                        </span>
                              )
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
                                      { value: 'Pending', label: 'Pending' },
                                      { value: 'Processing', label: 'Processing' },
                                      { value: 'Shipped', label: 'Shipped' },
                                      { value: 'Cancelled', label: 'Cancelled' }
                                    ]}
                                  />
                                </div>
                              ),
                            }
          ];
          const filteredData = dataSource.filter(item => {
                    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
                    const matchesSearch = item.customer.toLowerCase().includes(searchText.toLowerCase()) ||
                              item.products.toLowerCase().includes(searchText.toLowerCase()) ||
                              item.key.toLowerCase().includes(searchText.toLowerCase());
                    return matchesStatus && matchesSearch;
          });
          const handleStatusChange = (orderId, newStatus) => {
                    // In a real app, you would make an API call here to update the status
                    console.log(`Order ${orderId} status updated to ${newStatus}`);
                    // For demo purposes, we'll just show an alert
                    alert(`Order ${orderId} status changed to ${newStatus}`);
          };


          return (
                    <>
                              <div className="my-5 md:my-10 flex flex-col md:flex-row gap-5 justify-between items-center">
                                        <PageHeading title="All Order" />
                                        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                                                  <div className="relative w-full md:w-[300px]">
                                                            <Select
                                                                      className="w-full h-[46px]"
                                                                      placeholder="Filter by status"
                                                                      value={statusFilter}
                                                                      onChange={setStatusFilter}
                                                                      options={[
                                                                                { value: 'all', label: 'All' },
                                                                                { value: 'Pending', label: 'Pending' },
                                                                                { value: 'Processing', label: 'Processing' },
                                                                                { value: 'Shipped', label: 'Shipped' },
                                                                                { value: 'Cancelled', label: 'Cancelled' },
                                                                      ]}
                                                            />
                                                  </div>
                                                  <div className="relative w-full md:w-[300px]">
                                                            <Input
                                                                      placeholder="Search orders..."
                                                                      value={searchText}
                                                                      onChange={(e) => setSearchText(e.target.value)}
                                                                      className="h-[46px] pl-12 pr-4 rounded-md border-2 border-[#3b3b3b]"
                                                                      prefix={
                                                                                <IoSearch className="text-gray-400 absolute left-3 top-3.5" size={20} />
                                                                      }
                                                            />
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
                                        >
                                                  {selectedUser && <UserInformation user={selectedUser} />}

                                        </Modal>
                              </ConfigProvider>
                    </>
          );
};

export default AllOrder;