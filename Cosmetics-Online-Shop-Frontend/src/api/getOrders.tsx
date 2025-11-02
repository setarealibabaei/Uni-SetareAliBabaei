
// import axios from "axios";


// export const getOrders = async (page :number ,status: boolean) => {
//   const accessToken = localStorage.getItem("accessToken");
//   const response = await axios.get(
    
//     `http://localhost:8000/api/orders?page=${page}&limit=6&sort=-createdAt&deliveryStatus=${status}`,
//     {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     }
//   );
  
//   return response.data;
// };
/////////////////////////////////////////////////
import axios from "axios";


export const getOrders = async (page :number ,status: boolean | undefined) => {
  const accessToken = localStorage.getItem("accessToken");
  const deliveryStatus = status !== undefined ? `&deliveryStatus=${status}` : "";

  const response = await axios.get(
    `http://localhost:8000/api/orders?page=${page}&limit=6&sort=-createdAt${deliveryStatus}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  
  return response.data;
};

