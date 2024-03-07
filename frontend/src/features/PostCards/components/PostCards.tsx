'use client'
import { Post } from '@/types/data/post'
import { VStack } from '@yamada-ui/react'
import PostCard from '@/features/PostCards/components/PostCard/components/PostCard'
import { useQuery } from '@tanstack/react-query'
import { usePosts } from '@/features/PostCards/hooks/usePosts'
// import { User } from '@clerk/nextjs/server'

type PostCardProps = {
  userId: string|null
  posts: Post[]
}

export default function PostCards(props: PostCardProps) {
  const { posts,userId } = props
  const { findAll } = usePosts()
  const { data } = useQuery({
    queryKey: ['posts'],
    queryFn: findAll,
    initialData: posts,
  })

  return (
    <VStack alignItems="center">
      {data?.map((post) => (
        <PostCard
          key={post.id}
          isCurrentUser={userId === post.user.id}
          {...post}
        />
      ))}
    </VStack>
  )
}
