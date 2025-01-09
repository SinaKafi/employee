import { Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import SVGBackspace from "../svgs/SVGBackspace";

const NumberKeyBoard = ({
  onChange,
}: {
  onChange: (_: string | number) => void;
}) => {
  const [inputValue, setInputValue] = useState("");

  const onChangeHandler = (value: string | number) => {
    let finalValue = typeof value === "string" ? value : String(value);

    setInputValue((prev) => {
      // Handle "remove" case: remove last character
      console.log(inputValue.length);
      if (finalValue === "remove" && prev.length <= 1) {
        return "";
      }
      if (finalValue === "remove" && prev.length >= 1) {
        return prev.slice(0, -1);
      }

      // Handle decimal point: ensure only one decimal point exists
      if (finalValue === "." && prev.includes(".")) {
        return prev;
      }

      // Auto-correct "12." to "12.0"
      if (finalValue === "." && prev === "") {
        return "0.";
      } else if (finalValue === "." && /\d$/.test(prev)) {
        return prev + finalValue;
      }

      return prev + finalValue;
    });
  };

  useEffect(() => {
    // Avoid passing invalid numbers to the onChange function
    if (inputValue) {
      onChange(inputValue);
    } else {
      onChange("");
    }
  }, [inputValue]);

  return (
    <div className="grid grid-cols-3 gap-8  gap-x-16 w-full">
      {[9, 8, 7, 6, 5, 4, 3, 2, 1].map((number) => (
        <div
          key={number}
          onClick={(e) => {
            e.stopPropagation();
            onChangeHandler(number);
          }}
          className="keyboard flex items-center justify-center  "
        >
          <Text className="!text-center !text-sm !font-normal">{number}</Text>
        </div>
      ))}
      <div
        onClick={(e) => {
          e.stopPropagation();
          onChangeHandler("remove");
        }}
        className="keyboard flex items-center justify-center"
      >
        <SVGBackspace />
      </div>
      <div
        onClick={(e) => {
          e.stopPropagation();
          onChangeHandler(".");
        }}
        className="keyboard flex items-center justify-center "
      >
        <Text className="!text-center">.</Text>
      </div>
      <div
        onClick={(e) => {
          e.stopPropagation();
          onChangeHandler(0);
        }}
        className="keyboard flex items-center justify-center "
      >
        <Text className="!text-center">0</Text>
      </div>
    </div>
  );
};

export default NumberKeyBoard;
