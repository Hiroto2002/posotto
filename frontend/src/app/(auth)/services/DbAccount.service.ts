import { CreateUser, User } from '@/types/data/user'
import { Token } from '@/types/token'
import { fetchGet, fetchPost, fetchPut } from '@/utils/fetcher'
import { User as ClerkUser } from '@clerk/nextjs/server'

export const DbAccountService = (token: Token) => {
  if (!token) {
    return
  }

  const isChecked = async (clerkUser: ClerkUser) => {
    try {
      // fetchGetのシグネチャに合わせてtokenがnullの場合はundefinedを渡す
      const result = await fetchGet<User>(`/user`, token)
      console.log(result)
      const user = result.data
      if (!user) {
        return { isCreated: false, isChanged: null }
      }
      if (
        user.img_url !== clerkUser.imageUrl ||
        user.nickname !== clerkUser.lastName
      ) {
        return { isCreated: true, isChanged: true }
      }
      return { isCreated: true, isChanged: false }
    } catch (err) {
      console.error(err)
      // エラー時の戻り値としてnullを返すか、適切にハンドリング
      return null
    }
  }

  const createUser = async (user: ClerkUser) => {
    const { id, lastName, imageUrl } = user

    const userBody: CreateUser = {
      id: id,
      nickname: lastName ?? 'no name',
      img_url: imageUrl,
    }
    console.log(userBody)
    try {
      await fetchPost<void, CreateUser>(`/user`, userBody, token)
      return
    } catch (err) {
      console.error(err)
      // エラー時の戻り値としてnullを返すか、適切にハンドリング
      return null
    }
  }

  const updateUser = async (user: ClerkUser) => {
    const { id, lastName, imageUrl } = user

    const userBody: CreateUser = {
      id: id,
      nickname: lastName ?? 'no name',
      img_url: imageUrl,
    }
    try {
      await fetchPut<void, CreateUser>(`/user`, userBody, token)
      return
    } catch (err) {
      console.error(err)
      // エラー時の戻り値としてnullを返すか、適切にハンドリング
      return null
    }
  }

  return { createUser, isChecked, updateUser }
}
