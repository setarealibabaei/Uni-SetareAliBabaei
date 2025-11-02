import axios from "axios";

export const GetAllCategories = async () => {
  const token = localStorage.getItem("accessToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(
    `http://localhost:8000/api/categories`,
    config
  );
  return response.data.data;
};