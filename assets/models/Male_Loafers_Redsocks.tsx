/* eslint-disable react/no-unknown-property */
/*

*/

import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: {
    Loafers_Redsocks_02: THREE.Mesh;
  };
  materials: {
    ['Loafers_Redsocks 02']: THREE.MeshStandardMaterial;
  };
};

export default function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF(
    `${process.env.NEXT_PUBLIC_MODEL_BASE_URL}/Male_Loafers_Redsocks.glb`
  ) as GLTFResult;

  materials[Object.keys(materials)[0]].vertexColors = false;
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Loafers_Redsocks_02.geometry}
        material={materials['Loafers_Redsocks 02']}
        position={[0, 4, 4]}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload(`${process.env.NEXT_PUBLIC_MODEL_BASE_URL}/Male_Loafers_Redsocks.glb`);
