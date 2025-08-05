export const CustomTooltip = ({ active, payload }) => {
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