import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

const sizes = {
  header: {
    sm: '7em',
    md: '8em',
    lg: '8em'
  },
  footer: {
    sm: '5em',
    md: '8em',
    lg: '8em'
  },
  mainHeight: {
    sm: 'calc(100% - 12em)',
    md: 'calc(100% - 16em)',
    lg: 'calc(100% - 16em)'
  }
}

const space = {
  footer: {
    sm: '1.6rem',
    md: '2rem',
    lg: '2.6rem'
  }
}

const colors = {
  black: '#16161D'
}

const fonts = { mono: `'Menlo', monospace` }

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
})

const theme = extendTheme({
  semanticTokens: {
    colors: {
      text: {
        default: '#16161D',
        _dark: '#ade3b8',
      },
      heroGradientStart: {
        default: '#7928CA',
        _dark: '#e3a7f9',
      },
      heroGradientEnd: {
        default: '#FF0080',
        _dark: '#fbec8f',
      },
      ahgasae: {
        default: '#54812c',
        _dark: '#a8d18b',
      }
    },
  },
  sizes,
  space,
  
  colors,
  fonts,
  breakpoints,
})

export default theme
