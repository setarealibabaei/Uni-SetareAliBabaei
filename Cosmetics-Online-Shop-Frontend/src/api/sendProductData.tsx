import axios from "axios";

interface ProductForm {
  category: string;
  subcategory: string;
  name: string;
  price: number;
  quantity: number;
  brand: string;
  description: string;
  thumbnail: File | null;
  images: File[];
}

export const sendProductData = async (
  productData: ProductForm
): Promise<void> => {
  const formData = new FormData();
  formData.append("category", productData.category);
  formData.append("subcategory", productData.subcategory);
  formData.append("name", productData.name);
  formData.append("price", productData.price.toString());
  formData.append("quantity", productData.quantity.toString());
  formData.append("brand", productData.brand);
  formData.append("description", productData.description);

  if (productData.thumbnail) {
    formData.append("thumbnail", productData.thumbnail);
  }

  productData.images.forEach((image) => {
    formData.append("images", image);
  });

  const token = localStorage.getItem("accessToken");

  try {
    const response = await axios.post(
      "http://localhost:8000/api/products",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,

          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(response.data);
  } catch (error) {
    console.error("Error:", error);
  }
};
