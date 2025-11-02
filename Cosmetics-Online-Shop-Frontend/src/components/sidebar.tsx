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
    <div
      className="
    hidden md:flex md:flex-col items-start flex-shrink-0 h-auto
    bg-layout-sidebar text-text 
    border-l border-border
    px-[30px] pt-[30px]
    w-[182px]
    text-[16px]
   
  "
    >
      {categoriesWithSubcategories?.map((category: Category) => (
        <div key={category._id} className="mb-[30px] w-full">
          <Link
            to={`/categorization/${category._id}`}
            className={`
              font-semibold
              text-accent
              hover:text-text-hover
              transition-colors duration-200
              ${
                location.pathname.includes(`/categorization/${category._id}`) &&
                !location.pathname.includes("/subcategorization/")
                  ? "text-accent"
                  : "text-accent"
              }
            `}
          >
            <div className="flex items-center">{category.name}</div>
          </Link>

          <ul className="mt-2 space-y-1">
            {category.subcategories?.map((subcategory: Subcategory) => {
              const isActive =
                location.pathname ===
                `/categorization/${category._id}/subcategorization/${subcategory._id}`;
              return (
                <li key={subcategory._id}>
                  <Link
                    to={`/categorization/${category._id}/subcategorization/${subcategory._id}`}
                    className={`
                      transition-colors duration-200
                      hover:text-text-hover
                      ${isActive ? "font-bold text-text-active" : "text-text"}
                    `}
                  >
                    {subcategory.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
