import { FaRegCircleUser } from "react-icons/fa6";
import { GrTransaction } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { TfiViewGrid } from "react-icons/tfi";

export const sidebarItems = [
  {
    key: "dashboard",
    label: "Overview",
    path: "dashboard",
    icon: <RxDashboard size={20} />,
  },
  {
    key: "hosts-request",
    label: "Hosts Rerquest",
    path: "hosts-request",
    icon: <FaRegCircleUser size={20} />,
  },
  {
    key: "guests-request",
    label: "Guests Rerquest",
    path: "guests-request",
    icon: <FaRegCircleUser size={20} />,
  },
  {
    key: "hosts-manage",
    label: "Hosts Manage",
    path: "hosts-manage",
    icon: <FaRegCircleUser size={20} />,
  },
  {
    key: "booking-manage",
    label: "Booking Rerquest",
    path: "booking-manage",
    icon: <FaRegCircleUser size={20} />,
  },
  {
    key: "verification",
    label: "Verification",
    path: "verification",
    icon: <TfiViewGrid size={20} />,
  },
  {
    key: "payments",
    label: "Payment / Earning",
    path: "payments",
    icon: <GrTransaction size={20} />,
  },
  
  {
    key: "setting",
    label: "Setting",
    path: "setting",
    icon: <IoSettingsOutline size={20} />,
  },
  // {
  //   key: "all-admin",
  //   label: "Admin Manage",
  //   path: "all-admin",
  //   icon: <GrUserSettings size={20} />,
  // },
 
  //  {
  //   key: "changePassword",
  //   label: "Change Password",
  //   path: "changePassword",
  //   icon: <CiLock size={20} />,
  // },
  // {
  //   key: "cms",
  //   label: "Content Manage",
  //   path: "cms",
  //   icon: <IoDocumentOutline size={20} />,
  //   children: [
  //     {
  //       key: "terms-condition",
  //       label: "Terms Condition",
  //       path: "terms-condition",
  //       icon: <AiOutlineSafetyCertificate size={20} />,
  //     },
  //     {
  //       key: "policy",
  //       label: "Privacy Policy",
  //       path: "policy",
  //       icon: <PiUsersThreeLight size={20} />,
  //     },
  //     {
  //       key: "about",
  //       label: "About Us",
  //       path: "about",
  //       icon: <PiUsersThreeLight size={20} />,
  //     },
  //     {
  //       key: "faq",
  //       label: "FAQ",
  //       path: "faq",
  //       icon: <PiUsersThreeLight size={20} />,
  //     },
  //   ],
  // },
];
