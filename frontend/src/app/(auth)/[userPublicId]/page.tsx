import { Stack, VStack } from '@yamada-ui/react'
import { auth, currentUser, UserProfile } from '@clerk/nextjs'
import { UserService } from './services/user.service'

import { Suspense } from 'react'
import PostCard from '@/features/PostCards/components/PostCard/components/PostCard'

type Props = {
  params: { userPublicId: string }
}

export default async function Home(props: Props) {
  const { userPublicId } = props.params
  const { getToken, userId } = auth()
  const token = await getToken()
  const dbUser = await UserService().findByPublicId(token, userPublicId)
  if (!dbUser) return <div>Loading...</div>

  return (
    <Stack direction="column" minH="100vh" w="full">
      {/* <UserProfile /> */}
      <Suspense fallback={<div>Loading...</div>}>
        <VStack alignItems="center">
          {dbUser.posts?.map((post) => (
            <PostCard
              key={post.id}
              isCurrentUser={userId === dbUser.id}
              {...post}
              user={{ publicId: userPublicId, ...dbUser }}
            />
          ))}
        </VStack>
      </Suspense>
    </Stack>
  )
}
