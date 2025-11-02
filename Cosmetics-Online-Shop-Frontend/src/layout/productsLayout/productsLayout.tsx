import Footer from "../../components/footer";
import Header from "../../components/header";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";


const ProductsLayout = () => {
  return (
    <>
      <Header />
      <Navbar />
      <div className="flex">
        <Sidebar />
        <Outlet />
      </div>

      <Footer />
    </>
  );
};

export default ProductsLayout;
