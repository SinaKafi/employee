import dayjs from "dayjs";

import jalaliday from "jalaliday";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

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
export default getCurrentWeekDays;
