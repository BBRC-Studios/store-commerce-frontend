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
    <div className="fixed flex w-full h-full top-0 left-0 bg-[#f6f6f6]">
      <div className='flex flex-[3] h-full bg-[#f6f6f6]'>
        <WardrobeIframe
          items={productModelViewerSlugs}
          aspect=""
          minDistance={6}
          maxDistance={11}
        />
      </div>
      <div className="flex flex-[2] h-full px-6 py-3 bg-[#f6f6f6] text-black">
        <ProductItems products={products} />
      </div>
    </div>
  );
}