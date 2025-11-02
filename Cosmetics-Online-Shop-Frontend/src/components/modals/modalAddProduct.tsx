import React, { useState, useEffect } from "react";
import { sendProductData } from "../../api/sendProductData";
import { GetCategories } from "../../api/getSubcategoryOfCategory";
import { GetSubcategoryOfCategory } from "../../api/getSubcategoryOfCategory";
import { ModalAddProductProps, ProductForm } from "../../api/interfaces";
import { useQueryClient } from "react-query";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const ModalAddProduct: React.FC<ModalAddProductProps> = ({
  isOpen,
  onClose,
}) => {
  const [product, setProduct] = useState<ProductForm>({
    category: "",
    subcategory: "",
    name: "",
    price: 0,
    quantity: 0,
    brand: "",
    description: "",
    thumbnail: null,
    images: [],
  });

  const [categories, setCategories] = useState<
    Array<{ _id: string; name: string }>
  >([]);
  const [subcategories, setSubcategories] = useState<
    Array<{ _id: string; name: string }>
  >([]);
  const [isSubcategoryDisabled, setIsSubcategoryDisabled] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await GetCategories();
      setCategories(result);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSubcategories = async () => {
      if (product.category) {
        const result = await GetSubcategoryOfCategory(product.category);
        setSubcategories(result);
        setIsSubcategoryDisabled(false);
      } else {
        setSubcategories([]);
        setIsSubcategoryDisabled(true);
      }
    };

    fetchSubcategories();
  }, [product.category]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (e.target.type === "file") {
      const files = (e.target as HTMLInputElement).files;
      if (files) {
        name === "thumbnail"
          ? setProduct({ ...product, thumbnail: files[0] })
          : setProduct({ ...product, images: Array.from(files) });
      }
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendProductData(product);
      queryClient.invalidateQueries("products");
      onClose();
    } catch (error) {
      console.error("Error while saving product:", error);
    }
  };

  if (!isOpen) return null;
  /////////////////////
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ color: [] }, { background: [] }],
    ],
  };

  ///////////////////

  //////////////////
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center  ">
      <div className="bg-white p-5 rounded-lg relative w-[570px]">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-0 left-4 mt-4 mr-4 text-gray-700 hover:text-gray-900 transition ease-in-out duration-150"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-xl mb-4">افزودن محصول جدید</h2>
        <form onSubmit={handleSubmit}>
          {/* Input fields for product information */}
          <div className="mb-1">
            <label htmlFor="name" className="block mb-2">
              نام محصول
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="border  p-2 w-full"
              required
            />
          </div>
          <div className="mb-1">
            <label htmlFor="price" className="block mb-2">
              قیمت
            </label>
            <input
              // type="number"
              id="price"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
          </div>
          <div className="mb-1">
            <label htmlFor="description" className="block mb-2">
              توضیحات
            </label>
            <ReactQuill
              // className="overflow-y-auto max-h-32"
              modules={modules}
              value={product.description}
              onChange={(content) => {
                setProduct({ ...product, description: content });
              }}
            />
          </div>

          <div className="flex justify-between gap-3">
            <div className="mb-1 w-full">
              <label htmlFor="category" className="block mb-2">
                گروه
              </label>
              <select
                id="category"
                name="category"
                value={product.category}
                onChange={handleChange}
                className="border p-2 w-full"
                required
              >
                <option value="">انتخاب کنید</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-1 w-full">
              <label htmlFor="subcategory" className="block mb-2">
                زیر گروه
              </label>
              <select
                id="subcategory"
                name="subcategory"
                value={product.subcategory}
                onChange={handleChange}
                className="border p-2 w-full"
                required
                disabled={isSubcategoryDisabled}
              >
                <option value="">انتخاب کنید</option>
                {subcategories.map((subcategory) => (
                  <option key={subcategory._id} value={subcategory._id}>
                    {subcategory.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className=" flex justify-between gap-3">
            <div className="mb-1 w-full">
              <label htmlFor="quantity" className="block mb-2">
                موجودی
              </label>
              <input
                // type="number"
                id="quantity"
                name="quantity"
                value={product.quantity}
                onChange={handleChange}
                className="border p-2 w-full"
                required
              />
            </div>
            <div className="mb-1 w-full">
              <label htmlFor="brand" className="block mb-2">
                برند
              </label>
              <input
                type="text"
                id="brand"
                name="brand"
                value={product.brand}
                onChange={handleChange}
                className="border p-2 w-full"
                required
              />
            </div>
          </div>

          <div className="flex gap-3">
            {/* Input field for thumbnail */}
            <div className="mb-1 w-full ">
              <label htmlFor="thumbnail" className="block mb-2 ">
                تصویر کوچک
              </label>
              <input
                type="file"
                id="thumbnail"
                name="thumbnail"
                onChange={handleChange}
                className="border p-2 w-full"
              />
            </div>
            {/* Input field for images */}
            <div className="mb-1 w-full">
              <label htmlFor="images" className="block mb-2">
                تصاویر
              </label>
              <input
                type="file"
                id="images"
                name="images"
                multiple
                onChange={handleChange}
                className="border p-2 w-full"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-violet-800 hover:bg-violet-900 text-white font-bold py-2 px-4 rounded"
            >
              ذخیره
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalAddProduct;

/////////////////////
/////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////

// import React, { useState, useEffect } from "react";
// import { sendProductData } from "../../api/sendProductData";
// import { GetCategories } from "../../api/getSubcategoryOfCategory";
// import { GetSubcategoryOfCategory } from "../../api/getSubcategoryOfCategory";
// import { ModalAddProductProps, ProductForm } from "../../api/interfaces";
// import { useQueryClient } from "react-query";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import Joi from "joi";

// export const ModalAddProduct: React.FC<ModalAddProductProps> = ({
//   isOpen,
//   onClose,
// }) => {
//   const [product, setProduct] = useState<ProductForm>({
//     category: "",
//     subcategory: "",
//     name: "",
//     price: 0,
//     quantity: 0,
//     brand: "",
//     description: "",
//     thumbnail: null,
//     images: [],
//   });

//   /////////////
//   const productSchema = Joi.object({
//     name: Joi.string().required().messages({
//       "string.empty": `نام محصول نمی‌تواند خالی باشد.`,
//       "any.required": `نام محصول الزامی است.`,
//     }),
//     price: Joi.number().positive().required().messages({
//       "number.base": `قیمت باید یک عدد باشد.`,
//       "number.positive": `قیمت باید بیشتر از صفر باشد.`,
//       "any.required": `قیمت الزامی است.`,
//     }),
//     description: Joi.string().allow("").optional(),
//     category: Joi.string().required().messages({
//       "string.empty": `انتخاب گروه الزامی است.`,
//       "any.required": `گروه الزامی است.`,
//     }),
//     subcategory: Joi.string().required().messages({
//       "string.empty": `انتخاب زیرگروه الزامی است.`,
//       "any.required": `زیرگروه الزامی است.`,
//     }),
//     quantity: Joi.number().integer().min(0).required().messages({
//       "number.base": `موجودی باید یک عدد باشد.`,
//       "number.min": `موجودی نمی‌تواند کمتر از صفر باشد.`,
//       "any.required": `موجودی الزامی است.`,
//     }),
//     brand: Joi.string().required().messages({
//       "string.empty": `برند محصول نمی‌تواند خالی باشد.`,
//       "any.required": `برند محصول الزامی است.`,
//     }),
//   });
//   ///////////
//   const [categories, setCategories] = useState<
//     Array<{ _id: string; name: string }>
//   >([]);
//   const [subcategories, setSubcategories] = useState<
//     Array<{ _id: string; name: string }>
//   >([]);
//   const [isSubcategoryDisabled, setIsSubcategoryDisabled] = useState(true);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       const result = await GetCategories();
//       setCategories(result);
//     };

//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     const fetchSubcategories = async () => {
//       if (product.category) {
//         const result = await GetSubcategoryOfCategory(product.category);
//         setSubcategories(result);
//         setIsSubcategoryDisabled(false);
//       } else {
//         setSubcategories([]);
//         setIsSubcategoryDisabled(true);
//       }
//     };

//     fetchSubcategories();
//   }, [product.category]);

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     const { name, value } = e.target;
//     if (e.target.type === "file") {
//       const files = (e.target as HTMLInputElement).files;
//       if (files) {
//         name === "thumbnail"
//           ? setProduct({ ...product, thumbnail: files[0] })
//           : setProduct({ ...product, images: Array.from(files) });
//       }
//     } else {
//       setProduct({ ...product, [name]: value });
//     }
//   };

//   const queryClient = useQueryClient();

//   const [errors, setErrors] = useState<{ [key: string]: string }>({});

//   ////
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const { error} = productSchema.validate(product, {
//       abortEarly: false,
//     });
//     if (error) {
//       const validationErrors = error.details.reduce((acc, currentError) => {
//         acc[currentError.context?.key || ""] = currentError.message;
//         return acc;
//       }, {} as { [key: string]: string });

//       setErrors(validationErrors);
//     } else {
//       setErrors({});

//       try {
//         // ادامه فرایند ذخیره سازی یا ارسال اطلاعات
//         await sendProductData(product);
//         // پس از ارسال موفق اطلاعات، بستن مدال
//         onClose();
//         // بروزرسانی کردن کوئری
//         queryClient.invalidateQueries("products");
//       } catch (error) {
//         console.error("خطا در ارسال اطلاعات محصول:", error);
//         // در صورت بروز خطا، می‌توانید اقدامات متناسب را انجام دهید
//       }
//     }
//   };
//   if (!isOpen) return null;
//   ///

//   // const handleSubmit = async (e: React.FormEvent) => {
//   //   e.preventDefault();

//   //   const { error } = productSchema.validate(product, { abortEarly: false });
//   //   if (error) {
//   //     const validationErrors = error.details.reduce((acc, currentError) => {
//   //       acc[currentError.path[0]] = currentError.message;
//   //       return acc;
//   //     }, {} as { [key: string]: string });

//   //     setErrors(validationErrors);
//   //     return;
//   //   }

//   //   // پاک کردن خطاهای قبلی پیش از ارسال فرم
//   //   setErrors({});

//   //   try {
//   //     await sendProductData(product);
//   //     queryClient.invalidateQueries("products");
//   //     onClose();
//   //   } catch (serverError) {
//   //     console.error("Error while saving product:", serverError);
//   //   }
//   // };

//   // if (!isOpen) return null;
//   //////////
//   const modules = {
//     toolbar: [
//       [{ header: [1, 2, false] }],
//       ["bold", "italic", "underline", "strike", "blockquote"],
//       [{ list: "ordered" }, { list: "bullet" }],
//       ["link", "image"],
//       ["clean"],
//     ],
//   };
//   ////////////////

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ">
//       <div className="bg-white p-5 rounded-lg relative">
//         <button
//           type="button"
//           onClick={onClose}
//           className="absolute top-0 left-4 mt-4 mr-4 text-gray-700 hover:text-gray-900 transition ease-in-out duration-150"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth="1.5"
//             stroke="currentColor"
//             className="w-6 h-6"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M6 18L18 6M6 6l12 12"
//             />
//           </svg>
//         </button>
//         <h2 className="text-xl mb-4">افزودن محصول جدید</h2>
//         <form onSubmit={handleSubmit}>
//           {/* Input fields for product information */}
//           <div className="mb-1">
//             <label htmlFor="name" className="block mb-2">
//               نام محصول
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={product.name}
//               onChange={handleChange}
//               className={`border p-2 w-full ${
//                 errors.name ? "border-red-500" : ""
//               }`}
//               required
//             />
//             {errors.name && (
//               <p className="text-red-500 text-xs mt-1">
//                 {(errors as { [key: string]: string }).name}
//               </p>
//             )}
//           </div>

//           <div className="mb-1">
//             <label htmlFor="price" className="block mb-2">
//               قیمت
//             </label>
//             <input
//               type="number"
//               id="price"
//               name="price"
//               value={product.price}
//               onChange={handleChange}
//               className="border p-2 w-full"
//               required
//             />
//           </div>
//           <div className="mb-1">
//             <label htmlFor="description" className="block mb-2">
//               توضیحات
//             </label>
//             <ReactQuill
//               modules={modules}
//               value={product.description}
//               onChange={(content) => {
//                 setProduct({ ...product, description: content });
//               }}
//             />
//           </div>

//           <div className="mb-1">
//             <label htmlFor="category" className="block mb-2">
//               گروه
//             </label>
//             <select
//               id="category"
//               name="category"
//               value={product.category}
//               onChange={handleChange}
//               className="border p-2 w-full"
//               required
//             >
//               <option value="">انتخاب کنید</option>
//               {categories.map((category) => (
//                 <option key={category._id} value={category._id}>
//                   {category.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="mb-1">
//             <label htmlFor="subcategory" className="block mb-2">
//               زیر گروه
//             </label>
//             <select
//               id="subcategory"
//               name="subcategory"
//               value={product.subcategory}
//               onChange={handleChange}
//               className="border p-2 w-full"
//               required
//               disabled={isSubcategoryDisabled}
//             >
//               <option value="">انتخاب کنید</option>
//               {subcategories.map((subcategory) => (
//                 <option key={subcategory._id} value={subcategory._id}>
//                   {subcategory.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className=" flex justify-between">
//             <div className="mb-1">
//               <label htmlFor="quantity" className="block mb-2">
//                 موجودی
//               </label>
//               <input
//                 type="number"
//                 id="quantity"
//                 name="quantity"
//                 value={product.quantity}
//                 onChange={handleChange}
//                 className="border p-2 w-full"
//                 required
//               />
//             </div>
//             <div className="mb-1">
//               <label htmlFor="brand" className="block mb-2">
//                 برند
//               </label>
//               <input
//                 type="text"
//                 id="brand"
//                 name="brand"
//                 value={product.brand}
//                 onChange={handleChange}
//                 className="border p-2 w-full"
//                 required
//               />
//             </div>
//           </div>

//           <div className="flex ">
//             {/* Input field for thumbnail */}
//             <div className="mb-1">
//               <label htmlFor="thumbnail" className="block mb-2 ">
//                 تامبنیل
//               </label>
//               <input
//                 type="file"
//                 id="thumbnail"
//                 name="thumbnail"
//                 onChange={handleChange}
//                 className="border p-2 w-full"
//               />
//             </div>
//             {/* Input field for images */}
//             <div className="mb-1">
//               <label htmlFor="images" className="block mb-2">
//                 تصاویر
//               </label>
//               <input
//                 type="file"
//                 id="images"
//                 name="images"
//                 multiple
//                 onChange={handleChange}
//                 className="border p-2 w-full"
//               />
//             </div>
//           </div>

//           <div className="flex justify-center">
//             <button
//               type="submit"
//               className="bg-violet-800 hover:bg-violet-900 text-white font-bold py-2 px-4 rounded"
//             >
//               ذخیره
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ModalAddProduct;

//////////////////////
// ایجاد اسکیما برای ولیدیشن فرم محصول
// const productFormSchema = Joi.object({
//   name: Joi.string().required().messages({
//     "string.empty": "نام محصول نمی‌تواند خالی باشد.",
//     "any.required": "نام محصول الزامی است.",
//   }),
//   price: Joi.number().positive().required().messages({
//     "number.base": "قیمت باید یک عدد باشد.",
//     "number.positive": "قیمت باید بیشتر از صفر باشد.",
//     "any.required": "قیمت محصول الزامی است.",
//   }),
//   quantity: Joi.number().integer().min(0).required().messages({
//     "number.base": "موجودی باید یک عدد صحیح باشد.",
//     "number.min": "موجودی نمی‌تواند منفی باشد.",
//     "any.required": "موجودی محصول الزامی است.",
//   }),
//   brand: Joi.string().required().messages({
//     "string.empty": "برند محصول نمی‌تواند خالی باشد.",
//     "any.required": "برند محصول الزامی است.",
//   }),
//   description: Joi.string().allow("").optional(), // توضیحات اختیاری است و می‌تواند خالی باشد.
//   category: Joi.string().required().messages({
//     "string.empty": "انتخاب گروه الزامی است.",
//     "any.required": "گروه محصول الزامی است.",
//   }),
//   subcategory: Joi.string().required().messages({
//     "string.empty": "انتخاب زیرگروه الزامی است.",
//     "any.required": "زیرگروه محصول الزامی است.",
//   }),
//   thumbnail: Joi.any().optional(), // ولیدیشن فایل‌ها ممکن است بسته به نیاز شما متفاوت باشد.
//   images: Joi.array().items(Joi.any()).optional(), // ولیدیشن فایل‌ها ممکن است بسته به نیاز شما متفاوت باشد.
// }).options({ abortEarly: false }); // برای گرفتن همه خطاها به جای اولین خطا

// const { error } = productFormSchema.validate(product, { abortEarly: false });

// if (error) {
//   const errors = error.details.reduce((acc, currentError) => {
//     acc[currentError.path[0]] = currentError.message;
//     return acc;
//   }, {});
//   setFormErrors(errors);
// } else {
//   setFormErrors({}); // Clear errors if validation passes
// }
