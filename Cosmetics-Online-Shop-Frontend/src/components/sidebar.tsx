
////////////////////////
import { Link, useLocation } from "react-router-dom";
import { GetAllCategories } from "../api/getAllCategories";
import { GetAllSubcategories } from "../api/getAllSubcategories";
import { useQuery } from "react-query";

type Category = {
  _id: string;
  name: string;
  icon: string;
  subcategories?: Subcategory[];
};

type Subcategory = {
  _id: string;
  name: string;
  category: string;
};

const Sidebar = () => {
  const categoriesQuery = useQuery("categories", GetAllCategories);
  const subcategoriesQuery = useQuery("subcategories", GetAllSubcategories);
  const location = useLocation();

  if (categoriesQuery.isLoading || subcategoriesQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (categoriesQuery.error instanceof Error) {
    return <div>An error occurred: {categoriesQuery.error.message}</div>;
  }

  if (subcategoriesQuery.error instanceof Error) {
    return <div>An error occurred: {subcategoriesQuery.error.message}</div>;
  }

  const categories = categoriesQuery.data?.categories;

  const categoriesWithSubcategories = categories?.map((category: Category) => ({
    ...category,
    subcategories: subcategoriesQuery.data?.subcategories.filter(
      (subcategory: Subcategory) => subcategory.category === category._id
    ),
  }));

  return (
    <div className="hidden md:visible  md:flex md:flex-col w-full  md:w-64 text-gray-700 bg-violet-50 items-center  flex-shrink-0">
      {categoriesWithSubcategories?.map((category: Category) => (
        
        <div key={category._id} className="p-4">
          <Link
            to={`/categorization/${category._id}`}
            className={`text-lg font-semibold ${
              location.pathname.includes(`/categorization/${category._id}`) &&
              !location.pathname.includes("/subcategorization/")
                ? "text-black"
                : "text-gray-600"
            }`}
          >
            <div className="flex items-center">
              {/* <img
                  src={`http://localhost:8000/images/categories/icons/${category.icon}`}
                  alt={category.name}
                  className="w-10 h-10 object-cover rounded-full"
                /> */}
              {category.name}
            </div>
          </Link>
          
          <ul className="mt-2">
            {category.subcategories?.map((subcategory: Subcategory) => (
              <li key={subcategory._id} className="mt-1">
                <Link
                  to={`/categorization/${category._id}/subcategorization/${subcategory._id}`}
                  className={`hover:text-gray-800 ${
                    location.pathname ===
                    `/categorization/${category._id}/subcategorization/${subcategory._id}`
                      ? "font-bold text-black"
                      : "text-gray-600"
                  }`}
                >
                  {subcategory.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
