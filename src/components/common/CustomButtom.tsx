import { Button, ButtonProps } from "@chakra-ui/react";
import { forwardRef } from "react";

interface TButtonProps extends ButtonProps {
  children: any;
}
const CustomButton = forwardRef<HTMLButtonElement, TButtonProps>(
  ({ onClick, disabled, isLoading, children, ...rest }, ref) => {
    return (
      //   <div>
      <Button
        ref={ref}
        onClick={onClick}
        disabled={disabled || isLoading}
        isLoading={isLoading}
        {...rest}
      >
        {isLoading ? (
          //   <div className="border-2 border-primary-500 border-t-primary-300 rounded-full animate-spin"></div>
          <>s</>
        ) : (
          children
        )}
      </Button>
      //   </div>
    );
  }
);

export default CustomButton;
