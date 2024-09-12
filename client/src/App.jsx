import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Loader from './components/hoc/Loader';
import useAuth from './hooks/useAuth';
import AuthContext from './contexts/authContext';
import useAppRoutes from './hooks/useAppRoutes';

function App() {
  const { user, signupHandler, loginHandler, logoutHandler } = useAuth();

  const appRoutes = useAppRoutes(user);
  const router = createBrowserRouter(appRoutes);

  // if (user === undefined) return <Spinner>Loading...</Spinner>;

  return (
    <AuthContext.Provider value={{ user, signupHandler, loginHandler, logoutHandler }}>
      <Loader isLoading={user === undefined}>
        <RouterProvider router={router} />
      </Loader>
    </AuthContext.Provider>
  );
}

export default App;
