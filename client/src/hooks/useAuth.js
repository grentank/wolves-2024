import { useEffect, useState } from 'react';
import axiosInstance, { setAccessToken } from '../service/axiosInstance';

export default function useAuth() {
  const [user, setUser] = useState();

  const signupHandler = async (e, formData) => {
    e.preventDefault();
    const res = await axiosInstance.post('/auth/signup', formData);
    const newUser = res.data.user;
    setUser(newUser);
    setAccessToken(res.data.accessToken);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    const res = await axiosInstance.post('/auth/login', data);
    setUser(res.data.user);
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

  return { user, signupHandler, loginHandler, logoutHandler };
}
