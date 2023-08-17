import { Product } from 'lib/shopify/types';
import Iframe from 'react-iframe';
export default function Wardrobe({
  product
}: {
  product: Product
}) {
  const slug = product.modelviewerSlug?.value 
  return slug
    ?
    <Iframe
      url={`/static/viewer/index.html?wardrobeItems=${slug}`}
      width="100%"
      height="450px"
      display="block"
      position="relative"
    />
    :
    <div className="w-full pr-10" style={{ height: 450 }}>
      <div className="flex flex-col justify-center items-center h-full">
        <div className="text-2xl font-bold">No 3D Model Available</div>
        <div className="text-xl">Please select a different product</div>
      </div>
    </div>
}
