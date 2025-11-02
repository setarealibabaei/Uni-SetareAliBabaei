import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { Product } from "../../../pages/admin/adminPanelProducts";
import ModalConfirmDelete from "../../modals/modalConfirmDelete";
import { deleteProduct } from "../../../api/deleteProduct";
import { ModalEditProduct } from "../../modals/modalEditProduct";
import { updateProduct } from "../../../api/updateProducts";
import { fetchProductById } from "../../../api/fetchProductsById";
import { Link } from "react-router-dom";

export default function ProductTable({
  _id,
  name,
  thumbnail,
  price,
  quantity,
  description,
  category,
  subcategory,
  images,
  brand,
}: Product) {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);

  const { data: productIdData } = useQuery([`ProductId`, _id], () =>
    fetchProductById(_id)
  );

  const handleDelete = async (productId: string) => {
    await deleteProduct(productId);
    queryClient.invalidateQueries(["products"]);
    setShowModal(false);
  };

  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  const handleEdit = (product: Product) => {
    setCurrentProduct(product);
    setShowEditModal(true);
  };

  
  const saveEditedProduct = async (formData: FormData) => {
    const productData = convertFormDataToProduct(formData);
    const productDatatesti = convertFormDataToProducttesti(formData);
    await updateProduct(productDatatesti._id, productData);
    queryClient.invalidateQueries(["products"]);
    setShowEditModal(false);
  };

  function convertFormDataToProduct(formData: FormData): Product {
    let product: any = {};

    formData.forEach((value:any, key:any) => {
      let fields :any = ["name","price","quantity","description","category","subcategory","brand"];
      fields.forEach((item:any) => {
       if(key==item){
        product[key] = value;
       }
      });
    });

    product.price = Number(product.price);

    return product as Product;
  }

  function convertFormDataToProducttesti(formData: FormData): Product {
    let product: any = {};

    formData.forEach((value, key) => {
      product[key] = value;
    });
    product.price = Number(product.price);
    return product as Product;
  }


  ////////////////////////////////////////////////////////////////////
  return (
    <>
      <tr key={_id}>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600">
          <img
            src={`http://localhost:8000/images/products/thumbnails/${thumbnail}`}
            alt={name}
            className="w-32 object-contain m-auto"
          />
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 text-center">
        <Link to={`/products/${_id}`}>{name}</Link>
         
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 text-center">
          <p className="font-IRANSans">
            {productIdData?.data?.product?.category?.name}/
            {productIdData?.data?.product?.subcategory?.name}
          </p>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 text-center">
          <button
            onClick={() =>
              handleEdit({
                _id,
                name,
                description,
                category,
                subcategory,
                price,
                quantity,
                brand,
                thumbnail,
                images,
              })
            }
            className="text-violet-600 hover:text-violet-900"
          >
            ویرایش
          </button>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 text-center">
          <button
            onClick={() => setShowModal(true)}
            className="text-violet-600 hover:text-violet-900"
          >
            حذف
          </button>
        </td>
      </tr>
      {showModal && (
        <ModalConfirmDelete
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={() => handleDelete(_id)}
        />
      )}
      {showEditModal && currentProduct && (
        <ModalEditProduct
          isOpen={showEditModal}
          product={currentProduct}
          onSave={saveEditedProduct}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </>
  );
}
//////////////////////////////////////////////////////////////////////////////////////////
// _id: ""
// images: [],
// category: productIdData?.data?.product?.category?.name,
// subcategory: productIdData?.data?.product?.subcategory?.name,

// const saveEditedProduct = async (productData: Product) => {
  //   await updateProduct(productData._id, productData);
  //   queryClient.invalidateQueries(["products"]);
  //   setShowEditModal(false);
  // };
  /////////////////////////////////////////////////////////////////
//  import { useState } from "react";
// import { useQuery, useQueryClient } from "react-query";
// // import { Product } from "../../../pages/admin/adminPanelProducts";
// import ModalConfirmDelete from "../../modals/modalConfirmDelete";
// import { deleteProduct } from "../../../api/deleteProduct";
// import { ModalEditProduct } from "../../modals/modalEditProduct";
// import { updateProduct } from "../../../api/updateProducts";
// import { fetchProductById } from "../../../api/fetchProductsById";

//  interface Productt {
//   // _id: string;
//   category: string;
//   subcategory: string;
//   name: string;
//   price: number;
//   quantity: number;
//   brand: string;
//   description: string;
//   thumbnail: string;
//   images: string[];
//   [key: string]: any;
// }

// export default function ProductTable({
//   _id,
//   name,
//   thumbnail,
//   price,
//   quantity,
//   description,
//   category,
//   subcategory,
//   images,
//   brand,
// }: Productt) {
//   const queryClient = useQueryClient();
//   const [showModal, setShowModal] = useState(false);

//   const { data: productIdData } = useQuery([`ProductId`, _id], () =>
//     fetchProductById(_id)
//   );

//   const handleDelete = async (productId: string) => {
//     await deleteProduct(productId);
//     queryClient.invalidateQueries(["products"]);
//     setShowModal(false);
//   };

//   const [showEditModal, setShowEditModal] = useState<boolean>(false);
//   const [currentProduct, setCurrentProduct] = useState<Productt | null>(null);

//   const handleEdit = (product: Productt) => {
//     setCurrentProduct(product);
//     setShowEditModal(true);
//   };

//   // const saveEditedProduct = async (productData: Product) => {
//   //   await updateProduct(productData._id, productData);
//   //   queryClient.invalidateQueries(["products"]);
//   //   setShowEditModal(false);
//   // };
//   /////////////////////////////////////////////////////////////////
//   const saveEditedProduct = async (formData: FormData) => {
//     // تبدیل FormData به JSON برای ارسال درخواست HTTP
//     const productData = convertFormDataToProduct(formData);
//     await updateProduct(productData._id, productData);
//     queryClient.invalidateQueries(["products"]);
//     setShowEditModal(false);
//   };
  
//   // تابع کمکی برای تبدیل FormData به شیء Product
//   function convertFormDataToProduct(formData: FormData): Productt {
//     let product: any = {};
  
//     formData.forEach((value, key) => {
//       // برای فیلدهایی که نیاز به تبدیل دارند، مانند تصاویر یا اعداد، اینجا باید لاجیک اضافه شود
//       product[key] = value;
//     });
  
//     // اطمینان حاصل کنید که همه مقادیر به نوع صحیح تبدیل شده‌اند
//     // به عنوان مثال، اگر قیمت باید یک عدد باشد:
//     product.price = Number(product.price);
  
//     return product as Productt;
//   }
// ////////////////////////////////////////////////////////////////////
//   return (
//     <>
//       <tr key={_id}>
//         <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600">
//           <img
//             src={`http://localhost:8000/images/products/thumbnails/${thumbnail}`}
//             alt={name}
//             className="w-32 object-contain m-auto"
//           />
//         </td>
//         <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 text-center">
//           {name}
//         </td>
//         <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 text-center">
//           <p className="font-IRANSans">
//             {productIdData?.data?.product?.category?.name}/
//             {productIdData?.data?.product?.subcategory?.name}
//           </p>
//         </td>
//         <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 text-center">
//           <button
//             onClick={() =>
//               handleEdit({
//                 _id,
//                 name,
//                 description,
//                 category,
//                 subcategory,
//                 price,
//                 quantity,
//                 brand,
//                 thumbnail,
//                 images,
//               })
//             }
//             className="text-violet-600 hover:text-violet-900"
//           >
//             ویرایش
//           </button>
//         </td>
//         <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 text-center">
//           <button
//             onClick={() => setShowModal(true)}
//             className="text-violet-600 hover:text-violet-900"
//           >
//             حذف
//           </button>
//         </td>
//       </tr>
//       {showModal && (
//         <ModalConfirmDelete
//           isOpen={showModal}
//           onClose={() => setShowModal(false)}
//           onConfirm={() => handleDelete(_id)}
//         />
//       )}
//       {showEditModal && currentProduct && (
//         <ModalEditProduct
//           isOpen={showEditModal}
//           product={currentProduct}
//           onSave={saveEditedProduct}
//           onClose={() => setShowEditModal(false)}
//         />
//       )}
//     </>
//   );
// } 
