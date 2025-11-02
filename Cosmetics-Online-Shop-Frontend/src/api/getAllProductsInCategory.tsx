import axios from "axios";

export const GetAllProductsInCategory = async (
  page: number,
  category_id: string
) => {
  const token = localStorage.getItem("accessToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(
    `http://localhost:8000/api/products?category=${category_id}&page=${page}&limit=8&sort=-createdAt`,
    config
  );
  return response.data;
};

////////////////
