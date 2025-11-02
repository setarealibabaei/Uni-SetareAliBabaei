import axios from "axios";

export const fetchProductById = async (ProductId: string) => {
  const token = localStorage.getItem("accessToken");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(
    `http://localhost:8000/api/products/${ProductId}`,
    config
  );

  return response.data;
  //   console.log(response.data)
};
////////////////////
