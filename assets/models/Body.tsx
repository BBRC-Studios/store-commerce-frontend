/* eslint-disable react/no-unknown-property */
/*

*/

import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: {
    IVY_BODY_02: THREE.Mesh;
  };
  materials: {
    ['IVY BODY 02']: THREE.MeshStandardMaterial;
  };
};

export default function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF(
    `${process.env.NEXT_PUBLIC_MODEL_BASE_URL}/Body.glb`
  ) as GLTFResult;

  materials[Object.keys(materials)[0]].vertexColors = false;
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.IVY_BODY_02.geometry}
        material={materials['IVY BODY 02']}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload(`${process.env.NEXT_PUBLIC_MODEL_BASE_URL}/Body.glb`);
