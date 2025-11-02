import Footer from "../../components/footer";
import Header from "../../components/header";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar";

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
