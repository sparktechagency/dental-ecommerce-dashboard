/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { OrderGrowthData } from "../../utils/data";
import { CustomTooltip } from "./CustomTooltip";


export default function OrderGrowth() {
  const [chartHeight, setChartHeight] = useState(300);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setChartHeight(250);
      } else {
        setChartHeight(300);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" >
        <AreaChart
          data={OrderGrowthData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="vendorGrowth" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#5492F7" stopOpacity={1} />
              <stop offset="95%" stopColor="#3A3A3A" stopOpacity={1} />
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
            dataKey="vendors"
            strokeWidth={3}
            fill="url(#vendorGrowth)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
