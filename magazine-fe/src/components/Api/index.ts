import axios, { AxiosError } from "axios";
import { redirect } from "next/navigation";
import Cookies from "js-cookie";
import Router from "next/router";

export const baseUrl = process.env.NEXT_PUBLIC_API_URL as string;
export const authCookieName = process.env
  .NEXT_PUBLIC_AUTH_COOKIE_NAME as string;

const magazineService = axios.create();
magazineService.defaults.baseURL = baseUrl;

magazineService.interceptors.request.use(
  function (config) {
    const authCookie = Cookies.get(authCookieName);

    if (!authCookie) {
      Router.push("/login");
    } else {
      config.headers.Authorization = `Bearer ${authCookie}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

magazineService.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      Router.push("/login");
    }
    return Promise.reject(error);
  }
);

export default magazineService;
