import { createTheme } from '@mui/material';

export const appTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: ['Mitr', 'Kanit'].join(','),
    fontSize: 16,
    h3: {
      fontFamily: 'Kanit',
      fontSize: '32px',
    },
    h4: {
      fontFamily: 'Kanit',
      fontSize: '24px',
    },
    h5: {
      fontFamily: 'Kanit',
      fontSize: '18px',
    },
    body1: {
      fontFamily: 'Mitr',
      fontSize: '16px',
      fontWeight: '400',
    },
    body2: {
      fontFamily: 'Mitr',
      fontSize: '14px',
    },
    caption: {
      fontFamily: 'Mitr',
      fontSize: '12px',
    },
  },
});
