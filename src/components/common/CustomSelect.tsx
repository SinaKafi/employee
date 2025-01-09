import {
  Box,
  Checkbox,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { ReactElement, memo, useEffect, useRef, useState } from "react";
import SVGChevronDown from "../svgs/SVGChevronDown";

interface MenuItem {
  label: string;
  value: string;
  icon?: string;
}

interface SelectProps {
  options: MenuItem[];
  hasSearch?: true;
  onChange: (
    selectedValues: string | string[],
    selectedItems: MenuItem | MenuItem[]
  ) => void;
  placeholder?: string;
  isMulti?: boolean;
  value?: string | string[];
  isLoading?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

function CustomSelect({
  options,
  onChange,
  placeholder,
  value,
  isLoading,
  isMulti = false,
  hasSearch,
  size = "md",
  className = "",
}: SelectProps) {
  const [internalValue, setInternalValue] = useState<
    MenuItem[] | MenuItem | string
  >(isMulti ? [] : "");

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isMulti && Array.isArray(value)) {
      setInternalValue(
        options.filter((option) => value.includes(option.value))
      );
    } else if (!isMulti && typeof value === "string") {
      const selectedItem = options.find(
        (option: MenuItem) => option.value === value
      );
      setInternalValue(selectedItem ? selectedItem.value : "");
    }
  }, [value, isMulti, options]);

  const multiModeClickHandler = (item: MenuItem) => {
    let newValue: MenuItem[];
    if (Array.isArray(internalValue) && internalValue.includes(item)) {
      newValue = internalValue.filter((i) => i.value !== item.value);
    } else {
      newValue = Array.isArray(internalValue)
        ? [...internalValue, item]
        : [item];
    }
    setInternalValue(newValue);
    onChange(
      newValue.map((i) => i.value),
      newValue
    );
  };

  const singleModeClickHandler = (item: MenuItem) => {
    setInternalValue(item.value);
    onChange(item.value, item);
  };

  const onChangeHandler = (item: MenuItem) => {
    if (isMulti) {
      multiModeClickHandler(item);
    } else {
      singleModeClickHandler(item);
    }
  };

  const renderSelectedItems = () => {
    if (isMulti && Array.isArray(internalValue)) {
      return (
        <div className="flex items-start gap-sm py-xs overflow-hidden">
          {internalValue.map((item) => (
            <Text
              key={item.value}
              className="px-base rounded-md bg-alpha-100 cursor-not-allowed  max-w-[20%] !truncate border-primary-200"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                multiModeClickHandler(item);
              }}
            >
              {item.label}
            </Text>
          ))}
        </div>
      );
    } else {
      const selectedItem = options.find((opt) => opt.value === internalValue);
      return <SelectItem item={selectedItem || options[0]} isMulti={isMulti} />;
    }
  };

  return (
    <Menu
      matchWidth
      size={size}
      closeOnSelect={!isMulti}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <MenuButton
        transition="all 0.3s"
        _focus={{ boxShadow: "outline" }}
        className={`border-gray-300 py-base h-full w-full border bg-white text-black ${className}`}
      >
        {isLoading ? (
          <div className="flex items-center justify-between px-sm">
            <Spinner />
            <SVGChevronDown
              className={`w-16 transition-all duration-300 md:w-20 ${
                open ? "rotate-180" : ""
              }`}
            />
          </div>
        ) : (
          <div className="flex items-center justify-between px-sm">
            {placeholder && !internalValue ? (
              <Text className="pr-8 !text-alpha-text10">{placeholder}</Text>
            ) : (
              renderSelectedItems()
            )}
            <SVGChevronDown
              className={`w-16 transition-all duration-300 md:w-20 ${
                open ? "rotate-180" : ""
              }`}
            />
          </div>
        )}
      </MenuButton>
      <MenuList className="!min-w-1 !rounded-base md:!min-w-10 max-h-400 overflow-scroll !py-0 !pb-xs">
        {hasSearch && (
          <Box className="sticky top-0 bg-white  mb-xs z-10">
            <Input
              autoFocus
              variant={"forSelectBox"}
              onChange={(e) => {
                setSearch(e.target.value);
                inputRef.current?.focus();
              }}
              size={"sm"}
              placeholder="ورودی"
              ref={inputRef}
              onBlur={() => {
                inputRef.current?.focus();
              }}
              onKeyDown={(e) => {
                e.stopPropagation();
              }}
            />
          </Box>
        )}
        {options
          .filter(
            (item) => item.label.includes(search) || item.value.includes(search)
          )
          .map((item: MenuItem) => (
            <MenuItem
              as={"div"}
              key={`customSelectOption-${item.value}`}
              _focus={{}}
              className={`${
                (isMulti
                  ? Array.isArray(internalValue) && internalValue.includes(item)
                  : internalValue === item.value) && "!bg-white"
              }`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onChangeHandler(item);
              }}
            >
              <SelectItem
                item={item}
                isMulti={isMulti}
                isChecked={
                  isMulti
                    ? Array.isArray(internalValue) &&
                      internalValue.includes(item)
                    : internalValue === item.value
                }
              />
            </MenuItem>
          ))}
      </MenuList>
    </Menu>
  );
}

export default memo(CustomSelect);

const SelectItem: React.FC<{
  item: MenuItem;
  placeHolderIconComponent?: ReactElement;
  isPlaceholder?: true;
  className?: string;
  isChecked?: boolean;
  isMulti: boolean;
}> = ({ item, isChecked, isPlaceholder = false, className, isMulti }) => {
  return (
    <div
      className={`flex relative w-full items-center justify-start h-45 gap-x-sm rounded-base px-4 ${className} h-full`}
    >
      <div
        className={`absolute w-10 rounded-md  translate-x-20 h-40 ${
          isChecked && "!bg-alert"
        }`}
      ></div>

      {item.icon && (
        <Image
          src={item.icon}
          width={100}
          height={100}
          className="w-20 md:h-24 md:w-24"
          alt={"value"}
        />
      )}
      {isMulti ? (
        <Checkbox value={item.value} className="!w-full" isChecked={isChecked}>
          <Text
            className={`ltr !text-base !font-medium  max-w-[90%] !truncate md:!text-md ${
              isPlaceholder ? "text-alpha-500" : isChecked && "!text-alert"
            }`}
          >
            {item.label}
          </Text>
        </Checkbox>
      ) : (
        <Text
          className={`ltr !text-base max-w-[90%] !truncate !font-medium md:!text-md ${
            isPlaceholder ? "text-alpha-500" : isChecked && "!text-alert"
          }`}
        >
          {item.label}
        </Text>
      )}
    </div>
  );
};
