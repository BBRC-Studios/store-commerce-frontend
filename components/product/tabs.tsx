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
      <Tabs.Item title="View in 3D">
        <Suspense fallback={<Loading />}>
          <Wardrobe product={product} />
        </Suspense>
      </Tabs.Item>
    </Tabs.Group>
  );
}
