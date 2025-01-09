import React from 'react';
import { makeClassNameString as cn } from '@snapp/client-utils';

export function Fallback({ className }) {
  return (
    <div
      className={cn(
        'h-screen flex-1 flex items-center justify-center',
        className,
      )}
    >
      <span className="loading loading-dots loading-lg text-primary"></span>
    </div>
  );
}

const LazyPageLoader = ({ page, fallback = <Fallback />, ...restProps }) => {
  const Component = React.lazy(page);
  return (
    <React.Suspense fallback={fallback}>
      <Component {...restProps} />
    </React.Suspense>
  );
};

export default LazyPageLoader;
