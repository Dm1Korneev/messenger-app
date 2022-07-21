import { amber, blue } from '@material-ui/core/colors';
import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
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
        '&:focus': {
          backgroundColor: 'transparent',
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
});

export default theme;
