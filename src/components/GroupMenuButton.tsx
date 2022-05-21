import { IconButton } from '@chakra-ui/react'
import { ArrowRightIcon } from '@chakra-ui/icons'

type GroupMenuButtonProps = {
  onClick: () => void
}

export const GroupMenuButton = ({ onClick }:GroupMenuButtonProps) => {
  return (
    <IconButton
      position="fixed"
      top={16}
      right={4}
      icon={<ArrowRightIcon />}
      aria-label="Next Game"
      colorScheme="green"
      onClick={onClick}
    />
  )
}
