///////////////////////////////////////////////////////////ok shamsi
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
  const [deliveryDate, setDeliveryDate] = useState<number | null>(null); // Change the state to store unix timestamp
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    const adminId = localStorage.getItem("adminId");
    if(adminId) {
      fetchUserById(adminId).then((data) => {
        setUser(data.data.user);
      });
    } else {
      navigate("/LoginPageToBuy"); 
    }
  }, []);

/////
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
    <div className=" w-full  bg-white mt-20 mb-20">
      <div className="mx-56 m-auto flex flex-col justify-center items-center shadow p-5 bg-violet-50 rounded-md">
        {user && (
          <div>
      <h1 className="text-2xl font-bold text-violet-800 my-5">نهایی کردن سبد خرید </h1>

            <div className="flex flex-col gap-8">
              <div className="flex gap-20">
                <div>
                  <label>نام:</label>
                  <input
                    type="text"
                    value={user.firstname}
                    readOnly
                    className="appearance-none block w-96 px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-500 focus:outline-none sm:text-sm"
                  />
                </div>

                <div>
                  <label>نام خانوادگی:</label>
                  <input
                    type="text"
                    value={user.lastname}
                    readOnly
                    className="appearance-none block w-96 px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-500 focus:outline-none sm:text-sm"
                  />
                </div>
              </div>
              <div className="flex gap-20">
                <div>
                  <label>شماره تلفن:</label>
                  <input
                    type="text"
                    value={user.phoneNumber}
                    readOnly
                    className="appearance-none block w-96 px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-500 focus:outline-none sm:text-sm"
                  />
                </div>

                <div>
                  <label>آدرس:</label>
                  <input
                    type="text"
                    value={user.address}
                    readOnly
                    className="appearance-none block w-96 px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-500 focus:outline-none sm:text-sm"
                  />
                </div>
              </div>
              <div className="">
                <label > تاریخ تحویل:</label>
             <div>
              <DatePicker
                value={
                  deliveryDate ? new DateObject(new Date(deliveryDate)) : null
                }
                onChange={(date:any) => {
                  setDeliveryDate(date); // تبدیل زمان یونیکس به میلی‌ثانیه
                }}
                className=""
                // inputClass="w-full"
                calendar={persian}
                locale={persian_fa} 
                inputClass="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:text-gray-500"
                calendarPosition="bottom-right"
                format="YYYY-MM-DD"
                minDate={
                  new DateObject({ calendar: persian, locale: persian_fa })
                }
              />
              </div>
            </div>
            </div>
            
          </div>
        )}
        <button className="w-80  bg-purple-500 text-white rounded-3xl hover:bg-purple-700 focus:outline-none font-medium text-sm px-5 py-2.5 text-center mt-1" onClick={handleNavigateToPayment}>پرداخت</button>
      </div>
    </div>
  );
}

////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "../../redux/store";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// import DatePicker from "react-multi-date-picker";
// import { DateObject } from "react-multi-date-picker";
// import persian from "react-date-object/calendars/persian";
// import persian_fa from "react-date-object/locales/persian_fa";

// interface User {
//   _id: string;
//   firstname: string;
//   lastname: string;
//   username: string;
//   phoneNumber: string;
//   address: string;
// }

// const fetchUserIdFromToken = async () => {
//   const token = localStorage.getItem("accessToken");
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
//   try {
//     const response = await axios.get(`http://localhost:8000/api/users/me`, config);
//     return response.data._id; // Assuming backend sends { _id: userId }
//   } catch (error) {
//     console.error("Error fetching user ID:", error);
//     return null;
//   }
// };

// const fetchUserById = async (id: string) => {
//   const token = localStorage.getItem("accessToken");
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
//   const response = await axios.get(`http://localhost:8000/api/users/${id}`, config);
//   return response.data;
// };

// export default function FinalizeCart() {
//   const [user, setUser] = useState<User | null>(null);
//   const [deliveryDate, setDeliveryDate] = useState<number | null>(null);
//   const navigate = useNavigate();
//   const cartItems = useSelector((state: RootState) => state.cart.items);

//   useEffect(() => {
//     fetchUserIdFromToken().then(userId => {
//       if (userId) {
//         fetchUserById(userId).then(data => {
//           setUser(data.data.user);
//         });
//       }
//     });
//   }, []);

//   const handleNavigateToPayment = () => {
//     if (user && deliveryDate && Object.keys(cartItems).length > 0) {
//       const orderInfo = {
//         userId: user._id,
//         deliveryDate: deliveryDate,
//         cartItems: cartItems,
//       };

//       localStorage.setItem("orderInfo", JSON.stringify(orderInfo));
//       navigate("/payment");
//     } else {
//       alert("لطفاً تاریخ تحویل را انتخاب کنید.");
//     }
//   };

//   return (
//     <div className=" w-full  bg-white mt-20 mb-20">
//       <div className="mx-56 m-auto flex flex-col justify-center items-center shadow p-5 bg-violet-50 rounded-md">
//         {user && (
//           <div>
//       <h1 className="text-2xl font-bold text-violet-800 my-5">نهایی کردن سبد خرید </h1>

//             <div className="flex flex-col gap-8">
//               <div className="flex gap-20">
//                 <div>
//                   <label>نام:</label>
//                   <input
//                     type="text"
//                     value={user.firstname}
//                     readOnly
//                     className="appearance-none block w-96 px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-500 focus:outline-none sm:text-sm"
//                   />
//                 </div>

//                 <div>
//                   <label>نام خانوادگی:</label>
//                   <input
//                     type="text"
//                     value={user.lastname}
//                     readOnly
//                     className="appearance-none block w-96 px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-500 focus:outline-none sm:text-sm"
//                   />
//                 </div>
//               </div>
//               <div className="flex gap-20">
//                 <div>
//                   <label>شماره تلفن:</label>
//                   <input
//                     type="text"
//                     value={user.phoneNumber}
//                     readOnly
//                     className="appearance-none block w-96 px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-500 focus:outline-none sm:text-sm"
//                   />
//                 </div>

//                 <div>
//                   <label>آدرس:</label>
//                   <input
//                     type="text"
//                     value={user.address}
//                     readOnly
//                     className="appearance-none block w-96 px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-500 focus:outline-none sm:text-sm"
//                   />
//                 </div>
//               </div>
//               <div className="">
//                 <label > تاریخ تحویل:</label>
//              <div>
//               <DatePicker
//                 value={
//                   deliveryDate ? new DateObject(new Date(deliveryDate)) : null
//                 }
//                 onChange={(date) => {
//                   setDeliveryDate(date.unix * 1000); // تبدیل زمان یونیکس به میلی‌ثانیه
//                 }}
//                 className=""
//                 // inputClass="w-full"
//                 calendar={persian}
//                 locale={persian_fa} 
//                 calendarPosition="bottom-right"
//                 format="YYYY-MM-DD"
//                 minDate={
//                   new DateObject({ calendar: persian, locale: persian_fa })
//                 }
//               />
//               </div>
//             </div>
//             </div>
            
//           </div>
//         )}
//         <button className="w-80  bg-purple-500 text-white rounded-3xl hover:bg-purple-700 focus:outline-none font-medium text-sm px-5 py-2.5 text-center mt-1" onClick={handleNavigateToPayment}>پرداخت</button>
//       </div>
//     </div>
//   );
// }


////////////////////////////////////////////////////
// export default function FinalizeCart() {
//   const [user, setUser] = useState<User | null>(null);
//   const [deliveryDate, setDeliveryDate] = useState<number | null>(null); // Change the state to store unix timestamp
//   const navigate = useNavigate();
//   const cartItems = useSelector((state: RootState) => state.cart.items);

//   useEffect(() => {
//     const userId = "65e7295e50e39d2e1db9956a";
//     fetchUserById(userId).then((data) => {
//       setUser(data.data.user);
//     });
//   }, []);
//
////
// export default function FinalizeCart() {
//   const [user, setUser] = useState<User | null>(null);
//   const [deliveryDate, setDeliveryDate] = useState<number | null>(null); // Change the state to store unix timestamp
//   const navigate = useNavigate();
//   const cartItems = useSelector((state: RootState) => state.cart.items);

//   useEffect(() => {
//     const adminId = localStorage.getItem("adminId");
//     if(adminId) {
//       fetchUserById(adminId).then((data) => {
//         setUser(data.data.user);
//       });
//     }
//   }, []);
/////
