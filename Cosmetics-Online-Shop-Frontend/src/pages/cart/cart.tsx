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
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[1200px] px-5 md:px-6 m-auto">
        <h1 className="text-2xl font-bold text-text mt-5 ">سبد خرید</h1>
        <div
          className={`flex flex-col justify-between items-center my-6  lg:gap-8 ${
            Object.keys(cartItems).length === 0 ? "" : "lg:flex-row"
          }`}
        >
          {Object.keys(cartItems).length === 0 ? (
            <div className="text-center">
              <p className="text-text">سبد خرید شما خالی است.</p>
              <img src="../../public/no items cart.svg" alt="" />
              <Link
                className="font-bold border text-accent border-accent rounded-md p-2"
                to={`/`}
              >
                مشاهده محصولات
              </Link>
            </div>
          ) : (
            <div
              className={`w-full ${
                Object.keys(cartItems).length === 0 ? "hidden" : "block"
              }`}
            >
              <div className="flex ">
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
                  className="mt-5 flex border border-border  rounded-[16px] shadow-[0_0_10px_0_#00000040] p-[30px]"
                  key={productId}
                >
                  <div className="w-full flex flex-col">
                    <Link to={`/products/${productId}`} key={productId}>
                      <img
                        src={`http://localhost:8000/images/products/thumbnails/${productInfos[productId]?.image}`}
                        alt="محصول"
                        className="w-28"
                      />
                    </Link>
                    <div className="flex gap-4  border-2 border-layout-sidebar  rounded-2xl w-20   justify-center mt-3">
                      <button
                        className="text-layout-sidebar"
                        onClick={() => handleaddItem(productId)}
                      >
                        +
                      </button>
                      <p>{quantity}</p>
                      <button
                        className="text-layout-sidebar"
                        onClick={() => handleRemoveItemClicked(productId)}
                      >
                        -
                      </button>
                    </div>
                  </div>
                  <div className="w-full justify-between flex flex-col">
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

                    <p className="text-gray-500 line-clamp-1">
                      {productInfos[productId]?.brand}
                    </p>
                    <p className="text-text line-clamp-1">
                      <Link to={`/products/${productId}`} key={productId}>
                        {productInfos[productId]?.name}
                      </Link>
                    </p>

                    <div className="text-left text-text">
                      {productInfos[productId]?.price} تومان
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="w-full mt-5 lg:mt-0">
            {Object.keys(cartItems).length > 0 && (
              <div className="flex flex-col items-center border border-border  rounded-[16px] shadow-[0_0_10px_0_#00000040] p-[30px]">
                <div className="w-full flex flex-row justify-between">
                  <h1 className="text-text">جمع سبد خرید</h1>
                  <h2 className=" text-text">{calculateTotalPrice()} تومان</h2>
                </div>

                <div className="w-full">
                  <Link to={`/finalizeCart`}>
                    <button className="bg-accent hover:bg-text-hover w-full mt-5 text-white rounded-2xl focus:outline-none font-medium text-sm px-5 py-2.5 text-center">
                      ثبت سفارش
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
        {isModalOpen && (
          <ModalConfirmDelete
            isOpen={isModalOpen}
            onClose={closeModal}
            onConfirm={confirmDelete}
          />
        )}
      </div>
    </div>
  );
}
