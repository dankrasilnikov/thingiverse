import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import {Buffer} from 'buffer';

if (typeof global.FileReader === 'undefined') {
    class NodeFileReader {
        constructor() {
            this.onload = null;
            this.onerror = null;
        }

        readAsDataURL(blob) {
            let buffer;
            if (Buffer.isBuffer(blob)) {
                buffer = blob;
            } else if (blob.buffer) {
                buffer = Buffer.from(blob.buffer, blob.byteOffset, blob.byteLength);
            } else {
                if (this.onerror) this.onerror(new Error('Input is not a Buffer or ArrayBuffer'));
                return;
            }
            const base64 = buffer.toString('base64');
            const mime = blob.type || 'application/octet-stream';
            // Используем setTimeout, чтобы эмулировать асинхронность
            setTimeout(() => {
                if (this.onload) {
                    this.onload({ target: { result: `data:${mime};base64,${base64}` } });
                }
            }, 0);
        }
    }
    global.FileReader = NodeFileReader;
}

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
