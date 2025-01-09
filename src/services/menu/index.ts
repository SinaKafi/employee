import axiosInstance from "@/configs/axios";
import { AxiosResponse } from "axios";
import { FoodCategory } from "./menu";

export const getFoodMenu = (
  params: {
    date: string;
  },
  signal: AbortSignal
): Promise<AxiosResponse<FoodCategory[]>> => {
  return axiosInstance.get("company/food", {
    params,
    signal,
  });
};
