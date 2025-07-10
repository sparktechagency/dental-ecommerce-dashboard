import { FaChevronDown } from "react-icons/fa";
import dayjs from "dayjs";
import { useState } from "react";

const YearDropDown = () => {
  const currentYear = dayjs().year();
  const startYear = 2020;
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [isOpen, setIsOpen] = useState(false);
  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, index) => startYear + index
  );

  const handleSelect = (year) => {
    setSelectedYear(year);
    setIsOpen(false);
  };
  return (
    <div className="relative w-full md:w-32">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md flex justify-between items-center bg-white transition"
      >
        <span className="text-[#29A366]">{selectedYear}</span>
        <FaChevronDown className="text-[#29A366] w-5 h-5 ml-5" />
      </button>

      {/* Dropdown List */}
      {isOpen && (
        <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg text-lg">
          {years.map((year) => (
            <div
              key={year}
              onClick={() => handleSelect(year)}
              className={`p-2 cursor-pointer hover:bg-gray-100 transition ${
                year === selectedYear ? "bg-gray-200" : ""
              }`}
            >
              {year}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default YearDropDown;
