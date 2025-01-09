import SVGCalendar from "@/components/svgs/SVGCalendar";
import { Text } from "@chakra-ui/react";

const UserOrdersCard = () => {
  return (
    <div className=" px-32 grid grid-cols-6 ">
      <div className="!text-right col-span-3 !truncate flex gap-8 border-b py-20">
        <Text className="!text-right  border-l pl-8 text-14 font-medium">
          چلو کباب لقمه زعفرانی{" "}
        </Text>{" "}
        <Text className="!text-right  border-l pl-8 text-14 font-medium">
          دوغ بطری{" "}
        </Text>{" "}
        <Text className="!text-right  border-l pl-8 text-14 font-medium">
          ماست موسیر{" "}
        </Text>{" "}
        <Text className="!text-right  pl-8 text-14 font-medium">
          پک قاشق و چنگال{" "}
        </Text>{" "}
      </div>
      <div className="border-b py-20">
        <Text className="!text-right  pl-8 text-14 font-medium">
          2250،000 تومان{" "}
        </Text>{" "}
      </div>
      <div className="border-b py-20">
        <Text className="!text-right  pl-8 text-14 font-medium flex gap-6">
          <SVGCalendar className="bg-alpha-sidebarMain rounded-lg text-alpha-secondaryMain" />
          1403/02/16
        </Text>{" "}
      </div>
      <div className="border-b py-20">
        <Text className="!text-right  pl-8 text-14 font-medium">
          105،000 تومان{" "}
        </Text>{" "}
      </div>{" "}
    </div>
  );
};

export default UserOrdersCard;
