/* eslint-disable @next/next/no-img-element */
'use client';

import { Button, Modal } from 'flowbite-react';
import { useForm } from "react-hook-form";

import { addItem } from 'components/cart/actions';
import { Product } from 'lib/shopify/types';
import { useState } from 'react';

export const runtime = 'edge';

// eslint-disable-next-line @next/next/no-async-client-component
export default function AddToCartModal({
  products,
  openModal,
  setOpenModal
}: {
  products: Product[];
  openModal: boolean | undefined;
  setOpenModal: (value: boolean) => void;
}) {
  const [addingToCart, setAddingToCart] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = (data: Record<string, string>) => {
    addToCart(Object.values(data).filter((value) => value !== ''))
  }

  const addToCart = async (variantIds: string[]) => {
    setAddingToCart(true);
    for (let index = 0; index < variantIds.length; index++) {
      const error = await addItem(variantIds[index]);
      console.log('error', error)
    }
    setOpenModal(false);
    setAddingToCart(false);
  }

  return <>
    <Modal dismissible show={openModal} onClose={() => setOpenModal(false)} size="5xl">
      <Modal.Header>Select Product Variants</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <form id="add-to-cart-form" className="flex w-full flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          {
            products.map((product) => {
              return <div key={product.id} className="flex flex-row w-full justify-between">
                <div className="flex items-center">
                  <div className="flex items-center">
                    <img src={product.images[0].url} className="w-12" alt=""/>
                  </div>
                  <div className="flex items-center px-3">
                    {product.title}
                  </div>
                </div>
                <div className="flex items-center">
                  <select
                    className="flex flex-col text-black"
                    {...register(`product-${product.id}`)}
                    defaultValue={product.variants[0].id}
                    required
                  >
                  {
                    product.variants.map((variant) => {
                      return <option key={variant.id} value={variant.id}>
                          {variant.title} (
                          {variant.price.currencyCode}
                          {variant.price.amount})
                      </option>
                    })
                  }
                  </select>
                </div>
              </div>
            })
          }
          <Button type="submit">
            Add To Cart
            {
              addingToCart && 
              <svg className={`animate-spin ml-2 h-5 w-5 text-white`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            }
          </Button>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  </>
}