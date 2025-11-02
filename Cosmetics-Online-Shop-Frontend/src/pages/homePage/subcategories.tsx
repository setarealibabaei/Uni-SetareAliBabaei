// import { useQuery } from "react-query";
// import { GetAllSubcategories } from "../../api/getAllSubcategories";

// export type Subcategory = {
//   _id: string;
//   category: string;
//   name: string;
//   createdAt: string;
//   updatedAt: string;
//   slugname: string;
// };

// export default function SubCategories() {
//   const { data, error, isLoading } = useQuery("subcategories", () =>
//     GetAllSubcategories()
//   );

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error instanceof Error) {
//     return <div>An error occurred: {error.message}</div>;
//   }

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//       {data?.subcategories.map((subcategory: Subcategory) => (
//         <div
//           key={subcategory._id}
//           className="flex flex-col items-center justify-center p-4 shadow-lg rounded-lg"
//         >
          
//           <h3 className="mt-2 text-lg font-semibold">{subcategory.name}</h3>
//         </div>
//       ))}
//     </div>
//   );
// }
