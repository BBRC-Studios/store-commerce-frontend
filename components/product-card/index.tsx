'use client';

import Price from 'components/price';
import { Product } from 'lib/shopify/types';
import Link from 'next/link';

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.handle}`}>
      <div className="w-72 cursor-pointer rounded-3xl bg-slate-700 hover:shadow-blue-500/50">
        <div className="flex justify-center rounded-3xl bg-white">
          <div className="flex w-full justify-center rounded-xl bg-white hover:shadow-blue-500/50">
            <img src={product.featuredImage.url} alt={product.title} className="flex h-72" />
          </div>
        </div>
        <div className="flex flex-col border-b px-4 py-4 dark:border-neutral-700">
          <div className="flex pb-1 font-semibold">{product.title}</div>
          <div className="mr-auto w-auto text-xs text-slate-300">
            <Price
              amount={product.priceRange.maxVariantPrice.amount}
              currencyCode={product.priceRange.maxVariantPrice.currencyCode}
            />
          </div>
        </div>

        {/*<AddToCart variants={product.variants} availableForSale={product.availableForSale} /> */}
      </div>
    </Link>
  );
}
