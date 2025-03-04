import { Post } from './post'

export type User = Omit<DBUser, 'posts'>
export type CreateUser = Pick<User, 'id' | 'img_url' | 'nickname'>
export type DBUser = {
  id: string
  img_url?: string
  isPublic: boolean
  link?: string
  birthday?: Date
  comment?: string
  posts?: UserPost[]
  nickname: string
}

export type UserInit = {
  publicId: string
  nickname: string
  img_url?: string
}

export type UserPost = Omit<Post, 'user'>
