import React, { useEffect, useMemo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/pages/Layout';
import MainPage from './components/pages/MainPage';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { loadAllProductsThunk } from './redux/slices/product/productThunks';
import LoginPage from './components/pages/LoginPage';
import SignupPage from './components/pages/SignupPage';
import { checkAuthThunk } from './redux/slices/auth/authThunks';
import ProtectedRoute from './components/hoc/ProtectedRoute';
import { UserStatusEnum } from './schemas/authSchema';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const status = useAppSelector((store) => store.auth.user.status);

  useEffect(() => {
    void dispatch(loadAllProductsThunk());
    void dispatch(checkAuthThunk());
  }, []);

  const router = createBrowserRouter([
    {
      element: <Layout />,
      errorElement: <h1>404</h1>,
      children: [
        {
          path: '/',
          element: <MainPage />,
        },
        {
          errorElement: <h1>Ошибка страницы</h1>,
          element: <ProtectedRoute isAllowed={status === UserStatusEnum.guest} />,
          children: [
            {
              path: '/login',
              element: <LoginPage />,
            },
            {
              path: '/signup',
              element: <SignupPage />,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
