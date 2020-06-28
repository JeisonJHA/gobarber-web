import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import 'dotenv/config';
import dotenv from 'dotenv';
import Routes from './routes';

import GlobalStyles from './styles/global';
import AppProvider from './hooks';

dotenv.config({
  path: process.env.NODE_ENV === 'development' ? '.env.dev' : '.env.production',
});

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes />
      </AppProvider>

      <GlobalStyles />
    </BrowserRouter>
  );
};

export default App;
