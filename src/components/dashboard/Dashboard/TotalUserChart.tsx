// import { ConfigProvider, Select } from "antd";
import { Box, FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useGetUsersGrowthQuery } from "../../../redux/features/dashboard/dashboardApi";

import { getSearchParams } from "../../../utils/getSearchParams";
import { useUpdateSearchParams } from "../../../utils/updateSearchParams";


const TotalUserChart = () => {
  const [selectedYear, setSelectedYear] = useState("");

  const { data: userGrowth,  refetch } = useGetUsersGrowthQuery({});

  const { year } = getSearchParams();
  const updateSearchParams = useUpdateSearchParams();

  useEffect(() => {
    refetch()
  }, [year])


  const currentYear = new Date().getFullYear();
  const CustomTooltip = ({ active, payload }: any) => {
    const isVisible = active && payload && payload.length;
    console.log("payload", payload);

    return (
      <div
        className="top-20 mr-10 mb-10 "
        style={{
          visibility: isVisible ? "visible" : "hidden",
        }}
      >
        {isVisible && (
          <div className="p-2 rounded-md bg-primary/90 text-white shadow">
            <p className="label  font-semibold text-sm whitespace-nowrap capitalize">{`${payload[0]?.name} : ${payload[0]?.value}`}</p>

            <p className="label  font-semibold text-sm whitespace-nowrap capitalize">{`${payload[1]?.name} : ${payload[1]?.value}`}</p>
            <span></span>
          </div>
        )}
      </div>
    );
  };


  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    updateSearchParams({ year: value })
    setSelectedYear(value);

  };

  return (
    <div className="w-full pb-5 pt-8 bg-white rounded-xl mt-6 shadow mb-10">
      <div className="flex items-center justify-between px-6">
        <p className="font-semibold text-primary text-2xl">Geasts Vs Hosts</p>
        <Box sx={{ minWidth: 150 }}>
          <FormControl fullWidth size="small">
            <InputLabel size="small" id="booking">
              Year
            </InputLabel>
            <Select
              labelId="booking"
              size="small"
              value={selectedYear}
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
            defaultValue="2025"
            style={{
              width: 120,
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

      <div className="mt-6">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={userGrowth?.data?.chart}
            style={{ backgroundColor: "rgba(0,0,,0,.3)" }}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray={1} />
            <XAxis dataKey="month" />
            <YAxis axisLine={false} />
            <Tooltip content={CustomTooltip} />
            <Legend />
            <Bar
              barSize={25}
              //   radius={50}
              dataKey="guest"
              fill="#3781FD"
            />
            <Bar
              barSize={25}
              //   radius={50}
              dataKey="host"
              fill="#40CACD"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TotalUserChart;

export const userChartData = [
  { month: "Jan", Total: 1200, Users: 2220 },
  { month: "Feb", Total: 1500, Users: 1100 },
  { month: "Mar", Total: 1700, Users: 1250 },
  { month: "Apr", Total: 1600, Users: 1180 },
  { month: "May", Total: 1900, Users: 1400 },
  { month: "Jun", Total: 2100, Users: 1550 },
  { month: "Jul", Total: 2300, Users: 1650 },
  { month: "Aug", Total: 2500, Users: 1800 },
  { month: "Sep", Total: 2700, Users: 1900 },
  { month: "Oct", Total: 2900, Users: 1250 },
  { month: "Nov", Total: 3100, Users: 900 },
  { month: "Dec", Total: 3500, Users: 2600 },
];
