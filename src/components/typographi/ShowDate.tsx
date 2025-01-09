import { memo } from "react";
import SVGCalendar from "../svgs/SVGCalendar";
import { Text } from "@chakra-ui/react";

const ShowDate = () => {
  let today = new Date().toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div className="bg-white p-10 rounded-lg flex items-center gap-base">
      <div className="bg-alpha-halfWhite p-sm rounded-xs">
        <SVGCalendar className="text-primary-500" />
      </div>
      <Text className="!text-sm !font-normal">{today}</Text>
    </div>
  );
};

export default memo(ShowDate);
