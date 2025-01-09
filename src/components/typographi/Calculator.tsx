import { useState } from "react";
import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import SVGCalculator from "../svgs/SVGCalculator";
import SVGBackspace from "../svgs/SVGBackspace";
import CustomInput from "../common/CustomInput";

const Calculator = ({
  isOpen,
  onOpen,
  onClose,
}: {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) => {
  const [inputValue, setInputValue] = useState("");

  const onClickHandler = (value: string) => {
    if (value === "C") {
      setInputValue(""); // Clear input
    } else if (value === "←") {
      setInputValue((prev) => prev.slice(0, -1)); // Backspace
    } else if (value === "=") {
      try {
        setInputValue(eval(inputValue).toString()); // Evaluate the expression
      } catch {
        setInputValue("Error"); // Handle invalid expressions
      }
    } else {
      setInputValue((prev) => prev + value); // Append the value
    }
  };

  return (
    <Popover
      isLazy
      placement="top-end"
      closeOnBlur
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
    >
      <PopoverTrigger>
        {/* Ensure there's only one element directly under PopoverTrigger */}
        <Button
          variant="outline "
          className="!text-sm !font-normal !text-alpha-text20 "
        >
          <SVGCalculator className="!text-alpha-text20" />
          ماشین حساب
        </Button>
      </PopoverTrigger>
      <PopoverContent className="!rounded-lg min-w-[15rem] !border-none !shadow-popOver">
        <PopoverArrow />
        {/* <PopoverCloseButton /> */}
        <PopoverBody className="!w-full">
          <div className="flex flex-col gap-base">
            <div>
              <CustomInput
                value={inputValue}
                variant={"md"}
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
              />
            </div>
            <div className="grid grid-cols-4 gap-sm">
              {[
                { item: "/", symbol: "/" },
                { item: "%", symbol: "%" },
                { item: <SVGBackspace />, symbol: "←" },
                { item: "C", symbol: "C" },
                { item: "*", symbol: "*" },
                { item: "9", symbol: "9" },
                { item: "8", symbol: "8" },
                { item: "7", symbol: "7" },
                { item: "-", symbol: "-" },
                { item: "6", symbol: "6" },
                { item: "5", symbol: "5" },
                { item: "4", symbol: "4" },
                { item: "+", symbol: "+" },
                { item: "3", symbol: "3" },
                { item: "2", symbol: "2" },
                { item: "1", symbol: "1" },
                { item: "=", symbol: "=" },
                { item: ".", symbol: "." },
                { item: "0", symbol: "0" },
                { item: "00", symbol: "00" },
              ].map((item) => (
                <div
                  key={item.symbol}
                  onClick={(e) => {
                    e.stopPropagation();
                    onClickHandler(item.symbol);
                  }}
                  className="keyboard flex items-center justify-center  "
                >
                  <Text className="!text-center !text-sm !font-normal ">
                    {item.item}
                  </Text>
                </div>
                // <Button
                //   key={item}
                //   onClick={() => onClickHandler(item)}
                //   bg="#e6f3ff"
                //   _hover={{ bg: "#d0e9ff" }}
                //   fontSize="xl"
                //   height="50px"
                // >
                //   {item}
                // </Button>
              ))}
            </div>
          </div>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default Calculator;
