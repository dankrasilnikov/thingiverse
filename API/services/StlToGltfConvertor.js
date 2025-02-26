import * as THREE from 'three';
import {STLLoader} from 'three/examples/jsm/loaders/STLLoader.js';
import {GLTFExporter} from 'three/examples/jsm/exporters/GLTFExporter.js';


export async function convertStlToGltf(stlBuffer) {
    const loader = new STLLoader();
    const geometry = loader.parse(stlBuffer);

    const material = new THREE.MeshStandardMaterial({color: 0xcccccc});
    const mesh = new THREE.Mesh(geometry, material);

    const scene = new THREE.Scene();
    scene.add(mesh);

    const exporter = new GLTFExporter();
    const exportOptions = {binary: false};

    const gltfData = await new Promise((resolve, reject) => {
        exporter.parse(
            scene,
            (result) => resolve(result),
            (error) => reject(error),
            exportOptions
        );
    });

    const gltfString = JSON.stringify(gltfData);
    return Buffer.from(gltfString, 'utf-8');
}
