import { NeumoLinkBox } from '@/components/shared/elements/NeumoLinkBox'
import PostBody from './PostBody/components/PostBody'
import { Post } from '@/types/data/post'

type Props = Post & {
  isCurrentUser: boolean
}

export default function PostCard(props: Props) {
  const { user, id } = props
  return (
    <>
      <NeumoLinkBox
        href={`/${user.publicId}/${id}`}
        minH="7em"
        mx="md"
        w="90%"
        p="1.5em"
        m="sm"
        borderRadius="40px"
        overflow="hidden"
      >
        <PostBody {...props} />
      </NeumoLinkBox>
    </>
  )
}
