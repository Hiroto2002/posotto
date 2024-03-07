import {
    Box,
    Grid,
    GridItem,
  } from '@yamada-ui/react'
  import LeftSidebar from '@/components/LeftSidebar'
import RightSidebar from '@/components/RightSidebar'
import Menubar from '@/features/Menubar/components/Menubar'
import Topbar from '@/components/Topbar'
import { BG_COLOR } from '@/variants'
import QueryProvider from '@/providers/QueryProvider'
import { currentUser } from '@clerk/nextjs'
export const AuthLayout = async({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const user = await currentUser()
  const userData = {
    id: user?.id || '',
    name: user?.firstName || '',
    imageUrl: user?.imageUrl || '',
  }
  return (
    <QueryProvider>
      <Topbar />
      <Box w="full">
        <Grid
          templateColumns={{ base: '0fr auto 0fr', lg: '1fr auto 1fr' }}
          bgColor={BG_COLOR}
        >
          <GridItem>
            <LeftSidebar />
          </GridItem>
          <GridItem w={{ base: 'full', lg: '61em' }} py="6em">
            {children}
          </GridItem>
          <GridItem>
            <RightSidebar />
          </GridItem>
        </Grid>
      </Box>
      <Menubar />
    </QueryProvider>
  )
}
