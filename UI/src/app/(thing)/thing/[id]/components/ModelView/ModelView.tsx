'use client'

import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three-stdlib'
import Image from 'next/image'
import ButtonPrintNow from '@/components/ButtonPrintNow'
import TreeSTLLoader from 'three-stl-loader'
import ButtonSwitchDimension from '../ButtonSwitchDimension'
import styles from './modelview.module.scss'

const STLLoader = TreeSTLLoader(THREE)

interface ModelViewProperties {
  modelUrl: string
  placeholderSrc: string
  placeholderAlt: string
}

function ModelView({
  modelUrl,
  placeholderSrc,
  placeholderAlt,
}: ModelViewProperties) {
  const mountReference = useRef<HTMLDivElement | null>(null)
  const [isModelVisible, setModelVisible] = useState(false)

  useEffect(() => {
    if (!isModelVisible) {
      return
    }

    const container = mountReference.current

    if (!container) {
      return
    }

    const { clientWidth: width, clientHeight: height } = container

    const scene = new THREE.Scene()

    scene.background = new THREE.Color(0xf0ecec)

    const camera = new THREE.PerspectiveCamera(75, width / height, 10, 100000)

    camera.position.z = 500

    const renderer = new THREE.WebGLRenderer({ antialias: true })

    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)

    container.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)

    controls.minDistance = 100
    controls.maxDistance = 700
    controls.enablePan = false

    let userInteracted = false

    controls.addEventListener('start', () => {
      userInteracted = true
    })

    let animationFrameId: number
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }

    animate()

    const loader = new STLLoader()
    const textureLoader = new THREE.TextureLoader()

    textureLoader.crossOrigin = 'anonymous'

    loader.load(
      modelUrl,
      (geometry: THREE.BufferGeometry) => {
        geometry.computeVertexNormals()
        geometry.center()

        const material = new THREE.MeshMatcapMaterial({
          color: 0xffffff,
          matcap: textureLoader.load('/images/matcap-blue.png'),
        })
        const mesh = new THREE.Mesh(geometry, material)

        scene.add(mesh)
        mesh.rotation.x = -1.2

        const rotationCallback = () => {
          if (!userInteracted && mesh) {
            mesh.rotation.z -= 0.01
          }
        }

        const originalRender = renderer.render.bind(renderer)

        renderer.render = (sceneArgument, cameraArgument) => {
          rotationCallback()
          originalRender(sceneArgument, cameraArgument)
        }
      },
      undefined,
      (error: string) => {
        console.error('Error loading STL model:', error)
      }
    )

    const pointLight = new THREE.PointLight(0xff0000, 1, 100)

    pointLight.position.set(5, 5, 5)
    scene.add(pointLight)

    const onResize = () => {
      if (!mountReference.current) {
        return
      }
      const newWidth = mountReference.current.clientWidth
      const newHeight = mountReference.current.clientHeight

      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, newHeight)
    }

    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animationFrameId)

      window.removeEventListener('resize', onResize)

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }

      renderer.dispose()
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose()
          if (Array.isArray(object.material)) {
            object.material.forEach((m) => m.dispose())
          } else {
            object.material.dispose()
          }
        }
      })
    }
  }, [isModelVisible, modelUrl])

  const getPlaceholder = () => (
    <Image
      width={1000}
      height={1000}
      priority
      draggable={false}
      src={placeholderSrc}
      alt={placeholderAlt}
      className={styles.modelPreview}
    />
  )

  return (
    <div className={styles.modelCanvas} ref={mountReference}>
      {!isModelVisible && getPlaceholder()}

      <div className={styles.printButtonWrapper}>
        <ButtonPrintNow modelUrl={modelUrl} />
      </div>

      <div className={styles.dimensionsButtonWrapper}>
        <ButtonSwitchDimension
          isModelVisible={isModelVisible}
          setModelVisible={setModelVisible}
        />
      </div>
    </div>
  )
}

export default ModelView
