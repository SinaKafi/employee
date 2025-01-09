import {
  Box,
  Menu,
  MenuList,
  MenuItem,
  Text,
  useDisclosure,
  useOutsideClick,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import CustomInput, { CustomInputProps } from "./CustomInput";
import { IGeoJSONPoint } from "@/services/map/map";

interface Option {
  title: string;
  detail: string;
  value: IGeoJSONPoint;
}

interface SearchableInputProps extends CustomInputProps {
  options: Option[];
  onResultSelect: (value: IGeoJSONPoint) => void;
}

const SearchableInput: React.FC<SearchableInputProps> = ({
  options,
  onResultSelect,
  onChange,
  ...rest
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const menuRef = useRef<HTMLDivElement>(null);

  useOutsideClick({
    ref: menuRef,
    handler: onClose,
  });

  return (
    <Box w="full" position="relative" ref={menuRef}>
      {/* Input Field */}
      <Box onClick={onOpen}>
        <CustomInput
          {...rest}
          onChange={(e) => {
            onOpen();
            onChange?.(e);
          }}
        />
      </Box>

      {/* Dropdown Menu */}
      {isOpen && !!options.length && (
        <Box
          position="absolute"
          top="100%"
          w="full"
          className="!translate-x-1/2 !-left-1/2 "
          mt="4px"
          zIndex="10"
        >
          <Menu isOpen={isOpen}>
            <MenuList className="!min-w-1 !w-[40.4rem] space-y-6 !rounded-base max-h-400 overflow-scroll !py-0 !pb-xs">
              {options.map((item) => (
                <MenuItem
                  as="div"
                  className="!min-w-[95%] !mx-auto !flex !flex-col !space-y-1 !items-start !justify-start !px-8 !py-2  !max-w-[95%] !border-b !h-auto !min-h-fit"
                  key={`customSelectOption-${item.detail}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onResultSelect(item.value);
                    onClose();
                  }}
                >
                  <Text>{item.title}</Text>
                  <Text>{item.detail}</Text>
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Box>
      )}
    </Box>
  );
};

export default SearchableInput;
