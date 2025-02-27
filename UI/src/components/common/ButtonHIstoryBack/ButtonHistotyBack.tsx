'use client'

import React from 'react'
import ButtonWrapperCircle from '@/components/common/ButtonWrapperCircle/ButtonWrapperCircle'

const ButtonHistoryBack: React.FC<{}> = () => {
  const backHistory = () => {
    window.history.back()
  }

  return (
    <ButtonWrapperCircle
      src='/icons/arrow_back.svg'
      alt='Back History'
      onClick={backHistory}
    />
  )
}

export default ButtonHistoryBack
