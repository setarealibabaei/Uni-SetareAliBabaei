import Footer from "../../components/footer";
import Header from "../../components/header";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar";

const RootLayout = () => {
  return (
    <>
      <Header />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;
