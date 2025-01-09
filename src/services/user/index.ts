import axiosInstance from "@/configs/axios";
import { AxiosResponse } from "axios";
import { currentUser, IEmployeeDetail, IEmployeeList } from "./user";
import { formDataGenerator } from "@/utils";

export const getEmployeeList = (
  params: {
    page: string;
    perPage: string;
    search: string;
  },
  signal: AbortSignal
): Promise<AxiosResponse<ApiResponse<IEmployeeList[]>>> => {
  return axiosInstance.get("company/employee", {
    params,
    signal,
  });
};

export const addEmployeeList = (
  params: {
    name: string;
    family: string;
    code: string;
    mobile: string;
    address_id: string;
  },
  signal: AbortSignal
): Promise<AxiosResponse<ApiResponse<any[]>>> => {
  const data = formDataGenerator(params);

  return axiosInstance.post("company/new", data, {
    signal,
  });
};

export const getEmployeeData = (
  params: {
    id: string;
  },
  signal: AbortSignal
): Promise<AxiosResponse<ApiResponse<IEmployeeDetail>>> => {
  return axiosInstance.get(`company/employee/${params.id}`, {
    signal,
  });
};

export const ChangePasswordFromApp = (
  data: {
    old_password: string;
    new_password: string;
    confirm_password: string;
  },
  signal: AbortSignal
): Promise<AxiosResponse<ApiResponse<any>>> => {
  let body = formDataGenerator(data);
  return axiosInstance.post(`/company/password/change`, body, {
    signal,
  });
};
export const addByExcel = (
  file,
  signal: AbortSignal
): Promise<AxiosResponse<ApiResponse<any[]>>> => {
  const data = formDataGenerator(file);
  return axiosInstance.post("company/employee/new/excel", data, {
    signal,
  });
};

export const changeEmployeeStatus = (
  data: {
    user_id: string;
  },
  signal: AbortSignal
): Promise<AxiosResponse<ApiResponse<any>>> => {
  let body = formDataGenerator(data);
  return axiosInstance.post(`/employee/status`, body, {
    signal,
  });
};
//on use

export const getCurrentUser = (
  signal: AbortSignal
): Promise<AxiosResponse<ApiResponse<currentUser>>> => {
  return axiosInstance.get(`/employee/current`, {
    signal,
  });
};
