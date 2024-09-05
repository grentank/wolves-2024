import React from 'react';
import NavigationBar from './components/ui/NavigationBar';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import MainPage from './components/pages/MainPage';
import LatestMessagesPage from './components/pages/LatestMessagesPage';
import MessageInfoPage from './components/pages/MessageInfoPage';

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <MainPage />,
        },
        {
          path: '/latest',
          element: <LatestMessagesPage />,
        },
        {
          path: '/messages/:messageId', // /messages/17, useParams()
          element: <MessageInfoPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
