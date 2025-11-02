import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { GetAllCategories } from "../api/getAllCategories";
import { GetAllSubcategories } from "../api/getAllSubcategories";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

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

  const [openSections, setOpenSections] = useState<{
    about: boolean;
    links: boolean;
  }>({
    about: false,
    links: false,
  });

  if (categoriesQuery.isLoading || subcategoriesQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (categoriesQuery.error instanceof Error) {
    return <div>An error occurred: {categoriesQuery.error.message}</div>;
  }

  if (subcategoriesQuery.error instanceof Error) {
    return <div>An error occurred: {subcategoriesQuery.error.message}</div>;
  }

  const categories = categoriesQuery.data?.categories ?? [];

  const toggleSection = (key: "about" | "links") =>
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <footer className="w-full  border-t border-border bg-layout-footer p-[20px] md:p-[30px] mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
        <div className="flex flex-col">
          <button
            onClick={() => toggleSection("about")}
            className="flex justify-between items-center md:block w-full text-right"
          >
            <p className="font-semibold text-accent text-lg">
              درباره ما و تماس با ما
            </p>
            <span className="md:hidden">
              {openSections.about ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </span>
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ${
              openSections.about ? "max-h-60" : "max-h-0 md:max-h-full"
            }`}
          >
            <p className="text-xs text-text mt-4 leading-relaxed text-justify">
              فروشگاه اینترنتی لوندر فعالیت خود را از ۲۴ تیر ۱۳۹۹ آغاز کرده و
              مجموعه ای کامل از محصولات مرغوب و درجه یک آرایشی و بهداشتی را با
              پایین ترین قیمت گرد هم آورده است ؛ تا کالاهای مورد نیاز بانوان و
              آقایان ایرانی را فراهم آورد. از ویژگی های فروشگاه شهرزاد مشاوره
              تخصصی متناسب با نیاز هر فرد و خریدی آسان می باشد .خرید آنلاین لذت
              بخش را با ما تجربه کنید .
            </p>
            <p className="mt-3 text-sm text-accent sm:float-left">
              شماره تماس:
              <span className="font-medium text-text"> 0912000111 </span>
            </p>
          </div>
        </div>

        <div className="flex flex-col">
          <button
            onClick={() => toggleSection("links")}
            className="flex justify-between items-center md:block w-full text-right"
          >
            <p className="font-semibold text-accent text-lg">
              لینک‌های کاربردی
            </p>
            <span className="md:hidden">
              {openSections.links ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </span>
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ${
              openSections.links ? "max-h-96" : "max-h-0 md:max-h-full"
            }`}
          >
            <div className="flex flex-col mt-4">
              {categories.map((category: Category) => (
                <Link
                  key={category._id}
                  to={`/categorization/${category._id}`}
                  className="text-sm text-text hover:text-text-hover py-1"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start text-center md:text-right">
          <div className="flex justify-center mb-6">
            <Link to="/">
              <img
                className="h-16 w-16 rounded-full "
                src="../../public/favicon.png"
                alt="لوندر"
              />
            </Link>
            <div className="flex flex-col justify-center mr-1 ">
              <h1 className="text-lg font-normal leading-[100%] text-right text-text-boldtext">
                <Link to="/">لوندر</Link>
              </h1>
              <p className="text-xs font-normal leading-[100%] text-right text-text mt-3">
                <Link to="/">فروشگاه آنلاین لوازم آرایشی</Link>
              </p>
            </div>
          </div>

          <div className="flex justify-center mb-5 gap-9">
            <img
              className="h-11 w-11"
              src="../../public/enamad.svg"
              alt="اینماد"
            />
            <div className="flex flex-col justify-center">
              <p className="text-xs font-normal leading-[100%] text-right text-text">
                کلیه حقوق این سایت متعلق به فروشگاه آنلاین لوندر می باشد.
              </p>
            </div>
          </div>

          <div className="flex gap-2 justify-end  w-auto self-end">
            <a href="#" aria-label="Instagram">
              <img src="/Instagram.svg" className="w-6 h-6" />
            </a>
            <a href="#" aria-label="Telegram">
              <img src="/Telegram.svg" className="w-6 h-6" />
            </a>
            <a href="#" aria-label="WhatsApp">
              <img src="/WhatsApp.svg" className="w-6 h-6" />
            </a>
            <a href="#" aria-label="Linkedin">
              <img src="/Linkedin.svg" className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
