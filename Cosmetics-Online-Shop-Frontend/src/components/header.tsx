import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTotalUniqueItemsInCart } from "../redux/selectors";

export default function Header() {
  const totalUniqueItems = useSelector(selectTotalUniqueItemsInCart);
  return (
    <div className="w-full h-[73px] border-b-2 border-border bg-layout-header flex justify-between items-center md:px-[30px] px-5 justify-self-center">
      <div className="flex justify-center">
        <Link to="/">
          <img
            className="h-16 w-16 rounded-full "
            src="../../public/favicon.png"
            alt="لوندر"
          />
        </Link>
        <div className="flex flex-col justify-center mr-1 ">
          <h1 className="text-lg font-normal leading-[100%] text-right text-text-boldtext">
            <Link to="/">لوندر</Link>
          </h1>
          <p className="text-xs font-normal leading-[100%] text-right text-text mt-3">
            <Link to="/">فروشگاه آنلاین لوازم آرایشی</Link>
          </p>
        </div>
      </div>

      <div className="flex flex-row flex-nowrap gap-[25px]">
        <Link to="/adminLogin">
          <div className="relative inline-flex items-center font-medium text-center">
            <img src="/login.svg" alt="login" className="w-6 h-6" />
          </div>
        </Link>

        <Link to="/cart" className="relative inline-flex">
          <img src="/shopping.svg" alt="Shopping" className="w-6 h-6" />
          <div className="absolute -top-2 -left-4 inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-accent  rounded-full">
            {totalUniqueItems}
          </div>
        </Link>
      </div>
    </div>
  );
}
