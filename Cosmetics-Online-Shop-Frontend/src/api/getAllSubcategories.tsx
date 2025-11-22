import axios from "axios";


export const GetAllSubcategories = async () => {
    const token = localStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      `/api/subcategories`,
      config
    );
    return response.data.data;
  };