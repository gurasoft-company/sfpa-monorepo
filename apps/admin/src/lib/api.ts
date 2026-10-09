import axios, { AxiosError } from 'axios';

export const TOKEN_KEY = 'sfpa_token';
export const USER_KEY = 'sfpa_user';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3001/api',
  withCredentials: true,
  // ⚠️ PAS de Content-Type par défaut : Axios choisit
  //    - application/json pour un objet
  //    - multipart/form-data (avec boundary) pour un FormData
});

// ─── Injection du JWT ───────────────────────────────────
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ─── Gestion globale des erreurs ────────────────────────
apiClient.interceptors.response.use(
  (res) => res,
  (error: AxiosError<{ message?: string }>) => {
    const status = error.response?.status;
    const url = error.config?.url ?? '';
    const isLoginCall = url.includes('/auth/login');

    if (status === 401 && !isLoginCall) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;

export function getApiErrorMessage(
  error: unknown,
  fallback = 'Une erreur est survenue'
): string {
  if (axios.isAxiosError(error)) {
    return (error.response?.data as { message?: string } | undefined)?.message ?? error.message;
  }
  if (error instanceof Error) return error.message;
  return fallback;
}