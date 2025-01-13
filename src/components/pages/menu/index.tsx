import {
  ReactElement,
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import dayjs from "dayjs";
import useApi from "@/hooks/useQuery";
import { services } from "@/services";
import FoodCard from "@/components/cards/FoodCard";
import useMyStore from "@/store/store";
import FoodCardInSideBar from "@/components/cards/FoodCardInSideBar";
import {
  Button,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import Toman from "@/components/common/Toman";
import SVGFileDescription from "@/components/svgs/SVGFileDescription";
import getCurrentWeekDays from "@/utils/getDayOfWeek";
import SVGChevronLeft from "@/components/svgs/SVGChevronLeft";
import SVGCurrentLocation from "@/components/svgs/SVGCurrentLocation";
import SVGChevronDown from "@/components/svgs/SVGChevronDown";

const loaderArray = [...Array(40)];

const Index = (): ReactElement => {
  const [today, setToday] = useState(
    dayjs().calendar("jalali").format("DD/MM/YYYY")
  );
  const currentWeek = useMemo(() => getCurrentWeekDays(), []);

  const foodListCategoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>(
    {}
  );
  const foodListContainerRef = useRef(null);
  const categoryRef = useRef(null);
  const { profileData } = useMyStore((state) => state.userSlice.state.userData);
  const { data, isLoading } = useApi(
    {
      apiFetcher: services.menuServices.getFoodMenu,
      options: { params: { date: today.split("/").reverse().join("-") } },
    },
    [today]
  );

  const [activeCategory, setActiveCategory] = useState<string>("");
  const [activeAddress, setActiveAddress] = useState<string>(
    profileData["address.id"]
  );

  useEffect(() => {
    if (!data || data.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id);
          }
        });
      },
      { root: null, rootMargin: "5px", threshold: 0.5 }
    );

    Object.values(foodListCategoryRefs.current).forEach(
      (ref) => ref && observer.observe(ref)
    );
    return () => observer.disconnect();
  }, [data]);

  const handleCategoryClick = useCallback((category: string) => {
    const section = foodListCategoryRefs.current[category];
    const container = foodListContainerRef.current;

    if (section && container) {
      const offset = section.offsetTop - container.offsetTop;

      container.scrollTo({
        top: offset,
        behavior: "smooth",
      });

      setActiveCategory(category);
    } else {
      console.error(`Section with id "${category}" not found.`);
    }
  }, []);

  const {
    state: { orders },
    action: { addOrder, decrement },
  } = useMyStore((state) => state.orderSlice);

  const userOrders = useMemo(
    () =>
      data
        ?.flatMap((item) => item.food)
        .filter((food) => orders[today]?.[food.id]) || [],
    [data, orders, today]
  );

  const { totalPrice, totalQuantity } = useMemo(() => {
    const total = userOrders.reduce(
      (acc, food) => ({
        price: acc.price + food.price * orders[today][food.id].count,
        quantity: acc.quantity + orders[today][food.id].count,
      }),
      { price: 0, quantity: 0 }
    );

    return { totalPrice: total.price, totalQuantity: total.quantity };
  }, [userOrders, orders, today]);

  const handleScrollLeft = () => {
    if (categoryRef.current) {
      categoryRef.current.scrollTo({
        left: categoryRef.current.scrollLeft - 200,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="flex flex-col gap-16 overflow-hidden">
      <div className="grid grid-cols-7 gap-16">
        <div className="col-span-5 ">
          <div className="grid grid-cols-7 gap-8 ">
            {currentWeek.map((item) => (
              <div
                key={item.date}
                className={`bg-white gap-4 flex items-center  px-4 py-8 pl-28 shadow-cards rounded-lg cursor-pointer h-44 ${
                  item.date === today ? "!bg-primary-500 !text-white" : ""
                }`}
                onClick={() => setToday(item.date)}
              >
                <Text
                  variant="md"
                  className={`rounded-full bg-alpha-border !h-28 min-h-28 !w-28 min-w-28 !text-center ${item.date === today ? "!bg-white !text-gray" : ""}`}
                >
                  {item.day}
                </Text>
                <Text
                  variant="md"
                  className={
                    item.date === today ? "!bg-primary-500 !text-white" : ""
                  }
                >
                  {item.dayName}
                </Text>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-2"></div>
        <div className="flex items-center justify-between rounded-lg col-span-5 ">
          <div
            className="flex overflow-hidden items-center !bg-white p-8 relative rounded-r-lg w-full h-full max-h-60"
            ref={categoryRef}
          >
            {isLoading
              ? loaderArray.map((_, index) => (
                  <div
                    key={index}
                    className="bg-alpha-text10 animate-pulse h-32 w-24 mx-4 rounded-lg cursor-pointer"
                  />
                ))
              : data?.map((item) => (
                  <Text
                    key={item.category}
                    className={`!min-w-120 !max-w-120 !text-current bg-white inline-flex mx-4 px-6 py-4 rounded-lg cursor-pointer h-40 items-center justify-center text-center ${
                      activeCategory === item.category
                        ? "!bg-alpha-primaryBg !text-primary-500"
                        : ""
                    }`}
                    onClick={() => handleCategoryClick(item.category)}
                  >
                    {item.category}
                  </Text>
                ))}{" "}
          </div>
          <SVGChevronLeft
            className="flex items-center top-0 justify-center shadow-neumorphism bg-white left-0 rounded-l-lg cursor-pointer z-10 h-full"
            onClick={handleScrollLeft}
          />
        </div>
        <div className="col-span-2 px-4">
          <div className="bg-white flex items-center justify-center p-8 rounded-lg max-h-60">
            <Menu matchWidth>
              {({ isOpen }) => (
                <>
                  <MenuButton className="border-none w-full py-8">
                    <div className="w-full grid grid-cols-8 gap-4 content-center justify-center  items-center">
                      <div className="col-span-1 w-32 h-32 bg-greyBlue rounded-lg p-4 ">
                        <SVGCurrentLocation className="text-[#BECAD8]" />
                      </div>
                      <div className="col-span-6">
                        <Text className="!text-start leading-4 max-w-[90%] !truncate !font-medium !text-12">
                          {
                            profileData?.addresses?.find(
                              (item) => item.id == +activeAddress
                            )?.name
                          }
                        </Text>
                        <Text className="!text-start leading-4 max-w-[90%] !truncate !font-normal !text-10">
                          {
                            profileData?.addresses?.find(
                              (item) => item.id == +activeAddress
                            )?.address
                          }
                        </Text>
                      </div>
                      <div className="col-span-1 flex items-center justify-start mr-auto">
                        <SVGChevronDown
                          className={isOpen ? "rotate-180" : ""}
                        />
                      </div>
                    </div>
                  </MenuButton>
                  <MenuList>
                    {profileData.addresses.map((item) => (
                      <MenuItem
                        className={`overflow-hidden py-4 mb-4 ${item.id == +activeAddress && "!bg-greyBlue"}
                        hover:!bg-greyBlue hover:!text-white 
                        `}
                        onClick={() => {
                          setActiveAddress(String(item.id));
                        }}
                      >
                        <div
                          className={`w-full flex flex-col items-start justify-start !relative`}
                        >
                          <Text
                            className={`!text-start leading-4 min-w-[90%] max-w-[90%] !truncate !font-medium !text-12 ${item.id == +activeAddress && "!text-alert"}`}
                          >
                            {item.name}
                          </Text>
                          <Text className="!text-start leading-4 min-w-[90%] max-w-[90%] !truncate !font-normal !text-10">
                            {item.address}
                          </Text>
                          <div
                            className={`absolute w-10 rounded-md  top-1/2 -translate-y-1/2 translate-x-17 h-47 ${
                              item.id == +activeAddress && "!bg-alert"
                            }`}
                          ></div>{" "}
                        </div>
                      </MenuItem>
                    ))}
                  </MenuList>
                </>
              )}
            </Menu>
          </div>
        </div>
        <div className="col-span-5">
          <div
            className="overflow-y-auto max-h-[75vh]"
            ref={foodListContainerRef}
          >
            {isLoading ? (
              <div className="grid grid-cols-3 gap-8 justify-center">
                {loaderArray.map((_, index) => (
                  <div
                    key={index}
                    className="min-w-[50%] bg-alpha-text10 animate-pulse h-40 mx-2 p-4 rounded-lg cursor-pointer"
                  />
                ))}
              </div>
            ) : (
              data?.map((item, index) => (
                <div
                  id={item.category}
                  key={item.category}
                  ref={(el) =>
                    (foodListCategoryRefs.current[item.category] = el)
                  }
                  className={`grid grid-cols-3 gap-8 justify-center ${index > 0 && "my-32"}`}
                >
                  {item.food.map((foodItem) => (
                    <FoodCard
                      key={foodItem.id}
                      {...foodItem}
                      onAdd={() => addOrder({ date: today, id: foodItem.id })}
                      onRemove={() =>
                        decrement({ date: today, id: foodItem.id })
                      }
                      quantity={orders[today]?.[foodItem.id]?.count ?? 0}
                    />
                  ))}
                </div>
              ))
            )}
          </div>
        </div>
        <div className="col-span-2 px-4">
          {isLoading ? (
            <div className="min-w-[50%] w-full bg-alpha-text10 animate-pulse h-[60vh] inline-flex p-10 mx-2 px-18 rounded-lg cursor-pointer" />
          ) : userOrders.length ? (
            <div className="bg-white px-16 rounded-lg pb-16 flex flex-col">
              <Heading size="base" className="!py-16 border-b">
                سفارشات شما
              </Heading>
              <div className="overflow-y-scroll max-h-[37vh] flex-1 min-h-[45px]">
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
                  <Text size="sm" className="leading-4">
                    جمع سفارش امروز ({totalQuantity})
                  </Text>
                  <Toman price={totalPrice} />
                </div>
                <div className="flex items-center justify-between">
                  <Text size="sm" className="leading-4">
                    سهم شرکت
                  </Text>
                </div>
                <div className="flex items-center justify-between">
                  <Text size="sm" className="leading-4">
                    سهم شما
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
              <Text variant="sm" className="!text-alpha-text20">
                در این تاریخ هیچ سفارشی ثبت نشده.
              </Text>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
