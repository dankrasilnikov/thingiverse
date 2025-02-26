import {STLLoader} from "three/examples/jsm/loaders/STLLoader";
import {GLTFExporter} from "three/examples/jsm/exporters/GLTFExporter";
import * as THREE from "three";


export async function convertStlToGltf(stlBuffer) {
    console.log('start convert to gltf');
    const arrayBuffer = stlBuffer.buffer.slice(
        stlBuffer.byteOffset,
        stlBuffer.byteOffset + stlBuffer.byteLength
    );

    const loader = new STLLoader();
    const geometry = loader.parse(arrayBuffer);
    console.log('geometry', geometry);

    const material = new THREE.MeshStandardMaterial({ color: 0xcccccc });
    const mesh = new THREE.Mesh(geometry, material);

    const scene = new THREE.Scene();
    scene.add(mesh);
    console.log('loading gltf exporter');
    const exporter = new GLTFExporter();
    const exportOptions = { binary: true, embedImages: false };

    console.log('loaded gltf exporter');
    console.log('scene children count:', scene.children.length);
    console.log('mesh geometry attributes:', mesh.geometry.attributes?.position?.count);
    const gltfData = await new Promise((resolve, reject) => {
        exporter.parse(
            scene,
            (result) => {
                console.log('GLTF parse callback success'); // ← Очень важно
                resolve(result);
            },
            (error) => {
                console.log('GLTF parse callback error', error);
                reject(error);
            },
            exportOptions
        );
    });
    console.log('gltf data ready');
    const gltfString = JSON.stringify(gltfData);
    console.log(gltfString)
    return Buffer.from(gltfString, 'utf-8');
}
