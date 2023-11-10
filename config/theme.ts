import { PaletteColorOptions, createTheme } from '@mui/material'

// Create a theme instance.
const theme = createTheme({
  shape: {
    borderRadius: 8,
  },
  palette: {
    primary: {
      main: '#034EA1',
    },
    secondary: {
      main: '#00adee',
      contrastText: '#fff',
    },
    light: {
      main: '#fff',
      contrastText: '#fff',
    },
    gray: {
      main: '#999999',
      contrastText: '#F1F7FF',
    },
  },
  typography: {
    button: {
      textTransform: 'none',
    },
    fontFamily: [
      'Roboto',
      'Poppins',
      'system-ui',
      '-apple-system',
      "'Segoe UI'",
      "'Helvetica Neue'",
      "'Noto Sans'",
      "'Liberation Sans'",
      'Arial',
      'sans-serif',
      "'Apple Color Emoji'",
      "'Segoe UI Emoji'",
      "'Segoe UI Symbol'",
      "'Noto Color Emoji'",
    ].join(','),
  },
  components: {
    // button padding increase
    // MuiButton: {
    //   styleOverrides: {
    //     root: {
    //       padding: '10px 20px',
    //       fontSize: '1.125rem',
    //     },
    //   },
    // },
    //  button padding increase for large size
    MuiButton: {
      variants: [
        {
          props: { size: 'large' },
          style: {
            padding: '10px 20px',
            fontSize: '1.125rem',
          },
        },
        {
          props: { color: 'secondary', variant: 'contained' },
          style: {
            color: '#fff',
          },
        },
      ],
    },
    // clip padding increase
    MuiChip: {
      styleOverrides: {
        root: {
          padding: '4px 12px',
          fontSize: '0.875rem',
        },
      },
    },
    // MenuItem
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: '1.125rem',
        },
      },
    },
  },
})

declare module '@mui/material' {
  interface Palette {
    light: Palette['primary']
    gray: Palette['primary']
  }

  interface PaletteOptions {
    light: PaletteOptions['primary']
    gray: PaletteOptions['primary']
  }
  interface ButtonPropsColorOverrides {
    light: true
    gray: true
  }

  interface IconButtonPropsColorOverrides {
    light: true
    gray: true
  }
}

export default theme
