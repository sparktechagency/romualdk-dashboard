import { createBrowserRouter } from "react-router-dom";

import ForgotPassword from "../../Pages/Auth/ForgotPassword";
import Login from "../../Pages/Auth/Login";
import NewPassword from "../../Pages/Auth/NewPassword";
import OTPVerify from "../../Pages/Auth/OTPVerify";
import MainLayout from "../Layout/MainLayout";
import ErrorPage from "../UI/ErrorPage";
import { Dashboard } from "../dashboard/Dashboard/Dashboard";

import BookingManage from "../dashboard/BookingManage/BookingManage";
import CarManage from "../dashboard/CarManage/CarManage";
import GuestRequest from "../dashboard/GuestRequest/GuestRequest";
import GuestsManage from "../dashboard/GuestsManage/GuestsManage";
import HostRequest from "../dashboard/HostRequest/HostRequest";
import HostsManage from "../dashboard/HostsManage/HostsManage";
import Payments from "../dashboard/Payments/Payments";
import Setting from "../dashboard/Setting";

const router = createBrowserRouter([
    {
        path: "/",
        // element: <PrivateRoute> <MainLayout /> </PrivateRoute>,
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "dashboard",
                element: <Dashboard />
            },
            {
                path: "",
                element: <Dashboard />
            },
            {
                path: "cars-manage",
                element: <CarManage />
            },
            {
                path: "hosts-request",
                element: <HostRequest />
            },
            {
                path: "guests-request",
                element: <GuestRequest />
            },
            {
                path: "hosts-manage",
                element: <HostsManage />
            },
            {
                path: "guests-manage",
                element: <GuestsManage />
            },
            {
                path: "booking-manage",
                element: <BookingManage />
            },
            {
                path: "verification",
                element: <BookingManage />
            },
            {
                path: "payments",
                element: <Payments />
            },
         
            {
                path: "setting",
                element: <Setting />
            },
            // {
            //     path: "all-admin",
            //     element: <AdminList />
            // },
            // {
            //     path: "terms-condition",
            //     element: <TermsCondition />
            // },

            // {
            //     path: "about",
            //     element: <About/>
            // },
            // {
            //     path: "faq",
            //     element: <FAQ/>
            // },
            // {
            //     path: "policy",
            //     element: <PrivacyPolicy/>
            // },
            // {
            //     path: "policy",
            //     element: <PrivacyPolicy/>
            // },
        ]
    },
    {path: "/login", element: <Login />},
    {path: "/forgot-password", element: <ForgotPassword />},
    {path: "/verify-otp", element: <OTPVerify />},
    {path: "/new-password", element: <NewPassword />},
]);



export default router;