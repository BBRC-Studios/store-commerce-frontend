import dynamic from 'next/dynamic';

const Wardrobe = dynamic(() => import('@components/product/wardrobe/wardrobe'), { ssr: false });

export default Wardrobe;
