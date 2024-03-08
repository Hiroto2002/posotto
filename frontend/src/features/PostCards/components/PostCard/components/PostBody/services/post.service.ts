import { fetchDelete } from '@/utils/fetcher'

export const PostService = () => {
  const Delete = async (postId: number) => {
    try {
      const result = await fetchDelete<{ id: number }>(`/posts/${postId}`)
      return result.data
    } catch (error) {
      console.error(error)
    }
  }
  return { Delete }
}
