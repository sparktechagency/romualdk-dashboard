import { createBrowserRouter } from "react-router-dom";


import ForgotPassword from "../../Pages/Auth/ForgotPassword";
import Login from "../../Pages/Auth/Login";
import NewPassword from "../../Pages/Auth/NewPassword";
import OTPVerify from "../../Pages/Auth/OTPVerify";
import MainLayout from "../Layout/MainLayout";
import ErrorPage from "../UI/ErrorPage";
import { Dashboard } from "../dashboard/Dashboard/Dashboard";


import About from "../dashboard/About";
import AdminList from "../dashboard/AdminList/AdminList";
import Categories from "../dashboard/Categories/Categories";
import { ChangePassword } from "../dashboard/ChangePassword";
import FAQ from "../dashboard/FAQ/Faq";
import PrivacyPolicy from "../dashboard/PrivacyPolicy";
import Setting from "../dashboard/Setting";
import TermsCondition from "../dashboard/TermsCondition";
import Transaction from "../dashboard/Transaction/Transaction";
import UserList from "../dashboard/UserList/UserList";
import CarManage from "../dashboard/CarManage/CarManage";


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
                path: "users-list",
                element: <UserList />
            },
            {
                path: "categories",
                element: <Categories />
            },
            {
                path: "transaction",
                element: <Transaction />
            },
            {
                path: "changePassword",
                element: <ChangePassword />
            },


            {
                path: "setting",
                element: <Setting />
            },
            {
                path: "all-admin",
                element: <AdminList />
            },
            {
                path: "terms-condition",
                element: <TermsCondition />
            },

            {
                path: "about",
                element: <About/>
            },
            {
                path: "faq",
                element: <FAQ/>
            },
            {
                path: "policy",
                element: <PrivacyPolicy/>
            },
            {
                path: "policy",
                element: <PrivacyPolicy/>
            },
        ]
    },
    {path: "/login", element: <Login />},
    {path: "/forgot-password", element: <ForgotPassword />},
    {path: "/verify-otp", element: <OTPVerify />},
    {path: "/new-password", element: <NewPassword />},
]);



export default router;