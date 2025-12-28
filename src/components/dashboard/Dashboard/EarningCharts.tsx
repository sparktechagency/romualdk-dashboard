import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";

import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useGetRevenueGrowthQuery } from "../../../redux/features/dashboard/dashboardApi";

const currentYear = new Date().getFullYear();

const EarningCharts = () => {
  // Demo Data for Earnings (replace this with actual API data later)
  const [selectedYear, setSelectedYear] = useState("");
  const {data: revenueData} = useGetRevenueGrowthQuery({});

  const CustomTooltip = ({ active, payload, label }: any) => {
    const isVisible = active && payload && payload.length;

    return (
      <div
        className="custom-tooltip "
        style={{ visibility: isVisible ? "visible" : "hidden" }}
      >
        {isVisible && (
          <div className="w-full py-3 pl-2 text-start bg-primary/90 rounded-xl">
            <p className="text-white whitespace-nowrap font-semibold">
              {label}
            </p>
            <p className="text-white whitespace-nowrap">{`$${payload[0].value}`}</p>
          </div>
        )}
      </div>
    );
  };

  const handleChange = (event: SelectChangeEvent) => {
    
    const value = event.target.value as string
    setSelectedYear(value)
  };

  return (
    <div className="">
      <div className="bg-white p-5 rounded-xl shadow">
        <div className="flex items-center justify-between gap-8 mb-3">
          <div className="">
            <p className="font-semibold text-primary text-2xl">Revenue</p>
          </div>
          <Box sx={{ minWidth: 100 }}>
          <FormControl fullWidth>            
            <InputLabel id="revenue" size="small">Year</InputLabel>
            <Select
            labelId="revenue"
            label="Year"
            size="small"
            onChange={handleChange}
            value={selectedYear || ""}
            >
            <MenuItem value="">None</MenuItem>
            <MenuItem value={currentYear}>{currentYear}</MenuItem>
            <MenuItem value={currentYear - 1}>{currentYear - 1}</MenuItem>
            <MenuItem value={currentYear - 2}>{currentYear - 2}</MenuItem>
            <MenuItem value={currentYear - 3}>{currentYear - 3}</MenuItem>

            </Select>
          </FormControl>
          </Box>
          {/* <ConfigProvider
          theme={{
            components: {
              Select: {
                colorBgContainer: "#8B4E2E",
                colorBorder: "#8B4E2E",
                colorText: "#FFFFFF",                
                colorBgElevated: "rgba(139,78,46, 1)",
                optionSelectedBg: "#121212",
                optionActiveBg: "#404040",
              },
            },
          }}
        >
          <Select
            defaultValue={year}
            style={{
              width: 120,
              paddingRight: 5,
              textAlign: "start",
              backgroundColor: "transparent",
            }}
          >
            <Option value={year}>{year}</Option>
            <Option value={year - 1}>{year - 1}</Option>
            <Option value={year - 2}>{year - 2}</Option>
            <Option value={year - 3}>{year - 3}</Option>
            <Option value={year - 4}>{year - 4}</Option>
          </Select>
        </ConfigProvider> */}
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart
            data={revenueData?.monthly}
            margin={{ left: 0, top: 20, right: 10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="earnings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="30%" stopColor="#40CACD" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#40CACD" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="monthName"
              stroke="none"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#888", fontSize: 12 }}
            />
            <YAxis axisLine={false} tickLine={false} />
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <Tooltip wrapperStyle={{ width: 100 }} content={CustomTooltip} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#0C1326"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#earnings)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EarningCharts;
