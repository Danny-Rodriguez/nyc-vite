// Define the shared Product interface
export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
  quantity?: number;
  rating?: {
    rate: number;
    count: number;
  };
}
