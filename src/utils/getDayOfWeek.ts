// import dayjs from "dayjs";

// import jalaliday from "jalaliday";
// import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

// dayjs.extend(isSameOrBefore);
// dayjs.extend(jalaliday);

// function getCurrentWeekDays() {
//   const persianDays = {
//     Saturday: "شنبه",
//     Sunday: "یکشنبه",
//     Monday: "دوشنبه",
//     Tuesday: "سه‌شنبه",
//     Wednesday: "چهارشنبه",
//     Thursday: "پنج‌شنبه",
//     Friday: "جمعه",
//   };

//   const daysOfWeek = [];
//   const currentDate = dayjs().calendar("jalali");
//   const startOfWeek = currentDate.startOf("week");
//   const endOfWeek = currentDate.endOf("week");
//   let day = startOfWeek;

//   while (day.isSameOrBefore(endOfWeek, "day")) {
//     daysOfWeek.push({
//       dayName: persianDays[day.format("dddd")],
//       day: day.format("DD"),
//       date: day.format("DD/MM/YYYY"),
//     });
//     day = day.add(1, "day");
//   }

//   return daysOfWeek;
// }
// export default getCurrentWeekDays;
// import dayjs from "dayjs";
// import jalaliday from "jalaliday";
// import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

// dayjs.extend(isSameOrBefore);
// dayjs.extend(jalaliday);

// function getCurrentWeekDays() {
//   const persianDays = {
//     Saturday: "شنبه",
//     Sunday: "یکشنبه",
//     Monday: "دوشنبه",
//     Tuesday: "سه‌شنبه",
//     Wednesday: "چهارشنبه",
//     Thursday: "پنج‌شنبه",
//     Friday: "جمعه",
//   };

//   const daysOfWeek = [];
//   const currentDate = dayjs().calendar("jalali");
//   let day = currentDate.add(1, "day"); // Start from tomorrow
//   const endDay = currentDate.add(7, "day"); // Get next 7 days including tomorrow

//   while (day.isSameOrBefore(endDay, "day")) {
//     daysOfWeek.push({
//       dayName: persianDays[day.format("dddd")],
//       day: day.format("DD"),
//       date: day.format("DD/MM/YYYY"),
//     });
//     day = day.add(1, "day");
//   }

//   return daysOfWeek;
// }

// export default getCurrentWeekDays;
import dayjs from "dayjs";
import jalaliday from "jalaliday";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

dayjs.extend(isSameOrBefore);
dayjs.extend(jalaliday);
dayjs.extend(isSameOrAfter);
function getWeekDays() {
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
  let currentDate = dayjs().calendar("jalali");
  const startOfWeek = currentDate.startOf("week");
  // const endOfWeek = currentDate.endOf("week");

  // If today is Thursday or later, move to next week
  if (currentDate.isSameOrAfter(startOfWeek.add(4, "day"), "day")) {
    currentDate = currentDate.add(1, "week");
  }

  const adjustedStartOfWeek = currentDate.startOf("week");
  const adjustedEndOfWeek = currentDate.endOf("week");
  let day = adjustedStartOfWeek;

  while (day.isSameOrBefore(adjustedEndOfWeek, "day")) {
    daysOfWeek.push({
      dayName: persianDays[day.format("dddd")],
      day: day.format("DD"),
      date: day.format("DD/MM/YYYY"),
    });
    day = day.add(1, "day");
  }

  return daysOfWeek;
}

export default getWeekDays;
