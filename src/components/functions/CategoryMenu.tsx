"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import CategoryMenu from "@/components/functions/CategoryMenu";
import { useCallback } from "react";

interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  oldPrice?: number;
  rating: number;
}

const categories = ["T-Shirts", "Shirts", "Jeans", "Shorts"];
const colors = ["#000000", "#FF0000", "#FFA500", "#800080", "#008000", "#0000FF", "#FFC0CB"];
const sizes = ["XS", "S", "Medium", "Large", "XL", "XXL"];
const dressStyles = ["Casual", "Formal", "Party"];

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [sort, setSort] = useState("popular");
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    category: [],
    price: [20, 200],
    colors: [],
    sizes: [],
    styles: []
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchProducts() {
      const query = new URLSearchParams({
        page: page.toString(),
        limit: "9",
        minPrice: filters.price[0].toString(),
        maxPrice: filters.price[1].toString(),
      });
      query.append("sort", sort);
      if (search) query.append("search", search);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products?${query}`);
      const data = await res.json();
      setProducts(data.products);
      setTotalPages(data.totalPages);
    }
    fetchProducts();
  }, [filters, page]);

  const toggleFilter = (type: string, value: string) => {
    setFilters((prev) => {
      const updated = prev[type as keyof typeof prev] as string[];
      const exists = updated.includes(value);
      return {
        ...prev,
        [type]: exists ? updated.filter((v) => v !== value) : [...updated, value],
      };
    });
  };

  return (
    <>
      <CategoryMenu onSelect={(category, sub) => {
        const selected = sub || category;
        setFilters((prev) => ({ ...prev, category: [selected] }));
        setPage(1);
      }} />
      <div className="flex gap-6 px-6 md:px-20 py-10">
        {/* Sidebar */}
        <aside className="w-64 space-y-6">
          <h2 className="text-lg font-semibold">Filters</h2>
          <div>
            <h3 className="font-medium mb-2">Category</h3>
            {categories.map((cat) => (
              <div key={cat} className="flex items-center gap-2">
                <Checkbox
                  checked={filters.category.includes(cat)}
                  onCheckedChange={() => toggleFilter("category", cat)}
                />
                <label>{cat}</label>
              </div>
            ))}
          </div>

          <div>
            <h3 className="font-medium mb-2">Price</h3>
            <Slider
              defaultValue={filters.price}
              min={20}
              max={200}
              step={10}
              onValueChange={(val) => setFilters((f) => ({ ...f, price: val }))}
            />
            <div className="flex justify-between text-sm pt-1">
              <span>${filters.price[0]}</span>
              <span>${filters.price[1]}</span>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Colors</h3>
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => toggleFilter("colors", color)}
                  className={`w-5 h-5 rounded-full border-2 ${filters.colors.includes(color) ? "border-yellow-500" : "border-gray-300"}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Size</h3>
            {sizes.map((size) => (
              <div key={size} className="flex items-center gap-2">
                <Checkbox
                  checked={filters.sizes.includes(size)}
                  onCheckedChange={() => toggleFilter("sizes", size)}
                />
                <label>{size}</label>
              </div>
            ))}
          </div>

          <div>
            <h3 className="font-medium mb-2">Dress Style</h3>
            {dressStyles.map((style) => (
              <div key={style} className="flex items-center gap-2">
                <Checkbox
                  checked={filters.styles.includes(style)}
                  onCheckedChange={() => toggleFilter("styles", style)}
                />
                <label>{style}</label>
              </div>
            ))}
          </div>

          <Button className="w-full rounded-full bg-yellow-500 hover:bg-yellow-600">Apply Filter</Button>
        </aside>

        {/* Product Grid */}
        <section className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Shop</h2>
            <div className="flex items-center gap-4">
              <Input
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-48"
              />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="text-sm border rounded px-2 py-1"
              >
                <option value="popular">Most Popular</option>
                <option value="newest">Newest</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
              </select>
              <Button variant="ghost" className="text-xs underline" onClick={() => {
                setFilters({ category: [], price: [20, 200], colors: [], sizes: [], styles: [] });
                setSearch("");
                setSort("popular");
              }}>
                Reset All
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[300px]">
            {products.length === 0 ? (
              <div className="col-span-full text-center text-muted-foreground py-10">
                No products found.
              </div>
            ) : (
              products.map((p) => (
                <div key={p.id} className="border p-4 rounded shadow-sm hover:shadow-md transition animate-pulse-on-load">
                  <Image src={p.image} alt={p.title} width={300} height={300} className="w-full h-[300px] object-contain" />
                  <h3 className="mt-4 font-medium">{p.title}</h3>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-semibold">${p.price}</span>
                    {p.oldPrice && (
                      <span className="line-through text-muted-foreground">${p.oldPrice}</span>
                    )}
                  </div>
                  <p className="text-xs text-yellow-500">⭐ {p.rating}</p>
                </div>
              ))
            )}
          </div>
                <p className="text-xs text-yellow-500">⭐ {p.rating}</p>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-10 gap-4">
            <Button disabled={page <= 1} onClick={() => setPage((p) => p - 1)} variant="outline">Previous</Button>
            <span className="text-sm font-medium">Page {page} of {totalPages}</span>
            <Button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)} variant="outline">Next</Button>
          </div>
        </section>
      </div>
    </>
  );
}
