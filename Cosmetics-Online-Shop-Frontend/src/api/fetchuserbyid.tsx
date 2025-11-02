import axios from "axios";

export const fetchuserById = async (id: string) => {
  const token = localStorage.getItem("accessToken");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(
    `http://localhost:8000/api/users/${id}`,
    config
  );

  return response.data;
};
