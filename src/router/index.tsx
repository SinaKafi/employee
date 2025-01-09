import {
  Navigate,
  Route,
  Routes,
  matchPath,
  useLocation,
} from "react-router-dom";
import GuardedRoute from "./GuardedRoute";
import routeConfig from "./routeConfig";
import Layout from "@/components/layouts/index";

const Router = () => (
  <Wrapper>
    <Routes>
      {routeConfig.map((r) => (
        <Route
          path={r.path}
          element={<GuardedRoute component={r.component} guards={r?.guards} />}
          key={r.path}
        />
      ))}
      <Route path="*" element={<Navigate to={"/menu"} replace />} />
    </Routes>
  </Wrapper>
);

function Wrapper({ children }: { children: any }) {
  const location = useLocation();
  const route = routeConfig.find((r) => matchPath(r.path, location.pathname));

  const CustomLayout = route?.layout;

  if (route == null || CustomLayout === false) {
    return children;
  }

  const LayoutWrapper = CustomLayout || Layout;

  return <LayoutWrapper>{children}</LayoutWrapper>;
}

export default Router;
