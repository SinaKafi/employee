import { useEffect, FC } from "react";
import { useNavigate } from "react-router-dom";
import { GuardFnResult } from "@/types/route";

type Props = {
  component: FC;
  guards?: { (): GuardFnResult }[];
};

export default function GuardedRoute({ component, guards = [] }: Props) {
  const navigate = useNavigate();
  const Component = component;

  let canAccess = true;
  let redirectPath = null;
  for (let i = 0; i < guards.length; i++) {
    const res = guards[i]();
    if (typeof res === "string") {
      canAccess = false;
      redirectPath = res;
      break;
    }
  }

  useEffect(() => {
    if (!canAccess) {
      navigate(String(redirectPath));
    }
  }, [canAccess, navigate, redirectPath]);

  return canAccess ? <Component /> : null;
}
