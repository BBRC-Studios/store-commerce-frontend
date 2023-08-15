/* eslint-disable @next/next/no-img-element */
'use client';

import { Product } from "lib/shopify/types";

type Props = {
  product: Product;
  selected: boolean;
  onSelected: () => void;
}

export default function ProductItem({product, selected, onSelected}: Props) {
  return <div onClick={onSelected} className={`cursor-pointer`}>
    <div className="aspect-square">
      <div className={`border-solid border-white ${selected ? 'border-2 shadow-[0_15px_15px_-15px_rgba(255,255,255,0.3)]' : 'border'} text-center rounded-lg`}>
        <img src={product.featuredImage.url} className="w-auto h-36 mx-auto rounded-lg" alt={product.title} />
      </div>
    </div>
  </div>
}