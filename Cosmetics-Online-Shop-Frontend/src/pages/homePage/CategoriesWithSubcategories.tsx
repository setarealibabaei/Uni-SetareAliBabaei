// import { useQuery } from 'react-query';
// import { GetAllCategories } from '../../api/getAllCategories';
// import { GetAllSubcategories } from '../../api/getAllSubcategories';



// type Category = {
//   _id: string;
//   name: string;
//   icon: string;
//   createdAt: string;
//   updatedAt: string;
//   slugname: string;
//   subcategories?: Subcategory[]; 
// };

// type Subcategory = {
//   _id: string;
//   category: string;
//   name: string;
//   createdAt: string;
//   updatedAt: string;
//   slugname: string;
// };

// export default function CategoriesWithSubcategories() {
//     const categoriesQuery = useQuery('categories', GetAllCategories);
//     const subcategoriesQuery = useQuery('subcategories', GetAllSubcategories);
  
//     if (categoriesQuery.isLoading || subcategoriesQuery.isLoading) {
//       return <div>Loading...</div>;
//     }
  
//     if (categoriesQuery.error instanceof Error) {
//       return <div>An error occurred: {categoriesQuery.error.message}</div>;
//     }
  
//     if (subcategoriesQuery.error instanceof Error) {
//       return <div>An error occurred: {subcategoriesQuery.error.message}</div>;
//     }
  
    
//     const categories = categoriesQuery.data?.categories;
  
//     const categoriesWithSubcategories = categories?.map((category: Category) => ({
//         ...category,
//         subcategories: subcategoriesQuery.data?.subcategories.filter((subcategory: Subcategory) => subcategory.category === category._id),
//       }));
//     return (
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {categoriesWithSubcategories?.map((category: Category) => (
//           <div key={category._id} className="flex flex-col items-center justify-center p-4 shadow-lg rounded-lg">
//             <img src={`http://localhost:8000/images/categories/icons/${category.icon}`} alt={category.name} className="w-20 h-20 object-cover rounded-full" />
//             <h3 className="mt-2 text-lg font-semibold">{category.name}</h3>
//             {category.subcategories?.map((subcategory: Subcategory) => (
//               <div key={subcategory._id} className="mt-2">
//                 <h4 className="text-sm">{subcategory.name}</h4>
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     );
//   }
  
