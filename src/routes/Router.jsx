import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../components/Dashboard/Dashboard";
import Profile from "../page/Settings/Profile";
import TermsCondition from "../page/Settings/TermsCondition";
import PrivacyPolicy from "../page/Settings/PrivacyPolicy";
import Notification from "../page/Notification/Notification";
import VerificationCode from "../auth/VerificationCode";
import DashboardLayout from "../layout/DashboardLayout";
import ResetPassword from "../auth/ResetPassword";
import SignIn from "../auth/SignIn";
import ForgetPassword from "../auth/ForgetPassword";
import WelcomeMessage from "../auth/WelcomeMessage";
import AllUser from "../page/user-management/AllUser";
import SignUpRequest from "../page/user-management/SignUpRequest";
import AllOrder from "../page/order-management/AllOrder";
import AllProducts from "../page/product-management/AllProducts";
import ViewProduct from "../page/product-management/ViewProduct";
import EditProduct from "../page/product-management/EditProduct";
import Category from "../page/category/Category";
import Brand from "../page/brand/Brand";
import ProcedureGuide from "../page/procedureGuide/ProcedureGuide";
import Blog from "../page/blog/Blog";
import ViewBlog from "../page/blog/ViewBlog";
import Newsletter from "../page/Newsletter/Newsletter";
import Banners from "../page/Banners/Banners";
import MakeAdmin from "../page/Make Admin/MakeAdmin";
import AboutUs from "../page/Settings/AboutUs";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      // User Management
      {
        path: "/user/all-user",
        element: <AllUser />,
      },
      {
        path: "/user/sign-up-request",
        element: <SignUpRequest />,
      },
      // Order Management
      {
        path: "/order/all-order",
        element: <AllOrder />,
      },
      // Product Management
      {
        path: "/product/all-product",
        element: <AllProducts />,
      },
      {
        path: "/view-product/:id",
        element: <ViewProduct />,
      },
      {
        path: "/edit-product/:id",
        element: <EditProduct />,
      },
      // Category Management
      {
        path: "/category",
        element: <Category />,
      },
      // Brand Management
      {
        path: "/brand",
        element: <Brand />,
      },
      // Procedure Guide
      {
        path: "/procedure-guide",
        element: <ProcedureGuide />,
      },
      // Blog
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/view-blog/:id",
        element: <ViewBlog />,
      },
      // Newsletter
      {
        path: "/newsletter",
        element: <Newsletter />,
      },
      // Banner
      {
        path: "/banner",
        element: <Banners />,
      },
      // Make Admin
      {
        path: "/make-admin",
        element: <MakeAdmin />,
      },
      // Notification
      {
        path: "/notification",
        element: <Notification />,
      },

//About Us
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/dashboard/Settings/profile",
        element: <Profile />,
      },
      {
        path: "/dashboard/Settings/Terms&Condition",
        element: <TermsCondition />,
      },
      {
        path: "/dashboard/Settings/PrivacyPolicy",
        element: <PrivacyPolicy />,
      },
    ],
  },
  // Auth
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/forget-password",
    element: <ForgetPassword />,
  },
  {
    path: "/verify-mail",
    element: <VerificationCode />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/welcome",
    element: <WelcomeMessage />,
  },
]);
