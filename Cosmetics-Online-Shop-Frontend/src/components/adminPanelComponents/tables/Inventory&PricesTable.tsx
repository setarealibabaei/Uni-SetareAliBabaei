import { Product } from "../../../pages/admin/adminPanelProducts";

export default function PriceTable({
  _id,
  name,
  thumbnail,
  price,
  quantity,
}: Product) {
  return (
    <tr key={_id}>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 ">
        <img
          src={`http://localhost:8000/images/products/thumbnails/${thumbnail}`}
          alt={name}
          className="w-32  object-contain m-auto"
        />
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 text-center">
        {name}
      </td>

      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 text-center">
        {price}
        {"   تومان"}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 text-center">
        {quantity}
        {"   عدد"}
      </td>
    </tr>
  );
}

///////////////////////

// import  { useEffect, useState } from 'react';
// import { Product } from "../../../pages/admin/adminPanelProducts";

// export default function PriceTable({ _id, name, thumbnail, price, quantity }: Product) {
//   const [editProductId, setEditProductId] = useState(null);
 
//   const [editValues, setEditValues] = useState({ price: price.toString(), quantity: quantity.toString() });
//   // تابع برای برگرداندن فیلد به حالت اولیه
//   const cancelEdit = () => {
//     setEditProductId(null);
//     setEditValues({ price, quantity });
//   };

//   // تابع برای ذخیره تغییرات
//   const saveEdit = () => {
//     // ارسال اطلاعات به سرور با استفاده از AJAX
//     // ...
//     setEditProductId(null);
//   };

//   // Effect برای غیرفعال کردن دکمه ذخیره در صورتی که تغییری اعمال نشده است
//   useEffect(() => {
//     // تابع برای بررسی تغییرات و فعال یا غیرفعال کردن دکمه ذخیره
//   }, [editValues]);

//   return (
//     <tr key={_id}>
//       <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 ">
//         <img
//           src={`http://localhost:8000/images/products/thumbnails/${thumbnail}`}
//           alt={name}
//           className="w-32 object-contain m-auto"
//         />
//       </td>
//       <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 text-center">
//         {name}
//       </td>

//       <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 text-center">
//         {editProductId === _id ? (
//           <input
//             type="text"
//             value={editValues.price}
//             onChange={(e) => setEditValues({ ...editValues, price: e.target.value })}
//             onBlur={saveEdit}
//             onKeyDown={(e) => {
//               if (e.key === 'Escape') cancelEdit();
//             }}
//           />
//         ) : (
//           <>
//             {price} تومان
//           </>
//         )}
//       </td>
//       <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 text-center">
//         {editProductId === _id ? (
//           <input
//             type="text"
//             value={editValues.quantity}
//             onChange={(e) => setEditValues({ ...editValues, quantity: e.target.value })}
//             onBlur={saveEdit}
//             onKeyDown={(e) => {
//               if (e.key === 'Escape') cancelEdit();
//             }}
//           />
//         ) : (
//           <>
//             {quantity} عدد
//           </>
//         )}
//       </td>
//     </tr>
//   );
// }
/////////////////////
// import { useEffect, useState } from 'react';
// import { Product } from "../../../pages/admin/adminPanelProducts";

// export default function PriceTable({ _id, name, thumbnail, price, quantity }: Product) {
//   const [editProductId, setEditProductId] = useState(null);
//   const [editValues, setEditValues] = useState({ price: price.toString(), quantity: quantity.toString() });

//   // تابع برای برگرداندن فیلد به حالت اولیه
//   const cancelEdit = () => {
//     setEditProductId(null);
//     setEditValues({ price: price.toString(), quantity: quantity.toString() });
//   };

//   // تابع برای ذخیره تغییرات
//   const saveEdit = () => {
//     // ارسال اطلاعات به سرور با استفاده از AJAX
//     // ...
//     setEditProductId(null);
//   };

//   // Effect برای غیرفعال کردن دکمه ذخیره در صورتی که تغییری اعمال نشده است
//   useEffect(() => {
//     // تابع برای بررسی تغییرات و فعال یا غیرفعال کردن دکمه ذخیره
//   }, [editValues]);

//   return (
//     <tr key={_id}>
//       <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 ">
//         <img
//           src={`http://localhost:8000/images/products/thumbnails/${thumbnail}`}
//           alt={name}
//           className="w-32 object-contain m-auto"
//         />
//       </td>
//       <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 text-center">
//         {name}
//       </td>

//       <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 text-center">
//         {editProductId === _id ? (
//           <input
//             type="text"
//             value={editValues.price}
//             onChange={(e) => setEditValues({ ...editValues, price: e.target.value })}
//             onBlur={saveEdit}
//             onKeyDown={(e) => {
//               if (e.key === 'Escape') cancelEdit();
//             }}
//           />
//         ) : (
//           <>
//             {price} تومان
//           </>
//         )}
//       </td>
//       <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 text-center">
//         {editProductId === _id ? (
//           <input
//             type="text"
//             value={editValues.quantity}
//             onChange={(e) => setEditValues({ ...editValues, quantity: e.target.value })}
//             onBlur={saveEdit}
//             onKeyDown={(e) => {
//               if (e.key === 'Escape') cancelEdit();
//             }}
//           />
//         ) : (
//           <>
//             {quantity} عدد
//           </>
//         )}
//       </td>
//     </tr>
//   );
// }

