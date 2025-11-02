import { Link } from "react-router-dom";

export default function UnsuccessfulPayment() {
  return (
    <form className="flex flex-col w-full  font-IRANSans">
      <div className=" flex flex-col justify-center items-center my-6 ">
        <div className="w-full max-w-96 mx-auto flex flex-col justify-center items-center shadow-[0_0_10px_0_#00000040] p-5 bg-white rounded-2xl">
          <div className="w-full"></div>

          <div>
            <img
              className="h-28 w-28 rounded-full mb-8 "
              src="../../../public/favicon.png"
              alt="lavender"
            />
          </div>

          <div className="flex flex-col justify-center items-center gap-5 text-text">
            <h1 className="text-xl font-bold ">پرداخت موفقیت آمیز نبود.</h1>
            <h1 className="text-xl font-bold ">
              سفارش شما در انتظار پرداخت است
            </h1>

            <div>
              <Link
                className="font-bold border border-accent text-accent rounded-md p-2"
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


