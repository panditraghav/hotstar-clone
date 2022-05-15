import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getAccessToken } from "./user";

export function authFetcher(config: AxiosRequestConfig): Promise<AxiosResponse> {
    try {
        return axios({ ...config, headers: { "authorization": `Bearer ${getAccessToken()}` } })
    } catch (error) {
        throw new Error(error)
    }
}