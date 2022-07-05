import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { getAccessToken } from "./user";

export function authFetcher(config: AxiosRequestConfig): Promise<AxiosResponse> {
    let accessToken = getAccessToken()
    if (accessToken)
        return axios({ ...config, headers: { "authorization": `Bearer ${accessToken}` } })
    else return axios(config)
}