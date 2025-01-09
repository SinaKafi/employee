import axiosInstance from "@/configs/axios";
import { formDataGenerator } from "@/utils";
import { AxiosResponse } from "axios";

//all used
export const loginUser = async (
  body: { mobile: string },
  signal: AbortSignal
): Promise<AxiosResponse<any>> => {
  const data = formDataGenerator(body);
  return axiosInstance.post("company/auth/otp", data, {
    signal,
  });
};

type otpResponse = {
  message: string;
  access_token: string;
  token_type: string;
};
export const checkOtp = (
  body: {
    mobile: string;
    otp: string;
  },
  signal: any
): Promise<AxiosResponse<ApiResponse<otpResponse>>> => {
  const data = formDataGenerator(body);
  return axiosInstance.post("employee/auth/check/otp", data, {
    signal,
  });
};

export const loginByPassword = (
  body: {
    mobile: string;
    password: string;
  },
  signal: any
): Promise<AxiosResponse<ApiResponse<otpResponse>>> => {
  const data = formDataGenerator(body);
  return axiosInstance.post("employee/auth/check/password", data, {
    signal,
  });
};
export const forgetPassword = async (
  body: { mobile: string },
  signal: AbortSignal
): Promise<AxiosResponse<any>> => {
  const data = formDataGenerator(body);
  return axiosInstance.post("company/auth/forget-password", data, {
    signal,
  });
};

export const ResetPassword = async (
  body: {
    mobile: string;
    newPassword: string;
    otp: string;
  },
  signal: AbortSignal
): Promise<AxiosResponse<any>> => {
  const data = formDataGenerator(body);
  return axiosInstance.post("employee/auth/reset-password", data, {
    signal,
  });
};
