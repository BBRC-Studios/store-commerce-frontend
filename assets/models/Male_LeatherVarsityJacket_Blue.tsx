/* eslint-disable react/no-unknown-property */
/*

*/

import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: {
    Sphere002: THREE.Mesh;
    Plane004: THREE.Mesh;
    Plane005: THREE.Mesh;
    Plane006: THREE.Mesh;
    Plane007: THREE.Mesh;
    Plane007_1: THREE.Mesh;
    Plane007_2: THREE.Mesh;
    jacket_back001: THREE.Mesh;
    Cylinder007: THREE.Mesh;
    Cylinder008: THREE.Mesh;
    Cylinder009: THREE.Mesh;
    Cylinder010: THREE.Mesh;
    Cylinder011: THREE.Mesh;
    Cylinder012: THREE.Mesh;
    Cylinder013: THREE.Mesh;
  };
  materials: {
    ['Material.005']: THREE.MeshStandardMaterial;
    ['Leather white']: THREE.MeshStandardMaterial;
    ['BBRSC logo.002']: THREE.MeshStandardMaterial;
    ['strip blue 2']: THREE.MeshStandardMaterial;
    ['Leather white']: THREE.MeshStandardMaterial;
    ['strip blue']: THREE.MeshStandardMaterial;
    Material: THREE.MeshStandardMaterial;
    ['jacket back.002']: THREE.MeshStandardMaterial;
    ['Metal.002']: THREE.MeshStandardMaterial;
  };
};

export default function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF(
    `${process.env.NEXT_PUBLIC_MODEL_BASE_URL}/Male_LeatherVarsityJacket_Blue.glb`
  ) as GLTFResult;

  materials[Object.keys(materials)[0]].vertexColors = false;
  return (
    <group {...props} scale={6}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere002.geometry}
        material={materials['Material.005']}
        rotation={[2.942, -0.527, 0.361]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane004.geometry}
        material={materials['Leather white']}
        rotation={[-2.924, 1.507, -0.26]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane005.geometry}
        material={materials['BBRSC logo.002']}
        rotation={[Math.PI / 2, 0, -0.811]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane006.geometry}
        material={materials['strip blue 2']}
        rotation={[Math.PI / 2, 0, -0.393]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane007.geometry}
        material={materials['Leather white']}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane007_1.geometry}
        material={materials['strip blue']}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane007_2.geometry}
        material={materials.Material}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.jacket_back001.geometry}
        material={materials['jacket back.002']}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder007.geometry}
        material={materials['Metal.002']}
        rotation={[1.534, -0.118, 0.505]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder008.geometry}
        material={materials['Metal.002']}
        rotation={[1.614, -0.069, 0.467]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder009.geometry}
        material={materials['Metal.002']}
        rotation={[1.708, -0.02, 0.509]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder010.geometry}
        material={materials['Metal.002']}
        rotation={[1.605, -0.056, 0.54]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder011.geometry}
        material={materials['Metal.002']}
        rotation={[1.536, -0.096, 0.486]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder012.geometry}
        material={materials['Metal.002']}
        rotation={[1.585, -0.069, 0.496]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder013.geometry}
        material={materials['Metal.002']}
        rotation={[1.398, -0.214, 0.556]}
      />
    </group>
  );
}
