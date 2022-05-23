import { useColorMode, IconButton } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  return (
    <IconButton
      width="fit-content"
      bgColor="green.500"
      bgGradient="linear(to-r, teal.500, green.500)"
      color="whiteAlpha.900"
      aria-label="Toggle Theme"
      icon={isDark ? <SunIcon /> : <MoonIcon />}
      onClick={toggleColorMode}
    />
  )
}
