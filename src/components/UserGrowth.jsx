/* eslint-disable react/prop-types */
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { CustomTooltip } from "./CustomTooltip";
import { useGetUserGrowthQuery } from "../page/redux/api/metaDataApi";
import { Select } from "antd";

const { Option } = Select;

export default function UserGrowth() {
  // ✅ State for selected year
  const [year, setYear] = useState("2025");

  // ✅ Fetch data with selected year
  const { data: userGrowthData, isLoading } = useGetUserGrowthQuery({ year });

  // ✅ Convert API response for chart
  const chartData =
    userGrowthData?.data?.map((item) => ({
      month: item.month,
      activeUsers: item.count,
    })) || [];

  // ✅ Handle year change
  const handleYearChange = (value) => {
    setYear(value);
  };

  return (
    <div className="w-full h-[300px]">
      <div className="flex justify-between mb-3">
        <h1 className="text-white text-xl font-bold">User Growth</h1>

        {/* Year Selector */}
        <Select
          style={{ height: "40px", width: "120px" }}
          value={year}
          onChange={handleYearChange}
        >
          <Option value="2025">2025</Option>
          <Option value="2026">2026</Option>
          <Option value="2027">2027</Option>
          <Option value="2028">2028</Option>
        </Select>
      </div>

      {/* Chart */}
      {isLoading ? (
        <p className="text-gray-400">Loading...</p>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            barGap={100}
            barCategoryGap={40}
          >
            <XAxis
              dataKey="month"
              tick={{ fill: "#9F9C96" }}
              tickLine={{ stroke: "#9F9C96" }}
            />
            <YAxis tick={{ fill: "#9F9C96" }} tickLine={{ stroke: "#9F9C96" }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="activeUsers"
              fill="#5492F7"
              barSize={40}
              radius={[5, 5, 0, 0]}
              name="Active Users"
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
