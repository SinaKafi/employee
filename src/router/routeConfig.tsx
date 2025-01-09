import { FC } from "react";
import paths from "./paths";

import { GuardFnResult, PathValues } from "@/types/route";
import { hasPhoneNumber, isLoggedIn, isNotLoggedIn } from "./routeGuards";
import LoginLayout from "@/components/layouts/LoginLayout";
import EntryNumber from "@/components/pages/login/EntryNumber";
import EntryOtp from "@/components/pages/login/EntryOtp";
import EntryPassword from "@/components/pages/login/EntryPassword";
import ResetPassword from "@/components/pages/login/ResetPassword";
import NewPassword from "@/components/pages/login/NewPassword";
import CashLayout from "@/components/layouts/Cashlayout";
import CompanyOrderList from "@/components/pages/orders";
import OrderDetail from "@/components/pages/orders/detaile/OrderDetail";
import MenuList from "@/components/pages/menu";
import ProfileDetail from "@/components/pages/profile";

type Route = {
  path: PathValues;
  component: FC;
  guards?: { (): GuardFnResult }[];
  layout?: FC | false;
  loader?: any;
};

const routeConfig: Route[] = [
  {
    path: paths.login.index,
    component: EntryNumber,
    layout: LoginLayout,
    guards: [isNotLoggedIn],
  },
  {
    path: paths.login.otp,
    component: EntryOtp,
    layout: LoginLayout,
    guards: [isNotLoggedIn, hasPhoneNumber],
  },
  {
    path: paths.login.password,
    component: EntryPassword,
    layout: LoginLayout,

    guards: [isNotLoggedIn, hasPhoneNumber],
  },
  {
    path: paths.login.resetPassword,
    component: ResetPassword,
    layout: LoginLayout,
    guards: [isNotLoggedIn, hasPhoneNumber],
  },
  {
    path: paths.login.newPassword,
    component: NewPassword,
    layout: LoginLayout,
    guards: [isNotLoggedIn],
  },
  // {
  //   path: paths.home,
  //   component: () => <>dashboard</>,
  //   layout: CashLayout,
  //   guards: [isLoggedIn],
  // },
  // {
  //   path: paths.report.index,
  //   component: () => <>report</>,
  //   layout: CashLayout,
  //   guards: [isLoggedIn],
  // },

  {
    path: paths.orders.index,
    component: CompanyOrderList,
    layout: CashLayout,
    guards: [isLoggedIn],
  },
  {
    path: paths.orders.detail,
    component: OrderDetail,
    layout: CashLayout,
    guards: [isLoggedIn],
  },
  {
    path: paths.menu.index,
    component: MenuList,
    layout: CashLayout,
    guards: [isLoggedIn],
  },
  {
    path: paths.profile.index,
    component: ProfileDetail,
    layout: CashLayout,
    guards: [isLoggedIn],
  },
  // {
  //   path: paths.orders.index,
  //   component: () => (
  //     <LazyPageLoader page={() => import("@/pages/orders/management")} />
  //   ),
  //   guards: [isLoggedIn],
  // },
];

export default routeConfig;
