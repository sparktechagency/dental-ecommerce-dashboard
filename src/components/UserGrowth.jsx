/* eslint-disable react/prop-types */
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { userData } from "../../utils/data";
import { CustomTooltip } from "./CustomTooltip";
import { useGetUserGrowthQuery } from "../page/redux/api/metaDataApi";

export default function UserGrowth() {
  // const {data:userGrowthData}= useGetUserGrowthQuery({year})
  // console.log(userGrowthData)
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={userData}
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
            fill="#29A366"
            barSize={40}
            radius={[5, 5, 0, 0]}
            name="Active Users"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
