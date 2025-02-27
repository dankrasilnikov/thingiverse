import React from 'react'
import styles from './buttonswitchdimension.module.scss'

const ButtonSwitchDimensions: React.FC<{
  isModelVisible: boolean
  setModelVisible: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ isModelVisible, setModelVisible }) => (
  <button
    className={styles.buttonSwitchDimensions}
    onClick={() => setModelVisible(!isModelVisible)}
  >
    {isModelVisible ? 'View 2D' : 'View 3D'}
  </button>
)

export default ButtonSwitchDimensions
