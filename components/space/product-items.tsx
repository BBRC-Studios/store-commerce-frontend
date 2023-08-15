'use client';

import { Product } from 'lib/shopify/types';
import _ from "lodash";
import { useEffect, useState } from 'react';
import ProductItem from './product-item';

export const runtime = 'edge';

// eslint-disable-next-line @next/next/no-async-client-component
export default function ProductItems({
  products,
}: {
  products: Product[];
}) {
  const defaultSelectedItems: Record<string, boolean> = {}
  
  products.forEach((product, index) => {
    if (product?.modelviewerSlug?.value) {
      defaultSelectedItems[product.modelviewerSlug.value] = false
    }
    products[index].category = product?.modelviewerCategory?.value ? JSON.parse(product.modelviewerCategory.value)[0] : 'Others'
  })

  const categorisedProducts = _.groupBy(products, (product: Product) => {
    return product.category
  });

  const [selectedItems, setSelectedItems] = useState(defaultSelectedItems);

  const updateSelected = (product: Product) => {
    if (product.modelviewerSlug?.value) {
      const newSelectedItems = {...selectedItems}

      // Set all products in that product category to false
      Object.keys(newSelectedItems).forEach(key => {
        categorisedProducts[product.category!].find((_product: Product) => {
          if (_product.modelviewerSlug!.value === key) {
            newSelectedItems[key] = product.modelviewerSlug!.value === key
          }
        });
      })

      // Set selected items
      setSelectedItems({
        ...newSelectedItems
      })
    }
  }

  useEffect(() => {
    const iframe = document.getElementById('wardrobe') as HTMLIFrameElement;
    iframe.contentWindow?.postMessage({
      type: 'toggle-visibility',
      visibility: selectedItems
    }, '*');
  }, [selectedItems])
  
  return <div className="flex flex-col">
    {
      Object.keys(categorisedProducts).map(category => {
        return <div key={category}>
          <div className="flex pb-3">
            <h1 className="text-2xl font-bold">{category}</h1>
          </div>
          <div className="flex w-full">
            <div className="grid grid-cols-4 gap-4">
            {
              products.map(product => <ProductItem
                key={product.id}
                product={product}
                selected={product.modelviewerSlug?.value ? selectedItems[product.modelviewerSlug?.value] : false}
                onSelected={() => updateSelected(product)}
              />)
            }
            </div>
          </div>
        </div>
      })
    }
  </div>
}