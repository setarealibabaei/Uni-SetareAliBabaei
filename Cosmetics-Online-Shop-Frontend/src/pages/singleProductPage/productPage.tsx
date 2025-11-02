/////////////////////////////////////////
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchProductById } from "../../api/fetchProductsById";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { addItem } from "../../redux/cartSlice";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import Loading from "../../components/loding/loading";

type Product = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  brand: string;
  description: string;
  thumbnail: string;
  images: string[];
  category: {
    _id: string;
    name: string;
    icon: string;
  };
  subcategory: {
    _id: string;
    name: string;
  };
};

interface ProductComponentProps {
  product: Product;
}

////////////////
const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 -right-6 -translate-y-1/2 z-10 text-2xl   text-violet-600 p-2 rounded-full font-bold"
    style={{ display: "block" }}
  >
    &gt;
  </button>
);

const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 -left-6 -translate-y-1/2 z-10 text-2xl  text-violet-600 p-2 rounded-full font-bold"
    style={{ display: "block" }}
  >
    &lt;
  </button>
);
////////////////////////
const ProductPage = () => {
  const sliderRef = useRef<Slider>(null);
  const { productId } = useParams<{ productId: string }>();

  const cartItems = useSelector((state: RootState) => state.cart.items);

  // Ensure productId is not undefined before proceeding
  const safeProductId = productId || "";

  const {
    data: product,
    isLoading,
    error,
  } = useQuery<Product, Error>(
    ["product", productId],
    () =>
      fetchProductById(productId!).then((response) => response.data.product),
    {
      enabled: !!productId,
    }
  );

  if (isLoading)
    return (
      <div className="m-auto">
        <Loading />
      </div>
    );
  if (error) return <div>خطا: {error.message}</div>;
  if (!product) return <div>محصول یافت نشد</div>;

  ///////////////
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    rtl: true,
  };
  //////////////////////
  // Find the quantity of this product in the cart, using safeProductId
  const productInCart = cartItems[safeProductId] || 0;
  //////////////////
  return (
    <div className="flex flex-col items-center mx-10 gap-2">
      <div className="mt-5"></div>
      <div className="flex flex-col  my-6 lg:flex-row lg:gap-20 ">
        <div className="w-96 p-6 shadow ">
          <Slider className="" ref={sliderRef} {...sliderSettings}>
            {product.images.map((image, index) => (
              <img
                key={index}
                src={`http://localhost:8000/images/products/images/${image}`}
                alt={`Product ${index + 1}`}
              />
            ))}
            <img
              src={`http://localhost:8000/images/products/thumbnails/${product.thumbnail}`}
              alt={product.name}
            />
          </Slider>
        </div>
        <div className="text-violet-800">
          {`${product.category.name} / ${product.subcategory.name}`}
        </div>

        <div className="m-5 w-96 h-64 flex flex-col items-center shadow p-10">
          <div>
            <h2 className="w-80">{product.name}</h2>
            {/* /شرط موجودی/ */}
            {product.quantity > 0 && (
              <p className="text-left mt-2">
                {product.price} {"تومان"}
              </p>
            )}
            {/* Display the number of this item in the cart if it exists */}
            {productInCart > 0 && (
              <p className="text-violet-500">در سبد خرید: {productInCart}</p>
            )}
          </div>

          <div className="">
            <ProductComponent product={product} />
          </div>
        </div>
      </div>

      <div
        id=""
        className="w-full  shadow border border-violet-400  space-y-2  p-10 mb-5 text-gray-400"
      >
        <h2>توضیحات محصول</h2>
        <h2>{product.name}</h2>
        {/* <p> {product.quantity}</p> */}
        <p>برند: {product.brand}</p>

        <div
          className=""
          dangerouslySetInnerHTML={{ __html: product.description }}
        ></div>
      </div>
    </div>
  );
};

export default ProductPage;

///
const ProductComponent: React.FC<ProductComponentProps> = ({ product }) => {
  const [quantity, setQuantity] = React.useState<number>(1);
  const [hideInput, setHideInput] = React.useState<boolean>(false);
  const dispatch = useDispatch();

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const productInCart = cartItems[product._id] || 0;

  useEffect(() => {
    // Calculate the initial quantity and hideInput state when the component mounts
    const maxPossible = product.quantity - productInCart;
    if (maxPossible <= 0) {
      setHideInput(true);
      setQuantity(0);
    } else {
      setQuantity(Math.min(1, maxPossible)); 
    }
  }, [product.quantity, productInCart]); 

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => {
      const maxPossible = product.quantity - productInCart;
      if (prevQuantity < maxPossible) {
        return prevQuantity + 1;
      }
      return prevQuantity;
    });
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => {
      if (prevQuantity > 1) {
        return prevQuantity - 1;
      }
      return prevQuantity;
    });
  };

  const handleAddToCart = () => {
    dispatch(addItem({ productId: product._id, quantity }));
    const newProductInCart = productInCart + quantity;
    const remainingQuantity = product.quantity - newProductInCart;
    if (remainingQuantity === 0) {
      setHideInput(true);
      setQuantity(0);
    } else {
      setQuantity(Math.min(quantity, remainingQuantity));
    }
  };

  if (product.quantity === 0) {
    return <div className="text-gray-500 mt-2 "> اتمام موجودی</div>;
  } else {
    return (
      <div className="">
        {!hideInput ? (
          <div className="border border-violet-400 rounded-md w-20 flex justify-center">
            <button
              onClick={incrementQuantity}
              disabled={quantity >= product.quantity - productInCart}
              className="ml-4 text-violet-600 text-xl"
            >
              +
            </button>
            <input
              className="w-8 focus:outline-none text-center"
              type="number"
              value={quantity}
              readOnly
            />
            <button
              onClick={decrementQuantity}
              disabled={quantity === 1}
              className="text-violet-600 text-xl font-bold"
            >
              -
            </button>
          </div>
        ) : (
          <div className="text-purple-900 text-lg font-bold mt-2">شما حداکثر تعداد را انتخاب کردید</div> // Display "Maximum" when input group is hidden
        )}

        <button
          className={`w-80 text-white rounded-3xl focus:outline-none font-medium text-sm px-5 py-2.5 text-center mt-5  ${
            hideInput ? "bg-purple-200" : "bg-purple-500 hover:bg-purple-700"
          }`}
          onClick={handleAddToCart}
          disabled={hideInput} // Disable the button when the maximum is reached
        >
          افزودن به سبد خرید
        </button>
      </div>
    );
  }
};

/////
