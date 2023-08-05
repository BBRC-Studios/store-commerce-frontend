/* eslint-disable react/no-unknown-property */
/*

*/

import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: {
    Plane004: THREE.Mesh;
    Plane005: THREE.Mesh;
    Plane006: THREE.Mesh;
    Plane007: THREE.Mesh;
    Plane007_1: THREE.Mesh;
    Plane007_2: THREE.Mesh;
    jacket_back001: THREE.Mesh;
    Cylinder007_1: THREE.Mesh;
    Cylinder007_2: THREE.Mesh;
  };
  materials: {
    ['Leather white']: THREE.MeshStandardMaterial;
    ['BBRSC logo.002']: THREE.MeshStandardMaterial;
    ['strip blue 2']: THREE.MeshStandardMaterial;
    ['Leather white']: THREE.MeshStandardMaterial;
    ['strip blue']: THREE.MeshStandardMaterial;
    Material: THREE.MeshStandardMaterial;
    ['jacket back.002']: THREE.MeshStandardMaterial;
    ['Metal.002']: THREE.MeshStandardMaterial;
    ['Material.005']: THREE.MeshStandardMaterial;
  };
};

export default function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF(
    `${process.env.NEXT_PUBLIC_MODEL_BASE_URL}/Male_LeatherVarsityJacket_Blue.glb`
  ) as GLTFResult;

  //materials[Object.keys(materials)[0]].vertexColors = false
  return (
    <group {...props} dispose={null} sc100a>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane004.geometry}
        material={materials['Leather white']}
        position={[0.201, 1.802, 0.172]}
        rotation={[-2.924, 1.507, -0.26]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane005.geometry}
        material={materials['BBRSC logo.002']}
        position={[0.2, 2.302, 0.159]}
        rotation={[Math.PI / 2, 0, -0.811]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane006.geometry}
        material={materials['strip blue 2']}
        position={[0.111, 2.438, 0.215]}
        rotation={[Math.PI / 2, 0, -0.393]}
      />
      <group position={[-0.008, 2.045, -0.008]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane007.geometry}
          material={materials['Leather white']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane007_1.geometry}
          material={materials['strip blue']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane007_2.geometry}
          material={materials.Material}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.jacket_back001.geometry}
        material={materials['jacket back.002']}
        position={[-0.031, 2.222, -0.236]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <group position={[-0.113, 1.525, 0.224]} rotation={[1.534, -0.118, 0.505]}></group>
    </group>
  );
}

useGLTF.preload(`${process.env.NEXT_PUBLIC_MODEL_BASE_URL}/Male_LeatherVarsityJacket_Blue.glb`);
