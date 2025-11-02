export interface ProductForm {
    category: string;
    subcategory: string;
    name: string;
    price: number;
    quantity: number;
    brand: string;
    description: string;
    thumbnail: File | null;
    images: File[];
  }
  
export  interface ModalAddProductProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (product: ProductForm) => Promise<void>;
  }

  export type Category = {
  _id: string;
  name: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
  slugname: string;
};


// export type Subcategory = {
//   _id: string;
//   category: string;
//   name: string;
//   createdAt: string;
//   updatedAt: string;
//   slugname: string;
// };