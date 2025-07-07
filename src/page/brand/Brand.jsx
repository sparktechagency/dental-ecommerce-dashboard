import { ConfigProvider, Input, Table } from "antd";
import PageHeading from "../../shared/PageHeading";
import { IoEyeOutline, IoSearch } from "react-icons/io5";
import { MdBlockFlipped } from "react-icons/md";

const Brand = () => {
  const dataSource = [
    {
      key: "1",
      no: "1",
      brandName: "Shah Aman",
    },
    {
      key: "2",
      no: "2",
      brandName: "Jane Doe",
    },
    {
      key: "3",
      no: "3",
      brandName: "John Smith",
    },
    {
      key: "4",
      no: "4",
      brandName: "Alice Johnson",
    },
    {
      key: "5",
      no: "5",
      brandName: "Bob Brown",
    },
  ];

  const columns = [
    { title: "No", dataIndex: "no", key: "no" },
    {
      title: "Name",
      key: "userName",
      dataIndex: "brandName"
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2 justify-end">
          <button
            //   onClick={() => {
            //     setSelectedUser(record);
            //     setUserDetailsModal(true);
            //   }}
            className="border border-[#3b3b3b] text-[#3b3b3b] rounded-lg p-2"
          >
            <IoEyeOutline className="w-6 h-6 text-[#3b3b3b]" />
          </button>
          <button
            //   onClick={() => {
            //     setIsModalOpen(true);
            //   }}
            className="border border-[#3b3b3b] text-[#3b3b3b] rounded-lg p-2"
          >
            <MdBlockFlipped className="w-6 h-6 text-[#3b3b3b]" />
          </button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <PageHeading title="All Brand" />
        {/* <div className="flex flex-col md:flex-row justify-center items-center md:items-center gap-2 w-full md:w-auto"> */}
        <div className="flex gap-2 ">
          <div className="relative w-full md:w-[200px] h-[46px]">
            <Input
              placeholder="Search brand..."
              //     value={searchText}
              //       onChange={(e) => setSearchText(e.target.value)}
              className="w-full h-[46px] pl-12 pr-4 rounded-md border-2 border-[#3b3b3b]"
              prefix={
                <IoSearch
                  className="text-gray-400 absolute left-3 top-3.5"
                  size={20}
                />
              }
            />
          </div>
          <button
            //   onClick={showAddModal}
            className="w-full md:w-[200px] p-[10px] bg-[#136BFB] rounded text-white"
          >
            + Add Brand
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
                                                  dataSource={dataSource}
                                                  columns={columns}
                                                  pagination={{ pageSize: 10 }}
                                                  scroll={{ x: "max-content" }}
                                        />
                                        </ConfigProvider>
    </div>
  );
};

export default Brand;
