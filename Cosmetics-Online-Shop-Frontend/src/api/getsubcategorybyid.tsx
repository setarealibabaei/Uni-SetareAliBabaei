import axios from "axios";

export const GetsubcategoryById = async (subcategoriesId: string) => {
  const token = localStorage.getItem("accessToken");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(
    `/api/subcategories/${subcategoriesId}`,
    config
  );

  return response.data;
};
