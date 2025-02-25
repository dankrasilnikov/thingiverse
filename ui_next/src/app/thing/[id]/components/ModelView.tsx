"use client";

import React, {useEffect, useRef} from "react";
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
// @ts-ignore
import TreeSTLLoader from "three-stl-loader";
import styles from "../modelpage.module.scss";

const STLLoader = TreeSTLLoader(THREE);

interface ModelViewProps {
    modelUrl: string;
}

export function ModelView({modelUrl}: ModelViewProps) {
    const mountRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const container = mountRef.current;
        if (!container) return;

        const {clientWidth: width, clientHeight: height} = container;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf0ecec);

        const camera = new THREE.PerspectiveCamera(75, width / height, 10, 100000);
        camera.position.z = 500;

        const renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);

        container.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.minDistance = 100;
        controls.maxDistance = 700;
        controls.enablePan = false;

        let userInteracted = false;
        controls.addEventListener("start", () => {
            userInteracted = true;
        });

        let animationFrameId: number;
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };

        animate();

        const loader = new STLLoader();
        const textureLoader = new THREE.TextureLoader();
        textureLoader.crossOrigin = "anonymous";

        loader.load(
            modelUrl,
            (geometry: THREE.BufferGeometry) => {
                geometry.computeVertexNormals();
                geometry.center();

                const material = new THREE.MeshMatcapMaterial({
                    color: 0xffffff,
                    matcap: textureLoader.load("/images/matcap-blue.png"),
                });
                const mesh = new THREE.Mesh(geometry, material);
                scene.add(mesh);
                mesh.rotation.x = -1.2;

                const rotationCallback = () => {
                    if (!userInteracted && mesh) {
                        mesh.rotation.z -= 0.01;
                    }
                };

                const originalRender = renderer.render.bind(renderer);
                renderer.render = (sceneArg, cameraArg) => {
                    rotationCallback();
                    originalRender(sceneArg, cameraArg);
                };
            },
            undefined,
            (error: string) => {
                console.error("Error loading STL model:", error);
            }
        );

        const pointLight = new THREE.PointLight(0xff0000, 1, 100);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        const onResize = () => {
            if (!mountRef.current) return;
            const newWidth = mountRef.current.clientWidth;
            const newHeight = mountRef.current.clientHeight;
            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(newWidth, newHeight);
        };
        window.addEventListener("resize", onResize);

        return () => {
            cancelAnimationFrame(animationFrameId);

            window.removeEventListener("resize", onResize);

            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }

            renderer.dispose();
            scene.traverse((obj) => {
                if (obj instanceof THREE.Mesh) {
                    obj.geometry.dispose();
                    if (Array.isArray(obj.material)) {
                        obj.material.forEach((m) => m.dispose());
                    } else {
                        obj.material.dispose();
                    }
                }
            });
        };
    }, []);

    return <div className={styles.modelCanvas} ref={mountRef}/>;
}
