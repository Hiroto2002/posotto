'use client'
import { Center, VStack } from '@yamada-ui/react'

import { Token } from '@/types/token'
import { useRecord } from '@/features/Menubar/components/PostInputDrawer/components/PostInput/hooks/useRecord'
import { DraftLayout } from './DraftLayout/components/DraftLayout'
import { usePost } from '../hooks/usePost'
import { RecordLayout } from './RecordLayout/components/RecordLayout'
import { NeumoIconButton } from '@/components/shared/elements/NeumoIconButton'
import { faMicrophone } from '@fortawesome/free-solid-svg-icons'
import { Icon as FontAwesomeIcon } from '@yamada-ui/fontawesome'

type PostInputProps = {
  token: Token
}

export default function PostInput(props: PostInputProps) {
  const { token } = props
  const {
    // audioBlob,
    isRecording,
    progress,
    transcript,
    handleStartRecording,
    handleStopRecording,
  } = useRecord()
  const { draftText, hasDraft, handlePostButtonClick, uploadAudioText } =
    usePost(
      // audioBlob,
      token,
    )

  return (
    <VStack gap="1em">
      {isRecording == false && hasDraft == false && (
        <Center >
          <NeumoIconButton
            iconElem={<FontAwesomeIcon icon={faMicrophone} fontSize="2xl" />}
            handleClick={handleStartRecording}
            isPressed={false}
            size="lg"
          />
        </Center>
      )}
      {isRecording == false && hasDraft == true && (
        <DraftLayout
          handlePostButtonClick={handlePostButtonClick}
          draftText={draftText}
        />
      )}
      {isRecording == true && (
        <RecordLayout
          progress={progress}
          handleStopRecording={() => handleStopRecording(uploadAudioText)}
          transcript={transcript}
        />
      )}
    </VStack>
  )
}
