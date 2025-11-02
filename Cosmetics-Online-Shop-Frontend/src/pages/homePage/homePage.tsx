import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetAllProducts } from "../../api/getAllProducts";
import { GetAllCategories } from "../../api/getAllCategories";
import MainSlider from "../../components/homePage/mainSlider";

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

  const renderCategoryProducts = (categoryId: string): JSX.Element[] => {
    const categoryProducts = products
      .filter((product: Product) => product.category === categoryId)
      .slice(0, 6);

    return categoryProducts.map((product: Product) => (
      <div className="flex " key={product._id}>
        <Link to={`/products/${product._id}`}>
          <div className="product-item shadow shadow-violet-400 rounded-lg w-56 h-72 m-2 flex  justify-center items-center">
            <div className="">
              <img
                className="w-40 h-40 m-auto"
                src={`http://localhost:8000/images/products/thumbnails/${product.thumbnail}`}
                alt={product.name}
              />
              <div className="w-48">
                <h3>{shortenProductName(product.name)}</h3>
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
      </div>
    ));
  };

  return (
    <div className="w-full">
      <div className="mt-5">
        <MainSlider />
      </div>
      {categories.map((category: Category) => (
        <div key={category._id}>
          <div className="mb-10 mt-2">
            <Link
              className="text-violet-950 text-xl font-bold "
              to={`/categorization/${category._id}`}
            >
              <div className="flex items-center mr-5 mb-2">
                <img
                  src={`http://localhost:8000/images/categories/icons/${category.icon}`}
                  alt={category.name}
                  className="w-10 h-10 object-cover rounded-full"
                />
                {category.name}
              </div>
            </Link>
            <div className="w-full ">
              <div className="products-grid mr-12 ml-12 items-center justify-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6  gap-4">
                {renderCategoryProducts(category._id)}
              </div>
            </div>
            <div className="mt-5 flex justify-end ml-12 text-lg">
              <Link
                className="text-violet-900"
                to={`/categorization/${category._id}`}
              >
                دیدن همه محصولات {category.name}
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePage;

//////////////////
// import CategoriesWithSubcategories from "./CategoriesWithSubcategories";
// import Categories from "./categories";
// import SubCategories from "./subcategories";

// export default function HomePage() {

//   return (
//     <div>
//       {/* <Categories/>
//       <SubCategories/> */}
//       <CategoriesWithSubcategories/>

//       <h1 className="text-3xl font-bold underline">HomePage</h1>

//     </div>
//   );
// }

//////

// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { GetAllProducts } from "../../api/getAllProducts";
// import { GetAllCategories } from "../../api/getAllCategories";
// import { Product } from "../admin/adminPanelProducts";
// import { Category } from "./categories";

// const HomePage = () => {
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     // بارگیری همه محصولات
//     const loadProducts = async () => {
//       try {
//         const productsData = await GetAllProducts(1); // صفحه 1
//         setProducts(productsData.data.products);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     // بارگیری همه دسته‌بندی‌ها
//     const loadCategories = async () => {
//       try {
//         const categoriesData = await GetAllCategories();
//         setCategories(categoriesData.categories);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };

//     loadProducts();
//     loadCategories();
//   }, []);

//   const renderCategoryProducts = (categoryId: string) => {
//     const categoryProducts = products
//       .filter((product: Product) => product.category === categoryId)
//       .slice(0, 6);

//     return categoryProducts.map((product: Product) => (
//       <div className="flex">
//         <div key={product._id} className="product-item ">
//           <img
//             className="w-20 h-20"
//             src={`http://localhost:8000/images/products/thumbnails/${product.thumbnail}`}
//             alt={product.name}
//           />
//           <h3>{product.name}</h3>
//           <p>Price: {product.price}</p>

//           <Link to={`/products/${product._id}`}>View Product</Link>
//         </div>
//       </div>
//     ));
//   };

//   return (
//     <div>
//       {categories.map((category: Category) => (
//         <div key={category._id}>
//           <h2>{category.name}</h2>
//           <div className="products-grid flex">
//             {renderCategoryProducts(category._id)}
//           </div>

//           <Link to={`/categorization/${category._id}`}>
//             See more from {category.name}
//           </Link>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default HomePage;

////////////////////////
//////////////////
////sub
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

// import { fetchProducts } from '../../api/fetchProducts';
// import { GetAllSubcategories } from '../../api/getAllSubcategories';
// import { Product } from '../admin/adminPanelProducts';
// import { Subcategory } from './subcategories';

// const HomePage = () => {
//   const [products, setProducts] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const productsData = await fetchProducts(1);
//         const subcategoriesData = await GetAllSubcategories();
//         setProducts(productsData.data.products);
//         setSubcategories(subcategoriesData.subcategories);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const renderSubcategoryProducts = (subcategoryId: any) => {

//     const filteredProducts = products.filter((product : Product)  => product.subcategory === subcategoryId).slice(0, 6);

//     return filteredProducts.map((product : Product) => (
//       <div key={product._id} className="product-item">
//         <img src={`http://localhost:8000/images/products/${product.thumbnail}`} alt={product.name} />
//         <h3>{product.name}</h3>
//         <p>Price: {product.price}</p>

//         <Link to={`/products/${product._id}`}>View Product</Link>
//       </div>
//     ));
//   };

//   return (
//     <div>
//       {subcategories.map((subcategory : Subcategory) => (
//         <div key={subcategory._id}>
//           <h2>{subcategory.name}</h2>
//           <div className="products-grid">{renderSubcategoryProducts(subcategory._id)}</div>

//           <Link to={`/categorization/${subcategory._id}`}>See more from {subcategory.name}</Link>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default HomePage;
///////////

////////////////////////////
/////////////ok
