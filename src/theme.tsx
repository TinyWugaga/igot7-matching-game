import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

const sizes = {
  header: {
    sm: '7em',
    md: '8em',
    lg: '6em'
  },
  footer: {
    sm: '6em',
    md: '9em',
    lg: '9em'
  },
  main: {
    width: {
      sm: '26em',
      md: '45em',
      lg: '50em'
    },
    height: {
      sm: 'calc(100% - 13em)',
      md: 'calc(100% - 17em)',
      lg: 'calc(100% - 15em)'
    }
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

const fontSizes = { 
  heading: {
    sm: "1.8em",
    md: "3.2em",
    lg: "4em"
  }
 }

const breakpoints = createBreakpoints({
  sm: '30em', // 16:480
  md: '48em', // 16:768
  lg: '64em', // 16:1024
  xl: '80em', // 16:1280
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
        default: 'rgba(80, 170, 91, 1)',
        _dark: '#a8d18b',
      }
    },
  },
  sizes,
  space,
  
  colors,
  fonts,
  fontSizes,

  breakpoints,
})

export default theme
