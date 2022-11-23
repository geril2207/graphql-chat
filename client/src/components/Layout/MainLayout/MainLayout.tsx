import { Box } from '@chakra-ui/react'
import React, { FC, ReactNode } from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'

interface Props {
  children: ReactNode
}
const MainLayout: FC<Props> = ({ children }) => {
  return (
    <Box className="flex flex-col min-h-screen">
      <Header />
      <Box className="p-4 h-full flex flex-grow flex-col">{children}</Box>
      <Footer />
    </Box>
  )
}

export default MainLayout
