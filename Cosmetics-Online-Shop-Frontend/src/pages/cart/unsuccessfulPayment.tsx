import { Link } from "react-router-dom";

export default function UnsuccessfulPayment() {
  return (
    <form className="flex flex-col w-full  font-IRANSans mb-20">
      <div className=" flex flex-col justify-center items-center mt-24 ">
        <div className="w-96 m-auto flex flex-col justify-center items-center shadow p-5">
          <div className="w-full"></div>

          <div>
            <img
              className="h-28 w-28 rounded-full mb-8 "
              src="../../../public/lavender.png"
              alt="lavender"
            />
          </div>

          <div className="flex flex-col justify-center items-center gap-5 text-violet-900">
            <h1 className="text-2xl font-bold ">
              پرداخت موفقیت آمیز نبود. 
            </h1>
            <h1 className="text-2xl font-bold ">
            سفارش شما در انتظار پرداخت است
            </h1>

            <div>
              <Link
                className="font-bold border border-violet-600 rounded-md p-2"
                to="/cart"
              >
                بازگشت به سبد خرید
              </Link>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}


