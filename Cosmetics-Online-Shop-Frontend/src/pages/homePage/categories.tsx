// import { useQuery } from "react-query";
// import { GetAllCategories } from "../../api/getAllCategories";

// export type Category = {
//   _id: string;
//   name: string;
//   icon: string;
//   createdAt: string;
//   updatedAt: string;
//   slugname: string;
// };

// export default function Categories() {
//   const { data, error, isLoading } = useQuery("categories", () =>
//     GetAllCategories()
//   );

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error instanceof Error) {
//     return <div>An error occurred: {error.message}</div>;
//   }

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//       {data?.categories.map((category: Category) => (
//         <div
//           key={category._id}
//           className="flex flex-col items-center justify-center p-4 shadow-lg rounded-lg"
//         >
//           <img
//             src={`http://localhost:8000/images/categories/icons/${category.icon}`}
//             alt={category.name}
//             className="w-20 h-20 object-cover rounded-full"
//           />
//           <h3 className="mt-2 text-lg font-semibold">{category.name}</h3>
//         </div>
//       ))}
//     </div>
//   );
// }


