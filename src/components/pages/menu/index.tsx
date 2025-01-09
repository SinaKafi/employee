import React, { useState } from "react";
import dayjs from "dayjs";
import jalaliday from "jalaliday";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import useApi from "@/hooks/useQuery";
import { services } from "@/services";
import FoodCard from "@/components/cards/FoodCard";

dayjs.extend(isSameOrBefore);
dayjs.extend(jalaliday);

function getCurrentWeekDays() {
  const persianDays = {
    Saturday: "شنبه",
    Sunday: "یکشنبه",
    Monday: "دوشنبه",
    Tuesday: "سه‌شنبه",
    Wednesday: "چهارشنبه",
    Thursday: "پنج‌شنبه",
    Friday: "جمعه",
  };

  const daysOfWeek = [];
  const currentDate = dayjs().calendar("jalali");
  const startOfWeek = currentDate.startOf("week");
  const endOfWeek = currentDate.endOf("week");
  console.log({ currentDate: currentDate.daysInMonth() });
  let day = startOfWeek;

  while (day.isSameOrBefore(endOfWeek, "day")) {
    daysOfWeek.push({
      dayName: persianDays[day.format("dddd")],
      day: day.format("DD"),
      date: day.format("DD/MM/YYYY"),
    });
    day = day.add(1, "day");
  }

  return daysOfWeek;
}

const index = () => {
  const [today, setToday] = useState(
    dayjs().calendar("jalali").format("DD/MM/YYYY")
  );
  console.log(getCurrentWeekDays());
  let currentWeek = getCurrentWeekDays();
  const { data } = useApi(
    {
      apiFetcher: services.menuServices.getFoodMenu,
      options: {
        // params: { date: today.split("/").reverse().join("-") },
        params: {
          date: "1403-10-5",
        },
      },
    },
    [today]
  );
  return (
    <div className="flex flex-col gap-24 min-h-[95vh] max-h-[95vh] overflow-y-scroll">
      <div>
        {currentWeek.map((item) => (
          <div
            className={`bg-white inline-flex p-10 mx-8 px-18 rounded-lg cursor-pointer ${item?.date === today && "!bg-error-200 !text-white"}`}
            onClick={() => {
              setToday(item.date);
            }}
          >
            {item.dayName} - {item.day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-4">
        <div className="col-span-3 flex flex-col gap-24">
          <div>
            {data?.map((item) => (
              <div
                key={item.category}
                className={`bg-white inline-flex p-10 mx-8 px-18 rounded-lg cursor-pointer `}
              >
                {item.category}
              </div>
            ))}
          </div>
          <div>
            {data?.map((item) => (
              <div
                id={`#${item.category}`}
                className="grid grid-cols-3 gap-8 my-16"
              >
                {item.food.map((item) => (
                  <FoodCard {...item} />
                ))}
              </div>
            ))}
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default index;
