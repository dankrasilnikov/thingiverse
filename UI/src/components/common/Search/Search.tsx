'use client'

import React from 'react'
import styles from './search.module.scss'

const Search: React.FC<{}> = () => (
  <input type='text' placeholder='Search' className={styles.inputSearch} />
)

export default Search
