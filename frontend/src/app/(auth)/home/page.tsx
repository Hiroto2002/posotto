import { Center, Spacer, Stack } from '@yamada-ui/react'
import { PostService } from '@/app/(auth)/home/services/post.service'
import { Suspense } from 'react'
import PostCards from '@/features/PostCards/components/PostCards'
import { auth } from '@clerk/nextjs'

export default async function Home() {
  const { getToken, userId } = auth()
  const token = await getToken()
  const posts = await PostService().findAll(token)

  if (!posts) return <div>Loading...</div>

  return (
    <Stack direction="column" minH="100vh" w="full">
      <Center w="full">
        <Suspense fallback={<div>Loading...</div>}>
          <PostCards posts={posts} userId={userId ?? null} />
        </Suspense>
      </Center>
      <Spacer />
    </Stack>
  )
}
