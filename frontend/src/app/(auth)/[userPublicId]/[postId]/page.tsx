import { Center, Spacer, Stack, VStack } from '@yamada-ui/react'

import PostCard from '@/features/PostCards/components/PostCard/components/PostCard'
import RepliesCard from '@/components/RepliesCard'
import { PostService } from './services/post.service'
import { auth } from '@clerk/nextjs'

type Props = {
  params: { userId: string; postId: string }
}
const PostDetail = async (props: Props) => {
  const { params } = props
  const postDetail = await PostService().findByPublicId(null, params.postId)

  if (!postDetail) {
    return <div>Post not found</div>
  }
  const { comments ,...post} = postDetail

  const user = auth
  const isCurrentUser = user.name === post.user.nickname
  
  return (
    <Stack direction="column" minH="100vh" w="full" alignItems="center">
      <PostCard {...post} isCurrentUser={isCurrentUser} />
      {/* <RepliesCard posts={posts} /> */}
      <Spacer />
    </Stack>
  )
}
export default PostDetail
