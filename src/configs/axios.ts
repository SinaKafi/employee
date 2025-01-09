import axios, {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});
axiosInstance.interceptors.request.use(
  (request: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem("token");
    if (token) {
      request.headers["Authorization"] = `Bearer ${token}`;
    }
    return request;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  async function (error: AxiosError): Promise<AxiosError> {
    if (error.response.status === 401) {
      localStorage.clear();
      window.location.href = window.location.origin + "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
