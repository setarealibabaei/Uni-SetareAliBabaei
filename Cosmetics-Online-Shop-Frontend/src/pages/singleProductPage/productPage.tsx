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

const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 -right-5 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-[#E51F8E] hover:text-white transition-all duration-300"
  >
    <img
      src="/arrow-down.svg"
      alt="next"
      className="w-4 h-4 -rotate-90 object-contain"
    />
  </button>
);

const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 -left-5 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-[#E51F8E] hover:text-white transition-all duration-300"
  >
    <img
      src="/arrow-down.svg"
      alt="next"
      className="w-4 h-4 rotate-90 object-contain"
    />
  </button>
);

const ProductPage = () => {
  const sliderRef = useRef<Slider>(null);
  const { productId } = useParams<{ productId: string }>();


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

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[1200px] px-5 md:px-4 m-auto">
        <div className="flex flex-col mt-8 md:mt-20 items-center lg:items-start lg:flex-row gap-14 ">
          <div className="relative w-full max-w-[429px] h-auto aspect-square bg-white rounded-[16px] shadow-md p-10 flex items-center justify-center border border-border">
            <Slider
              ref={sliderRef}
              {...{
                dots: true,
                infinite: true,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1,
                rtl: true,
                nextArrow: <NextArrow />,
                prevArrow: <PrevArrow />,
                customPaging: () => (
                  <div className="w-[8px] h-[8px] bg-[#D9D9D9] rounded-full hover:bg-[#E51F8E] transition-all duration-300"></div>
                ),
              }}
              className="w-full h-full"
            >
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={`http://localhost:8000/images/products/images/${image}`}
                  alt={`Product ${index + 1}`}
                  className="w-full  object-cover border-border border rounded-[16px]"
                />
              ))}
              <img
                src={`http://localhost:8000/images/products/thumbnails/${product.thumbnail}`}
                alt={product.name}
                className="w-full  object-cover  border-border border rounded-[16px]"
              />
            </Slider>
          </div>

          <div className="flex flex-col w-full">
            <div className="text-xl text-text font-bold mb-8">
              {`${product.category.name} / ${product.subcategory.name}`}
            </div>

            <div className="flex flex-col justify-between flex-nowrap border border-border h-[220px] rounded-[16px] shadow-[0_0_10px_0_#00000040] p-[30px]">
              <div className="flex flex-row justify-between items-center">
                <span className="text-text text-lg">{product.name}</span>
                {product.quantity > 0 && (
                  <div>
                    <span className="text-accent text-[25px]">
                      {product.price}
                    </span>
                    <span className="text-text text-[18px]"> تومان </span>
                  </div>
                )}
              </div>

              <div>
                <ProductComponent product={product} />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-11 mb-14 border border-border  rounded-[16px] shadow-[0_0_10px_0_#00000040] p-[30px]">
          <h2 className="text-accent">توضیحات محصول</h2>
          <h2 className="text-text">{product.name}</h2>
          <p className="text-accent mt-2">
            برند: <span className="text-text">{product.brand}</span>
          </p>

          <div
            className="mt-2"
            dangerouslySetInnerHTML={{ __html: product.description }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

const ProductComponent: React.FC<ProductComponentProps> = ({ product }) => {
  const [quantity, setQuantity] = React.useState<number>(1);
  const [hideInput, setHideInput] = React.useState<boolean>(false);
  const dispatch = useDispatch();

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const productInCart = cartItems[product._id] || 0;

  useEffect(() => {
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
      <>
        <div className="flex flex-row justify-between items-center w-full ">
          {!hideInput ? (
            <div className="border-2 border-layout-sidebar rounded-2xl w-20 flex justify-center">
              <button
                onClick={incrementQuantity}
                disabled={quantity >= product.quantity - productInCart}
                className="ml-4 text-layout-sidebar text-xl"
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
                className="text-layout-sidebar text-xl font-bold"
              >
                -
              </button>
            </div>
          ) : (
            <div className="text-text text-lg font-bold mt-2">
              شما حداکثر تعداد را انتخاب کردید
            </div>
          )}
          <div className="flex flex-row justify-between items-center gap-2">
            {productInCart > 0 && (
              <p className="text-text">در سبد خرید: {productInCart}</p>
            )}
            <button
              className={` text-white rounded-2xl focus:outline-none font-medium text-sm px-5 py-2.5 text-center hidden md:block ${
                hideInput ? "bg-accent" : "bg-accent hover:bg-text-hover"
              }`}
              onClick={handleAddToCart}
              disabled={hideInput}
            >
              افزودن به سبد خرید
            </button>
          </div>
        </div>
        <button
          className={`w-full mt-5 text-white rounded-2xl focus:outline-none font-medium text-sm px-5 py-2.5 text-center block md:hidden ${
            hideInput ? "bg-accent" : "bg-accent hover:bg-text-hover"
          }`}
          onClick={handleAddToCart}
          disabled={hideInput}
        >
          افزودن به سبد خرید
        </button>
      </>
    );
  }
};
