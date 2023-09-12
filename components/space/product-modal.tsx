/* eslint-disable @next/next/no-img-element */
'use client';

import Prose from '@components/prose';
import { Modal } from 'flowbite-react';

import { Carousel } from 'flowbite-react';
import { Product } from 'lib/shopify/types';

export const runtime = 'edge';

// eslint-disable-next-line @next/next/no-async-client-component
export default function ProductModal({
  product,
  openModal,
  setOpenModal
}: {
  product: Product;
  openModal: boolean | undefined;
  setOpenModal: (value: boolean) => void;
}) {
  const minVariantPrice = Number(product.priceRange.minVariantPrice.amount)
  const maxVariantPrice = Number(product.priceRange.maxVariantPrice.amount)
  const priceRange = (product.priceRange.minVariantPrice.currencyCode) + ' ' +
    ((minVariantPrice === maxVariantPrice)
      ? 
      minVariantPrice.toFixed(2)
      : 
      `${minVariantPrice.toFixed(2)} - ${maxVariantPrice.toFixed(2)}`)

  return <>
    <Modal dismissible show={openModal} onClose={() => setOpenModal(false)} size="5xl">
      <Modal.Body className="p-0">
        <div className="flex flex-row">
          <div className="flex flex-1 pr-5">
            <Carousel style={{ height: 600 }} className="rounded-r-none">
              {
                product.images.map((image) => {
                  return <img className="rounded-r-none" key={image.url} alt={image.altText} src={image.url} />
                })
              }
            </Carousel>
          </div>
          <div className="flex flex-1 flex-col py-5 pl-2 pr-5">
            <h2 className="font-bold text-3xl pb-2">{product.title}</h2>
            <h4 className="text-2xl pb-4">{priceRange}</h4>
            {product.descriptionHtml ? (
              <Prose
                className="mb-6 text-sm leading-tight dark:text-white/[60%]"
                html={product.descriptionHtml}
              />
            ) : null}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  </>
}