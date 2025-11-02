import { Link } from "react-router-dom";
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

export default function Footer() {
  const categoriesQuery = useQuery("categories", GetAllCategories);
  const subcategoriesQuery = useQuery("subcategories", GetAllSubcategories);

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
    <footer className="bg-violet-950 text-white p-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex gap-24 m-auto">
          <div className="flex flex-col">
            <p>دسترسی سریع</p>
            {categoriesWithSubcategories?.map((category: Category) => (
              <div key={category._id} className="p-1">
                <Link
                  to={`/categorization/${category._id}`}
                  className={`text-sm `}
                >
                  <div className="flex items-center">{category.name}</div>
                </Link>
              </div>
            ))}
          </div>
          <div className="flex flex-col">
            <p> درباره لوندر</p>

            <div className="p-1 ">
              <Link to={``} className={`text-sm `}>
                <div className="flex items-center mb-1">درباره ما</div>
              </Link>
              <Link to={``} className={`text-sm `}>
                <div className="flex items-center">تماس با ما</div>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col m-auto mt-4 md:mt-0 ">
          <p>ارتباط با ما</p>
          <p>
            شماره تماس : 09121111111
          </p>
          {/* <a href=""  className="mr-4">
          
            <img src="../../public/instagram.png" alt="instagram" className="h-6 w-6" />
          </a>
          <a href=""  className="mr-4">
          
            <img src="/" alt="Twitter" className="h-6 w-6" />
          </a>
          */}
        </div>
      </div>
      <div className="text-center text-sm mt-4 ">
        کلیه حقوق این سایت متعلق به فروشگاه آنلاین لوندر می باشد.
      </div>
    </footer>
  );
}

// flex justify-around items-center border-2 h-20 w-full bg-violet-50 text-center fixed bottom-0
