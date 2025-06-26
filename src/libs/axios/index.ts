import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";
// import { useCookies } from "vue3-cookies";
import { config as globalConfig } from "@/config";
// import { COOKIES } from "@/types";
// import { router, store } from "@/main";

const apiUrl =
  globalConfig.apiUrl === "production"
    ? `https://${globalConfig.apiUrl}`
    : globalConfig.apiUrl;

let inMemoryAxiosInstance: AxiosInstance;

const defaultConfig = {
  baseURL: apiUrl || "http://localhost:5173",
  timeout: Number(globalConfig.timeout) || 10000,
  headers: {},
  router: null,
};

/**
 * Create a new Axios custom instance
 */
export const createNewInstance = (newConfig = {}): AxiosInstance => {
  const config = { ...defaultConfig, ...newConfig };
  const instance = axios.create(config);
  instance.interceptors.request.use(onRequest, onRequestError);
  instance.interceptors.response.use(onResponse, onResponseError);
  inMemoryAxiosInstance = instance;
  return instance;
};

export const getAxiosError = (
  error: Error | AxiosError
): { statusCode: number; message: string } | Error => {
  if (axios.isAxiosError(error) && error.response) {
    return error.response.data as { statusCode: number; message: string };
  }
  return error;
};

import type { InternalAxiosRequestConfig } from "axios";
import { useCookies } from "vue3-cookies";
import { COOKIES } from "@/types/cookies";
import router from "@/router";

const onRequest = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const { cookies } = useCookies();
  const token = cookies.get(COOKIES.CONNECTION_TOKEN);

  if (config?.headers && token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = (error: any) => {
  if (error.response?.data.message.match(/Invalid or expired Token/gi)) {
    //store.commit(`user/${MUTATION_TYPES.DISCONNECT}`);

    //return router.push("/");
  }
  return Promise.reject(error);
};

export { inMemoryAxiosInstance as axios };
