import clsx from "clsx";
import { CalendarType, HolidayType } from "../types/calendar";
import styles from "./styles/calendar.module.css";
import { BIG_MODE, MINI_MODE } from "./calendarType/calendarType";
import Header from "./header/Header";
import Days from "./days/Days";
import Cell from "./cell/Cell";

const Calendar = ({ mode, children, page }: CalendarType) => {
  const calendarClasses = clsx({
    [styles["mini-calendar"]]: mode === MINI_MODE,
    [styles["big-calendar"]]: mode === BIG_MODE,
  });

  const headerWrapperClasses = clsx({
    [styles["mini-calendar-header-wrapper"]]: mode === MINI_MODE,
  });

  const bodyWrapperClasses = clsx({
    [styles["big-body-wrapper"]]: mode === BIG_MODE,
  });

  return (
    <div className={calendarClasses}>
      <div className={headerWrapperClasses}>
        <Header mode={mode} />
        {/* {children} */}
      </div>

      <div className={bodyWrapperClasses}>
        <Days mode={mode} />
        <Cell mode={mode} />
      </div>
    </div>
  );
};

export default Calendar;
