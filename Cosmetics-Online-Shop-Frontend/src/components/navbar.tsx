import { Link } from "react-router-dom";
import { GetAllCategories } from "../api/getAllCategories";
import { GetAllSubcategories } from "../api/getAllSubcategories";
import { useQuery } from "react-query";
import { useState } from "react";
import Loading from "./loding/loading";

type Category = {
  _id: string;
  name: string;
  subcategories?: Subcategory[];
};

type Subcategory = {
  _id: string;
  name: string;
  category: string;
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const categoriesQuery = useQuery("categories", GetAllCategories);
  const subcategoriesQuery = useQuery("subcategories", GetAllSubcategories);

  if (categoriesQuery.isLoading || subcategoriesQuery.isLoading) {
    return (
      <div className="m-auto">
        <Loading />
      </div>
    );
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
    <nav className="w-full min-h-[70px] border-b-2 border-border sm:border-none px-5 md:px-0 bg-layout-sidebar content-center z-50 sticky ">
      <div className="flex justify-between">
        {/* Hamburger Menu */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)}>
            <img src="/hamburger.svg" alt="Hamburger" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:hidden absolute top-[70px] left-0 w-full bg-layout-sidebar z-50 `}
      >
        {categoriesWithSubcategories?.map((category: Category) => (
          <div key={category._id} className="py-2">
            <Link
              to={`/categorization/${category._id}`}
              className="block py-2 px-5 text-accent font-semibold text-[16px] rounded-md hover:bg-accent/10 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              {category.name}
            </Link>

            {category.subcategories?.map((subcategory: Subcategory) => (
              <Link
                key={subcategory._id}
                to={`/categorization/${category._id}/subcategorization/${subcategory._id}`}
                className="block pl-8 py-2 px-5 text-text hover:bg-accent hover:text-white rounded-md transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                {subcategory.name}
              </Link>
            ))}
          </div>
        ))}
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:block content-center w-full h-[70px] border-b-2 border-border px-[30px] bg-layout-sidebar">
        {categoriesWithSubcategories?.map((category: Category) => (
          <div key={category._id} className="group inline-block ">
            <div className="relative group">
              <Link
                to={`/categorization/${category._id}`}
                className="first:pr-0 px-[22px] inline-flex items-center text-[16px] font-normal leading-[100%] text-text"
              >
                {category.name}
                <img src="/arrow-down.svg" alt="Arrow" className="ml-1" />
              </Link>

              {/* Dropdown */}
              <div className="absolute right-0 top-full mt-2 w-48 bg-white text-text rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                {category.subcategories?.map((subcategory: Subcategory) => (
                  <Link
                    key={subcategory._id}
                    to={`/categorization/${category._id}/subcategorization/${subcategory._id}`}
                    className="block py-2 px-4 hover:bg-text-hover hover:text-white rounded-md transition-colors duration-200"
                  >
                    {subcategory.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
