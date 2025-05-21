export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  rating: number;
  discount?: number;
  category: string;
  size: string[];
  colors: string[];
}