import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from '@routes/index';

import AppProvider from '@hooks/index';

import GlobalStyle from './styles/global';

const App: React.FC = () => {
  return (
    <Router>
      <AppProvider>
        <Routes />
      </AppProvider>

      <GlobalStyle />
    </Router>
  );
};

export default App;
