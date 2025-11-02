import axios from "axios";

export const deleteProduct = async (productId: string) => {
  const token = localStorage.getItem("accessToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    await axios.delete(
      `http://localhost:8000/api/products/${productId}`,
      config
    );

    // alert('محصول با موفقیت حذف شد.');
  } catch (error) {
    console.error("خطا در حذف محصول:", error);
    alert("خطا در حذف محصول.");
  }
};
