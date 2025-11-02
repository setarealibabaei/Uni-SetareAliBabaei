import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/cartSlice";

export default function CartPayment() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  
  const handlePayment = async () => {
    setIsSubmitting(true);
    const token = localStorage.getItem("accessToken");

    const orderInfo = JSON.parse(localStorage.getItem("orderInfo") || "{}");

    if (!token || !orderInfo.userId) {
      alert("اطلاعات کاربر یافت نشد.");
      setIsSubmitting(false);
      navigate("/unsuccessfulPayment");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const orderData = {
      user: orderInfo.userId,
      products: Object.keys(orderInfo.cartItems).map((productId) => ({
        product: productId,
        count: orderInfo.cartItems[productId],
      })),
      deliveryStatus: false,
      deliveryDate: orderInfo.deliveryDate,
    };

    try {
      const response = await axios.post(
        `http://localhost:8000/api/orders`,
        orderData,
        config
      );
      setIsSubmitting(false);

      if (response.data.status === "success") {
        dispatch(clearCart());
        navigate("/successfulPayment");
      } else {
        navigate("/unsuccessfulPayment");
      }
    } catch (error) {
      console.error("There was an error processing the payment:", error);
      setIsSubmitting(false);
      navigate("/unsuccessfulPayment");
    }
  };

  return (
    <div className="w-full mb-16">
    
      <div className="mt-10">
        <img
          className="w-[600px] m-auto"
          src="../../public/download.png"
          alt=""
        />
        <div className="flex justify-center ">
          <button
            className="ml-8 bg-blue-400 p-2 w-24 text-white rounded-md"
            onClick={handlePayment}
            disabled={isSubmitting}
          >
            {isSubmitting ? "در حال پردازش..." : "پرداخت"}
          </button>
          <button
            className="ml-48 bg-red-500 p-2 w-24 text-white rounded-md"
            onClick={() => navigate("/unsuccessfulPayment")}
            disabled={isSubmitting}
          >
            انصراف
          </button>
        </div>
      </div>
    </div>
  );
}
