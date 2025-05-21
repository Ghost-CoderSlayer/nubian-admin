/* ShopPage.tsx */
'use client';

import React, { useState, useMemo, useEffect } from 'react';
// import Link from 'next/link';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import { ProductGrid } from './components/ProductGrid';
import { FilterSidebar } from '../../../components/functions/filterSidebar';
import { Footer } from './footnew';
import { products } from '../../data/data';
import { FilterState } from '../../../components/functions/types';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

export default function ShopPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();

  const [filters, setFilters] = useState<FilterState>({
    colors: searchParams.getAll('color'),
    sizes: searchParams.getAll('size'),
    priceRange: [
      Number(searchParams.get('min') || 20),
      Number(searchParams.get('max') || 200),
    ],
    dressStyles: searchParams.getAll('style'),
    vendors: searchParams.getAll('vendor'),
  });

  const [sortOption, setSortOption] = useState<string>('default');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showDiscountedOnly, setShowDiscountedOnly] = useState(false);
  const [showNewOnly, setShowNewOnly] = useState(false);
  const itemsPerPage = 12;

  const resetFilters = () => {
    setFilters({
      colors: [],
      sizes: [],
      priceRange: [20, 200],
      dressStyles: [],
      vendors: [],
    });
    setShowDiscountedOnly(false);
    setShowNewOnly(false);
    setCurrentPage(1);
  };

  useEffect(() => {
    const params = new URLSearchParams();
    filters.colors.forEach((v) => params.append('color', v));
    filters.sizes.forEach((v) => params.append('size', v));
    filters.dressStyles.forEach((v) => params.append('style', v));
    filters.vendors.forEach((v) => params.append('vendor', v));
    params.set('min', filters.priceRange[0].toString());
    params.set('max', filters.priceRange[1].toString());
    router.push(`?${params.toString()}`);
  }, [filters, router]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const inPriceRange =
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1];
      const matchesColor =
        filters.colors.length === 0 || filters.colors.includes(product.color);
      const matchesSize =
        filters.sizes.length === 0 || filters.sizes.includes(product.size);
      const matchesStyle =
        filters.dressStyles.length === 0 || filters.dressStyles.includes(product.dressStyle);
      const matchesVendor =
        filters.vendors.length === 0 || filters.vendors.includes(product.vendor);
      const isDiscounted = !showDiscountedOnly || product.price < 50;
      const isNew = !showNewOnly || product;

      return (
        inPriceRange &&
        matchesColor &&
        matchesSize &&
        matchesStyle &&
        matchesVendor &&
        isDiscounted &&
        isNew
      );
    });
  }, [filters, showDiscountedOnly, showNewOnly]);

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    switch (sortOption) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating-desc':
        return sorted.sort((a, b) => b.rating - a.rating);
      default:
        return sorted;
    }
  }, [filteredProducts, sortOption]);

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-1 px-2 md:px-4 lg:px-3 py-2 gap-15">
        <aside className="w-full md:w-1/6">
          <FilterSidebar filters={filters} setFilters={setFilters} />
          <div className="mt-2 space-y-2">
            <Button variant="outline" onClick={() => setShowDiscountedOnly(!showDiscountedOnly)} className="w-full">
              {showDiscountedOnly ? 'Show All' : 'Only Discounted'}
            </Button>
            <Button variant="outline" onClick={() => setShowNewOnly(!showNewOnly)} className="w-full">
              {showNewOnly ? 'Show All' : 'Only New'}
            </Button>
            <Button variant="destructive" onClick={resetFilters} className="w-full">
              Reset Filters
            </Button>
          </div>
        </aside>
        <section className="w-full md:w-3/4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
            <h1 className="text-2xl font-semibold">{params.style || 'All Products'}</h1>
            <Select onValueChange={setSortOption} defaultValue="default">
              <option value="default">Sort By</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating-desc">Rating: High to Low</option>
            </Select>
          </div>
          <ProductGrid
            products={paginatedProducts.map((product) => ({
              ...product,
              vendorLink: `/vendor/${encodeURIComponent(product.vendor)}`,
              badge: product ? 'New' : product < 50 ? 'Sale' : undefined
            }))}
          />

          {totalPages > 1 && (
            <div className="flex justify-center mt-3 space-x-1">
              {[...Array(totalPages)].map((_, index) => (
                <Button
                  key={index + 1}
                  variant={currentPage === index + 1 ? 'default' : 'outline'}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
