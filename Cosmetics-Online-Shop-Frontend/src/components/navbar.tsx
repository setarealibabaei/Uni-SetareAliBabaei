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
    <nav className="bg-violet-950 text-white  z-50 sticky ">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          {/* Hamburger Menu */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)}>
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
        {categoriesWithSubcategories?.map((category: Category) => (
          <div key={category._id} className="px-4 py-2 hover:bg-violet-900">
            <Link to={`/categorization/${category._id}`}>{category.name}</Link>
            {category.subcategories?.map((subcategory: Subcategory) => (
              <div key={subcategory._id} className="pl-4 hover:bg-violet-800">
                <Link
                  to={`/categorization/${category._id}/subcategorization/${subcategory._id}`}
                >
                  {subcategory.name}
                </Link>
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* Desktop Menu */}
      <div className="hidden md:block mr-14">
        {categoriesWithSubcategories?.map((category: Category) => (
          <div key={category._id} className="group inline-block ">
            <Link
              to={`/categorization/${category._id}`}
              className="py-4 px-6 inline-flex items-center hover:bg-violet-900"
            >
              {category.name}
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 9l-7 7-7-7"></path>
              </svg>
            </Link>
            <div className="absolute hidden group-hover:block bg-violet-900">
              {category.subcategories?.map((subcategory: Subcategory) => (
                <Link
                  key={subcategory._id}
                  to={`/categorization/${category._id}/subcategorization/${subcategory._id}`}
                  className="block py-2 px-4 hover:bg-violet-800"
                >
                  {subcategory.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
