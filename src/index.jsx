import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App.jsx';
import { Provider } from 'react-redux';
import store from './store.js';
import './index.css';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  
  <Provider store={store}>
    <App />
  </Provider>
);
