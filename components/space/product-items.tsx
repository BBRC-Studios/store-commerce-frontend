'use client';

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
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [addingToCart, setAddingToCart] = useState(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const toggleAddToCartModal = () => {
    setAddingToCart(true);

    setSelectedProducts(products.filter(product => {
      return selectedItems[product.modelviewerSlug?.value!]
    }))

    setOpenModal(true);
  }

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
  
  return <div className="flex flex-col h-full justify-between">
    <div className="flex">
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
    <div className="flex flex-col">
      <button 
        onClick={toggleAddToCartModal}
        className="flex flex-row rounded-full w-full py-3 bg-sky-800 hover:bg-sky-900 text-white fontsize-lg tracking-wider font-semibold justify-center"
      >
        <div className="flex">
          Add to Cart
          {
            addingToCart && 
            <svg className={`animate-spin ml-2 h-5 w-5 text-white`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          }
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