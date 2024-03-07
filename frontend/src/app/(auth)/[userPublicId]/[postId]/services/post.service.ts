import { PostDetail } from '@/types/data/post'
import { fetchGet } from '@/utils/fetcher'

export const PostService = () => {
  const findByPublicId = async (token: string | null,postId:string): Promise<PostDetail | null> => {
    try {
      // fetchGetのシグネチャに合わせてtokenがnullの場合はundefinedを渡す
      const posts = await fetchGet<PostDetail>(`/posts/${postId}`, token ?? undefined);
      return posts.data;
    } catch (err) {
      console.error(err);
      // エラー時の戻り値としてnullを返すか、適切にハンドリング
      return null;
    }
  }

  return { findByPublicId };
}
