'use client';

import { Tabs } from 'flowbite-react';
import { Product } from 'lib/shopify/types';
import _ from "lodash";
import { useEffect, useState } from 'react';
import AddToCartModal from './add-to-cart-modal';
import ProductItem from './product-item';

export const runtime = 'edge';

// eslint-disable-next-line @next/next/no-async-client-component
export default function ProductItems({
  products,
}: {
  products: Product[];
}) {
  const defaultItems: Record<string, boolean> = {}
  
  products.forEach((product, index) => {
    products[index].category = product?.modelviewerCategory?.value ? String(JSON.parse(product.modelviewerCategory.value)[0]) : 'Others'
    if (product?.modelviewerSlug?.value) {
      defaultItems[product.modelviewerSlug.value] = false
    }
  })

  const categorisedProducts = _.groupBy(products, (product: Product) => {
    return product.category
  });
  
  const [items, setItems] = useState(defaultItems);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const toggleAddToCartModal = () => {
    setSelectedProducts(products.filter(product => {
      return items[product.modelviewerSlug?.value!]
    }))

    setOpenModal(true);
  }

  const updateSelected = (product: Product) => {
    if (product.modelviewerSlug?.value) {
      const newItems = {...items}

      // Set all products in that product category to false
      Object.keys(newItems).forEach(key => {
        categorisedProducts[product.category!].find((_product: Product) => {
          if (_product.modelviewerSlug!.value === key) {
            newItems[key] = product.modelviewerSlug!.value === key
          }
        });
      })

      // Set selected items
      setItems({
        ...newItems
      })
    }
  }

  useEffect(() => {
    const iframe = document.getElementById('wardrobe') as HTMLIFrameElement;
    iframe.contentWindow?.postMessage({
      type: 'toggle-visibility',
      visibility: items
    }, '*');
  }, [items])
  
  return <div className="flex flex-col h-full justify-between">
    <div className="flex">
      <Tabs.Group
        style="underline"
      >
      {
        Object.keys(categorisedProducts).map(category => {
          return <Tabs.Item
            key={category}
            title={<h1 className="text-xl font-bold">{category}</h1>}
          >
            <div className="flex w-full">
              <div className="grid grid-cols-5 gap-3">
              {
                categorisedProducts[category].map(product => <ProductItem
                  key={product.id}
                  product={product}
                  selected={product.modelviewerSlug?.value ? items[product.modelviewerSlug?.value] : false}
                  onSelected={() => updateSelected(product)}
                />)
              }
              </div>
            </div>
          </Tabs.Item>
      })
    }
    </Tabs.Group>
    </div>
    <div className="flex flex-col">
      <button 
        onClick={toggleAddToCartModal}
        className="flex flex-row rounded-full w-full py-3 bg-sky-800 hover:bg-sky-900 text-white fontsize-lg tracking-wider font-semibold justify-center"
      >
        <div className="flex">
          Next&nbsp;&rarr;
        </div>
      </button>
    </div>
    <AddToCartModal
      openModal={openModal}
      setOpenModal={setOpenModal}
      products={selectedProducts}
    />
  </div>
}