import { Button, Image, Text } from "@chakra-ui/react";
import Toman from "../common/Toman";
import { FoodItem } from "@/services/menu/menu";
import SVGPlus from "../svgs/SVGPlus";
import SVGMinus from "../svgs/SVGMinus";

const FoodCard: React.FC<FoodItem> = ({
  food,
  ingredient,
  price,
  food_image,
  onAdd,
  onRemove,
  quantity,
}) => {
  return (
    <div className="p-12 grid grid-row-3 gap-26 w-full bg-white !rounded-lg">
      <div className="row-span-2 flex justify-between">
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
      <div className="grid grid-cols-2 justify-center content-between">
        <div className="col-span-1 max-w-[95px]">
          {quantity ? (
            <div className="border border-primary-500 rounded-lg gap-[10px] flex px-8 items-center justify-between">
              <SVGPlus
                className="!text-lg !text-primary-500 cursor-pointer hover:scale-x-125 transition-all"
                onClick={onAdd}
              />
              <Text className="max-w-[40px] !appearance-none !text-center inline-flex items-center justify-center mx-auto min-w-[40px] bg-primary-500 !text-white py-2">
                {quantity}
              </Text>
              <SVGMinus
                className="!text-lg !text-primary-500 cursor-pointer hover:scale-x-125 transition-all"
                onClick={onRemove}
              />
            </div>
          ) : (
            <Button
              variant={"outline"}
              size={"md"}
              // className="!px-48"
              className="w-full"
              onClick={onAdd}
            >
              افزودن{" "}
            </Button>
          )}
        </div>
        <div className="mr-auto">
          <Toman price={price} />
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
