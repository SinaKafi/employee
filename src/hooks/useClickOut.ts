import { useCallback, useEffect } from 'react';

const useClickout = (ref: React.RefObject<HTMLElement>, action: () => void, type = 'click') => {
  const handleClick = useCallback(
    (e: MouseEvent) => {
      console.log('Click event triggered', e.target); // log the target of the click
      if (!ref.current || ref.current.contains(e.target as Node)) {
        console.log('Click inside detected');
        return;
      }
      console.log('Click outside detected');
      action(); // Close dropdown
    },
    [ref, action]
  );

  useEffect(() => {
    console.log('Adding event listener'); // Check if event listener is being added
    document.addEventListener(type, handleClick);

    return () => {
      console.log('Removing event listener'); // Check if event listener is being removed
      document.removeEventListener(type, handleClick);
    };
  }, [handleClick, type]);
};

export default useClickout;