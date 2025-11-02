import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetAllProducts } from "../../api/getAllProducts";
import { GetAllCategories } from "../../api/getAllCategories";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  thumbnail: string;
  quantity: number;
}

interface Category {
  _id: string;
  name: string;
  icon: string;
}

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await GetAllProducts(1);
        setProducts(productsData.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const loadCategories = async () => {
      try {
        const categoriesData = await GetAllCategories();
        setCategories(categoriesData.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    loadProducts();
    loadCategories();
  }, []);

  const shortenProductName = (name: string): string => {
    const words = name.split(" ");
    return words.length > 10 ? `${words.slice(0, 10).join(" ")}...` : name;
  };

  const renderCategoryProducts = (categoryId: string): JSX.Element => {
    const categoryProducts = products.filter(
      (product: Product) => product.category === categoryId
    );

    if (categoryProducts.length === 0)
      return <p className="text-center">محصولی وجود ندارد</p>;

    return (
      <div className="relative">
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={30}
          slidesPerView={1.5}
          breakpoints={{
            640: { slidesPerView: 2.5 },
            1024: { slidesPerView: 4 },
          }}
          className="custom-swiper"
        >
          {categoryProducts.map((product: Product) => (
            <SwiperSlide key={product._id}>
              <div className="flex justify-center">
                <Link to={`/products/${product._id}`}>
                  <div className="flex flex-col justify-start w-[277px] h-full border border-border p-[25px] shadow-lg rounded-2xl">
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
                          <span className="text-accent text-[25px]">
                            {product.price}
                          </span>
                          <span className="text-text text-[18px]"> تومان </span>
                        </span>
                      )}
                    </p>
                  </div>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <style>
          {`
          .custom-swiper .swiper-button-prev,
          .custom-swiper .swiper-button-next {
            color: #E51F8E; 
            transition: color 0.3s ease;
          }
          .custom-swiper .swiper-button-prev:hover,
          .custom-swiper .swiper-button-next:hover {
            color: #C839EC; 
          }
        `}
        </style>
      </div>
    );
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[1200px] px-5 md:px-0 m-auto">
        <div className="relative mt-5 w-full flex justify-center">
          <img
            src="/banner.svg"
            alt="Banner"
            className="hidden md:block w-full max-w-[1200px]"
          />
          <img
            src="/bannerMob.svg"
            alt="Banner Mobile"
            className="block md:hidden w-full"
          />

          <Link
            to="/categorization/68f8d7d24e47e7be5dba06f8?page=1"
            className="absolute hidden md:block"
            style={{
              bottom: "9%",
              left: "11%",
              width: "18%",
              height: "12%",
            }}
          >
            <div className="w-full h-full cursor-pointer"></div>
          </Link>

          <Link
            to="/categorization/68f8d7d24e47e7be5dba06f8?page=1"
            className="absolute md:hidden"
            style={{
              bottom: "30%",
              left: "4.6%",
              width: "56%",
              height: "16.6%",
            }}
          >
            <div className="w-full h-full cursor-pointer"></div>
          </Link>
        </div>

        {categories.map((category: Category, index) => (
          <div key={category._id}>
            <div
              className={`my-8 ${
                index === categories.length - 1 ? "mb-32" : ""
              }`}
            >
              <Link to={`/categorization/${category._id}`}>
                <p className="text-text text-xl font-semibold text-center">
                  {category.name}
                </p>
              </Link>
              <div className="w-full mt-8">
                <div>{renderCategoryProducts(category._id)}</div>
              </div>
              <div className="mt-9 flex justify-end">
                <Link
                  className="text-accent text-xl "
                  to={`/categorization/${category._id}`}
                >
                  دیدن همه محصولات {category.name}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
