import { createBrowserRouter } from "react-router-dom";
// Layouts
import RootLayout from "../layout/mainLayout/layout";
import ProductsLayout from "../layout/productsLayout/productsLayout";
import AdminLayout from "../layout/adminLayout/adminLayout";

// Pages - Public
import HomePage from "../pages/homePage/homePage";
import ProductPage from "../pages/singleProductPage/productPage";
import CategorizationPage from "../pages/categorization/categorization";
import SubcategorizationPage from "../pages/categorization/Subcategorization";

// Pages - Cart
import Cart from "../pages/cart/cart";
import FinalizeCart from "../pages/cart/finalizeCart";
import CartPayment from "../pages/cart/cartPayment";
import SuccessfulPayment from "../pages/cart/successfulPayment";
import UnsuccessfulPayment from "../pages/cart/unsuccessfulPayment";
import LoginPageToBuy from "../pages/cart/loginPageToBuy";

// Pages - Admin
import AdminLogin from "../pages/admin/adminLogin";
import AdminPanelOrders from "../pages/admin/adminPanelOrders";
import AdminPanelInventoryPrices from "../pages/admin/adminPanelPrices";
import AdminPanelProducts from "../pages/admin/adminPanelProducts";

// Pages - Other
import NotFound from "../pages/notFoundPage/notFoundPage";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "products/:productId", element: <ProductPage /> },

      // 🛒 Cart Routes
      { path: "cart", element: <Cart /> },
      { path: "finalizeCart", element: <FinalizeCart /> },
      { path: "payment", element: <CartPayment /> },
      { path: "successfulPayment", element: <SuccessfulPayment /> },
      { path: "unsuccessfulPayment", element: <UnsuccessfulPayment /> },
      { path: "LoginPageToBuy", element: <LoginPageToBuy /> },

      // 🏷️ Products Section
      {
        path: "categorization/:categoryId",
        element: <ProductsLayout />,
        children: [
          { index: true, element: <CategorizationPage /> },
          {
            path: "subcategorization/:subcategoryId",
            element: <SubcategorizationPage />,
          },
        ],
      },
    ],
    errorElement: <NotFound />,
  },

  // Admin Section
  {
    path: "/adminLogin",
    element: <AdminLogin />,
  },
  {
    path: "/adminPanel",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminPanelOrders /> },
      {
        path: "adminPanelInventory&Prices",
        element: <AdminPanelInventoryPrices />,
      },
      { path: "adminPanelProducts", element: <AdminPanelProducts /> },
    ],
  },
]);

export default routes;
