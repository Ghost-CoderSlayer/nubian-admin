// types.ts
export type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
  rating: number;
  size: string;
  color: string;
  dressStyle: string;
  vendor: string;
};

export type FilterState = {
  priceRange: [number, number];
  colors: string[];
  sizes: string[];
  dressStyles: string[];
  vendors: string[]; // Multi-vendor support
};
