import React from 'react'
import { NeumoIconButton } from '@/components/shared/elements/NeumoIconButton'
import { Icon as FontAwesomeIcon } from '@yamada-ui/fontawesome'
import { faMicrophone } from '@fortawesome/free-solid-svg-icons'
import { ICON_BOX_SHADOW_PRESSED } from '@/variants'
import { Progress,Flex, Text} from '@yamada-ui/react'
import { SignedIn, UserButton } from '@clerk/nextjs'
import { NeumoBox } from '@/components/shared/elements/NeumoBox'

type Props = {
  progress: number
  transcript: string
  handleStopRecording: () => void
}

export const RecordLayout = (props: Props) => {
  const { progress, transcript, handleStopRecording } = props

  return (
    <>
      <NeumoBox
        w="full"
        z={10}
        sx={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
        }}
        px={5}
        h={'45vh'}
        boxShadow={'20px 20px 52px #fffffa,-20px -3px 52px #c8c3b8'}
      >
        <Flex
          direction={'row'}
          bottom={'11vh'}
          position={'relative'}
          w={'full'}
          px={2}
          align={'center'}
          gap={'calc(50% - 1.5rem - 32px)'}
        >
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <Text>{transcript ? transcript : '入力中...'}</Text>
        </Flex>
        <Progress
          value={progress}
          filledTrackColor={"#7a7368"}
          rounded="md"
          boxShadow={ICON_BOX_SHADOW_PRESSED}
          p="1px"
          bottom={'6vh'}
        />
        <NeumoIconButton
          iconElem={<FontAwesomeIcon icon={faMicrophone} fontSize="2xl" />}
          handleClick={handleStopRecording}
          isPressed={true}
          size="lg"
          bottom={'3vh'}
        />
      </NeumoBox>
    </>
  )
}
