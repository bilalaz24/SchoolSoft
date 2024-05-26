import axios from "axios";
import router from "./router";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
});

const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  const response = await axios.post("http://localhost:5000/api/users/token", {
    token: refreshToken,
  });
  return response.data.accessToken;
};

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshToken();
        localStorage.setItem("accessToken", newAccessToken);

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return instance(originalRequest);
      } catch (refreshError) {
        console.log("Unable to refresh token", refreshError);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        router.push("/login");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
