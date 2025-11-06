/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CustomTooltip } from "./CustomTooltip";
import { useGetOrderGrowthQuery} from "../page/redux/api/metaDataApi";
import { Select } from "antd";

const { Option } = Select;

export default function OrderGrowth() {
  // ✅ Year state
  const [year, setYear] = useState("2025");

  // ✅ Fetch order growth data based on year
  const { data: orderGrowth, isLoading } = useGetOrderGrowthQuery({ year });

  // ✅ Convert API data for chart
  const chartData =
    orderGrowth?.data?.map((item) => ({
      month: item.month,
      orders: item.count,
    })) || [];

  // ✅ Handle year change
  const handleYearChange = (value) => {
    setYear(value);
  };

  return (
    <div className="w-full h-[300px]">
      <div className="flex justify-between mb-3">
        <h1 className="text-white text-xl font-bold">Order Growth</h1>

        {/* ✅ Year Selector */}
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

      {/* ✅ Chart */}
      {isLoading ? (
        <p className="text-gray-400">Loading...</p>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            {/* ✅ Gradient */}
            <defs>
              <linearGradient id="orderGrowth" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#5492F7" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3A3A3A" stopOpacity={0.2} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="month"
              tick={{ fill: "#9F9C96" }}
              tickLine={{ stroke: "#9F9C96" }}
            />
            <YAxis tick={{ fill: "#9F9C96" }} tickLine={{ stroke: "#9F9C96" }} />
            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="orders"
              stroke="#5492F7"
              strokeWidth={3}
              fill="url(#orderGrowth)"
              name="Orders"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
