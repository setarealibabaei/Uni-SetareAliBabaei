import axios from "axios";


export const GetAllProducts = async (page: number) => {
  const token = localStorage.getItem("accessToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(
    `http://localhost:8000/api/products?page=${page}&limit=100&fields=-rating,-createdAt,-updatedAt,-__v&sort=-createdAt`,
    config
  );
  return response.data;
};

////////////////

