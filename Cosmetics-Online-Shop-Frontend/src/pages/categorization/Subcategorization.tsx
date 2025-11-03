import { useEffect, useState } from "react";
import {  useParams, useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import queryString from "query-string";
import { GetAllProductsInSubcategory } from "../../api/getAllProductsInSubcategory";
import { GetsubcategoryById } from "../../api/getsubcategorybyid";
import { GetCategoryById } from "../../api/getCategoryById";
import { Product } from "../admin/adminPanelProducts";
import ProductItem from "../../components/products/productItem";
import Loading from "../../components/loding/loading";

const SubcategorizationPage = () => {
  const { subcategoryId, categoryId } = useParams<{
    subcategoryId: string | undefined;
    categoryId: string | undefined;
  }>();
  const location = useLocation();
  const navigate = useNavigate();

  const { page = "1" } = queryString.parse(location.search);
  const [currentPage, setCurrentPage] = useState(parseInt(page as string));
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!location.search) {
      navigate(`?page=1`, { replace: true });
    }
  }, [location.search, navigate]);

  useEffect(() => {
    if (subcategoryId) {
      GetAllProductsInSubcategory(currentPage, subcategoryId).then((res) => {
        setTotalPages(Math.ceil(res.total / res.per_page));
      });
    }
  }, [subcategoryId, currentPage]);

  const { data: categoryName } = useQuery(
    ["categoryName", categoryId],
    () => GetCategoryById(categoryId!).then((res) => res.data.category.name),
    { enabled: !!categoryId }
  );

  const { data: subcategoryName } = useQuery(
    ["subcategoryName", subcategoryId],
    () =>
      GetsubcategoryById(subcategoryId!).then(
        (res) => res.data.subcategory.name
      ),
    { enabled: !!subcategoryId }
  );

  const { data: products } = useQuery(
    ["allProductsInSubcategory", subcategoryId, currentPage],
    () =>
      GetAllProductsInSubcategory(currentPage, subcategoryId!).then(
        (res) => res.data.products
      ),
    { enabled: !!subcategoryId }
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    navigate(`?page=${page}`);
  };

  if (!categoryName || !subcategoryName || !products)
    return ( <div className="m-auto"><Loading /></div>);

  return (
    <div className="mt-5 mb-5 w-full flex flex-col">
      <div className="text-xl text-text font-bold mb-6 pr-5">{`خانه / ${categoryName} / ${subcategoryName}`}</div>
      <div className="grid grid-cols-1 m-auto sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((product: Product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>

      <div className="pagination flex justify-center items-center mt-6">
        {currentPage > 1 && (
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="page-item text-gray-600 font-bold"
            style={{ margin: "0 5px" }}
          >
            <img
              src="/arrow-down.svg"
              alt="قبلی"
              className="w-6 h-6 object-contain -rotate-90"
            />
          </button>
        )}
        {Array.from({ length: totalPages }, (_, index) => {
          if (
            index + 1 === currentPage ||
            index + 1 === currentPage - 1 ||
            index + 1 === currentPage - 2 ||
            index + 1 === currentPage + 1 ||
            index + 1 === currentPage + 2 ||
            index + 1 === 1 ||
            index + 1 === 2 ||
            index + 1 === totalPages ||
            index + 1 === totalPages - 1
          ) {
            return (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`page-item ${
                  currentPage === index + 1
                    ? "bg-accent text-white font-bold  px-4  w-11 h-11 rounded-2xl"
                    : "text-text"
                } `}
                style={{ margin: "0 5px" }}
              >
                {index + 1}
              </button>
            );
          }
          if (
            (index === 2 && currentPage > 4) ||
            (index === totalPages - 3 && currentPage < totalPages - 3)
          ) {
            return (
              <button
                key={index}
                disabled={true}
                className="page-item text-gray-600"
                style={{ margin: "0 5px" }}
              >
                {"..."}
              </button>
            );
          }
          return null;
        })}
        {currentPage < totalPages && (
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="page-item text-gray-600 font-bold"
            style={{ margin: "0 5px" }}
          >
            <img
              src="/arrow-down.svg"
              alt="بعدی"
              className="w-6 h-6 object-contain rotate-90"
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default SubcategorizationPage;
