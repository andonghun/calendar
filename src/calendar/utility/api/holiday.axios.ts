import dayjs from "dayjs";
import { HolidayType } from "../../../types/calendar";
import { processHoldayList } from "../formatHoliday";
import axios from "axios";

const URL = "https://superkts.com/day/holiday";
const getHolidaysFrom2000To2050 = async () => {
  const startYearOfHoliday = 2000;
  const holidayObject: { [key: string]: HolidayType[] } = {};

  // 2000년부터 2030년까지
  for (let i = 0; i <= 50; i++) {
    const holidayYear = dayjs()
      .year(startYearOfHoliday)
      .add(i, "year")
      .format("YYYY");
    const { data } = await axios.get(`${URL}/${holidayYear}`);
    const holidayList = processHoldayList(data, holidayYear);
    holidayObject[holidayYear] = holidayList;
  }

  return holidayObject;
};

export default getHolidaysFrom2000To2050;
