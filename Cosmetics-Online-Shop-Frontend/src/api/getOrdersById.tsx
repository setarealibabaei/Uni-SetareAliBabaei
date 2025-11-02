import axios from "axios";

export const GetOrderById = async (OrderId: string) => {
  const token = localStorage.getItem("accessToken");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(
    
    `http://localhost:8000/api/orders/${OrderId}`,
    config
  );

  return response.data.data.order;
  // console.log(response.data)
};