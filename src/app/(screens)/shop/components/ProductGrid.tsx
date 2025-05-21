/* ProductGrid.tsx */
import React, { useState } from 'react';
import { Product } from '@/components/functions/types';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Star } from 'lucide-react';

const sizes = ['S', 'M', 'L', 'XL'];

export const ProductGrid: React.FC<{
  products: (Product & { badge?: 'New' | 'Sale'; inventory?: number })[];
}> = ({ products }) => {
  const [selected, setSelected] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('M');

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.filter((p) => p.inventory !== 0).map((product) => (
          <Card
            key={product.id}
            className="relative p-4 transition-transform duration-200 ease-in-out hover:scale-[1.02] hover:shadow-lg cursor-pointer"
            onClick={() => setSelected(product)}
          >
            {product.badge && (
              <div
                className={`absolute top-3 left-3 text-white text-xs px-2 py-1 rounded shadow-md z-10 animate-pulse ${
                  product.badge === 'New' ? 'bg-green-500' : 'bg-red-500'
                }`}
              >
                {product.badge}
              </div>
            )}
            <Image
              src={product.image}
              alt={product.title}
              width={300}
              height={300}
              className="rounded-xl object-cover"
            />
            <CardContent className="pt-4">
              <div className="text-sm text-muted-foreground">{product.vendor}</div>
              <h3 className="text-lg font-semibold leading-tight truncate">
                {product.title}
              </h3>
              <div className="text-sm mt-1">
                Color: {product.color}, Size: {product.size}
              </div>
              <div className="text-base font-medium mt-2">${product.price}</div>
              <Button className="mt-3 w-full">Add to Cart</Button>
            </CardContent>
          </Card>
        ))}

        {products.filter((p) => p.inventory === 0).map((product) => (
          <Card
            key={product.id}
            className="relative p-4 opacity-70 hover:opacity-90 transition duration-200"
          >
            <div className="absolute top-3 left-3 bg-gray-700 text-white text-xs px-2 py-1 rounded shadow-md z-10 animate-pulse">
              Out of Stock
            </div>
            <Image
              src={product.image}
              alt={product.title}
              width={300}
              height={300}
              className="rounded-xl object-cover"
            />
            <CardContent className="pt-4">
              <div className="text-sm text-muted-foreground">{product.vendor}</div>
              <h3 className="text-lg font-semibold leading-tight truncate">
                {product.title}
              </h3>
              <div className="text-sm mt-1">
                Color: {product.color}, Size: {product.size}
              </div>
              <div className="text-base font-medium mt-2">${product.price}</div>
              <div className="mt-3">
                <Input type="email" placeholder="Email for restock" className="text-sm mb-2" />
                <Button className="w-full" variant="outline" disabled>
                  Notify Me
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selected && (
        <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selected.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <Image
                src={selected.image}
                alt={selected.title}
                width={400}
                height={400}
                className="rounded-lg mx-auto"
              />
              <div className="text-sm text-muted-foreground">Vendor: {selected.vendor}</div>
              <p className="text-base">Price: ${selected.price}</p>
              <div className="flex gap-1 text-yellow-500 items-center">
                {[...Array(Math.round(selected.rating || 4))].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-500" />
                ))}
                <span className="text-xs text-muted-foreground">({selected.rating})</span>
              </div>
              <div className="text-sm">Color: {selected.color}</div>
              <div className="text-sm flex flex-wrap gap-2">
                {sizes.map((s) => (
                  <Button
                    key={s}
                    size="sm"
                    variant={selectedSize === s ? 'default' : 'outline'}
                    onClick={() => setSelectedSize(s)}
                  >
                    {s}
                  </Button>
                ))}
              </div>
              <Button className="w-full">Add to Cart</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
