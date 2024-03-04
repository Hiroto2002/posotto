import { Divider, VStack } from '@yamada-ui/react'
import { Post } from '@/types/data/post'
import { NeumoBox } from './shared/elements/NeumoBox'
import PostBody from '../features/PostCards/components/PostCard/components/PostBody/components/PostBody'

interface PostCardsProps {
  posts: Post[]
}

export default function RepliesCard({ posts }: PostCardsProps) {
  const isCurrentUsersPost = true // TODO: implement
  return (
    <NeumoBox
      minH="7em"
      mx="md"
      w={{ base: '90%', lg: '90%' }}
      p="lg"
      m="md"
      borderRadius="40px"
    >
      <VStack alignItems="center">
        {posts.map((post) => (
          <>
            <PostBody
              key={post.id}
              post={post}
              hasLikeButton
              hasDeleteButton={isCurrentUsersPost}
            />
            <Divider />
          </>
        ))}
      </VStack>
    </NeumoBox>
  )
}
