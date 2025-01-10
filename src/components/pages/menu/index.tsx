import { ReactElement, useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import useApi from "@/hooks/useQuery";
import { services } from "@/services";
import FoodCard from "@/components/cards/FoodCard";
import useMyStore from "@/store/store";
import FoodCardInSideBar from "@/components/cards/FoodCardInSideBar";
import { Button, Heading, Text } from "@chakra-ui/react";
import Toman from "@/components/common/Toman";
import SVGFileDescription from "@/components/svgs/SVGFileDescription";
import getCurrentWeekDays from "@/utils/getDayOfWeek";
const loaderArray = [...Array(40)];

const Index = (): ReactElement => {
  const [today, setToday] = useState(
    dayjs().calendar("jalali").format("DD/MM/YYYY")
  );
  let currentWeek = getCurrentWeekDays();
  const { data, isLoading } = useApi(
    {
      apiFetcher: services.menuServices.getFoodMenu,
      options: {
        params: {
          date: "1403-10-5",
        },
      },
    },
    [today]
  );

  const [activeCategory, setActiveCategory] = useState<string>("");
  const foodListCategoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>(
    {}
  );

  useEffect(() => {
    if (!data || data.length === 0) {
      console.error("No data available to observe.");
      return;
    }

    const options = {
      root: null,
      rootMargin: "5px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveCategory(entry.target.id);
        }
      });
    }, options);

    Object.values(foodListCategoryRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, [data]);

  const handleCategoryClick = (category: string) => {
    const section = foodListCategoryRefs.current[category];
    if (section) {
      section.scrollIntoView({ behavior: "smooth", inline: "center" });
    }
  };
  const { addOrder, decrement } = useMyStore(
    (state) => state.orderSlice.action
  );

  const { orders } = useMyStore((state) => state.orderSlice.state);

  let ordersList = Object.keys(orders[today] ?? {});

  const userOrders =
    data
      ?.flatMap((item) => item.food)
      .filter((filtered) => ordersList.includes(String(filtered?.id))) || [];

  const totalPrice = userOrders?.reduce(
    (prev, curr) => +prev + +curr.price * orders[today][curr.id].count,
    0
  );

  const totalQuantity = userOrders?.reduce(
    (prev, curr) => +prev + 1 * orders[today][curr.id].count,
    0
  );
  return (
    <div className="grid grid-cols-4 grid-rows-12 gap-24 min-h-[95vh] max-h-[95vh] overflow-hidden  ">
      <div className="col-span-3 row-span-1 grid grid-cols-7 gap-8 pl-16">
        {currentWeek.map((item) => (
          <div
            key={item.date}
            className={`bg-white gap-4 inline-flex p-8 pl-28 rounded-lg cursor-pointer ${
              item?.date === today && "!bg-primary-500 !text-white"
            }`}
            onClick={() => {
              setToday(item.date);
            }}
          >
            <Text
              variant={"md"}
              className={`rounded-xl px-8 bg-alpha-border ${
                item?.date === today && "!bg-white !text-gray"
              }`}
            >
              {item.day}
            </Text>
            <Text
              variant={"md"}
              className={item?.date === today && "!bg-primary-500 !text-white"}
            >
              {item.dayName}
            </Text>
          </div>
        ))}
      </div>
      <div className="col-span-4 grid grid-cols-4 gap-16">
        <div className="col-span-3 flex flex-col gap-24 grid-rows-12">
          <div className="row-span-1 w-full bg-white px-4 py-8 rounded-lg overflow-x-auto overflow-y-hidden">
            <div className="flex flex-nowrap">
              {isLoading &&
                loaderArray.map((item) => (
                  <div
                    className={`min-w-[25%] bg-alpha-text10 animate-pulse h-32 inline-flex p-24 mx-8 px-18 rounded-lg cursor-pointer `}
                  ></div>
                ))}
              {data?.map((item) => (
                <div
                  key={item.category}
                  className={`min-w-[25%] bg-white inline-flex p-10 mx-8 px-18 rounded-lg cursor-pointer ${
                    activeCategory === item.category
                      ? "!bg-alpha-primaryBg !text-primary-500"
                      : ""
                  }`}
                  onClick={() => handleCategoryClick(item.category)}
                >
                  <Text className="!text-center w-full !text-current">
                    {" "}
                    {item.category}
                  </Text>
                </div>
              ))}
            </div>
          </div>{" "}
          <div className="overflow-y-scroll max-h-[70vh]">
            {isLoading && (
              <div className=" grid grid-cols-3 gap-8 my-32">
                {loaderArray.map((item) => (
                  <div
                    className={`min-w-[50%] bg-alpha-text10 animate-pulse h-90 inline-flex p-10 mx-2 px-18 rounded-lg cursor-pointer `}
                  ></div>
                ))}
              </div>
            )}
            {data?.map((item) => (
              <div
                id={item.category}
                key={item.category}
                ref={(el) => (foodListCategoryRefs.current[item.category] = el)}
                className="category-section grid grid-cols-3 gap-8 my-32"
              >
                {item.food.map((foodItem) => (
                  <FoodCard
                    key={foodItem.id}
                    {...foodItem}
                    onAdd={() => addOrder({ date: today, id: foodItem.id })}
                    onRemove={() => decrement({ date: today, id: foodItem.id })}
                    quantity={orders[today]?.[foodItem.id]?.count ?? 0}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        {isLoading && (
          <div
            className={`min-w-[50%] bg-alpha-text10 animate-pulse h-[70vh] inline-flex p-10 mx-2 px-18 rounded-lg cursor-pointer `}
          ></div>
        )}
        {!!userOrders.length ? (
          <div className="bg-white px-16 rounded-lg pb-16 flex flex-col">
            <Heading size={"base"} className="!py-16 border-b">
              سفارشات شما
            </Heading>
            <div className="overflow-y-scroll max-h-[50vh] flex-1 min-h-[50px]">
              {userOrders.reverse().map((item) => (
                <FoodCardInSideBar
                  key={item.id}
                  {...item}
                  onAdd={() => addOrder({ date: today, id: item.id })}
                  onRemove={() => decrement({ date: today, id: item.id })}
                  quantity={orders[today]?.[item.id]?.count ?? 0}
                />
              ))}
            </div>
            <div className="flex flex-col gap-16 py-16 border-t justify-between">
              <div className="flex items-center justify-between">
                <Text size={"sm"} className="leading-4">
                  جمع سفارش امروز ({totalQuantity})
                </Text>
                <Toman price={totalPrice} />
              </div>
              <div className="flex items-center justify-between">
                <Text size={"sm"} className="leading-4">
                  سهم شرکت{" "}
                </Text>
              </div>{" "}
              <div className="flex items-center justify-between">
                <Text size={"sm"} className="leading-4">
                  سهم شما{" "}
                </Text>
              </div>
              <Button>تایید نهایی</Button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg max-h-[30vh] gap-16 flex flex-col items-center py-16">
            <SVGFileDescription
              className="!text-alpha-text20 !text-xl"
              width={32}
              height={32}
            />
            <Text variant={"sm"} className="!text-alpha-text20">
              در این تاریخ هیچ سفارشی ثبت نشده.{" "}
            </Text>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
