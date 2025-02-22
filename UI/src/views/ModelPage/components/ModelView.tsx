import React, {Component, createRef} from "react";
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import matcapPorcelainWhite from "../../../assets/images/matcap-blue.png";
// @ts-ignore
import TreeSTLLoader from "three-stl-loader";
import * as dat from "dat.gui";

const STLLoader = TreeSTLLoader(THREE);
const loader = new STLLoader();
const textureLoader = new THREE.TextureLoader();
textureLoader.crossOrigin = "anonymous";

const gui = new dat.GUI();

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
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf0ecec);
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            10,
            100000
        );
        camera.position.z = 500;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        if (this.mount.current) {
            this.mount.current.appendChild(renderer.domElement);
        }

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.minDistance = 100;
        controls.maxDistance = 700;

        //change file names
        loader.load(
            "https://cdn.krasilnikov.info/valentine_rose.stl",
            (geometry: THREE.BufferGeometry) => {
                const material = new THREE.MeshMatcapMaterial({
                    color: 0xffffff,
                    matcap: textureLoader.load(matcapPorcelainWhite),
                });
                const mesh = new THREE.Mesh(geometry, material);
                mesh.geometry.computeVertexNormals();
                mesh.geometry.center();
                scene.add(mesh);
                mesh.rotation.x = -1.2;

                animate.addTrigger(() => {
                    // mesh.rotation.x += 0.005;
                    // mesh.rotation.y += 0.005;
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
        gui.add(pointLight.position, "y").min(-10).max(10).step(0.1);

        const animate = createAnimate({ scene, camera, renderer });

        window.addEventListener("resize", () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        animate.animate();
    }

    render() {
        return <div ref={this.mount} />;
    }
}
