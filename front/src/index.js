import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.bs.js';
import registerServiceWorker from './registerServiceWorker';
import { getMuiTheme, MuiThemeProvider } from 'material-ui/styles';

const theme = getMuiTheme({
  palette: {
    primary: {
      light: '#ffa995',
      main: '#ff7767',
      dark: '#c7463c',
      contrastText: '#333',
    },
    secondary: {
      light: '#9ca0ff',
      main: '#6772e5',
      dark: '#2b47b2',
      contrastText: '#f4f4f4',
    },
  },
});

export const Root = () => (
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
