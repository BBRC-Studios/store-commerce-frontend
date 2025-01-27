import { GridTileImage } from 'components/grid/tile';
import { ProductCard } from 'components/product-card';
import { getCollectionProducts } from 'lib/shopify';
import type { Product } from 'lib/shopify/types';
import Link from 'next/link';

function ThreeItemGridItem({ item, size }: { item: Product; size: 'full' | 'half' }) {
  return (
    <div
      className={size === 'full' ? 'lg:col-span-4 lg:row-span-2' : 'lg:col-span-2 lg:row-span-1'}
    >
      <Link className="block h-full" href={`/product/${item.handle}`}>
        <GridTileImage
          src={item.featuredImage.url}
          width={size === 'full' ? 1080 : 540}
          height={size === 'full' ? 1080 : 540}
          priority={true}
          alt={item.title}
          label={{
            position: size === 'full' ? 'center' : 'bottom',
            title: item.title as string,
            amount: item.priceRange.maxVariantPrice.amount,
            currencyCode: item.priceRange.maxVariantPrice.currencyCode
          }}
        />
      </Link>
    </div>
  );
}

export async function ThreeItemGrid() {
  // Collections that start with `hidden-*` are hidden from the search page.
  const homepageItems = await getCollectionProducts({
    collection: 'hidden-homepage-featured-items'
  });

  return (
    <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 lg:grid-cols-4 lg:grid-rows-2">
      {homepageItems[0] && <ProductCard product={homepageItems[0]} />}
      {/*
      {homepageItems[0] && <ThreeItemGridItem size="full" item={homepageItems[0]} />}
      {homepageItems[1] && <ThreeItemGridItem size="half" item={homepageItems[1]} />}
      {homepageItems[2] && <ThreeItemGridItem size="half" item={homepageItems[2]} />}
      */}
    </section>
  );
}
