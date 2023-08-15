import { Product } from 'lib/shopify/types';
import Iframe from 'react-iframe';
export default function Wardrobe({
  product
}: {
  product: Product
}) {
  console.log(product)
  return (
    <Iframe
      url="/static/viewer/index.html?wardrobeItems=Male_RugbyPoloShirt_PinkGreen"
      width="100%"
      height="450px"
      id=""
      className=""
      display="block"
      position="relative"
    />
  );
}
