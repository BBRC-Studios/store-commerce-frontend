'use client';

import Loading from 'app/search/loading';
import { Tabs } from 'flowbite-react';
import type { Image, Product } from 'lib/shopify/types';
import { Suspense, lazy } from 'react';
import { Gallery } from './gallery';
const Wardrobe = lazy(() => import('./wardrobe'));

type Props = {
  product: Product;
};

export default function ProductTabs({ product }: Props) {
  return (
    <Tabs.Group style="underline">
      <Tabs.Item title="Gallery">
        <Gallery
          images={product.images.map((image: Image) => ({
            src: image.url,
            altText: image.altText
          }))}
        />
      </Tabs.Item>
      <Tabs.Item title="3D View">
        <div
          className="item-center flex justify-center text-center"
          style={{ height: '450px', width: '100%' }}
        >
          <img
            className="flex"
            style={{ height: '100%', width: '450px' }}
            src="/images/Male_LeatherVarsityJacket_Blue.webp"
          />
        </div>
      </Tabs.Item>
      <Tabs.Item title="Model">
        <Suspense fallback={<Loading />}>
          <Wardrobe product={product} />
        </Suspense>
      </Tabs.Item>
    </Tabs.Group>
  );
}
