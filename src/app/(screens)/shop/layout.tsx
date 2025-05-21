'use client';

import Layout from '@/app/(screens)/home/layout';
// import Link from 'next/link';/* app/shop/layout.tsx */
import { ReactNode } from 'react';

export default function ShopLayout({ children }: { children: ReactNode }) {
  return (
    <Layout>
      <main className="grid min-h-[30vh] px-2 py-3 lg:px-6">
        {children || (
          <div className="text-center text-muted-foreground py-20">
            <p>No products found. Try adjusting filters or check back later.</p>
          </div>
        )}
      </main>
    </Layout>
  );
}
