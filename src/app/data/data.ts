// products.ts
import { Product } from '../../components/functions/types';

export const products: Product[] = [
  {
    id: '1',
    title: 'Gradient Graphic T-shirt',
    price: 145,
    image: '/images/product1.png',
    rating: 4.3,
    size: 'L',
    color: 'pink',
    dressStyle: 'Casual',
    vendor: 'Alpha Wear'
    
  },
  {
    id: '2',
    title: 'Checkered Shirt',
    price: 180,
    image: '/images/product2.png',
    rating: 4.5,
    size: 'M',
    color: 'red',
    dressStyle: 'Formal',
    vendor: 'Beta Brand'
  },
  {
    id: '3',
    title: 'Skinny Fit Jeans',
    price: 240,
    image: '/images/product3.png',
    rating: 4.0,
    size: 'XL',
    color: 'blue',
    dressStyle: 'Casual',
    vendor: 'Denim Co'
  },
  {
    id: '4',
    title: 'Vertical Striped Shirt',
    price: 232,
    image: '/images/product4.png',
    rating: 4.7,
    size: 'L',
    color: 'green',
    dressStyle: 'Party',
    vendor: 'Beta Brand'
  },
  {
    id: '5',
    title: 'Courage Graphic T-shirt',
    price: 145,
    image: '/images/product5.png',
    rating: 4.0,
    size: 'S',
    color: 'orange',
    dressStyle: 'Casual',
    vendor: 'Alpha Wear'
  }
];
