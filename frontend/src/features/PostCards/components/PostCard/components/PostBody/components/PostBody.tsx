'use client'
import { Box, Text, Avatar, VStack, HStack, Spacer } from '@yamada-ui/react'
import { Icon as FontAwesomeIcon } from '@yamada-ui/fontawesome'
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons'
import {
  faHeart as faRegularHeart,
  faTrashCan,
  faComment,
} from '@fortawesome/free-regular-svg-icons'
import { Post } from '@/types/data/post'
import { useCustomRouter } from '@/hooks/useCustomRouter'
import { NeumoIconButton } from '../../../../../../../components/shared/elements/NeumoIconButton'
import { postBodyInfo } from '@/features/PostCards/components/PostCard/components/PostBody/utils'
import { usePost } from '../hooks/usePost'

type Props = Post & {
  isCurrentUser: boolean
}

export default function PostBody(props: Props) {
  const { isCurrentUser, ...post } = props
  const { isLiked, isCheckDelete, handleClickLike, handleClickDelete } =
    usePost()
  const { handlePushRouter } = useCustomRouter()
  // todo:これは取得時にやるべきビジネスロジックかも
  const { contentOpacity, timeSinceText } = postBodyInfo(post)
  return (
    <>
      <HStack gap="0" alignItems="start" w="full">
        <VStack gap="0.8em" ps="md">
          <HStack gap="1em" justify="space-between">
            <Avatar
              size="sm"
              opacity={contentOpacity}
              src={post.user.img_url}
            />
            <VStack gap="0">
              <Text fontWeight="bold" opacity={contentOpacity}>
                {post.user.nickname}
              </Text>
              <Text fontSize="2xs" opacity={contentOpacity}>
                {timeSinceText}
              </Text>
            </VStack>
            <Spacer />
            {isCurrentUser && (
              <NeumoIconButton
                iconElem={
                  <>
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      fontSize="md"
                      opacity={contentOpacity}
                    />
                    {isCheckDelete && (
                      <Text fontSize="sm" opacity={contentOpacity}>
                        ?
                      </Text>
                    )}
                  </>
                }
                handleClick={() => handleClickDelete(post.id)}
              />
            )}
          </HStack>
          <Box w={{ base: 'full', lg: '90%' }} pe="md">
            <Text
              opacity={contentOpacity}
              wordBreak="keep-all"
              overflowWrap="anywhere"
            >
              {post.content}
            </Text>
          </Box>
          <HStack>
            {isCurrentUser || (
              <>
                <NeumoIconButton
                  isPressed={isLiked}
                  handleClick={() => handleClickLike(post.id)}
                  iconElem={
                    <FontAwesomeIcon
                      icon={isLiked ? faSolidHeart : faRegularHeart}
                      fontSize="sm"
                      opacity={contentOpacity}
                    />
                  }
                />
                <NeumoIconButton
                  handleClick={() =>
                    handlePushRouter(`/${post.user.publicId}/${post.id}`)
                  }
                  iconElem={
                    <FontAwesomeIcon
                      icon={faComment}
                      fontSize="sm"
                      opacity={contentOpacity}
                    />
                  }
                />
              </>
            )}
          </HStack>
        </VStack>
      </HStack>
    </>
  )
}
