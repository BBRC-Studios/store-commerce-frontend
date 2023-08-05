/* eslint-disable react/no-unknown-property */
/*

*/

import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: {
    Plane006: THREE.Mesh;
  };
  materials: {
    ['hair 2.006']: THREE.MeshStandardMaterial;
  };
};

export default function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF(
    `${process.env.NEXT_PUBLIC_MODEL_BASE_URL}/Male_Hair_1_1.glb`
  ) as GLTFResult;

  materials[Object.keys(materials)[0]].vertexColors = false;
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane006.geometry}
        material={materials['hair 2.006']}
      />
    </group>
  );
}

useGLTF.preload(`${process.env.NEXT_PUBLIC_MODEL_BASE_URL}/Male_Hair_1_1.glb`);
