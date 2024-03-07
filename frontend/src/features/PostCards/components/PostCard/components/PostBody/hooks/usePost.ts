import { useState } from 'react'

export const usePost = () => {
  const [isLiked, setIsLiked] = useState(false)
  
  const handleSetIsLiked = () => {
    setIsLiked(!isLiked)
  }
  const handleClickLike = (postId: number) => {
    handleSetIsLiked()
    // api通信の関数
  }
  const handleClickDelete =(postId:number)=>{

  }
  return { isLiked, handleClickLike,handleClickDelete }
}
