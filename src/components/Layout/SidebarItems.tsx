import { FaRegCalendar, FaRegUser, FaStore } from "react-icons/fa";
import { HiOutlinePresentationChartLine } from "react-icons/hi";
import { IoDiamondOutline, IoSettingsOutline } from "react-icons/io5";
import { LuNotepadText } from "react-icons/lu";
import { MdOutlineDashboard } from "react-icons/md";

interface NavItem {
  to: string;
  label: string;
  icon: React.ReactNode;
}

export const navItems: NavItem[] = [
  { to: "/", label: "Dashboard", icon: <MdOutlineDashboard /> },
  {
    to: "/cars-manage",
    label: "Cars Management",
    icon: <FaStore />,
  },
  { to: "/hosts-request", 
    label: "Hosts Request", 
    icon: <FaRegUser /> 
},
  {
    to: "/guests-manage",
    label: "Guests Management",
    icon: <LuNotepadText />,
  },
    { to: "/hosts-manage", 
    label: "Hosts Management", 
    icon: <FaRegUser /> 
},
  {
    to: "/booking-manage",
    label: "Booking Management",
    icon: <FaRegCalendar />,
  },
  {
    to: "/verification",
    label: "Verification",
    icon: <HiOutlinePresentationChartLine />,
  },
  { to: "/payments", label: "Payment / Earning", icon: <IoDiamondOutline /> },
  { to: "/admin-manage", label: "Admin Manage", icon: <IoDiamondOutline /> },
  { to: "/driver-price", label: "Driver Price", icon: <IoDiamondOutline /> },
//   { to: "/settings", label: "Settings", icon: <LuBookText /> },
//   {
//     to: "/report-management",
//     label: "Manage Reports",
//     icon: <TbMessageReport />,
//   },
  { to: "/settings", label: "Settings", icon: <IoSettingsOutline /> },
];
