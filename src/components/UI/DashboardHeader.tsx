import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import {
  Avatar,
  Badge,
  Box,
  Typography
} from "@mui/material";
import { imageUrl } from "../../redux/base/baseAPI";
import { useGetProfileQuery } from "../../redux/features/auth/authApi";
import { Link } from "react-router-dom";
import { useNotificationCountQuery } from "../../redux/features/notification/notificationApi";

const DashboardHeader = () => {
  const { data: profileData } = useGetProfileQuery(undefined);
  const {data: notificationCount} = useNotificationCountQuery({})

  console.log("notificationCount", notificationCount);
  
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

      <Link to="/notifications"><Badge badgeContent={notificationCount ?? 0} showZero  color="error">
        <NotificationsNoneOutlinedIcon sx={{ fontSize: 26, color: "rgba(0,0,0,.5)" }} />
      </Badge></Link>

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
