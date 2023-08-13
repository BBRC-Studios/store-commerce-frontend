import Iframe from 'react-iframe';
/*
import dynamic from 'next/dynamic';

const Wardrobe = dynamic(() => import('@components/product/wardrobe/wardrobe'), { ssr: false });

export default Wardrobe;
*/

export default function Wardrobe() {
  return (
    <Iframe
      url="/modelviewer/index.html"
      width="100%"
      height="450px"
      id=""
      className=""
      display="block"
      position="relative"
    />
  );
}
