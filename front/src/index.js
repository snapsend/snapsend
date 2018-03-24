//@flow
import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-roboto';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import CssBaseline from 'material-ui/CssBaseline';
import JssProvider from './components/JssProvider';

// this is a simple change
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ffa995',
      main: '#ff7767',
      dark: '#c7463c',
      contrastText: '#33333',
    },
    secondary: {
      light: '#9ca0ff',
      main: '#6772e5',
      dark: '#2b47b2',
      contrastText: '#f4f4f4',
    },
  },
  typography: {
    color: '#333333',
    title: {
      fontSize: 22,
      fontWeight: 500,
      fontStyle: 'italic',
      color: '#333333',
    },
    display4: { color: '#333333' },
    display3: { color: '#333333' },
    display2: { color: '#333333' },
    display1: { color: '#333333' },
    headline: { color: '#333333' },
    body1: {
      fontSize: '1rem',
      color: '#333333',
    },
    body2: {
      fontSize: '1rem',
      color: '#333333',
    },
    button: {
      color: '#333333',
    },
  },
});

export const Root = () => (
  <JssProvider>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </MuiThemeProvider>
  </JssProvider>
);

function HelloWorld() {
  return <div>Hello world!</div>;
}
const el = document.getElementById('root');

el && ReactDOM.render(<Root />, el);
registerServiceWorker();
