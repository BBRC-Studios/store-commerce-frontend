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
  return <>
    <Modal dismissible show={openModal} onClose={() => setOpenModal(false)} size="5xl">
      <Modal.Header>{product.title}</Modal.Header>
      <Modal.Body>
        <div className="flex flex-row">
          <div className="flex flex-1 pr-5">
            <Carousel style={{ height: 600 }}>
              {
                product.images.map((image) => {
                  return <img key={image.url} alt={image.altText} src={image.url} />
                })
              }
            </Carousel>
          </div>
          <div className="flex flex-1 flex-col">
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