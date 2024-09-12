import React from 'react';
import Layout from '../components/Layout';
import MainPage from '../components/pages/MainPage';
import ProtectedRoute from '../components/hoc/ProtectedRoute';
import LatestMessagesPage from '../components/pages/LatestMessagesPage';
import MessageInfoPage from '../components/pages/MessageInfoPage';
import SignupPage from '../components/pages/SignupPage';
import LoginPage from '../components/pages/LoginPage';
import EffectPage from '../components/pages/EffectPage';

export default function useAppRoutes(user) {
  return [
    {
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <MainPage />,
        },
        {
          path: '/effect',
          element: <EffectPage />,
        },
        {
          element: <ProtectedRoute isAllowed={!!user} redirectPath="/login" />,
          children: [
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
        {
          element: <ProtectedRoute isAllowed={!user} redirectPath="/" />,
          children: [
            {
              path: '/signup',
              element: <SignupPage />,
            },
            {
              path: '/login',
              element: <LoginPage />,
            },
          ],
        },
      ],
    },
  ];
}
