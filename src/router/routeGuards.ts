import paths from "./paths";
import { GuardFnResult } from "@/types/route";

export function isLoggedIn(): GuardFnResult {
  if (localStorage.getItem("token")) {
    return true;
  }
  return paths.login.index;
}

export function isNotLoggedIn(): GuardFnResult {
  if (localStorage.getItem("token")) {
    return paths.home;
  }
  return true;
}
export function hasPhoneNumber(): GuardFnResult {
  if (localStorage.getItem("number")) {
    return true;
  }
  return paths.login.index;
}
