import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import DashboardHeader from "../UI/DashboardHeader";
import Sidebar from "./Sidebar";
import React from "react";

const MainLayout: React.FC = () => {
  const [open, setOpen] = React.useState(true); // control sidebar open/close

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Sidebar open={open} />

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1, // takes remaining width
          transition: "margin-left 0.3s ease",
          marginLeft: open ? "10px" : "72px", // match your sidebar width
          display: "flex",
          flexDirection: "column",
          background: '#f6fffe'
        }}
      >
        {/* Header */}
        <DashboardHeader />

        {/* Page content */}
        <Box sx={{ flexGrow: 1, p: 2, overflowY: "auto" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
