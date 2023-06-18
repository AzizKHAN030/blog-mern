import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import App from './App';

import './index.scss';
import { theme } from './theme';
import store from './redux/store.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <>
        <CssBaseline />
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Provider store={store}>
                    <App />
                </Provider>
            </BrowserRouter>
        </ThemeProvider>
    </>,
);
