import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import {
  addItem,
  removeItem,
  deleteItem,
  clearCart,
} from "../../redux/cartSlice";
import axios from "axios";
import { Link } from "react-router-dom";
import ModalConfirmDelete from "../../components/modals/modalConfirmDelete";

interface ProductInfo {
  name: string;
  image: string;
  brand: string;
  price: number;
  availableQuantity: number;
}

const getProductById = async (productId: string) => {
  const token = localStorage.getItem("accessToken");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(
    `http://localhost:8000/api/products/${productId}`,
    config
  );

  const { name, thumbnail, price, quantity, brand } =
    response.data.data.product;
  return { name, image: thumbnail, price, brand, availableQuantity: quantity };
};

export default function Cart() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const [productInfos, setProductInfos] = useState<{
    [productId: string]: ProductInfo;
  }>({});

  const handleRemoveItemClicked = (productId: string) => {
    const currentQuantity = cartItems[productId] ?? 0;

    if (currentQuantity === 1) {
      setPendingDeleteProductId(productId);
      setIsModalOpen(true);
    } else {
      dispatch(removeItem({ productId, quantity: 1 }));
    }
  };

  const handleDeleteItemClicked = (productId: string) => {
    setPendingDeleteProductId(productId);
    setIsModalOpen(true);
  };

  const handleaddItem = (productId: string, quantity: number = 1) => {
    const currentQuantity = cartItems[productId] ?? 0;
    const availableQuantity = productInfos[productId]?.availableQuantity ?? 0;

    if (currentQuantity + quantity > availableQuantity) {
      return;
    }

    dispatch(addItem({ productId, quantity }));
  };

  // A function to calculate the total price of items in the cart
  const calculateTotalPrice = () => {
    return Object.entries(cartItems).reduce((total, [productId, quantity]) => {
      const price = productInfos[productId]?.price || 0;
      return total + price * quantity;
    }, 0);
  };

  useEffect(() => {
    const fetchAllProductInfos = async () => {
      const productInfoPromises = Object.keys(cartItems).map((productId) =>
        getProductById(productId)
      );
      const productsInfos = await Promise.all(productInfoPromises);
      const newProductInfos = productsInfos.reduce(
        (acc, productInfo, index) => {
          const productId = Object.keys(cartItems)[index];
          acc[productId] = productInfo;
          return acc;
        },
        {} as { [productId: string]: ProductInfo }
      );

      setProductInfos(newProductInfos);
    };

    if (Object.keys(cartItems).length > 0) {
      fetchAllProductInfos();
    }
  }, [cartItems]);

  //////////////////
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingDeleteProductId, setPendingDeleteProductId] = useState<
    string | null
  >(null);

  const confirmDelete = async () => {
    if (pendingDeleteProductId) {
      await dispatch(deleteItem({ productId: pendingDeleteProductId }));

      closeModal();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPendingDeleteProductId(null);
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="container w-full mb-40  flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold text-violet-900 mt-5 ">سبد خرید</h1>

      <div className="flex flex-col mx-20 my-6 lg:flex-row lg:gap-52">
        <div className="w-full flex justify-center">
          {Object.keys(cartItems).length === 0 ? (
            <div className="text-center">
              <p>سبد خرید شما خالی است.</p>
              <img src="../../public/no items cart.svg" alt="" />
              <Link
                className="font-bold border text-violet-600 border-violet-600 rounded-md p-2"
                to={`/`}
              >
                مشاهده محصولات
              </Link>
            </div>
          ) : (
            <div className="  p-5 mr-5">
              <div className="flex  mb-5">
                {/* پاک کردن کل سبد خرید */}
                <button className="" onClick={handleClearCart}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 text-red-800"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </div>

              {Object.entries(cartItems).map(([productId, quantity]) => (
                <div
                  className=" flex shadow shadow-violet-300 rounded-md p-5 mb-5"
                  key={productId}
                >
                  <div className=" flex flex-col items-center">
                    <Link to={`/products/${productId}`} key={productId}>
                      <img
                        src={`http://localhost:8000/images/products/thumbnails/${productInfos[productId]?.image}`}
                        alt="محصول"
                        className="w-28"
                      />
                    </Link>
                    <div className="flex gap-4 w-20 border border-violet-300 bg-gray-100 rounded-md justify-center mt-3">
                      <button
                        className="text-violet-600"
                        onClick={() => handleaddItem(productId)}
                      >
                        +
                      </button>
                      <p>{quantity}</p>
                      <button
                        className="text-violet-600"
                        onClick={() => handleRemoveItemClicked(productId)}
                      >
                        -
                      </button>
                    </div>
                  </div>
                  <div className="w-[500px] flex flex-col">
                    <div className="flex justify-end">
                      <button
                        className=""
                        onClick={() => handleDeleteItemClicked(productId)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-5 h-5 text-red-700"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="text-gray-500">
                      {productInfos[productId]?.brand}
                    </div>
                    <div>
                      <Link to={`/products/${productId}`} key={productId}>
                        {productInfos[productId]?.name}
                      </Link>
                    </div>

                    <div className="text-left mt-12">
                      {productInfos[productId]?.price} تومان
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {Object.keys(cartItems).length > 0 && (
          <div className="m-5 w-96 h-40 flex flex-col items-center shadow rounded-md bg-violet-50 p-10">
            <div className="w-80 flex justify-between">
              <h1>جمع سبد خرید</h1>
              <h2 className="mb-4">{calculateTotalPrice()} تومان</h2>
            </div>

            <div>
              <Link to={`/finalizeCart`}>
                <button className="w-80  bg-purple-500 text-white rounded-3xl hover:bg-purple-700 focus:outline-none font-medium text-sm px-5 py-2.5 text-center mt-1">
                  ثبت سفارش
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
      {isModalOpen && (
        <ModalConfirmDelete
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}
////////////

//////////
// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "../../redux/store";
// import { addItem, removeItem, deleteItem } from "../../redux/cartSlice";
// import axios from "axios";
// import { Link } from "react-router-dom";

// interface ProductInfo {
//   name: string;
//   image: string;
//   brand: string;
//   price: number;
//   availableQuantity: number;
// }

// const getProductById = async (productId: string) => {
//   const token = localStorage.getItem("accessToken");

//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
//   const response = await axios.get(
//     `http://localhost:8000/api/products/${productId}`,
//     config
//   );

//   const { name, thumbnail, price, quantity, brand } =
//     response.data.data.product;
//   return { name, image: thumbnail, price, brand, availableQuantity: quantity };
// };

// export default function Cart() {
//   const cartItems = useSelector((state: RootState) => state.cart.items);
//   const dispatch = useDispatch();
//   const [productInfos, setProductInfos] = useState<{
//     [productId: string]: ProductInfo;
//   }>({});

//   const handleRemoveItem = (productId: string, quantity: number = 1) => {
//     dispatch(removeItem({ productId, quantity }));
//   };

//   const handleaddItem = (productId: string, quantity: number = 1) => {
//     // دریافت تعداد فعلی و موجودی محصول
//     const currentQuantity = cartItems[productId] ?? 0;
//     const availableQuantity = productInfos[productId]?.availableQuantity ?? 0;

//     // بررسی که با افزودن، تعداد از موجودی تجاوز نکند
//     if (currentQuantity + quantity > availableQuantity) {
//       console.log("نمی‌توان بیشتر از موجودی به سبد اضافه کرد"); // یا نمایش یک پیام خطا به کاربر
//       return;
//     }

//     dispatch(addItem({ productId, quantity }));
//   };

//   const handleDeleteItem = (productId: string) => {
//     dispatch(deleteItem({ productId }));
//   };

//   // A function to calculate the total price of items in the cart
//   const calculateTotalPrice = () => {
//     return Object.entries(cartItems).reduce((total, [productId, quantity]) => {
//       const price = productInfos[productId]?.price || 0;
//       return total + price * quantity;
//     }, 0);
//   };

//   useEffect(() => {
//     const fetchAllProductInfos = async () => {
//       const productInfoPromises = Object.keys(cartItems).map((productId) =>
//         getProductById(productId)
//       );
//       const productsInfos = await Promise.all(productInfoPromises);
//       const newProductInfos = productsInfos.reduce(
//         (acc, productInfo, index) => {
//           const productId = Object.keys(cartItems)[index];
//           acc[productId] = productInfo;
//           return acc;
//         },
//         {} as { [productId: string]: ProductInfo }
//       );

//       setProductInfos(newProductInfos);
//     };

//     if (Object.keys(cartItems).length > 0) {
//       fetchAllProductInfos();
//     }
//   }, [cartItems]);

//   //////////////////

//   return (
//     <div className="mb-56">
//       <h1 className="text-2xl font-bold  text-violet-900 m-5">سبد خرید</h1>
//       <div className="flex flex-col mx-20  my-6 lg:flex-row lg:gap-52 ">
//         <div>
//           {Object.keys(cartItems).length === 0 ? (
//             <p>سبد خرید شما خالی است.</p>
//           ) : (
//             <div className="  p-5 mr-5">
//               {Object.entries(cartItems).map(([productId, quantity]) => (
//                 <div
//                   className=" flex shadow shadow-violet-300 rounded-md p-5 mb-5"
//                   key={productId}
//                 >
//                   <div className=" flex flex-col items-center">
//                     <Link to={`/products/${productId}`} key={productId}>
//                       <img
//                         src={`http://localhost:8000/images/products/thumbnails/${productInfos[productId]?.image}`}
//                         alt="محصول"
//                         className="w-28"
//                       />
//                     </Link>
//                     <div className="flex gap-4 w-20 border border-violet-300 bg-gray-100 rounded-md justify-center mt-3">
//                       <button
//                         className="text-violet-600"
//                         onClick={() => handleaddItem(productId)}
//                       >
//                         +
//                       </button>
//                       <p>{quantity}</p>
//                       <button className="text-violet-600" onClick={() => handleRemoveItem(productId)}>
//                         -
//                       </button>
//                     </div>
//                   </div>
//                   <div className="w-[500px] flex flex-col">
//                     <div className="flex justify-end">
//                       <button
//                         className=""
//                         onClick={() => handleDeleteItem(productId)}
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke-width="1.5"
//                           stroke="currentColor"
//                           className="w-5 h-5 text-red-700"
//                         >
//                           <path
//                             stroke-linecap="round"
//                             stroke-linejoin="round"
//                             d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
//                           />
//                         </svg>
//                       </button>
//                     </div>

//                     <div className="text-gray-500">
//                       {productInfos[productId]?.brand}
//                     </div>
//                     <div>
//                       <Link to={`/products/${productId}`} key={productId}>
//                         {productInfos[productId]?.name}
//                       </Link>
//                     </div>

//                     <div className="text-left mt-12">
//                       {productInfos[productId]?.price} تومان
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {Object.keys(cartItems).length > 0 && (
//           <div className="m-5 w-96 h-40 flex flex-col items-center shadow rounded-md bg-violet-50 p-10">
//             <h2 className="mb-4">
//               جمع سبد خرید: {calculateTotalPrice()} تومان
//             </h2>
//             <div>
//               <Link to={`/finalizeCart`}>
//                 <button className="w-80  bg-purple-500 text-white rounded-3xl hover:bg-purple-700 focus:outline-none font-medium text-sm px-5 py-2.5 text-center mt-1">
//                   ثبت سفارش
//                 </button>
//               </Link>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
/////
