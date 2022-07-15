import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { getAccessToken } from "./user";

export function authFetcher(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return axios({ ...config, withCredentials: true })
}