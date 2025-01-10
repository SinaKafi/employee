import { Button, Image, Text } from "@chakra-ui/react";
import Toman from "../common/Toman";
import { FoodItem } from "@/services/menu/menu";
import SVGPlus from "../svgs/SVGPlus";
import SVGMinus from "../svgs/SVGMinus";

const FoodCardInSideBar: React.FC<FoodItem> = ({
  food,
  price,
  food_image,
  onAdd,
  onRemove,
  quantity,
}) => {
  return (
    <div className="p-12 flex flex-col gap-16 w-full bg-white border-b">
      <div className="flex justify-between">
        <div className="flex-1 flex flex-col">
          <Text variant={"sm"}>{food}</Text>
        </div>
        <div className=" max-w-60 max-h-60 ml-auto">
          <Image
            className="rounded-lg"
            src={"http://193.151.151.66/" + food_image}
          />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <Toman price={price} />

        <div>
          {quantity ? (
            <div className="border border-primary-500 rounded-lg gap-xs flex px-8 items-center justify-between">
              <SVGPlus
                className="!text-lg !text-primary-500 cursor-pointer"
                onClick={onAdd}
              />
              <Text className="max-w-[30px] !appearance-none !text-center inline-flex items-center justify-center mx-auto min-w-[30px] bg-primary-500 !text-white py-2">
                {quantity}
              </Text>
              <SVGMinus
                className="!text-lg !text-primary-500 cursor-pointer"
                onClick={onRemove}
              />
            </div>
          ) : (
            <Button
              variant={"outline"}
              size={"md"}
              className="!px-48"
              onClick={onAdd}
            >
              افزودن{" "}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodCardInSideBar;
