import axios, { AxiosResponse } from "axios";
import { AddressData, ILocationData } from "./map";

export const reversAddress = (
  data: {
    lat?: number;
    long?: number;
  },
  signal: AbortSignal
): Promise<AxiosResponse<AddressData>> => {
  return axios.get(`https://map.ir/reverse?lat=${data.lat}&lon=${data.long}`, {
    headers: {
      "x-api-key": import.meta.env.VITE_API_MAP_KEY,
      "Content-Type": "application/json",
    },
    signal,
  });
};

export const searchAddress = (
  data: {
    text: string;
  },
  signal: AbortSignal
): Promise<AxiosResponse<ILocationData>> => {
  return axios.post(`https://map.ir/search/v2/autocomplete`, data, {
    headers: {
      "x-api-key": import.meta.env.VITE_API_MAP_KEY,
      "Content-Type": "application/json",
    },
    signal,
  });
};
