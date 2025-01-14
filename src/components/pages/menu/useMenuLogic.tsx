import useApi from "@/hooks/useQuery";
import { services } from "@/services";
import useMyStore from "@/store/store";
import getCurrentWeekDays from "@/utils/getDayOfWeek";
import { useToast } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const useMenuLogic = () => {
  const [today] = useState(dayjs().calendar("jalali").format("DD/MM/YYYY"));
  const [activeDate, setActiveDate] = useState(
    dayjs().calendar("jalali").format("DD/MM/YYYY")
  );

  const currentWeek = useMemo(() => getCurrentWeekDays(), []);

  const foodListCategoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>(
    {}
  );

  const isNextDate = (date: string) => {
    const currentDate = Number(today.split("/").join(""));
    const selectedDate = Number(date.split("/").join(""));
    return selectedDate > currentDate;
  };
  const isToday = (date: string) => {
    const currentDate = Number(today.split("/").join(""));
    const selectedDate = Number(date.split("/").join(""));
    return selectedDate == currentDate;
  };
  const isPrevDate = (date: string) => {
    const currentDate = Number(today.split("/").join(""));
    const selectedDate = Number(date.split("/").join(""));
    return selectedDate < currentDate;
  };
  const foodListContainerRef = useRef(null);
  const categoryRef = useRef(null);
  const { profileData } = useMyStore((state) => state.userSlice.state.userData);
  const { data, isLoading } = useApi(
    {
      apiFetcher: services.menuServices.getFoodMenu,
      options: { params: { date: activeDate.split("/").reverse().join("-") } },
    },
    [activeDate]
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

  const { company_bonuse } = useMyStore(
    (state) => state.userSlice.state.userData.profileData
  );

  const {
    data: orderPerDay,
    refetch: getTodayOrder,
    isLoading: isGettingOrder,
  } = useApi(
    {
      apiFetcher: services.orderServices.getOrderByDate,
      options: {
        params: activeDate.split("/").reverse().join("-"),
        onSuccess(data) {
          data.data.details.forEach((item) =>
            addOrder({
              date: activeDate,
              id: item.food_id,
              quantity: item.quantity,
            })
          );
          setActiveAddress(`${data.data.address_id}`);
        },
      },
    },
    [activeDate]
  );

  const userOrders = useMemo(
    () =>
      data
        ?.flatMap((item) => item.food)
        .filter((food) => orders[activeDate]?.[food.id]) || [],
    [data, orders, activeDate, isGettingOrder]
  );

  const { totalPrice, totalQuantity } = useMemo(() => {
    const total = userOrders.reduce(
      (acc, food) => ({
        price: acc.price + food.price * orders[activeDate][food.id].count,
        quantity: acc.quantity + orders[activeDate][food.id].count,
      }),
      { price: 0, quantity: 0 }
    );

    return { totalPrice: total.price, totalQuantity: total.quantity };
  }, [userOrders, orders, activeDate]);

  const handleScrollLeft = () => {
    if (categoryRef.current) {
      categoryRef.current.scrollTo({
        left: categoryRef.current.scrollLeft - 200,
        behavior: "smooth",
      });
    }
  };
  const toast = useToast();

  const { refetch, isLoading: isSubmittingOrder } = useApi({
    apiFetcher: services.orderServices.submitEmployeeOrder,
    options: {
      autoFetch: false,
      enabled: false,
      onSuccess(data) {
        getTodayOrder(activeDate.split("/").reverse().join("-"));
        toast({
          title: data.messages[0],
          status: "success",
          duration: 5000,
          position: "top",
          isClosable: true,
        });
      },
    },
  });

  const userBonuse = useMemo(() => {
    return orderPerDay?.data?.company_bonuse || company_bonuse;
  }, [orderPerDay]);
  return {
    userBonuse,
    refetch,
    isSubmittingOrder,
    handleScrollLeft,
    totalPrice,
    totalQuantity,
    addOrder,
    decrement,
    handleCategoryClick,
    activeCategory,
    setActiveCategory,
    activeAddress,
    setActiveAddress,
    currentWeek,
    data,
    isLoading,
    activeDate,
    setActiveDate,
    isGettingOrder,
    today,
    userOrders,
    profileData,
    categoryRef,
    foodListContainerRef,
    foodListCategoryRefs,
    orders,
    isNextDate,
    isPrevDate,
    isToday,
  };
};

export default useMenuLogic;
