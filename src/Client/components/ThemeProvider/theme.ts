import { amber, blue } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: blue,
    secondary: amber,
  },
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: blue[100],
          },
          '&:hover': {
            backgroundColor: blue[300],
          },
          '&.Mui-selected:hover': {
            backgroundColor: blue[300],
          },
        },
      },
    },
  },
});

export default theme;
