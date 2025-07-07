import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../components/Dashboard/Dashboard";
import Profile from "../page/Settings/Profile";
import TermsCondition from "../page/Settings/TermsCondition";
import PrivacyPolicy from "../page/Settings/PrivacyPolicy";
import Notification from "../page/Notification/Notification";
import VerificationCode from "../auth/VerificationCode";
import DashboardLayout from "../layout/DashboardLayout";
import SellerManagement from "../page/sellerManagement/SellerManagement";
import Subscription from "../page/subscription/Subscription";
import UpdateSubscription from "../page/subscription/UpdateSubscription";
import PremiumSubscribers from "../page/PremiumSubscribers/PremiumSubscribers";
import AdPromotion from "../page/AdPromotion/AdPromotion";
import Faq from "../page/Settings/Faq";
import Support from "../page/Support/Support";
import CategoryManagement from "../page/CategoryManagement/CategoryManagement";
import Chat from "../page/Chat/Chat";
import ResetPassword from "../auth/ResetPassword";
import SignIn from "../auth/SignIn";
import BookingManagement from "../page/BookingManagement/BookingManagement";
import BookingTable from "../page/BookingManagement/BookingTable";
import ForgetPassword from "../auth/ForgetPassword";
import WelcomeMessage from "../auth/WelcomeMessage";
import AllUser from "../page/user-management/AllUser";
import SignUpRequest from "../page/user-management/SignUpRequest";
import AllOrder from "../page/order-management/AllOrder";
import AllProducts from "../page/product-management/AllProducts";
import ViewProduct from "../page/product-management/ViewProduct";
import EditProduct from "../page/product-management/EditProduct";
import Category from "../page/category/Category";

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

      {
        path: "/dashboard/seller-management",
        element: <SellerManagement />,
      },

      {
        path: "/dashboard/subscription",
        element: <Subscription />,
      },
      {
        path: "/booking-management",
        element: <BookingManagement />,
      },
      {
        path: "/bookingTable",
        element: <BookingTable />,
      },
      {
        path: "/dashboard/update-subscription",
        element: <UpdateSubscription />,
      },
      {
        path: "/premium-subscribers",
        element: <PremiumSubscribers />,
      },
      {
        path: "/ads-promotion",
        element: <AdPromotion />,
      },
      {
        path: "/dashboard/Settings/profile",
        element: <Profile />,
      },
      {
        path: "/dashboard/Settings/notification",
        element: <Notification />,
      },
      {
        path: "/dashboard/Settings/Terms&Condition",
        element: <TermsCondition />,
      },
      {
        path: "/dashboard/Settings/PrivacyPolicy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/faq",
        element: <Faq />,
      },
      {
        path: "/chat",
        element: <Chat />,
      },
      {
        path: "/support",
        element: <Support />,
      },
      {
        path: "/category-management",
        element: <CategoryManagement />,
      },
    ],
  },
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
