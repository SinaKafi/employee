import SVGbuilding from "@/components/svgs/SVGbuilding";
import SVGClipboardList from "@/components/svgs/SVGClipboardList";
import SVGFileDescription from "@/components/svgs/SVGFileDescription";
import SVGLogOut from "@/components/svgs/SVGLogOut";
import { JSXElementConstructor } from "react";

export interface IbaseMenuItem {
  name: string;
  route: string;
  isActive: boolean;
  id: number;
}
interface IconProps {
  width: any;
  height: any;
  className: string;
}
export interface ImenuItem extends IbaseMenuItem {
  children?: IbaseMenuItem[];
  Icon?: JSXElementConstructor<Partial<IconProps>>;
}
export const sidebarMenu: ImenuItem[] = [
  // {
  //   name: "داشبورد",
  //   route: "/",
  //   isActive: false,
  //   id: 1000,
  //   Icon: (props) => <SVGDashboard {...props} />,
  // },

  // {
  //   name: "پرسنل",
  //   route: "/users",
  //   isActive: true,
  //   id: 3000,
  //   Icon: (props) => <SVGUser {...props} />,
  // },
  {
    name: "ثبت سفارش",
    route: "/menu",
    isActive: true,
    id: 4000,
    Icon: (props) => <SVGFileDescription {...props} />,
  },
  {
    name: "سفارشات من",
    route: "/orders",
    isActive: true,
    id: 2000,
    Icon: (props) => <SVGClipboardList {...props} />,
  },
  // {
  //   name: "گزارشات",
  //   route: "/reports",
  //   isActive: true,
  //   id: 5000,
  //   Icon: (props) => <SVGReportStart {...props} />,
  // },

  {
    name: "حساب کاربری",
    route: "/profile",
    isActive: true,
    id: 5000,
    Icon: (props) => <SVGbuilding {...props} />,
  },

  {
    name: "خروج",
    route: "?exit=true",
    isActive: true,
    id: 6000,
    Icon: (props) => <SVGLogOut {...props} />,
  },
];
