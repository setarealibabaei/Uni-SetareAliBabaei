import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { errorHandler } from "../../libs/errorHandler";
import Joi from "joi";

interface FormData {
  username: string;
  password: string;
}

interface FormErrors {
  username?: string;
  password?: string;
  form?: string;
}

const AdminLogin: React.FC = () => {
  const [data, setData] = useState<FormData>({ username: "", password: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const navigate = useNavigate();

  //form validation
  const schema = Joi.object({
    username: Joi.string().required().min(4).max(20).messages({
      "string.empty": "لطفا نام کاربری خود را وارد کنید",
      "string.min": "نام کاربری باید حداقل دارای 4 حرف باشد",
      "string.max": "نام کاربری باید حداکثر دارای 20 حرف باشد",
    }),
    password: Joi.string().required().min(6).max(20).messages({
      "string.empty": "لطفا رمز عبور خود را وارد کنید",
      "string.min": "رمز عبور باید حداقل دارای 4 حرف باشد",
      "string.max": "رمز عبور باید حداقل دارای 20 حرف باشد",
    }),
  });

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [ev.target.name]: ev.target.value });
    setErrors({ ...errors, [ev.target.name]: "" });
  };

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    // Validate form data
    const { error: validationError } = schema.validate(data, {
      abortEarly: false,
    });
    if (validationError) {
      const fieldErrors = validationError.details.reduce((acc, detail) => {
        acc[detail.path[0] as keyof FormErrors] = detail.message;
        return acc;
      }, {} as FormErrors);
      setErrors(fieldErrors);
      return;
    }
    /////////////
    // try {
    //   const response = await axios.post(
    //     "http://localhost:8000/api/auth/login",
    //     data
    //   );
    //   localStorage.setItem("accessToken", response.data.token.accessToken);
    //   localStorage.setItem("adminId", response.data.data.user._id);

    //   navigate("/adminPanel");
    // } catch (error) {
    //   const html = errorHandler(error);
    //   setErrors({ form: html });
    // }
    ////////////
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        data
      );

      // Check if the user is an admin
      const userRole = response.data.data.user.role;
      if (userRole !== "ADMIN") {
        // setErrors({ form: "You do not have permission to access this page." });
        setErrors({ form: "نام کاربری یا رمز عبور اشتباه است" });

        navigate("/adminLogin");
        return;
      }

      // If the user is an admin, set the access token and adminId in localStorage and navigate to the adminPanel page
      localStorage.setItem("accessToken", response.data.token.accessToken);
      localStorage.setItem("adminId", response.data.data.user._id);
      navigate("/adminPanel");
    } catch (error) {
      const html = errorHandler(error);
      setErrors({ form: html });
    }

    ///////////
  };

  return (
    <div className="h-screen w-full bg-violet-50">
      <form
        className="flex flex-col w-full "
        id="loginForm"
        onSubmit={handleSubmit}
      >
        <div className=" flex flex-col justify-center items-center mt-32 ">
          <div className="w-96 m-auto flex flex-col justify-center items-center shadow p-5 bg-white rounded-md">
            <div className="w-full">
              <div className="flex justify-end ">
                <Link to="/">
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

            <div>
              <img
                className="h-28 w-28 rounded-full mb-8 "
                src="../../../public/lavender.png"
                alt="lavender"
              />
            </div>
            {/* username input */}
            <div className="flex  justify-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 mt-1 text-violet-900"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                  clip-rule="evenodd"
                />
              </svg>

              <div className="flex flex-col justify-center items-center">
                <input
                  className="w-72 bg-purple-50 border-none text-gray-900 text-sm rounded-xl focus:ring-purple-50 block p-2"
                  placeholder="نام کاربری"
                  type="text"
                  name="username"
                  onChange={handleChange}
                />
                <div className="h-7 ">
                  {errors.username && (
                    <div className="text-red-500 ">{errors.username}</div>
                  )}
                </div>
              </div>
            </div>

            {/* password input */}
            <div className="flex  justify-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 mt-2 text-violet-900"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                  clip-rule="evenodd"
                />
              </svg>

              <div className="flex flex-col justify-center items-center">
                <input
                  className="w-72 bg-purple-50 border-none text-gray-900 text-sm rounded-xl focus:ring-purple-50 block  p-2 mt-1"
                  type="password"
                  placeholder="رمز عبور"
                  name="password"
                  onChange={handleChange}
                />
                <div className="h-7">
                  {errors.password && (
                    <div className="text-red-500 ">{errors.password}</div>
                  )}
                </div>
              </div>
            </div>

            <button
              className="w-80 bg-purple-500 text-white rounded-3xl hover:bg-purple-700 focus:outline-none font-medium text-sm px-5 py-2.5 text-center mt-1"
              type="submit"
            >
              ورود
            </button>
            <div className="h-7 mt-2">
              {errors.form && <div className="text-red-500">{errors.form}</div>}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
