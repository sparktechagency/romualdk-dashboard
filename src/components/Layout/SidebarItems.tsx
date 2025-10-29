import { MdOutlineDashboard } from "react-icons/md";
import { IoSettingsOutline, IoDiamondOutline } from "react-icons/io5";
import { FaStore, FaRegUser, FaRegCalendar } from "react-icons/fa";
import { LuNotepadText, LuBookText } from "react-icons/lu";
import { HiOutlinePresentationChartLine } from "react-icons/hi";
import { TbMessageReport } from "react-icons/tb";

interface NavItem {
  to: string;
  label: string;
  icon: React.ReactNode;
}

export const navItems: NavItem[] = [
  { to: "/dashboard", label: "Dashboard", icon: <MdOutlineDashboard /> },
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
//   { to: "/settings", label: "Settings", icon: <LuBookText /> },
//   {
//     to: "/report-management",
//     label: "Manage Reports",
//     icon: <TbMessageReport />,
//   },
  { to: "/settings", label: "Settings", icon: <IoSettingsOutline /> },
];
