import {
  Avatar,
  Badge,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { useGetProfileQuery } from "../../redux/features/auth/authApi";
import { imageUrl } from "../../redux/base/baseAPI";

const DashboardHeader = () => {
  const { data: profileData } = useGetProfileQuery(undefined);

  return (
    <Box
      height={80}
      borderBottom="1px solid #e0e0e0"
      display="flex"
      alignItems="center"
      justifyContent="flex-end"
      pr={3}
      bgcolor="white"
      gap={3}
    >
      {/* Notification */}

      <Badge badgeContent={0} showZero  color="error">
        <NotificationsNoneOutlinedIcon
            sx={{ fontSize: 26, color: "rgba(0,0,0,.5)" }}
          />
      </Badge>

      {/* Profile */}
      <Box display="flex" alignItems="center" gap={2}>
        <Avatar
          sx={{ width: 50, height: 50 }}
          src={
            profileData?.profileImage
              ? `${imageUrl}${profileData?.profileImage}`
              : "/placeholder.png"
          }
        />

        <Box>
          <Typography fontWeight={700} fontSize={18}>
            {profileData?.fullName}
          </Typography>
          <Typography fontSize={14} color="text.secondary" fontWeight={600}>
            {profileData?.email || "ssmd.bayzid@gmail.com"}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardHeader;
