import React, { useEffect, useState } from 'react';
import NavigationBar from './components/ui/NavigationBar';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import MainPage from './components/pages/MainPage';
import LatestMessagesPage from './components/pages/LatestMessagesPage';
import MessageInfoPage from './components/pages/MessageInfoPage';
import SignupPage from './components/pages/SignupPage';
import LoginPage from './components/pages/LoginPage';
import axiosInstance, { setAccessToken } from './service/axiosInstance';

function App() {
  const [user, setUser] = useState();

  const signupHandler = async (e, formData) => {
    e.preventDefault();
    const res = await axiosInstance.post('/auth/signup', formData);
    const newUser = res.data.user;
    setUser(newUser);
    setAccessToken(res.data.accessToken);
  };

  const logoutHandler = async () => {
    await axiosInstance.get('/auth/logout');
    setUser(null);
    setAccessToken('');
  };

  useEffect(() => {
    axiosInstance('/tokens/refresh')
      .then((res) => {
        setUser(res.data.user);
        setAccessToken(res.data.accessToken);
      })
      .catch(() => setUser(null));
  }, []);

  const router = createBrowserRouter([
    {
      element: <Layout user={user} logoutHandler={logoutHandler} />,
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
        {
          path: '/signup',
          element: <SignupPage signupHandler={signupHandler} />,
        },
        {
          path: '/login',
          element: <LoginPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
