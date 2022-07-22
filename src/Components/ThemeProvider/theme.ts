import { amber, blue } from '@mui/material/colors';
import { createTheme, adaptV4Theme } from '@mui/material/styles';

const theme = createTheme(adaptV4Theme({
  palette: {
    primary: blue,
    secondary: amber,
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          'font-family': 'Roboto',
        },
        body: {
          margin: 0,
        },
      },
    },
    MuiListItem: {
      button: {
        '&$selected': {
          backgroundColor: blue[100],
        },
        '&$selected:focus': {
          backgroundColor: blue[100],
        },
        '&$selected:hover': {
          backgroundColor: blue[300],
        },
        '&:hover': {
          backgroundColor: blue[300],
        },
        '&:hover:focus': {
          backgroundColor: blue[300],
        },
      },
    },
  },
}));

export default theme;
