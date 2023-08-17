'use client';

import { Center, OrbitControls, Plane } from '@react-three/drei';
import { useEffect, useState } from 'react';
// import ModelBody from '../../../assets/models/Body';

type ItemModel = {
  id: string;
  Model: React.ComponentType<any>;
};

export default function WardrobeContent() {
  const [itemModels, setItemModels] = useState<ItemModel[]>([]);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const populateItems = async () => {
      const items = [
        {
          id: 'Male_Hair_1_1',
          componentName: 'Male_Hair_1_1'
        },
        {
          id: 'Male_Jeans_Denim_Blue',
          componentName: 'Male_Jeans_Denim_Blue'
        },
        /*
        {
          id: 'Male_LeatherVarsityJacket_Blue',
          componentName: 'Male_LeatherVarsityJacket_Blue'
        },
        */
        {
          id: 'Male_RugbyPoloShirt_PinkGreen',
          componentName: 'Male_RugbyPoloShirt_PinkGreen'
        },
        {
          id: 'Male_Loafers_Redsocks',
          componentName: 'Male_Loafers_Redsocks'
        }
      ];

      const _itemModels = [];
      for (const item of items) {
        _itemModels.push({
          id: item.id,
          Model: await import(`../../../assets/models/${item.componentName}.tsx`).then(
            (r) => r.default
          )
        });
      }
      setItemModels(_itemModels);
    };

    populateItems();
  }, []);

  return (
    <Center onCentered={() => setEnabled(true)}>
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

      {itemModels.map((Item) => {
        return <Item.Model key={Item.id} position-y={-180} castShadow visible={enabled} />;
      })}

      {/*
      <ModelBody position-y={-180} position-x={0} castShadow visible={enabled} />
    */}

      <Plane
        args={[1000, 1000]}
        position={[0, -183, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <meshStandardMaterial color="white" />
      </Plane>
    </Center>
  );
}
