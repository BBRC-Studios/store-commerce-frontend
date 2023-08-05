/* eslint-disable react/no-unknown-property */
/*

*/

import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: {
    ['JEANS_-_DENIM_BLUE_02']: THREE.Mesh;
  };
  materials: {
    ['JEANS - DENIM BLUE 02']: THREE.MeshStandardMaterial;
  };
};

export default function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF(
    `${process.env.NEXT_PUBLIC_MODEL_BASE_URL}/Male_Jeans_Denim_Blue.glb`
  ) as GLTFResult;

  materials[Object.keys(materials)[0]].vertexColors = false;
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['JEANS_-_DENIM_BLUE_02'].geometry}
        material={materials['JEANS - DENIM BLUE 02']}
        position={[0, 0, -0.06]}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload(`${process.env.NEXT_PUBLIC_MODEL_BASE_URL}/Male_Jeans_Denim_Blue.glb`);
