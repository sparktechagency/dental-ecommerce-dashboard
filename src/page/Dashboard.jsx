import { FaRegUser } from "react-icons/fa";
import { LuCircleDollarSign } from "react-icons/lu";
import { BsBagCheck } from "react-icons/bs";
import { MdOutlineBlock } from "react-icons/md";
import YearDropDown from "../components/YearDropDown";
import UserGrowth from "../components/UserGrowth";
import OrderGrowth from "../components/OrderGrowth";
import EarningGrowth from "../components/EarningGrowth";
import { useGetOverviewQuery } from "./redux/api/metaDataApi";


export default function DashboardPage() {
  const {data:dasboardData} = useGetOverviewQuery();
  console.log(dasboardData)
  return (
    <main className="flex flex-col">
      <section className="grid grid-cols-1 md:grid-cols-2 mmd:grid-cols-3 lg:grid-cols-4 gap-2">
        <div className="flex flex-col items-center justify-center p-5 rounded-lg shadow-sm max-w-md bg-[#6F6F6F] border border-gray-300">
          <div className="rounded-full flex items-center justify-center mb-2 gap-2">
            <LuCircleDollarSign className="w-[25px] h-[25px] text-green-500" />
            <h2 className="text-white text-2xl font-medium">Total Earning</h2>
          </div>

          <p className="text-[#34C759] text-4xl font-bold">
            ${dasboardData?.data?.totalEarning}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center p-5 rounded-lg shadow-sm max-w-md bg-[#6F6F6F] border border-gray-300">
          <div className="rounded-full flex items-center justify-center mb-2 gap-2">
            <BsBagCheck className="w-[25px] h-[25px] text-green-500" />
            <h2 className="text-white text-2xl font-medium">Total Order</h2>
          </div>

          <p className="text-[#34C759] text-4xl font-bold">
           {dasboardData?.data?.totalOrder}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center p-5 rounded-lg shadow-sm max-w-md bg-[#6F6F6F] border border-gray-300">
          <div className="rounded-full flex items-center justify-center mb-2 gap-2">
            <FaRegUser className="w-[25px] h-[25px] text-green-500" />
            <h2 className="text-white text-2xl font-medium">Total User</h2>
          </div>

          <p className="text-[#34C759] text-4xl font-bold">
           {dasboardData?.data?.totalUser}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center p-5 rounded-lg shadow-sm max-w-md bg-[#6F6F6F] border border-gray-300">
          <div className="rounded-full flex items-center justify-center mb-2 gap-2">
            <MdOutlineBlock className="w-[25px] h-[25px] text-green-500" />
            <h2 className="text-white text-2xl font-medium">Blocked account</h2>
          </div>

          <p className="text-red-500 text-4xl font-bold">
            {dasboardData?.data?.blockedAccount}
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5 mt-5 ">
        <div className="w-full p-5 bg-[#707070] rounded-lg shadow-md border border-gray-300">
          <div className="flex flex-col md:flex-row md:justify-between lg:justify-between items-center gap-5 my-5">
            <div>
              <h1 className="text-white text-xl font-bold">User Growth</h1>
            </div>
           
          </div>
          <UserGrowth />
        </div>
        <div className="w-full p-5 bg-[#707070] rounded-lg shadow-md border border-gray-300">
          <div className="flex flex-col md:flex-row md:justify-between lg:justify-between items-center gap-5 my-5">
            <div>
              <h1 className="text-white text-xl font-bold">Order Growth</h1>
            </div>
            <YearDropDown />
          </div>
          <OrderGrowth />
        </div>
      </section>
      <section className="w-full p-5 bg-[#707070] rounded-lg shadow-md mt-5 mb-10 border border-gray-300">
        <div className="flex flex-col md:flex-row md:justify-between lg:justify-between items-center gap-5 my-5 ">
          <div>
            <h1 className="text-white text-xl font-bold">Earning Growth</h1>
          </div>

          <YearDropDown />
        </div>
        <EarningGrowth />
      </section>
    </main>
  );
}
