import { useQuery } from "react-query";
// import { useQueryClient } from "react-query";
import { fetchuserById } from "../../../api/fetchuserbyid";
import { Order } from "../../../pages/admin/adminPanelOrders";
import moment from "jalali-moment";
import { useState } from "react";
import { GetOrderById } from "../../../api/getOrdersById";
import OrderDetailsModal from "../../modals/modalOrderDetails";
import axios from "axios";

export default function OrdersTable({
  _id,
  createdAt,
  totalPrice,
  user,
  deliveryStatus,
}: Order) {
  // const queryClient = useQueryClient();////
  //////////////////////
  const { data: userIdData } = useQuery([`userId`, user], () =>
    fetchuserById(user)
  );
  console.log(userIdData);
  //////////////////////
  const solarCalendarCreatedAt = moment(createdAt).format("jYYYY/jMM/jDD");
  ////////////////
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedOrderDetails, setSelectedOrderDetails] =
    useState<Order | null>(null);

  const handleOpenModal = async (orderId: string) => {
    
    const orderDetails = await GetOrderById(orderId);
    setSelectedOrderDetails(orderDetails);


    setModalOpen(true);
    console.log(orderDetails);
  };

  //////////////////////////////////
  const handleMarkAsDelivered = async (orderId: string) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/orders/${orderId}`,
        {
          deliveryStatus: true,
        }
      );

      if (
        response.status === 200 &&
        response.data.order &&
        selectedOrderDetails
      ) {
        const updatedOrderDetails: Order = {
          ...selectedOrderDetails,
          deliveryStatus: true,
        };

        setSelectedOrderDetails(updatedOrderDetails);
        setModalOpen(false);
        // queryClient.invalidateQueries(["orders"]);///
      }
    } catch (error) {
      console.error("Error updating order status", error);
    }
  };
  ///////////////////////////////////

  return (
    <tr key={_id}>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 text-center">
        {userIdData?.data?.user?.firstname} {userIdData?.data?.user?.lastname}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 text-center">
        {totalPrice}
        {"   تومان"}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 text-center">
        {solarCalendarCreatedAt}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 text-center">
        {deliveryStatus ? "تحویل داده شده" : "در انتظار تحویل"}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 text-center">
        <button onClick={() => handleOpenModal(_id)}>بررسی سفارش</button>
      </td>
      <OrderDetailsModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        orderDetails={selectedOrderDetails}
        onDeliver={handleMarkAsDelivered}
      />
    </tr>
  );
}

/////////////
