import React, {Component, createRef} from "react";
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import matcapPorcelainWhite from "../../../assets/images/matcap-blue.png";
import styles from '../modelpage.module.scss'
// @ts-ignore
import TreeSTLLoader from "three-stl-loader";

const STLLoader = TreeSTLLoader(THREE);
const loader = new STLLoader();
const textureLoader = new THREE.TextureLoader();
textureLoader.crossOrigin = "anonymous";

interface ModelViewProps {}

interface ModelViewState {}

function createAnimate({
                           scene,
                           camera,
                           renderer,
                       }: {
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
}) {
    const triggers: Array<() => void> = [];

    function animate() {
        requestAnimationFrame(animate);
        triggers.forEach((trigger) => trigger());
        renderer.render(scene, camera);
    }

    return {
        animate,
        addTrigger: (cb: () => void) => {
            if (typeof cb === "function") triggers.push(cb);
        },
        offTrigger: (cb: () => void) => {
            const index = triggers.indexOf(cb);
            if (index !== -1) triggers.splice(index, 1);
        },
    };
}

export class ModelView extends Component<ModelViewProps, ModelViewState> {
    private mount: React.RefObject<HTMLDivElement | null> = createRef();

    componentDidMount() {
        const container = this.mount.current;
        const width = container ? container.clientWidth : window.innerWidth;
        const height = container ? container.clientHeight : window.innerHeight;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf0ecec);

        const camera = new THREE.PerspectiveCamera(75, width / height, 10, 100000);
        camera.position.z = 500;

        const renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setSize(width, height);
        if (container) {
            container.appendChild(renderer.domElement);
        }

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.minDistance = 100;
        controls.maxDistance = 700;
        controls.enablePan = false;

        let userInteracted = false;
        controls.addEventListener("start", () => {
            userInteracted = true;
        });

        let mesh: THREE.Mesh | null = null;
        const animate = createAnimate({scene, camera, renderer});

        loader.load(
            "https://cdn.krasilnikov.info/oiia_cat.stl",
            (geometry: THREE.BufferGeometry) => {
                const material = new THREE.MeshMatcapMaterial({
                    color: 0xffffff,
                    matcap: textureLoader.load(matcapPorcelainWhite),
                });
                mesh = new THREE.Mesh(geometry, material);
                mesh.geometry.computeVertexNormals();
                mesh.geometry.center();
                scene.add(mesh);
                mesh.rotation.x = -1.2;

                animate.addTrigger(() => {
                    if (!userInteracted && mesh) {
                        mesh.rotation.z -= 0.01;
                    }
                });
            },
            undefined,
            (error: any) => {
                console.error("Error loading STL model:", error);
            }
        );

        const pointLight = new THREE.PointLight(0xff0000, 1, 100);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        window.addEventListener("resize", () => {
            if (container) {
                const newWidth = container.clientWidth;
                const newHeight = container.clientHeight;
                camera.aspect = newWidth / newHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(newWidth, newHeight);
            }
        });

        animate.animate();
    }

    render() {
        return <div className={styles.modelCanvas} ref={this.mount}/>;
    }
}
