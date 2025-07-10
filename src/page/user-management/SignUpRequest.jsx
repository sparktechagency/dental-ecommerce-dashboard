import { useState } from "react";
import { IoEyeOutline, IoSearch } from "react-icons/io5";
import { MdBlockFlipped } from "react-icons/md";
import PageHeading from "../../shared/PageHeading";
import { ConfigProvider, Modal, Table } from "antd";
import UserInformation from "./UserInformation";
import { FaCheck } from "react-icons/fa6";
import { CgClose } from "react-icons/cg";
import { SearchInput } from "../../components/search/SearchInput";

export default function SignUpRequest() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [userDetailsModal, setUserDetailsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const dataSource = [
    {
      key: "1",
      no: "1",
      userName: "Shah Aman",
      email: "shahaman@example.com",
      phoneNumber: "123-456-7890",
      GDCNO: "123456",
    },
    {
      key: "2",
      no: "2",
      userName: "Jane Doe",
      email: "janedoe@example.com",
      phoneNumber: "234-567-8901",
      GDCNO: "123456",
    },
    {
      key: "3",
      no: "3",
      userName: "John Smith",
      email: "johnsmith@example.com",
      phoneNumber: "345-678-9012",
      GDCNO: "123456",
    },
    {
      key: "4",
      no: "4",
      userName: "Alice Johnson",
      email: "alicej@example.com",
      phoneNumber: "456-789-0123",
      GDCNO: "123456",
    },
    {
      key: "5",
      no: "5",
      userName: "Bob Brown",
      email: "bobb@example.com",
      phoneNumber: "567-890-1234",
      GDCNO: "123456",
    },
    {
      key: "6",
      no: "6",
      userName: "Charlie Davis",
      email: "charlied@example.com",
      phoneNumber: "678-901-2345",
      GDCNO: "123456",
    },
    {
      key: "7",
      no: "7",
      userName: "Dana Evans",
      email: "danae@example.com",
      phoneNumber: "789-012-3456",
      GDCNO: "123456",
    },
    {
      key: "8",
      no: "8",
      userName: "Evan Foster",
      email: "evanf@example.com",
      phoneNumber: "890-123-4567",
      GDCNO: "123456",
    },
    {
      key: "9",
      no: "9",
      userName: "Fiona Gray",
      email: "fionag@example.com",
      phoneNumber: "901-234-5678",
      GDCNO: "123456",
    },
    {
      key: "10",
      no: "10",
      userName: "George Hall",
      email: "georgeh@example.com",
      phoneNumber: "012-345-6789",
      GDCNO: "123456",
    },
    {
      key: "11",
      no: "11",
      userName: "Hannah Ives",
      email: "hannahi@example.com",
      phoneNumber: "111-222-3333",
      GDCNO: "123456",
    },
    {
      key: "12",
      no: "12",
      userName: "Ian Jones",
      email: "ianj@example.com",
      phoneNumber: "222-333-4444",
      GDCNO: "123456",
    },
    {
      key: "13",
      no: "13",
      userName: "Julia King",
      email: "juliak@example.com",
      phoneNumber: "333-444-5555",
      GDCNO: "123456",
    },
    {
      key: "14",
      no: "14",
      userName: "Kevin Lee",
      email: "kevinl@example.com",
      phoneNumber: "444-555-6666",
      GDCNO: "123456",
    },
    {
      key: "15",
      no: "15",
      userName: "Laura Moore",
      email: "lauram@example.com",
      phoneNumber: "555-666-7777",
      GDCNO: "123456",
    },
    {
      key: "16",
      no: "16",
      userName: "Mike Nguyen",
      email: "miken@example.com",
      phoneNumber: "666-777-8888",
      GDCNO: "123456",
    },
    {
      key: "17",
      no: "17",
      userName: "Nina Owens",
      email: "ninao@example.com",
      phoneNumber: "777-888-9999",
      GDCNO: "123456",
    },
    {
      key: "18",
      no: "18",
      userName: "Oscar Patel",
      email: "oscarp@example.com",
      phoneNumber: "888-999-0000",
      GDCNO: "123456",
    },
    {
      key: "19",
      no: "19",
      userName: "Paula Quinn",
      email: "paulaq@example.com",
      phoneNumber: "999-000-1111",
      GDCNO: "123456",
    },
    {
      key: "20",
      no: "20",
      userName: "Quinn Ross",
      email: "quinnr@example.com",
      phoneNumber: "000-111-2222",
      GDCNO: "123456",
    },
    {
      key: "21",
      no: "21",
      userName: "Rachel Scott",
      email: "rachels@example.com",
      phoneNumber: "101-202-3030",
      GDCNO: "123456",
    },
    {
      key: "22",
      no: "22",
      userName: "Steve Thomas",
      email: "stevet@example.com",
      phoneNumber: "202-303-4040",
      GDCNO: "123456",
    },
    {
      key: "23",
      no: "23",
      userName: "Tina Underwood",
      email: "tinau@example.com",
      phoneNumber: "303-404-5050",
      GDCNO: "123456",
    },
    {
      key: "24",
      no: "24",
      userName: "Uma Vincent",
      email: "umav@example.com",
      phoneNumber: "404-505-6060",
      GDCNO: "123456",
    },
    {
      key: "25",
      no: "25",
      userName: "Victor White",
      email: "victorw@example.com",
      phoneNumber: "505-606-7070",
      GDCNO: "123456",
    },
    {
      key: "26",
      no: "26",
      userName: "Wendy Xu",
      email: "wendyx@example.com",
      phoneNumber: "606-707-8080",
      GDCNO: "123456",
    },
    {
      key: "27",
      no: "27",
      userName: "Xander Young",
      email: "xandery@example.com",
      phoneNumber: "707-808-9090",
      GDCNO: "123456",
    },
    {
      key: "28",
      no: "28",
      userName: "Yara Zane",
      email: "yaraz@example.com",
      phoneNumber: "808-909-1010",
      GDCNO: "123456",
    },
    {
      key: "29",
      no: "29",
      userName: "Zach Allen",
      email: "zacha@example.com",
      phoneNumber: "909-101-2121",
      GDCNO: "123456",
    },
    {
      key: "30",
      no: "30",
      userName: "Abby Baker",
      email: "abbyb@example.com",
      phoneNumber: "101-212-3232",
      GDCNO: "123456",
    },
  ];

  const columns = [
    { title: "No", dataIndex: "no", key: "no" },
    {
      title: "Name",
      key: "userName",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <img
            src={`https://avatar.iran.liara.run/public/${record?.no}`}
            className="w-10 h-10 object-cover rounded-full"
            alt="User Avatar"
          />
          <span>{record?.userName}</span>
        </div>
      ),
    },
    { title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "GDC NO", dataIndex: "GDCNO", key: "GDCNO" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          <button
            onClick={() => {
              setSelectedUser(record);
              setUserDetailsModal(true);
            }}
            className="border border-[#3b3b3b] text-[#3b3b3b] rounded-lg p-2"
          >
            <IoEyeOutline className="w-6 h-6 text-[#3b3b3b]" />
          </button>
          <button
            onClick={() => {
              setIsModalOpen(true);
            }}
            className="border border-[#3b3b3b] text-[#3b3b3b] rounded-lg p-2"
          >
            <FaCheck className="w-6 h-6 text-[#3b3b3b] font-bold" />
          </button>
          <button
            onClick={() => {
              setIsModalOpen2(true);
            }}
            className="border border-[#3b3b3b] text-[#3b3b3b] rounded-lg p-2"
          >
            <CgClose className="w-6 h-6 text-[#3b3b3b]" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="my-5 md:my-10 flex flex-col md:flex-row gap-5 justify-between items-center">
        <PageHeading title="Sign Up Request" />
        <div className="relative w-full sm:w-[300px] mt-5 md:mt-0 lg:mt-0">
          <SearchInput />
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
              Are you sure you want to Approve ?
            </h1>

            <div className="text-center py-5">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-[#3b3b3b] text-white font-semibold w-full py-2 rounded transition duration-200"
              >
                Yes,Approve
              </button>
            </div>
            <div className="text-center pb-5">
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#3b3b3b] border-2 border-[#3b3b3b] bg-white font-semibold w-full py-2 rounded transition duration-200"
              >
                No,Don’t Approve
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
        <Modal
          open={isModalOpen2}
          centered
          onCancel={() => setIsModalOpen2(false)}
          footer={null}
        >
          <div className="p-5">
            <h1 className="text-4xl text-center text-[#0D0D0D]">
              Are you sure you want to Reject?
            </h1>

            <div className="text-center py-5">
              <button
                onClick={() => setIsModalOpen2(false)}
                className="bg-[#3b3b3b] text-white font-semibold w-full py-2 rounded transition duration-200"
              >
                Yes,Reject
              </button>
            </div>
            <div className="text-center pb-5">
              <button
                onClick={() => setIsModalOpen2(false)}
                className="text-[#3b3b3b] border-2 border-[#3b3b3b] bg-white font-semibold w-full py-2 rounded transition duration-200"
              >
                No,Don’t Reject
              </button>
            </div>
          </div>
        </Modal>
      </ConfigProvider>
    </>
  );
}
