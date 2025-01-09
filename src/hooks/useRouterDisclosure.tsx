import { useLocation, useNavigate } from "react-router-dom";
import { useMemo, useCallback } from "react";

const useRouterDisclosure = <T extends string>(disclosureName: T) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Memoize the current search parameters
  const currentSearchParams = useMemo(() => {
    return new URLSearchParams(location.search);
  }, [location.search]);

  // Determine if the disclosure is open
  const isOpen = useMemo(() => {
    return currentSearchParams.get(disclosureName) === "true";
  }, [currentSearchParams, disclosureName]);

  // Memoize the onOpen function
  const onOpen = useCallback(() => {
    const newSearchParams = new URLSearchParams(currentSearchParams.toString());
    newSearchParams.set(disclosureName, "true");
    navigate(`${location.pathname}?${newSearchParams.toString()}`, {
      replace: true,
    });
  }, [currentSearchParams, disclosureName, navigate, location.pathname]);

  // Memoize the onClose function
  const onClose = useCallback(() => {
    const newSearchParams = new URLSearchParams(currentSearchParams.toString());
    newSearchParams.delete(disclosureName);
    navigate(`${location.pathname}?${newSearchParams.toString()}`, {
      replace: true,
    });
  }, [currentSearchParams, disclosureName, navigate, location.pathname]);

  return { onOpen, onClose, isOpen } as const;
};

export default useRouterDisclosure;
