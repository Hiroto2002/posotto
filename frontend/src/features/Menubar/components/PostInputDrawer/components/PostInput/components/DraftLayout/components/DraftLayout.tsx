import { NeumoBox } from '@/components/shared/elements/NeumoBox'
import { NeumoButton } from '@/components/shared/elements/NeumoButton'
import { NeumoIconButton } from '@/components/shared/elements/NeumoIconButton'
import { SignedIn, UserButton } from '@clerk/nextjs'
import { HStack, Box, Text, Flex } from '@yamada-ui/react'
import { Icon as FontAwesomeIcon } from '@yamada-ui/fontawesome'
import { faMicrophone } from '@fortawesome/free-solid-svg-icons'

type Props = {
  draftText?: string
  handlePostButtonClick: () => void
  handleStartRecording: () => void
}

export const DraftLayout = (props: Props) => {
  const { draftText, handlePostButtonClick, handleStartRecording } = props
  return (
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
        bottom={'13vh'}
        position={'relative'}
        w={'full'}
        px={2}
        align={'center'}
        gap={'calc(50% - 1.5rem - 32px)'}
        justify={'space-between'}
      >
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>

        {}
        <NeumoButton
          handleClick={handlePostButtonClick}
          w="6em"
          fontWeight="md"
          isDark
        >
          ぽそっ
        </NeumoButton>
      </Flex>
      <Text bottom={'13vh'} pos={'absolute'}>
        {draftText}
      </Text>
      <NeumoIconButton
        iconElem={<FontAwesomeIcon icon={faMicrophone} fontSize="2xl" />}
        handleClick={handleStartRecording}
        isPressed={false}
        size="lg"
        bottom={'3vh'}
      />
    </NeumoBox>
  )
}
