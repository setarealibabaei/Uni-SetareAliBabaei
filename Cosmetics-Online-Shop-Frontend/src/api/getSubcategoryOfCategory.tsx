import axios from "axios";

export const GetCategories = async () => {
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
  return response.data.data.categories;
};

export const GetSubcategoryOfCategory = async (categoryId: string) => {
  const token = localStorage.getItem("accessToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(
    `http://localhost:8000/api/subcategories?category=${categoryId}`,
    config
  );
  return response.data.data.subcategories;
};
