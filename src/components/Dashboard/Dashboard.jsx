import { FaRegUser } from "react-icons/fa";
import SubscriptionGrowth from "./SubscriptionGrowth";
import SellerGrowth from "./SellerGrowth";
import EarningGrowth from "./EarningGrowth";
import { LuCircleDollarSign } from "react-icons/lu";
import { BsBagCheck } from "react-icons/bs";
import { MdOutlineBlock } from "react-icons/md";
import YearDropDown from "./YearDropDown";

function DashboardPage() {

  return (
    <main className="flex flex-col">
      <section className="grid grid-cols-1 md:grid-cols-2 mmd:grid-cols-3 lg:grid-cols-4 gap-2">
        <div className="flex flex-col items-center justify-center p-5 rounded-lg shadow-sm max-w-md bg-[#6F6F6F] border border-gray-300">
          <div className="rounded-full flex items-center justify-center mb-2 gap-2">
            <LuCircleDollarSign className="w-[25px] h-[25px] text-green-500" />
            <h2 className="text-white text-2xl font-medium">Total Earning</h2>
          </div>

          <p className="text-[#34C759] text-4xl font-bold">
            ${new Intl.NumberFormat().format(6500)}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center p-5 rounded-lg shadow-sm max-w-md bg-[#6F6F6F] border border-gray-300">
          <div className="rounded-full flex items-center justify-center mb-2 gap-2">
            <BsBagCheck className="w-[25px] h-[25px] text-green-500" />
            <h2 className="text-white text-2xl font-medium">Total Order</h2>
          </div>

          <p className="text-[#34C759] text-4xl font-bold">
            {new Intl.NumberFormat().format(300)}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center p-5 rounded-lg shadow-sm max-w-md bg-[#6F6F6F] border border-gray-300">
          <div className="rounded-full flex items-center justify-center mb-2 gap-2">
            <FaRegUser className="w-[25px] h-[25px] text-green-500" />
            <h2 className="text-white text-2xl font-medium">Total User</h2>
          </div>

          <p className="text-[#34C759] text-4xl font-bold">
            {new Intl.NumberFormat().format(6500)}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center p-5 rounded-lg shadow-sm max-w-md bg-[#6F6F6F] border border-gray-300">
          <div className="rounded-full flex items-center justify-center mb-2 gap-2">
            <MdOutlineBlock className="w-[25px] h-[25px] text-green-500" />
            <h2 className="text-white text-2xl font-medium">Blocked account</h2>
          </div>

          <p className="text-red-500 text-4xl font-bold">
            {new Intl.NumberFormat().format(10)}
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5 mt-5 ">
        <div className="w-full p-5 bg-[#707070] rounded-lg shadow-md border border-gray-300">
          <div className="flex flex-col md:flex-row md:justify-between lg:justify-between items-center gap-5 my-5">
            <div>
              <h1 className="text-white text-xl font-bold">User Growth</h1>
            </div>
            <YearDropDown />
          </div>
          <SellerGrowth />
        </div>
        <div className="w-full p-5 bg-[#707070] rounded-lg shadow-md border border-gray-300">
          <div className="flex flex-col md:flex-row md:justify-between lg:justify-between items-center gap-5 my-5">
            <div>
              <h1 className="text-white text-xl font-semibold">Order Growth</h1>
            </div>

            <YearDropDown />
          </div>
          <SubscriptionGrowth />
        </div>
      </section>
      <section className="w-full p-5 bg-[#707070] rounded-lg shadow-md mt-5 mb-10">
        <div className="flex flex-col md:flex-row md:justify-between lg:justify-between items-center gap-5 my-5">
          <div>
            <h1 className="text-white text-xl font-semibold">Earning Growth</h1>
          </div>

          <YearDropDown />
        </div>
        <EarningGrowth />
      </section>
    </main>
  );
}

export default DashboardPage;
