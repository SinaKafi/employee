import axiosInstance from "@/configs/axios";
import { formDataGenerator } from "@/utils";
import { AxiosResponse } from "axios";
import { IEditAddress, IAddAddressProp, IAddress } from "./adress";

export const addAddress = (
  body: IAddAddressProp,
  signal: AbortSignal
): Promise<AxiosResponse<any>> => {
  const data = formDataGenerator(body);
  return axiosInstance.post("company/address", data, {
    signal,
  });
};
export const editAddress = (
  body: IEditAddress,
  signal: AbortSignal
): Promise<AxiosResponse<any>> => {
  return axiosInstance.patch("company/address", body, {
    signal,
  });
};

export const addressList = (
  signal: AbortSignal
): Promise<AxiosResponse<ApiResponse<IAddress[]>>> => {
  return axiosInstance.get("company/address", {
    signal,
  });
};

export const deleteAddress = (
  body: { id: string | number },
  signal: AbortSignal
): Promise<AxiosResponse<any>> => {
  const data = formDataGenerator(body);
  return axiosInstance.post("company/address/destroy", data, {
    signal,
  });
};
