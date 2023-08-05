'use client';

import { Html, OrbitControls, Plane } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Product } from 'lib/shopify/types';
import { Suspense, lazy, useMemo } from 'react';
import ModelBody from '../../../assets/models/Body';

type Props = {
  product: Product;
};

export function Wardrobe({ product }: Props) {
  const itemModels = useMemo(() => {
    const items = [
      {
        id: 'Male_Hair_1_1',
        componentName: 'Male_Hair_1_1'
      },
      {
        id: 'Male_Jeans_Denim_Blue',
        componentName: 'Male_Jeans_Denim_Blue'
      },
      {
        id: 'Male_RugbyPoloShirt_PinkGreen',
        componentName: 'Male_RugbyPoloShirt_PinkGreen'
      },
      {
        id: 'Male_Loafers_Redsocks',
        componentName: 'Male_Loafers_Redsocks'
      }
    ];

    return items.map((item) => ({
      id: item.id,
      Model: lazy(() => import(`../../../assets/models/${item.componentName}.tsx`))
    }));
  }, []);

  return (
    <div className="h-full w-full pr-10">
      <Canvas dpr={8} gl={{ antialias: true, toneMapping: 0 }} linear shadows>
        <color attach="background" args={['white']} />
        <OrbitControls
          makeDefault
          enableDamping
          minDistance={300}
          maxDistance={500}
          maxPolarAngle={Math.PI * 0.4}
          minPolarAngle={Math.PI * 0.4}
        />

        <ambientLight intensity={5} />
        <directionalLight intensity={7.5} position={[0, 400, 1000]} castShadow />
        <directionalLight intensity={7.5} position={[0, 400, -1000]} castShadow />

        <Suspense
          fallback={
            <Html center>
              <h1>Loading...</h1>
            </Html>
          }
        >
          <ModelBody position-y={-180} position-x={0} castShadow />

          {itemModels.map((Item) => (
            <Item.Model key={Item.id} position-y={-180} castShadow visible={true} />
          ))}

          <Plane
            args={[1000, 1000]}
            position={[0, -183, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            receiveShadow
          >
            <meshStandardMaterial color="white" />
          </Plane>
        </Suspense>
      </Canvas>
    </div>
  );
}
