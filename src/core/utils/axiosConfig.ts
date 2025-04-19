import axios from "axios";
import { getToken, removeToken, setToken } from "@/core/utils/auth";
import router from "@/router";

enum ErrorCode {
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: any) => void;
}> = [];
let isRefreshing = false;

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });

  failedQueue = [];
};
// Crear una instancia de Axios con configuración base
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // URL base de la API
  timeout: 5000, // Tiempo máximo de espera
  headers: {
    "Content-Type": "application/json",
  },
});

// 🛠 Interceptor para agregar token de autenticación en cada petición
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ⚠️ Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response) {
      // Si el servidor responde con error (ej. 401, 403, 500)
      console.error("Error de respuesta:", error.response.data);
      if (
        error.response.status === ErrorCode.UNAUTHORIZED &&
        !originalRequest._retry
      ) {
        // removeToken();
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return api(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }
        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const currentToken = getToken();
          const response = await api.post("/v1/auth/refresh", {
            token: currentToken,
          });

          const { access_token } = response.data;
          setToken(access_token);
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          processQueue(null, access_token);
          return api(originalRequest);
        } catch (refreshError) {
          console.error("Error al renovar el token:", refreshError);
          processQueue(refreshError, null);

          removeToken();
          router.replace("/login");
          return Promise.reject(refreshError);
        }
      }
    } else if (error.request) {
      console.error("No hay respuesta del servidor");
    } else {
      console.error("Error en la petición:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
