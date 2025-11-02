import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <form className="flex flex-col w-full  mb-10">
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
            <h1 className="text-3xl font-bold ">
              صفحه مورد نظر یافت نشد
            </h1>

            <div>
              <Link className="font-bold border text-violet-600 border-violet-600 rounded-md p-2" to="/">بازگشت به خانه</Link>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
