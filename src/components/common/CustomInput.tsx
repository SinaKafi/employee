import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  forwardRef,
  Text,
  InputProps,
  Box,
  BoxProps,
} from "@chakra-ui/react";
import { ReactElement } from "react";
import Spiner from "./Spiner";
export interface CustomInputProps extends InputProps {
  label?: string;
  description?: string | ReactElement;
  rightElement?: string | ReactElement;
  leftElement?: string | ReactElement;
  labelProps?: {
    variant?: string;
    size?: string;
    color?: string;
  };
  showStar?: true | undefined;
  descriptionProps?: descriptionProps;
  isLoading?: boolean;
}
interface descriptionProps extends BoxProps {}
const CustomInput = forwardRef<CustomInputProps, "input">((props, ref) => {
  const {
    description,
    label,
    descriptionProps,
    labelProps,
    rightElement,
    leftElement,
    showStar,
    isLoading,
    ...other
  } = props;
  return (
    <div className="flex flex-col w-full gap-sm">
      {label && (
        <Text {...labelProps} className="!text-sm !relative max-w-fit">
          {label}
          {(props.required || showStar) && (
            <Text className="!absolute -top-9  !text-primary-500 -left-9">
              *
            </Text>
          )}
        </Text>
      )}
      <InputGroup>
        {leftElement && (
          <InputRightElement className="!pb-1" color={props.color}>
            {leftElement}
          </InputRightElement>
        )}
        <Input
          _placeholder={{ color: "alpha.text10" }}
          {...other}
          pr={rightElement ? "3rem" : "1rem"}
          pl={leftElement ? "3rem" : "1rem"}
          ref={ref}
        />
        {rightElement && (
          <InputLeftElement className="!pb-1" color={props.color}>
            {isLoading ? <Spiner /> : rightElement}
          </InputLeftElement>
        )}
      </InputGroup>
      {description && <Box {...descriptionProps}>{description}</Box>}
    </div>
  );
});
export default CustomInput;
