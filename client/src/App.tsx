import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/pages/Layout';
import MainPage from './components/pages/MainPage';
import { useAppDispatch } from './components/providers/redux/hooks';
import { loadAllProductsThunk } from './components/providers/redux/slices/productThunks';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(loadAllProductsThunk());
  }, []);

  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <MainPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
