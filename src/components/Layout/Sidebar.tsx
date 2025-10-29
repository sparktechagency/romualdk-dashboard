import LogoutIcon from "@mui/icons-material/Logout";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { navItems } from "./SidebarItems";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login")
  };

  return (
    <Drawer
      className="relative"
      variant="permanent"
      sx={{
        width: 260,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 260,
          boxSizing: "border-box",
          backgroundColor: "#131927",
          color: "#fff",
          borderRight: "none",
        },
      }}
    >
      <Box className="flex flex-col items-center py-4">
        <Link to="/">
          <img src="/logo.png" alt="Logo" className="w-36 object-cover" />
        </Link>

        <Divider
          sx={{
            width: "200px",
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

      <List sx={{ px: 2 }}>
        {navItems.map(({ to, label, icon }) => {
          const isActive = location.pathname === to;
          return (
            <Tooltip key={to} title="" placement="right">
              <ListItemButton
                component={Link}
                to={to}
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  color: isActive ? "#000" : "#fff",
                  bgcolor: isActive ? "#fff" : "transparent",
                  "&:hover": {
                    bgcolor: "#eded",
                    color: "#000",
                    "& .MuiListItemIcon-root": {
                      color: "#000",
                    },
                  },
                  transition: "all 0.2s ease",
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive ? "#000" : "#fff",
                    minWidth: 40,
                    fontSize: 22,
                    transition: "color 0.2s ease",
                  }}
                >
                  {icon}
                </ListItemIcon>

                <ListItemText
                  primary={label}
                  primaryTypographyProps={{
                    fontSize: 15,
                    fontWeight: 500,
                  }}
                />
              </ListItemButton>
            </Tooltip>
          );
        })}
      </List>

      {/* Logout */}
      <Box
        onClick={handleLogout}
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          display: "flex",
          bgcolor: "#ededed",
          cursor: "pointer",
          color: "#000",
          py: 1,
          gap: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span>Logout</span>
        <LogoutIcon />
      </Box>
    </Drawer>
  );
};

export default Sidebar;
