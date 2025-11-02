import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../../pages/admin/adminPanelProducts";

interface ProductItemProps {
  product: Product;
}

const shortenProductName = (name: string): string => {
  return name.length > 40 ? name.slice(0, 37) + "..." : name;
};

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  return (
    <Link to={`/products/${product._id}`} key={product._id}>
      <div
        className="
          flex flex-col justify-start w-[277px] h-full 
          border border-border p-[25px] rounded-2xl m-2
          shadow-lg bg-white
          transition-all duration-300 ease-out
          hover:shadow-xl hover:scale-105 hover:-translate-y-1
        "
      >
        <img
          src={`http://localhost:8000/images/products/thumbnails/${product.thumbnail}`}
          alt={product.name}
          className="w-[227px] h-[227px] mb-[25px] border border-border rounded-md object-cover self-center"
        />

        <h3 className="font-normal text-[20px] leading-[100%] text-right text-text line-clamp-1">
          {shortenProductName(product.name)}
        </h3>

        <p className="font-normal text-[18px] leading-[100%] mt-[38px] flex justify-end w-auto self-end">
          {product.quantity === 0 ? (
            <span className="text-gray-500">ناموجود</span>
          ) : (
            <span className="ml-auto">
              <span className="text-accent text-[25px]">{product.price}</span>
              <span className="text-text text-[18px]"> تومان </span>
            </span>
          )}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
