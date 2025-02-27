'use client'

import React from 'react'
import Image from 'next/image'
import styles from './buttonwrappercircle.module.scss'

const ButtonWrapperCircle: React.FC<{
  onClick: React.MouseEventHandler<HTMLButtonElement>
  alt: string
  src: string
}> = ({ onClick, alt, src }) => (
  <button className={styles.button} onClick={onClick}>
    <Image src={src} alt={alt} width={10} height={10} />
  </button>
)

export default ButtonWrapperCircle
