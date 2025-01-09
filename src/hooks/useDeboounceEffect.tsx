import { useEffect } from "react";

const useDebounceEffect = <T extends readonly unknown[]>(
  fn: () => void,
  dependency: T,
  duration: number = 500
) => {
  useEffect(() => {
    const getData = setTimeout(() => {
      fn();
    }, duration);

    return () => clearTimeout(getData);
  }, [...dependency, duration]);
};

export default useDebounceEffect;
