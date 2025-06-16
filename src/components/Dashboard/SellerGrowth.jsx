/* eslint-disable react/prop-types */
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const SellerGrowth = () => {
  const userData = [
    { month: "Jan", activeUsers: 900 },
    { month: "Feb", activeUsers: 1500 },
    { month: "Mar", activeUsers: 800 },
    { month: "Apr", activeUsers: 1600 },
    { month: "May", activeUsers: 2000 },
    { month: "Jun", activeUsers: 1700 },
    { month: "Jul", activeUsers: 2200 },
    { month: "Aug", activeUsers: 1700 },
    { month: "Sept", activeUsers: 1800 },
    { month: "Oct", activeUsers: 2000 },
    { month: "Nov", activeUsers: 2200 },
    { month: "Dec", activeUsers: 2500 },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { month, activeUsers } = payload[0].payload;
      return (
        <div className="bg-white py-2 px-3 rounded shadow border">
          <p className="text-black font-semibold">{`Month: ${month}`}</p>
          <p className="text-[#29A366]">{`Active Users: ${activeUsers}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={userData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          barGap={100}
          barCategoryGap={40}

        >
          {/* <XAxis tickLine={false} dataKey="month" />
          <YAxis tickLine={false} /> */}
          <XAxis
            dataKey="month"
            tick={{ fill: "#9F9C96" }}
            tickLine={{ stroke: "#9F9C96" }}
          />
          <YAxis tick={{ fill: "#9F9C96" }} tickLine={{ stroke: "#9F9C96" }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
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
};

export default SellerGrowth;
