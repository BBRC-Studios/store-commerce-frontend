/* eslint-disable react/no-unknown-property */
/*

*/

import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: {
    ['POLOSHIRT_-_RUGBY_PINKGREEN_02']: THREE.Mesh;
  };
  materials: {
    ['POLOSHIRT - RUGBY PINKGREEN 02.001']: THREE.MeshStandardMaterial;
  };
};

export default function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF(
    `${process.env.NEXT_PUBLIC_MODEL_BASE_URL}/Male_RugbyPoloShirt_PinkGreen.glb`
  ) as GLTFResult;

  materials[Object.keys(materials)[0]].vertexColors = false;
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['POLOSHIRT_-_RUGBY_PINKGREEN_02'].geometry}
        material={materials['POLOSHIRT - RUGBY PINKGREEN 02.001']}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload(`${process.env.NEXT_PUBLIC_MODEL_BASE_URL}/Male_RugbyPoloShirt_PinkGreen.glb`);
