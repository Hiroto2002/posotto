import { Box, Grid, GridItem } from '@yamada-ui/react'
import LeftSidebar from '@/components/LeftSidebar'
import RightSidebar from '@/components/RightSidebar'
import Menubar from '@/features/Menubar/components/Menubar'
import Topbar from '@/components/Topbar'
import { BG_COLOR } from '@/variants'
import QueryProvider from '@/providers/QueryProvider'
import { auth, currentUser } from '@clerk/nextjs'
import { DbAccountService } from './services/DbAccount.service'
import { User } from '@clerk/nextjs/server'

const AuthLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const clerkUser = (await currentUser()) as User
  const { getToken } = await auth()
  const token = await getToken()
  const User = DbAccountService(token)
  const isChecked = await User?.isChecked(clerkUser)
  if (!isChecked?.isCreated) {
    User?.createUser(clerkUser)
  }
  if (isChecked?.isChanged) {
    User?.updateUser(clerkUser)
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

export default AuthLayout
