import { AxiosResponse } from "axios";
import { IOrder, IOrderDataPerDay, IOrderDataPerMonth } from "./order";
import axiosInstance from "@/configs/axios";

export const submitEmployeeOrder = (
  data: IOrder,
  signal: AbortSignal
): Promise<AxiosResponse<ApiResponse<any>>> => {
  return axiosInstance.post(`employee/order`, data, {
    signal,
  });
};

export const getOrderByDate = (
  data: string,
  signal: AbortSignal
): Promise<AxiosResponse<ApiResponse<IOrderDataPerDay>>> => {
  return axiosInstance.get(`employee/order/${data}`, {
    signal,
  });
};

export const getOrderList = (
  data: {
    year: string;
    month: string;
    page: string;
    per_page: string;
  },
  signal: AbortSignal
): Promise<AxiosResponse<ApiResponse<IOrderDataPerMonth[]>>> => {
  return axiosInstance.get(`employee/order-report`, {
    signal,
    params: {
      ...data,
    },
  });
};
