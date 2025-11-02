import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import DatePicker from "react-multi-date-picker";
import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

interface User {
  _id: string;
  firstname: string;
  lastname: string;
  username: string;
  phoneNumber: string;
  address: string;
}

export const fetchUserById = async (id: string) => {
  const token = localStorage.getItem("accessToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(
    `http://localhost:8000/api/users/${id}`,
    config
  );
  return response.data;
};

export default function FinalizeCart() {
  const [user, setUser] = useState<User | null>(null);
  const [deliveryDate, setDeliveryDate] = useState<number | null>(null);
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    const adminId = localStorage.getItem("adminId");
    if (adminId) {
      fetchUserById(adminId).then((data) => {
        setUser(data.data.user);
      });
    } else {
      navigate("/LoginPageToBuy");
    }
  }, []);

  const handleNavigateToPayment = () => {
    if (user && deliveryDate && Object.keys(cartItems).length > 0) {
      const orderInfo = {
        userId: user._id,
        deliveryDate: deliveryDate,
        cartItems: cartItems,
      };

      localStorage.setItem("orderInfo", JSON.stringify(orderInfo));
      navigate("/payment");
    } else {
      alert("لطفاً  تاریخ تحویل را انتخاب کنید.");
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[1200px] px-5 md:px-6 m-auto  mt-20 mb-20">
        <div className=" flex flex-col justify-center items-center border border-border  rounded-[16px] shadow-[0_0_10px_0_#00000040] p-[30px]">
          {user && (
            <div>
              <h1 className="text-2xl font-bold text-accent mb-5">
                نهایی کردن سبد خرید
              </h1>

              <div className="flex flex-col gap-8">
                <div className="flex flex-col lg:flex-row gap-5 lg:gap-20">
                  <div>
                    <label>نام:</label>
                    <input
                      type="text"
                      value={user.firstname}
                      readOnly
                      className="appearance-none block w-full lg:w-96 px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-500 focus:outline-none lg:text-sm"
                    />
                  </div>

                  <div>
                    <label>نام خانوادگی:</label>
                    <input
                      type="text"
                      value={user.lastname}
                      readOnly
                      className="appearance-none block w-full lg:w-96 px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-500 focus:outline-none lg:text-sm"
                    />
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-5 lg:gap-20">
                  <div>
                    <label>شماره تلفن:</label>
                    <input
                      type="text"
                      value={user.phoneNumber}
                      readOnly
                      className="appearance-none block w-full lg:w-96 px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-500 focus:outline-none lg:text-sm"
                    />
                  </div>

                  <div>
                    <label>آدرس:</label>
                    <input
                      type="text"
                      value={user.address}
                      readOnly
                      className="appearance-none block w-full lg:w-96 px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-500 focus:outline-none lg:text-sm"
                    />
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-5 lg:gap-20">
                  <div>
                    <label> تاریخ تحویل:</label>
                    <div>
                      <DatePicker
                        value={
                          deliveryDate
                            ? new DateObject(new Date(deliveryDate))
                            : null
                        }
                        onChange={(date: any) => {
                          setDeliveryDate(date);
                        }}
                        className=""
                        calendar={persian}
                        locale={persian_fa}
                        inputClass="appearance-none block w-full lg:w-96 px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-500 focus:outline-none lg:text-sm"
                        calendarPosition="bottom-right"
                        format="YYYY-MM-DD"
                        minDate={
                          new DateObject({
                            calendar: persian,
                            locale: persian_fa,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <button
            className="bg-accent hover:bg-text-hover w-full md:w-96  mt-5 text-white rounded-2xl focus:outline-none font-medium text-sm px-5 py-2.5 text-center"
            onClick={handleNavigateToPayment}
          >
            پرداخت
          </button>
        </div>
      </div>
    </div>
  );
}
