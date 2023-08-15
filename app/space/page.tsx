import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import ProductItems from '@components/space/product-items';
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
  const productModelViewerSlugs = products.map(product => {
    if (product?.modelviewerSlug?.value) {
      return product.modelviewerSlug.value
    }
  });

  if (!products) return notFound();

  return (
      <div className="mx-auto max-w-screen-2xl px-4 w-full">
        <div className="rounded-lg border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-black">
          <div className="grid grid-cols-2">
            <div className="aspect-square">
              <iframe id="wardrobe" src={`/static/viewer/index.html?wardrobeItems=${productModelViewerSlugs.join(',')}`} style={{width: '100%', height: '100%'}} />
            </div>

            <div className="px-6 py-6">
              <ProductItems products={products} />
            </div>
          </div>
        </div>
      </div>
  );
}