import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#5E8B7E',
    },
    secondary: {
      main: '#5E8B7E',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "white"
    }
  },
});

export default theme;