import { Outlet } from "react-router-dom";
import AdminTopBar from "../../components/adminPanelComponents/adminTopBar";
// import AdminFooter from "../../components/adminPanelComponents/adminFooter";

const AdminLayout = () => {
  return (
    <>
      <AdminTopBar />

      <Outlet />
    </>
  );
};

export default AdminLayout;
