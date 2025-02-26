import React from 'react'
import styles from './button.module.scss'

const ButtonPrintNow: React.FC<{ modelUrl: string }> = ({ modelUrl }) => {
  return (
    <a
      href={`curademo://open?file?file=${modelUrl}`}
      rel='noreferrer'
      target='_blank'
      className={styles.button}
    >
      Print Now
    </a>
  )
}

export default ButtonPrintNow
