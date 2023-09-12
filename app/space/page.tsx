import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import ProductItems from '@components/space/product-items';
import WardrobeIframe from '@components/space/wardrobe-iframe';
import { getProducts } from 'lib/shopify';

export const runtime = 'edge';

export async function generateMetadata(): Promise<Metadata> {
  const hide = true;
  return {
    title: "Space",
    description: "Introducing a new commerce experience",
    robots: {
      index: hide,
      follow: hide,
      googleBot: {
        index: hide,
        follow: hide
      }
    },
    openGraph: null
  };
}

// eslint-disable-next-line @next/next/no-async-client-component
export default async function SpacePage() {
  const products = await getProducts({});
  const productModelViewerSlugs: string[] = [];
  products.forEach(product => {
    if (product?.modelviewerSlug?.value) {
      productModelViewerSlugs.push(product.modelviewerSlug.value)
    }
  });

  if (!products) return notFound();

  return (
      <div className="mx-auto px-20 w-full">
        <div className="rounded-lg border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-black">
          <div className="grid grid-cols-2">
            <WardrobeIframe items={productModelViewerSlugs} />
            <div className="px-6 py-3">
              <ProductItems products={products} />
            </div>
          </div>
        </div>
      </div>
  );
}