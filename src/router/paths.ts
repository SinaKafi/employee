const paths = {
  home: "/",
  login: {
    index: "/login",
    otp: "/login/otp",
    password: "/login/password",
    resetPassword: "/login/password/reset",
    newPassword: "/login/password/new",
  },
  orders: {
    index: "/orders",
    detail: "/orders/:detail",
  },

  menu: {
    index: "/menu",
  },
  profile: {
    index: "/profile",
  },
  report: {
    index: "/reports",
  },
} as const;

export default paths;
