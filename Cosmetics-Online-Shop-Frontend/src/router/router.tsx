import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/mainLayout/layout";
import AdminLayout from "../layout/adminLayout/adminLayout";
import AdminLogin from "../pages/admin/adminLogin";
import AdminPanelOrders from "../pages/admin/adminPanelOrders";
import AdminPanelInventoryPrices from "../pages/admin/adminPanelPrices";
import AdminPanelProducts from "../pages/admin/adminPanelProducts";
import HomePage from "../pages/homePage/homePage";
import NotFound from "../pages/notFoundPage/notFoundPage";
import Cart from "../pages/cart/cart";
import FinalizeCart from "../pages/cart/finalizeCart";
import CartPayment from "../pages/cart/cartPayment";
import SuccessfulPayment from "../pages/cart/successfulPayment";
import UnsuccessfulPayment from "../pages/cart/unsuccessfulPayment";
import CategorizationPage from "../pages/categorization/categorization";
import SubcategorizationPage from "../pages/categorization/Subcategorization";
import ProductPage from "../pages/singleProductPage/productPage";
import ProductsLayout from "../layout/productsLayout/productsLayout";
import LoginPageToBuy from "../pages/cart/loginPageToBuy";

const routes = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },

      {
        path: "/products/:productId",
        element: <ProductPage />,
      },

      //*************//
      //Shopping-Cart
      //*************//
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "/finalizeCart",
        element: <FinalizeCart />,
      },
      //*************//
      //LoginPageToBuy
      //*************//

      {
        path: "/LoginPageToBuy",
        element: <LoginPageToBuy />,
      },

      {
        path: "/payment",
        element: <CartPayment />,
      },

      {
        path: "/successfulPayment",
        element: <SuccessfulPayment />,
      },
      {
        path: "/unsuccessfulPayment",
        element: <UnsuccessfulPayment />,
      },
      {
        path: "*",
        // element: <NotFound />,
      },
    ],
    // errorElement: <NotFound />,
  },

  ///////////////////////////////////////
  //*************//
  //products
  //*************//
  {
    path: "/categorization/:categoryId",
    element: <ProductsLayout />,
    children: [
      {
        index: true,
        element: <CategorizationPage />,
      },
      {
        path: "subcategorization/:subcategoryId",
        element: <SubcategorizationPage />,
      },
    ],
  },

  /////////////////////////////////////////
  //*************//
  //Admin-Login
  //*************//

  {
    path: "/adminLogin",
    element: <AdminLogin />,
  },

  //*************//
  //Admin-Panel
  //*************//
  {
    path: "/adminPanel",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminPanelOrders />,
      },
      {
        path: "adminPanelInventory&Prices",
        element: <AdminPanelInventoryPrices />,
      },
      {
        path: "adminPanelProducts",
        element: <AdminPanelProducts />,
      },
      {
        path: "*",
        // element: <NotFound />,
      },
    ],
    // errorElement: <NotFound />,
  },
]);

export default routes;

//////////////////////////

// {
//   path: "/payment",
//   element: <CartPayment />,
//   children: [
//     {
//       path: "successfulPayment",
//       element: <SuccessfulPayment />,
//     },
//     {
//       path: "unsuccessfulPayment",
//       element: <UnsuccessfulPayment />,
//     },
//   ],
// },

// Import necessary components
