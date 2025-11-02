import axios from "axios";

export const GetCategoryById = async (CategoryById: string) => {
  const token = localStorage.getItem("accessToken");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(
    `http://localhost:8000/api/categories/${CategoryById}`,
    config
  );

  return response.data;
};

/////////////


