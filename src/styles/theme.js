import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#06283D',
    },
    secondary: {
      main: '#205375',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#DFF6FF"
    }
  },
});

export default theme;