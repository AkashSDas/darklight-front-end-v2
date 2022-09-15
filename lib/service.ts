import axios, { AxiosRequestConfig } from "axios";

import { handleAsync } from "./handle-async";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

interface IResponse {
  status: number;
  msg: string;
  error: boolean;
  data?: { [key: string]: any };
}

/**
 * Make a request to the backend
 *
 * @param {string} url The url to make the request to
 * @param {AxiosRequestConfig} opts The options for the request (optional)
 * @returns {Promise<IResponse>} The promise of response from the request
 */
export const fetchFromAPI = async (
  url: string,
  opts: AxiosRequestConfig
): Promise<IResponse> => {
  const result = await handleAsync(axiosInstance(url, opts));
  const err = result[0];

  if (typeof err === "string") {
    return { status: 500, msg: err, error: true };
  } else if (err?.response?.data) {
    const data = err?.response?.data;
    return { status: err.response.status, msg: data.msg, error: true };
  } else {
    const data = result[1];
    return {
      status: data.status,
      msg: data.data.msg,
      error: false,
      data: data.data,
    };
  }
};
