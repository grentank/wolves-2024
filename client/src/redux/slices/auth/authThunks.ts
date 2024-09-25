import { createAsyncThunk } from '@reduxjs/toolkit';
import { ZodError } from 'zod';
import { AxiosError } from 'axios';
import authService from '../../../services/authService';
import { loginFormSchema } from '../../../schemas/authSchema';

export const loginThunk = createAsyncThunk(
  'auth/loginThunk',
  async (formData: FormData) => {
    try {
      const data = loginFormSchema.parse(Object.fromEntries(formData));
      const auth = await authService.login(data);
      return auth;
    } catch (error) {
      if (error instanceof ZodError) {
        console.log('Ошибка валидации при логине', error.issues);
      } else if (error instanceof AxiosError) {
        console.log('Ошибка запроса', error.response?.data);
      }
      throw error;
    }
  },
);

export const checkAuthThunk = createAsyncThunk('auth/checkAuthThunk', () =>
  authService.check(),
);

export const logoutThunk = createAsyncThunk('auth/logoutThunk', () =>
  authService.logout(),
);
