import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar";

const ProductsLayout = () => {
  return (
    <div className="flex flex-1 min-h-[calc(100vh-200px)]">
      <Sidebar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default ProductsLayout;
