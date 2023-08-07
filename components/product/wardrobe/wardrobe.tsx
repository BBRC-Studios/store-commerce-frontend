'use client';

import { Canvas } from '@react-three/offscreen';
// import { Canvas } from '@react-three/fiber';
import { Product } from 'lib/shopify/types';
import { useState } from 'react';

type Props = {
  product: Product;
};

export default function Wardrobe({ product }: Props) {
  const [worker] = useState(
    () =>
      new Worker(new URL('@components/product/wardrobe/worker', import.meta.url), {
        type: 'module'
      })
  );

  return (
    <div className="w-full pr-10" style={{ height: 450 }}>
      <Canvas
        worker={worker}
        frameloop="demand"
        flat={false}
        linear={true}
        performance={{ min: 0.1, max: 0.9 }}
        dpr={[0.5, 1]}
        gl={{ antialias: true, toneMapping: 0 }}
        shadows
      />
    </div>
  );
}
