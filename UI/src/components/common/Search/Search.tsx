'use client'

import React from 'react'
import styles from './search.module.scss'

const Search: React.FC<{}> = () => {
  return (
    <input type='text' placeholder='Search' className={styles.inputSearch} />
  )
}

export default Search
