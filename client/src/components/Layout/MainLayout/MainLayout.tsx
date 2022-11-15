import { Box } from '@chakra-ui/react'
import React, { FC, ReactNode } from 'react'
import Header from '../Header/Header'

interface Props {
  children: ReactNode
}
const MainLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <Box className="p-4">{children}</Box>
    </>
  )
}

export default MainLayout
