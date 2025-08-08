export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    userId: string;
}

export interface ProductFormData {
  name: string
  description: string
  price: number
}
