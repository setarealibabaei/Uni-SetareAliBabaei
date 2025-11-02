import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function AdminTopBar() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("/adminPanel");

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  return (
    <div className="font-IRANSans w-full mb-6 border-2 h-24  bg-violet-50 shadow">
      <div className="flex gap-10 justify-around items-center mt-3 ">
        <div className="flex ">
          <div>
            <div>
              <img
                className="h-16 w-16 rounded-full "
                src="../../public/lavender.png"
                alt=""
              />
            </div>
          </div>
          <div className="flex flex-col  justify-center mr-2 ">
            <p className=" font-bold text-purple-800 text-sm xl:text-2xl">
              صفحه مدیریت
            </p>
          </div>
        </div>

        <div className=" flex  gap-5">
          <div
            className={`text-xs xl:text-2xl font-bold p-2 rounded-lg h-12 ${
              activeLink === "/adminPanel"
                ? "bg-violet-500 text-white"
                : "text-violet-500"
            }`}
          >
            <Link to="/adminPanel">سفارش ها</Link>
          </div>
          <div
            className={`text-xs xl:text-2xl font-bold p-2 rounded-lg h-12 ${
              activeLink === "/adminPanel/adminPanelInventory&Prices"
                ? "bg-violet-500 text-white"
                : "text-violet-500"
            }`}
          >
            <Link to="/adminPanel/adminPanelInventory&Prices">
              موجودی و قیمت ها
            </Link>
          </div>
          <div
            className={`text-xs xl:text-2xl font-bold p-2 rounded-lg h-12 ${
              activeLink === "/adminPanel/adminPanelProducts"
                ? "bg-violet-500 text-white"
                : "text-violet-500"
            }`}
          >
            <Link to="/adminPanel/adminPanelProducts">کالاها</Link>
          </div>
        </div>

        <div className="flex items-center">
          <Link className="flex items-center " to="/">
            <p className="text-violet-900">بازگشت </p>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-violet-900"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
