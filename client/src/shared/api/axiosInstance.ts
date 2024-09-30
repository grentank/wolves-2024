import type { AxiosError } from 'axios';
import axios from 'axios';
import { backendAuthSchema } from '../../entities/auth/model/schema';
import type { AppStore } from '../../app/lib/store';

let store: AppStore | null = null;

export function injectStore(_store: AppStore): void {
  store = _store;
}

const axiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  if (!config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${store?.getState().auth.accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (err: AxiosError & { config: { sent?: boolean } }) => {
    // err.response <-- при ошибке, где найти ответ (статус, data)
    // err.config <-- при ошибке, где найти запрос (url, method, body)
    const prevRequest = err.config; // необходимо чтобы понять что это второй запрос
    if (err.response?.status === 403 && !prevRequest.sent) {
      prevRequest.sent = true;
      const res = await axios('/api/tokens/refresh');
      const { accessToken } = backendAuthSchema.parse(res.data);
      store?.dispatch({ type: 'auth/setAccessToken', payload: accessToken });
      prevRequest.headers.Authorization = `Bearer ${accessToken}`;
      return axiosInstance(prevRequest);
    }
    return Promise.reject(err);
  },
);

export default axiosInstance;
