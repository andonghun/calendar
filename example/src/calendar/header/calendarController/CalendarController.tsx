import clsx from "clsx";
import React from "react";
import { BIG_MODE, MINI_MODE } from "../../calendarType/calendarType";
import styles from "./styles/calendarController.module.css";
import { ReactComponent as ArrowLeft } from "../../icons/calendar-arrow-left.svg";
import { ReactComponent as ArrowRight } from "../../icons/calendar-arrow-right.svg";
import { CalendarModeType } from "../../../types/calendar";
import { useCalendar } from "../../../hook/useCalendar";

const HeaderController = ({ mode }: { mode: CalendarModeType }) => {
  const { clickPreMonthHandler, clickNextMonthHandler } = useCalendar();
  return (
    <div className={clsx(mode === BIG_MODE && styles["big-calendar-group"])}>
      <button
        type="button"
        className={clsx(styles["calendar-base-btn"], {
          [styles["mini-btn-left"]]: mode === MINI_MODE,
          [styles["big-calendar-btn"]]: mode === BIG_MODE,
        })}
        onClick={clickPreMonthHandler}
      >
        <ArrowLeft />
      </button>

      <button
        type="button"
        className={clsx(styles["calendar-base-btn"], {
          [styles["mini-btn-right"]]: mode === MINI_MODE,
          [styles["big-calendar-btn"]]: mode === BIG_MODE,
        })}
        onClick={clickNextMonthHandler}
      >
        <ArrowRight />
      </button>
    </div>
  );
};

export default React.memo(HeaderController);
