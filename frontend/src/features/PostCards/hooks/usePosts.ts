import { PostService } from '@/app/(auth)/home/services/post.service'
import { useAuth } from '@clerk/nextjs'

export const usePosts = () => {
  const { getToken } = useAuth()

  const findAll = async () => {
    const token = await getToken()
    try {
      const result = await PostService().findAll(token)
      return result
    } catch (err) {
      console.log(err)
    }
  }

  return { findAll }
}
