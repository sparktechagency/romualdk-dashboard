import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";

import { Link, useLocation } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import { navItems } from "./SidebarItems";



const Sidebar = ({open}: {open: boolean}) => {
  
  const location = useLocation();

  const handleLogout = ()=>{
    alert('logout func')
  }
  return (
    <Drawer
    className="relative"  
    variant="permanent"
      sx={{        
        width: open ? 260 : 80,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? 260 : 80,
          boxSizing: "border-box",
          backgroundColor: "#131927",
          color: "#fff",
          transition: "width 0.3s ease",
          borderRight: "none",          
        },
      }}
    >
      <Box className="flex flex-col items-center py-4 ">
        <Link to="/">
          <img
            src="/logo.png"
            alt="Logo"
            className={`${
              open ? "w-36 " : "w-8 h-8"
            } object-cover transition-all`}
          />
        </Link>
        <Divider
          sx={{
            width: open ? "200px" : "32px",
            mt: 1,
            mb: 2,
            alignSelf: "center",
            borderTopWidth: 3,
            borderTopStyle: "solid",
            borderImage:
              "linear-gradient(90deg, rgba(224, 225, 226, 0) 0%, #E0E1E2 49.52%, rgba(224, 225, 226, 0.15625) 99.04%) 1",
            borderImageSlice: 1,
          }}
        />
      </Box>

     <List sx={{ px: open ? 2 : 0 }}>
  {navItems && navItems?.map(({ to, label, icon }) => {
    const isActive = location.pathname === to;
    return (
      <Tooltip key={to} title={!open ? label : ""} placement="right">
        <ListItemButton
          component={Link}
          to={to}
          sx={{
            borderRadius: 1,
            mb: 0.5,
            color: isActive ? "#000" : "#fff", // text color
            bgcolor: isActive ? "#fff" : "transparent", // active background
            "&:hover": {
              bgcolor: isActive ? "#eded " : "#eded", // hover background
              color: isActive ? "#fff" : "#000", // hover text color
              "& .MuiListItemIcon-root": {
                color: "#000", // hover icon color
              },
            },
            transition: "all 0.2s ease",
          }}
        >
          <ListItemIcon
            sx={{
              color: isActive ? "#000" : "#fff", // default icon color
              minWidth: 40,
              fontSize: 22,
              transition: "color 0.2s ease",
            }}
          >
            {icon}
          </ListItemIcon>
          {open && (
            <ListItemText
              primary={label}
              primaryTypographyProps={{
                fontSize: 15,
                fontWeight: 500,
              }}
            />
          )}
        </ListItemButton>
      </Tooltip>
    );
  })}
</List>

      {/* Toggle button */}
      <Box
      onClick={()=>handleLogout()}
        sx={{
          position: "absolute",          
          bottom: 0,
          width: "100%",
          display: "flex",
          bgcolor: "#ededed",
          cursor: 'pointer',
          color: '#000',
          py:1,
          gap: 2,
          justifyContent: open ? "center" : "center",
          pr: open ? 2 : 0,
        }}
      >
        <span>Logout</span>
        <LogoutIcon />
      </Box>
    </Drawer>
  );
};

export default Sidebar;
