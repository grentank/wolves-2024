import React from 'react';
import AppProvider from './providers/AppProvider';
import AppRouterProvider from './router/AppRouterProvider';

function App(): JSX.Element {
  return (
    <AppProvider>
      <AppRouterProvider />
    </AppProvider>
  );
}

export default App;
