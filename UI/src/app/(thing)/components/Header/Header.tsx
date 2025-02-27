import React from 'react'
import ButtonHistoryBack from '@/components/common/ButtonHIstoryBack'
import ButtonThreeDots from '@/components/common/ButtonThreeDots'
import Search from '@/components/common/Search/Search'
import styles from './header.module.scss'

const Header: React.FC = () => (
  <header className={styles.header}>
    <ButtonHistoryBack />
    <Search />
    <ButtonThreeDots />
  </header>
)

export default Header
