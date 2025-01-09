import { Image, Text } from "@chakra-ui/react";
import Toman from "../common/Toman";
import { FoodItem } from "@/services/menu/menu";

const FoodCard: React.FC<FoodItem> = ({
  food,
  ingredient,
  price,
  food_image,
}) => {
  return (
    <div className="p-12 flex flex-col gap-26 w-full bg-white ">
      <div className="flex justify-between">
        <div className="flex-1 flex flex-col">
          <Text variant={"sm"}>{food}</Text>
          <Text variant="caption-normal" className="!text-alpha-text20">
            {ingredient}{" "}
          </Text>
        </div>
        <div className=" max-w-80 max-h-88 ml-auto">
          <Image
            className="rounded-lg"
            src={"http://193.151.151.66/" + food_image}
          />
        </div>
      </div>
      <div className="flex items-end justify-end">
        <Toman price={price} />
      </div>
    </div>
  );
};

export default FoodCard;
