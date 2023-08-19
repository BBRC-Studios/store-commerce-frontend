/* eslint-disable @next/next/no-img-element */
'use client';

import { Product } from "lib/shopify/types";
import { useState } from "react";
import ProductModal from "./product-modal";

type Props = {
  product: Product;
  selected: boolean;
  onSelected: () => void;
}

export default function ProductItem({product, selected, onSelected}: Props) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  
  return <div className={`cursor-pointer text-center`}>
    <div className="aspect-square"onClick={onSelected} >
      <div className={`border-solid border-white ${selected ? 'border-2 shadow-[0_15px_15px_-15px_rgba(255,255,255,0.3)]' : 'border'} text-center rounded-lg`}>
        <img src={product.featuredImage.url} className="w-auto mx-auto rounded-lg" alt={product.title} />
      </div>
    </div>
    <a href="#" className="rounded-md text-xs text-center mt-2 py-1 underline w-full" onClick={(event) => {event.preventDefault(); setOpenModal(true)}}>
      View Details
    </a>
    <ProductModal product={product} openModal={openModal} setOpenModal={setOpenModal} />
  </div>
}