import { Dayjs } from "dayjs";
import { setSelectedDate } from "../zustand/dayZustand";
import { setCalendarCurrentDate } from "../zustand/calendarZustand";

const useSelectDay = () => {
  const selectDayHandler = (day: Dayjs) => () => {
    setSelectedDate(day);
    setCalendarCurrentDate(day);
  };

  return { selectDayHandler };
};

export default useSelectDay;
