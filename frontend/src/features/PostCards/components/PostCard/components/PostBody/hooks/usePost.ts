import { useRef, useState } from 'react'
import { PostService } from '../services/post.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Post } from '@/types/data/post'

export const usePost = () => {
  const [isLiked, setIsLiked] = useState(false)
  const [isCheckDelete, setIsCheckDelete] = useState(false)
  const deleteTimerRef = useRef<NodeJS.Timeout | number | undefined>(undefined)
  const Post = PostService()
  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: Post.Delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  const handleSetIsLiked = () => {
    setIsLiked(!isLiked)
  }
  const handleClickLike = (postId: number) => {
    handleSetIsLiked()
    // api通信の関数
  }
  const handleClickDelete = async (postId: number) => {
    //3秒後に確認を解除
    if (isCheckDelete) {
      // isCheckDeleteがtrueの場合、削除処理を実行
      deleteMutation.mutate(postId)

  
      setIsCheckDelete(false) // チェック状態を解除
      if (deleteTimerRef.current !== undefined) {
        clearTimeout(deleteTimerRef.current as NodeJS.Timeout) // タイマーをクリア
        deleteTimerRef.current = undefined
      }
    } else {
      // isCheckDeleteがfalseの場合、チェック状態をtrueにし、3秒後に解除
      setIsCheckDelete(true)
      if (deleteTimerRef.current !== undefined) {
        clearTimeout(deleteTimerRef.current as NodeJS.Timeout)
      }
      deleteTimerRef.current = setTimeout(() => {
        setIsCheckDelete(false)
        deleteTimerRef.current = undefined
      }, 3000)
      return null
    }
  }
  return { isLiked, isCheckDelete, handleClickLike, handleClickDelete }
}
