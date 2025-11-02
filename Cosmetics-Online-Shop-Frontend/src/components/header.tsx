import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import { selectTotalItemsInCart } from "../redux/selectors";

import { selectTotalUniqueItemsInCart } from "../redux/selectors";

export default function Header() {
  // const totalItems = useSelector(selectTotalItemsInCart);
  const totalUniqueItems = useSelector(selectTotalUniqueItemsInCart);
  return (
    <div className="container w-full  flex justify-around items-center shadow h-20  bg-purple-50 ">
      <div className=" flex  justify-center items-center font-bold ">
        <div className="flex">
          <div>
            <Link to="/">
              <img
                className="h-16 w-16 rounded-full "
                src="../../public/lavender.png"
                alt=""
              />
            </Link>
          </div>
          <div className="flex flex-col  justify-center mr-2 ">
            <p className=" font-bold text-purple-800 text-sm md:text-2xl">
              <Link to="/">لوندر</Link>
            </p>
            <p className="text-purple-800   text-xs md:text-sm">
              <Link to="/">فروشگاه آنلاین لوازم آرایشی</Link>
            </p>
          </div>
        </div>
        {/* //////////////
        ////////////// */}
      </div>
      <div className="flex ">
        <div className="mr-5 flex flex-col justify-center items-center font-bold hover:text-purple-600 ">
          <Link className="text-xs md:text-base " to="/adminLogin">
            <div className="relative inline-flex items-center   font-medium text-center  focus:outline-none  dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-xs md:text-base"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </div>
          </Link>
          <Link className="text-xs md:text-base" to="/adminLogin">
            پنل مدیریت
          </Link>
        </div>

        <div className="flex flex-col justify-center items-center font-bold hover:text-purple-600 mr-5">
          <div className="relative inline-flex items-center p-1 text-sm font-medium text-center  focus:outline-none  dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800">
            <Link className="text-xs md:text-base" to="/cart">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-xs md:text-base"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-violet-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-violet-900">
                {/* تعداد نوع محصولات در سبد: */}
                {totalUniqueItems}
              </div>
            </Link>
          </div>

          {/* تعداد محصولات در سبد: {totalItems} */}

          <Link className="text-xs md:text-base" to="/cart">
            سبد خرید
          </Link>
        </div>
      </div>
    </div>
  );
}
