import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Menu,
  MenuButton,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import jalaliday from "jalaliday";
import "dayjs/locale/fa";
import SVGChevronLeft from "../svgs/SVGChevronLeft";
import SVGCalender from "../svgs/SVGCalender";
import SVGChevronDown from "../svgs/SVGChevronDown";

dayjs.extend(jalaliday);

const daysOfWeek = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

const getJalaliDate = (date?: number) =>
  date
    ? dayjs.unix(date).locale("fa").calendar("jalali")
    : dayjs().locale("fa").calendar("jalali");

interface DatePickerProps {
  value?: number;
  onChange?: (newDate: string) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange }) => {
  const [selectedDate, setSelectedDate] = useState(getJalaliDate(value));
  const [currentMonth, setCurrentMonth] = useState(
    dayjs().locale("fa").calendar("jalali")
  );
  const { isOpen, onClose, onToggle } = useDisclosure();
  const prevMonth = currentMonth.subtract(1, "month").format("MMMM ");
  const nextMonth = currentMonth.add(1, "month").format("MMMM ");

  const daysInMonth = currentMonth.daysInMonth();
  const firstDayOfMonth = currentMonth.startOf("month").day();

  useEffect(() => {
    if (value) setSelectedDate(getJalaliDate(value));
  }, [value]);

  const handleDateSelect = (day: number) => {
    const newDate = currentMonth.date(day);
    setSelectedDate(newDate);
    onClose();
    if (onChange) onChange(newDate.format("DD/MM/YYYY"));
  };

  const renderCalendar = () => {
    const today = getJalaliDate();
    const calendarDays = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(
        <GridItem key={`empty-${i}`}>
          <Box />
        </GridItem>
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = selectedDate.isSame(currentMonth.date(day), "day");
      const isToday = today.isSame(currentMonth.date(day), "day");
      calendarDays.push(
        <GridItem key={day}>
          <Text
            textAlign="center"
            cursor="pointer"
            borderRadius="md"
            bg={
              isSelected
                ? "transparent"
                : isToday
                  ? "alpha.sidebarMain"
                  : "transparent"
            }
            color={
              isSelected ? "black" : isToday ? "alpha.secondaryMain" : "black"
            }
            className={`${
              isSelected && "!border-black"
            } px-6 border border-transparent `}
            _hover={{ bg: "gray.200" }}
            onClick={() => handleDateSelect(day)}
          >
            {day}
          </Text>
        </GridItem>
      );
    }

    return calendarDays;
  };

  return (
    <Menu matchWidth closeOnSelect onClose={onToggle} onOpen={onToggle}>
      <MenuButton className="!bg-white !border-none">
        <div className="w-full !flex items-center  gap-72 px-24 bg-white">
          <div className="!flex items-center justify-center gap-8 px-4">
            <SVGCalender />
            {selectedDate.format("dddd")} ،{selectedDate.format("DD/MM/YYYY")}
          </div>
          <SVGChevronDown
            className={`w-16 transition-all duration-300 md:w-20 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </MenuButton>
      <MenuList>
        <Box className="!p-6">
          <Flex justifyContent="space-between" mb={4} gap={8}>
            <Text
              variant="sm-regular"
              className="cursor-pointer !text-10 font-medium flex items-center gap-4"
              onClick={() => setCurrentMonth(currentMonth.subtract(1, "month"))}
            >
              <SVGChevronLeft width={12} className="!rotate-180 !text-10" />
              {prevMonth}
            </Text>
            <Text className=" !text-14 !font-medium">
              {currentMonth.format("MMMM YYYY")}
            </Text>
            <Text
              variant="sm-regular"
              className="cursor-pointer !text-10 font-medium flex items-center gap-4"
              onClick={() => setCurrentMonth(currentMonth.add(1, "month"))}
            >
              {nextMonth}
              <SVGChevronLeft width={12} className="!text-10" />
            </Text>
          </Flex>

          <Grid templateColumns="repeat(7, 1fr)" gap={2} mb={4}>
            {daysOfWeek.map((day) => (
              <GridItem key={day}>
                <Text fontWeight="bold" textAlign="center">
                  {day}
                </Text>
              </GridItem>
            ))}
          </Grid>

          <div className="grid grid-cols-7 gap-6">{renderCalendar()}</div>
        </Box>
      </MenuList>
    </Menu>
    // <Box position="relative">
    //   <Button onClick={isOpen ? onClose : onOpen}>
    // <SVGCalender />
    // {selectedDate.format("dddd")} ،{selectedDate.format("DD/MM/YYYY")}
    //   </Button>

    //   {isOpen && (
    //     <Box
    //       mt={4}
    //       p={4}
    //       borderWidth={1}
    //       borderRadius="md"
    //       bg="white"
    //       position="absolute"
    //     >
    //       <Flex justifyContent="space-between" mb={4} gap={8}>
    //         <Text
    //           variant="sm-regular"
    //           className="cursor-pointer !text-10 font-medium flex items-center gap-4"
    //           onClick={() => setCurrentMonth(currentMonth.subtract(1, "month"))}
    //         >
    //           <SVGChevronLeft width={12} className="!rotate-180 !text-10" />
    //           {prevMonth}
    //         </Text>
    //         <Text className=" !text-14 !font-medium">
    //           {currentMonth.format("MMMM YYYY")}
    //         </Text>
    //         <Text
    //           variant="sm-regular"
    //           className="cursor-pointer !text-10 font-medium flex items-center gap-4"
    //           onClick={() => setCurrentMonth(currentMonth.add(1, "month"))}
    //         >
    //           {nextMonth}
    //           <SVGChevronLeft width={12} className="!text-10" />
    //         </Text>
    //       </Flex>

    //       <Grid templateColumns="repeat(7, 1fr)" gap={2} mb={4}>
    //         {daysOfWeek.map((day) => (
    //           <GridItem key={day}>
    //             <Text fontWeight="bold" textAlign="center">
    //               {day}
    //             </Text>
    //           </GridItem>
    //         ))}
    //       </Grid>

    //       <div className="grid grid-cols-7 gap-6">{renderCalendar()}</div>
    //       {/* <Grid templateColumns="repeat(7, 3fr)" gap={1}> */}
    //       {/* {renderCalendar()} */}
    //       {/* </Grid> */}
    //     </Box>
    //   )}
    // </Box>
  );
};

export default DatePicker;
