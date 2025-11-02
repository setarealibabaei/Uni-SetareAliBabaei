import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../../pages/admin/adminPanelProducts";
interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  return (
    <Link to={`/products/${product._id}`} key={product._id}>
      <div className="product-item shadow shadow-violet-400 rounded-lg w-56 h-72 m-2 flex justify-center items-center ">
        <div>
          <img
            src={`http://localhost:8000/images/products/thumbnails/${product.thumbnail}`}
            alt={product.name}
            className="w-40 h-40 m-auto"
          />
          <div className="w-48">
            <h3>{product.name}</h3>
          </div>
          <p
            className={`${
              product.quantity === 0
                ? "text-gray-500 text-left mt-2"
                : "text-black text-left mt-2"
            }`}
          >
            {product.quantity === 0 ? "ناموجود" : `${product.price} تومان`}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
