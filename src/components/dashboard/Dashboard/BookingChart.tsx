import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import { useState, useMemo } from "react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useGetBookingChartQuery } from "../../../redux/features/dashboard/dashboardApi";

const currentYear = new Date().getFullYear();
const COLORS = ["#00C49F", "#FF0000" ];

const BookingChart = () => {
  const [selectedYear, setSelectedYear] = useState("");

  // API call
  const { data: bookingChart, isLoading } = useGetBookingChartQuery({
    year: selectedYear || undefined,
  });

    
const chartData = useMemo(() => {
  const stats = bookingChart?.stats;
  if (!stats) return [];

  return Object.entries(stats).map(([name, value]:any) => ({
    name,
    value: Number(value.split('%')?.[0]),
  }));
}, [bookingChart]);

console.log("chartData",chartData);




  const handleChange = (event: SelectChangeEvent) => {
    setSelectedYear(event.target.value as string);
  };

  // % label inside pie
  const renderCustomizedLabel = ({ percent }: any) =>
    `${(percent * 100).toFixed(1)}%`;

  return (
    <div className="bg-white p-5 pb-0 rounded-xl h-full shadow">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="font-semibold text-primary text-2xl">Booking</p>

        <Box sx={{ minWidth: 150 }}>
          <FormControl fullWidth size="small">
            <InputLabel id="booking-year">Year</InputLabel>
            <Select
              labelId="booking-year"
              size="small"
              value={selectedYear}
              label="Year"
              onChange={handleChange}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value={currentYear}>{currentYear}</MenuItem>
              <MenuItem value={currentYear - 1}>{currentYear - 1}</MenuItem>
              <MenuItem value={currentYear - 2}>{currentYear - 2}</MenuItem>
              <MenuItem value={currentYear - 3}>{currentYear - 3}</MenuItem>
              <MenuItem value={currentYear - 4}>{currentYear - 4}</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>

      {/* Chart */}
      <Box
        sx={{
          height: 280,
          width: "100%",
          display: "flex",
          alignItems: "end",
        }}
      >
        <ResponsiveContainer width="100%" height={260}>
          {isLoading || chartData.length === 0 ? (
            <p className="text-center mt-20 text-slate-500">
              Loading...
            </p>
          ) : (
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius="60%"
                label={renderCustomizedLabel}
              >
                {chartData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
            </PieChart>
          )}
        </ResponsiveContainer>

        {/* Legend */}
        <div className="ml-4 space-y-2">
          <div className="flex items-center gap-2 text-slate-600">
            <span className="w-3 h-3 bg-[#00C49F] inline-block" /> Completed
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <span className="w-3 h-3 bg-[#FF0000] inline-block" /> Cancelled
          </div>
        </div>
      </Box>
    </div>
  );
};

export default BookingChart;
