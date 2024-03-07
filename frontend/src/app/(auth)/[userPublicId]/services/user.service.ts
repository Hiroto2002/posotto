import { Post } from '@/types/data/post'
import { DBUser, User } from '@/types/data/user'
import { Token } from '@/types/token'
import { fetchGet } from '@/utils/fetcher'

export const UserService = () => {
  const findByPublicId = async (token: Token, PublicId: string) => {
    try {
      if (token === null) return null
      // front で無理やり型を合わせているため、パフォーマンスが良くないかも
      const result = await fetchGet<DBUser>(`/user/${PublicId}`, token)
      const DBUser = result.data
      if (!DBUser) return null
      const user: DBUser = {
        ...DBUser,
        posts: DBUser?.posts?.map((post) => ({
          ...post,
          user: {
            id: DBUser.id,
            nickname: DBUser.nickname,
            img_url: DBUser.img_url,
            isPublic: DBUser.isPublic,
            publicId: PublicId,
          },
        })),
      }
      return user
    } catch (err) {
      console.log(err)
      return null
    }
  }
  return { findByPublicId }
}
