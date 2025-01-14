import { useCallback, useEffect } from "react";

const useClickout = (
  ref: React.RefObject<HTMLElement>,
  action: () => void,
  type = "click"
) => {
  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) {
        return;
      }
      action(); // Close dropdown
    },
    [ref, action]
  );

  useEffect(() => {
    document.addEventListener(type, handleClick);

    return () => {
      document.removeEventListener(type, handleClick);
    };
  }, [handleClick, type]);
};

export default useClickout;
