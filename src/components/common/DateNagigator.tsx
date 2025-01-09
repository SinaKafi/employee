import { useState } from "react";
import dayjs from "dayjs";
import jalaliday from "jalaliday";
import "dayjs/locale/fa"; // Import the Persian locale
import { Text } from "@chakra-ui/react";
import SVGChevronLeft from "../svgs/SVGChevronLeft";

dayjs.extend(jalaliday);

const PersianMonthNavigator = ({ value, onChange }) => {
  const [currentDate, setCurrentDate] = useState(
    value
      ? dayjs()
          .locale("fa")
          .calendar("jalali")
          .month(+value.split("-")[0] - 1)
          .year(+value.split("-")[1])
      : dayjs().locale("fa").calendar("jalali")
  );

  const currentMonth = currentDate.format("MMMM YYYY");
  const prevMonth = currentDate.subtract(1, "month").format("MMMM ");
  const nextMonth = currentDate.add(1, "month").format("MMMM ");

  // Handle navigation
  const goToNextMonth = () => {
    setCurrentDate(currentDate.add(1, "month"));
    onChange?.(
      String(currentDate.add(1, "month").format("MM YYYY")).split(" ").join("-")
    );
  };

  const goToPrevMonth = () => {
    setCurrentDate(currentDate.subtract(1, "month"));
    onChange?.(String(currentDate.subtract(1, "month").format("DD MM YYYY")));
  };
  return (
    <div className="max-w-300 rounded-lg border py-8 px-16  flex gap-32 justify-between items-center">
      <Text
        variant="sm-regular"
        className="cursor-pointer !text-10 font-medium flex items-center gap-4"
        onClick={goToPrevMonth}
      >
        <SVGChevronLeft width={12} className="!rotate-180 !text-10" />
        {prevMonth}
      </Text>
      <Text className=" !text-14 !font-medium">{currentMonth}</Text>
      <Text
        variant="sm-regular"
        className="cursor-pointer !text-10 font-medium flex items-center gap-4"
        onClick={goToNextMonth}
      >
        {nextMonth}
        <SVGChevronLeft width={12} className="!text-10" />
      </Text>
    </div>
  );
};

export default PersianMonthNavigator;
