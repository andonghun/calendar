'use strict';

var dayjs = require('dayjs');
var zustand = require('zustand');
var timezone = require('dayjs/plugin/timezone');
var utc = require('dayjs/plugin/utc');
var week = require('dayjs/plugin/weekOfYear');
require('dayjs/plugin/weekday');
var React$1 = require('react');
var jsxRuntime = require('react/jsx-runtime');
var clsx = require('clsx');
var classVarianceAuthority = require('class-variance-authority');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * Value
 */
var useCalendarState = zustand.create()(function () { return ({
    currentDate: dayjs(),
}); });
/**
 * Action
 */
var setCalendarCurrentDate = function (currentDate) {
    return useCalendarState.setState(function (state) { return (__assign(__assign({}, state), { currentDate: currentDate })); });
};
var resetCurrentDate = function () {
    return useCalendarState.setState(function (state) { return (__assign(__assign({}, state), { currentDate: dayjs() })); });
};

dayjs.extend(week);
dayjs.extend(utc);
dayjs.extend(timezone);
function useDayjs(date) {
    return dayjs(date);
}
var today = dayjs();
var selectedDate = dayjs();
var utcStandardDate = dayjs().hour(0).subtract(9, "hour");
var useDayState = zustand.create()(function () { return ({
    today: today,
    selectedDate: selectedDate,
    utcStandardDate: utcStandardDate,
}); });
var setSelectedDate = function (day) {
    return useDayState.setState(function (state) { return (__assign(__assign({}, state), { selectedDate: day })); });
};
var resetSelectedDate = function () {
    return useDayState.setState(function (state) { return (__assign(__assign({}, state), { selectedDate: selectedDate })); });
};

var useCalendar = function () {
    var currentDate = useCalendarState(function (state) { return state.currentDate; });
    //   const selectedDate = useDayState((state) => state.selectedDate);
    // 날짜 클릭하면 그 날짜를 기준으로 1주일 전꺼 까지 Data를 불러오는 함수입니다.
    var clickPreMonthHandler = React$1.useCallback(function () {
        setCalendarCurrentDate(currentDate.subtract(1, "month"));
    }, [currentDate]);
    //다음 달로 이동
    var clickNextMonthHandler = React$1.useCallback(function () {
        setCalendarCurrentDate(currentDate.add(1, "month"));
    }, [currentDate]);
    return {
        clickPreMonthHandler: clickPreMonthHandler,
        clickNextMonthHandler: clickNextMonthHandler,
    };
};

var useSelectDay = function () {
    var selectDayHandler = function (day) { return function () {
        setSelectedDate(day);
        setCalendarCurrentDate(day);
    }; };
    return { selectDayHandler: selectDayHandler };
};

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z$6 = "/*\n미니 캘린더일 때\n*/\n.calendar-module_mini-calendar__zNIy0 {\n  display: inline-flex;\n  padding: 2rem;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 1.5rem;\n  border-radius: 0.5rem;\n  border: 1px solid #ededed;\n  background: #fff;\n}\n.calendar-module_mini-calendar-header-wrapper__17t9q {\n  display: flex;\n  width: 100%;\n  justify-content: center;\n  align-items: center;\n}\n\n/*big Calendar 일 때*/\n.calendar-module_big-calendar__ozY6J {\n  display: flex;\n  max-width: 152rem;\n  margin: 0 auto;\n  width: 100%;\n  align-items: flex-start;\n  gap: clamp(2%, 4rem, 4rem);\n  justify-content: space-between;\n  margin-top: 2rem;\n  padding-bottom: 5rem;\n}\n.calendar-module_big-body-wrapper__onU5l {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 2rem;\n  width: 78%;\n  max-width: 1260px;\n  padding: 3rem;\n  border-radius: 2rem;\n  border: 1px solid #ededed;\n}\n";
var styles$6 = {"mini-calendar":"calendar-module_mini-calendar__zNIy0","mini-calendar-header-wrapper":"calendar-module_mini-calendar-header-wrapper__17t9q","big-calendar":"calendar-module_big-calendar__ozY6J","big-body-wrapper":"calendar-module_big-body-wrapper__onU5l"};
styleInject(css_248z$6);

/**
 * 캘린더 모드 상수
 */
var MINI_MODE = "MINI_MODE";
var BIG_MODE = "BIG_MODE";
/**
 * HeaderDate.tsx에서 사용되는 format type
 */
var YEAR_FORMAT_TYPE = "YYYY년";
var MONTH_FORMAT_TYPE = "MM월";
// Cell, CellITEM 에서 쓰이는 FORMAT TYPE 입니다.
var FORMAT_CELL_DATE_TYPE = "YYYY. MM. DD";

var css_248z$5 = ".header-module_base-header__9Z9tk {\n  display: flex;\n  width: 100%;\n  align-items: center;\n  border-bottom: 1px solid #fff;\n  margin-bottom: 0.8rem;\n  padding-bottom: 0.2rem;\n}\n\n/*mini 일 때*/\n.header-module_mini-header__40q5A {\n  position: relative;\n  justify-content: center;\n}\n\n/*big 일 때*/\n.header-module_big-header__d5x1K {\n  width: 16rem;\n  gap: 2rem;\n  flex-direction: column;\n  align-items: start;\n}\n";
var styles$5 = {"base-header":"header-module_base-header__9Z9tk","mini-header":"header-module_mini-header__40q5A","big-header":"header-module_big-header__d5x1K"};
styleInject(css_248z$5);

var css_248z$4 = ".calendarController-module_calendar-base-btn__mRZsH {\n  background-color: transparent;\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 1.2rem;\n  padding: 0;\n  cursor: pointer;\n}\n\n.calendarController-module_calendar-base-btn__mRZsH p svg {\n  stroke-width: 1px;\n  stroke: var(--text2, #5c5c5c);\n}\n/*\nmini\n*/\n.calendarController-module_mini-btn-right__2ghkV {\n  width: 2.2rem;\n  right: 0;\n}\n\n.calendarController-module_mini-btn-left__3NUTA {\n  width: 2.2rem;\n  left: 0;\n}\n\n/*\nbig\n*/\n.calendarController-module_big-calendar-group__QUx5j {\n  display: flex;\n  gap: 1rem;\n}\n\n.calendarController-module_big-calendar-btn__v7T0u {\n  position: static;\n  display: flex;\n  width: 5.5rem;\n  height: 5.5rem;\n  transform: translateY(0);\n  padding: 1rem !important;\n  margin: 0;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  gap: 1rem;\n  border-radius: 0.8rem;\n  border-radius: 0.8rem;\n  background: var(--bg-g, #f7f7f7);\n}\n\n.calendarController-module_big-calendar-btn__v7T0u :hover {\n  opacity: 0.8;\n}\n";
var styles$4 = {"calendar-base-btn":"calendarController-module_calendar-base-btn__mRZsH","mini-btn-right":"calendarController-module_mini-btn-right__2ghkV","mini-btn-left":"calendarController-module_mini-btn-left__3NUTA","big-calendar-group":"calendarController-module_big-calendar-group__QUx5j","big-calendar-btn":"calendarController-module_big-calendar-btn__v7T0u"};
styleInject(css_248z$4);

var _path$1;
function _extends$1() { _extends$1 = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1.apply(this, arguments); }
var SvgCalendarArrowLeft = function SvgCalendarArrowLeft(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$1({
    xmlns: "http://www.w3.org/2000/svg",
    width: 35,
    height: 35,
    fill: "none"
  }, props), _path$1 || (_path$1 = /*#__PURE__*/React.createElement("path", {
    stroke: "#5C5C5C",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "m21.5 25.5-8-7.5 8-7.5"
  })));
};

var _path;
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var SvgCalendarArrowRight = function SvgCalendarArrowRight(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 35,
    height: 35,
    fill: "none"
  }, props), _path || (_path = /*#__PURE__*/React.createElement("path", {
    stroke: "#5C5C5C",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "m13.5 25.5 8-7.5-8-7.5"
  })));
};

var HeaderController = function (_a) {
    var _b, _c;
    var mode = _a.mode;
    var _d = useCalendar(), clickPreMonthHandler = _d.clickPreMonthHandler, clickNextMonthHandler = _d.clickNextMonthHandler;
    return (jsxRuntime.jsxs("div", { className: clsx(mode === BIG_MODE && styles$4["big-calendar-group"]), children: [jsxRuntime.jsx("button", { type: "button", className: clsx(styles$4["calendar-base-btn"], (_b = {},
                    _b[styles$4["mini-btn-left"]] = mode === MINI_MODE,
                    _b[styles$4["big-calendar-btn"]] = mode === BIG_MODE,
                    _b)), onClick: clickPreMonthHandler, children: jsxRuntime.jsx(SvgCalendarArrowLeft, {}) }), jsxRuntime.jsx("button", { type: "button", className: clsx(styles$4["calendar-base-btn"], (_c = {},
                    _c[styles$4["mini-btn-right"]] = mode === MINI_MODE,
                    _c[styles$4["big-calendar-btn"]] = mode === BIG_MODE,
                    _c)), onClick: clickNextMonthHandler, children: jsxRuntime.jsx(SvgCalendarArrowRight, {}) })] }));
};
var CalendarController = React$1.memo(HeaderController);

var css_248z$3 = ".headerDate-module_header-text__7sPlW {\n  display: flex;\n  gap: 1rem;\n  color: var(--text1, #121416);\n  font-size: 1.4rem;\n  font-style: normal;\n  align-items: baseline;\n  font-weight: bold;\n  line-height: 1.8rem; /* 100% */\n  letter-spacing: -0.036rem;\n}\n.headerDate-module_base-text-year__9kR2U {\n  line-height: 1.8rem;\n  font-size: 1.8rem;\n  font-weight: bold;\n}\n.headerDate-module_big-text-year__OKKz0 {\n  font-size: 2rem;\n}\n";
var styles$3 = {"header-text":"headerDate-module_header-text__7sPlW","base-text-year":"headerDate-module_base-text-year__9kR2U","big-text-year":"headerDate-module_big-text-year__OKKz0"};
styleInject(css_248z$3);

var HeaderDate = function (_a) {
    var _b, _c;
    var mode = _a.mode;
    var currentDate = useCalendarState(function (state) { return state.currentDate; });
    var headerTextClasses = clsx(styles$3["header-text"], (_b = {},
        _b[styles$3["calendar-header-text"]] = mode === BIG_MODE,
        _b));
    var baseTextYearClasses = clsx(styles$3["base-text-year"], (_c = {},
        _c[styles$3["big-text-year"]] = mode === BIG_MODE,
        _c));
    return (jsxRuntime.jsxs("span", { className: headerTextClasses, children: [jsxRuntime.jsx("span", { className: baseTextYearClasses, children: currentDate.format(YEAR_FORMAT_TYPE) }), currentDate.format(MONTH_FORMAT_TYPE)] }));
};

var Header = function (_a) {
    var _b;
    var mode = _a.mode;
    var headerClass = clsx(styles$5["base-header"], (_b = {},
        _b[styles$5["mini-header"]] = mode === MINI_MODE,
        _b[styles$5["big-header"]] = mode === BIG_MODE,
        _b));
    return (jsxRuntime.jsxs("div", { className: headerClass, children: [jsxRuntime.jsx(HeaderDate, { mode: mode }), jsxRuntime.jsx(CalendarController, { mode: mode })] }));
};

var css_248z$2 = "/*status Days*/\n\n.days-module_mini-days__NWLhp {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 1rem 0;\n}\n\n.days-module_mini-day__PA25g {\n  display: flex;\n  width: 3rem;\n  height: 4.4rem;\n  padding: 0.5rem 1rem 1rem 1rem;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.5rem;\n}\n\n.days-module_mini-day-text__4Hy2I {\n  display: flex;\n  width: 2.3rem;\n  height: 2.3rem;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  gap: 1rem;\n  flex-shrink: 0;\n  font-size: 1.5rem;\n  color: #5c5c5c;\n  border-radius: 50rem;\n}\n\n/*sales-calendar 일 때 css*/\n.days-module_big-calendar-days__HnsUb {\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  gap: 1rem;\n  width: 100%;\n}\n.days-module_big-calendar-day__n77Iu {\n  display: flex;\n  width: 100%;\n  max-width: 15rem;\n  padding-bottom: 2rem;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 1rem;\n  color: #121416;\n  font-size: 2rem;\n  font-style: normal;\n  font-weight: 600;\n  line-height: 2rem; /* 100% */\n  letter-spacing: -0.04rem;\n}\n";
var styles$2 = {"mini-days":"days-module_mini-days__NWLhp","mini-day":"days-module_mini-day__PA25g","mini-day-text":"days-module_mini-day-text__4Hy2I","big-calendar-days":"days-module_big-calendar-days__HnsUb","big-calendar-day":"days-module_big-calendar-day__n77Iu"};
styleInject(css_248z$2);

var DAYS = ["일", "월", "화", "수", "목", "금", "토"];
var classNames = {
    mini: styles$2["mini-days"],
    big: styles$2["big-calendar-days"],
    miniDay: styles$2["mini-day"],
    bigDay: styles$2["big-calendar-day"],
    miniDayText: styles$2["mini-day-text"],
};
var Days = function (_a) {
    var mode = _a.mode;
    var dayClass = classNames[mode === MINI_MODE ? "mini" : "big"];
    var dayTextClass = mode === MINI_MODE ? classNames.miniDayText : null;
    return (jsxRuntime.jsx("div", { className: dayClass, children: DAYS.map(function (day, idx) {
            var _a;
            return (jsxRuntime.jsx("span", { className: clsx(dayTextClass, (_a = {},
                    _a[classNames.miniDay] = mode === MINI_MODE,
                    _a[classNames.bigDay] = mode === BIG_MODE,
                    _a)), children: jsxRuntime.jsx("span", { children: day }) }, day + idx));
        }) }));
};

var css_248z$1 = "/*mini calendar에 들어갈 class css*/\n.cellItem-module_mini-calendar-base__GwAyD {\n  display: flex;\n  width: 3rem;\n  height: 4.4rem;\n  padding: 0.5rem 1rem 1rem 1rem;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 1.4rem;\n}\n\n.cellItem-module_mini-calendar-base__GwAyD span {\n  padding: 0.6rem;\n}\n\n/*calendar type*/\n.cellItem-module_current-calendar__tMIS5 {\n  opacity: 1 !important;\n}\n\n.cellItem-module_mini-not-current-month__EmzE7 {\n  opacity: 0.5;\n  background-color: var(--point-2);\n}\n\n.cellItem-module_mini-current-month__Pcnn5 {\n  opacity: 1;\n}\n\n/*\n         date 관련 class css 입니다.\n        */\n.cellItem-module_mini-prev-date__Q09Lq {\n  opacity: 0.5;\n  cursor: pointer;\n}\n\n.cellItem-module_mini-current-date__5onj4 {\n  cursor: pointer;\n  opacity: 1;\n}\n.cellItem-module_mini-current-date__5onj4 span {\n  border-radius: 50%;\n  background: rgba(255, 168, 0, 0.5);\n  color: #000 !important;\n}\n\n.cellItem-module_mini-after-date__J64Em {\n  opacity: 0.5 !important;\n}\n\n/*\n        day 관련 class css 입니다.\n        */\n.cellItem-module_mini-day-base__7V1tA {\n  display: flex;\n  width: 2.3rem;\n  height: 2.3rem;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  gap: 1rem;\n  flex-shrink: 0;\n}\n.cellItem-module_mini-calendar-saturaday__IsLgq {\n  color: blue;\n}\n\n.cellItem-module_mini-calendar-sunday__3cKwO {\n  color: red;\n}\n\n.cellItem-module_mini-calendar-day__FU2jl {\n  color: #000;\n}\n\n/*선택한 날짜일 때 UI*/\n.cellItem-module_mini-calendar-selected-date__RVuuy {\n  border-radius: 50%;\n  border: 1px solid #7433ff;\n}\n\n/* sales/calendar의 cellItem의 기본 일자 css*/\n.cellItem-module_big-calendar-base__Kx2YT {\n  font-size: 2rem;\n  display: flex;\n  height: 13rem;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 1rem;\n  font-size: 1.4rem;\n  cursor: default;\n}\n\n/*calendar type*/\n.cellItem-module_big-calendar-current__LlJpa {\n  opacity: 1;\n  background-color: #fff;\n}\n\n/* month type*/\n.cellItem-module_big-calendar-current-month__Mt9Ca {\n  opacity: 1;\n}\n\n.cellItem-module_big-calendar-not-current-month__ND3-k {\n  visibility: hidden;\n  background-color: #ffa800;\n}\n/*calendar date*/\n\n.cellItem-module_big-calendar-current-date__pe16s {\n  opacity: 1;\n  position: relative;\n}\n\n.cellItem-module_big-calendar-current-date__pe16s::after {\n  content: \"오늘\" !important;\n  position: absolute !important;\n  display: flex !important;\n  padding: 0.5rem 1rem !important;\n  justify-content: center !important;\n  align-items: center !important;\n  gap: 1rem !important;\n  color: #fff !important;\n  top: -0.3rem !important;\n  left: 4rem !important;\n  border-radius: 50rem !important;\n  width: auto !important;\n  height: auto !important;\n  background: #ffa800 !important;\n}\n\n.cellItem-module_big-calendar-prev-date__irm0k {\n  opacity: 0.5;\n}\n\n.cellItem-module_big-calendar-after-date__64CtY {\n  opacity: 0.5;\n}\n\n@media screen and (max-width: 1520px) {\n  .cellItem-module_calendar-base__TknHW {\n    height: 10vh;\n  }\n}\n";
var styles$1 = {"mini-calendar-base":"cellItem-module_mini-calendar-base__GwAyD","current-calendar":"cellItem-module_current-calendar__tMIS5","mini-not-current-month":"cellItem-module_mini-not-current-month__EmzE7","mini-current-month":"cellItem-module_mini-current-month__Pcnn5","mini-prev-date":"cellItem-module_mini-prev-date__Q09Lq","mini-current-date":"cellItem-module_mini-current-date__5onj4","mini-after-date":"cellItem-module_mini-after-date__J64Em","mini-day-base":"cellItem-module_mini-day-base__7V1tA","mini-calendar-saturaday":"cellItem-module_mini-calendar-saturaday__IsLgq","mini-calendar-sunday":"cellItem-module_mini-calendar-sunday__3cKwO","mini-calendar-day":"cellItem-module_mini-calendar-day__FU2jl","mini-calendar-selected-date":"cellItem-module_mini-calendar-selected-date__RVuuy","big-calendar-base":"cellItem-module_big-calendar-base__Kx2YT","big-calendar-current":"cellItem-module_big-calendar-current__LlJpa","big-calendar-current-month":"cellItem-module_big-calendar-current-month__Mt9Ca","big-calendar-not-current-month":"cellItem-module_big-calendar-not-current-month__ND3-k","big-calendar-current-date":"cellItem-module_big-calendar-current-date__pe16s","big-calendar-prev-date":"cellItem-module_big-calendar-prev-date__irm0k","big-calendar-after-date":"cellItem-module_big-calendar-after-date__64CtY","calendar-base":"cellItem-module_calendar-base__TknHW"};
styleInject(css_248z$1);

/**
 * Status Calendar의 month type
 */
var MONTH = {
    CURRENT: "CURRENT",
    NOT_CURRENT: "NOT_CURRENT",
};
function getStatusMonthType(month, CurrentDate) {
    if (month.isSame(CurrentDate, "M"))
        return MONTH["CURRENT"];
    return MONTH["NOT_CURRENT"];
}
var CALENDARTYPE = {
    CURRENT: "CURRENT",
    NOT_CURRENT: "NOT_CURRENT",
};
function getStatusCalendarType(month, currentDate) {
    if (month.isSame(currentDate, "M"))
        return CALENDARTYPE["CURRENT"];
    if (!month.isSame(currentDate, "M"))
        return CALENDARTYPE["NOT_CURRENT"];
}
var DATE = {
    CURRENT: "CURRENT",
    PREV: "PREV",
    AFTER: "AFTER",
};
function getStatusDateType(day) {
    var today = dayjs();
    if (day.isSame(today, "D"))
        return DATE["CURRENT"];
    return day.isBefore(today, "D") ? DATE["PREV"] : DATE["AFTER"];
}
/**
 * dayjs().day()
 * 일요일 -  0
 * ...
 * 토요일 - 6
 */
var DAY = {
    SATURADAY: "SATURADAY",
    SUNDAY: "SUNDAY",
    DAY: "DAY", // 일반 날,
};
function getStatusDayType(day) {
    if (day.day() === 6)
        return DAY["SATURADAY"];
    return day.day() === 0 ? DAY["SUNDAY"] : DAY["DAY"];
}
/**
 * big Calendar일 때
 */
function getCalendarMonthType(month, currentDate) {
    if (month.isSame(currentDate, "M"))
        return MONTH["CURRENT"];
    return MONTH["NOT_CURRENT"];
}
function getCalendarDateType(date) {
    var today = dayjs();
    if (date.isSame(today, "D"))
        return DATE["CURRENT"];
    return date.isBefore(today, "D") ? DATE["PREV"] : DATE["AFTER"];
}

var CellItem = function (_a) {
    var day = _a.day, selectDayHandler = _a.selectDayHandler, mode = _a.mode; _a.page;
    var SELECTED_DAY = "SELECTEDTYPE";
    var currentDate = useCalendarState(function (staet) { return staet.currentDate; });
    var _b = useDayState(), selectedDate = _b.selectedDate, today = _b.today;
    var statusVariant = classVarianceAuthority.cva([styles$1["mini-calendar-base"]], {
        variants: {
            calendarType: {
                CURRENT: styles$1["current-calendar"],
                NOT_CURRENT: styles$1["not-current-calendar"],
            },
            monthType: {
                CURRENT: styles$1["mini-current-month"],
                NOT_CURRENT: styles$1["status-not-current"],
            },
            dateType: {
                PREV: styles$1["mini-prev-date"],
                CURRENT: styles$1["mini-current-date"],
                AFTER: styles$1["mini-after-date"],
            },
        },
    });
    var statusDayVariant = classVarianceAuthority.cva([styles$1["mini-day-base"]], {
        variants: {
            dayType: {
                SATURADAY: styles$1["mini-calendar-saturaday"],
                SUNDAY: styles$1["mini-calendar-sunday"],
                DAY: styles$1["mini-calendar-day"],
            },
            seletedDayType: {
                SELECTEDTYPE: styles$1["mini-calendar-selected-date"],
            },
        },
    });
    var calendarVariant = classVarianceAuthority.cva([styles$1["big-calendar-base"]], {
        variants: {
            calendarType: {
                CURRENT: styles$1["big-calendar-current"],
            },
            monthType: {
                CURRENT: styles$1["big-calendar-current-month"],
                NOT_CURRENT: styles$1["big-calendar-not-current-month"],
            },
            dateType: {
                PREV: styles$1["mini-prev-date"],
                CURRENT: styles$1["big-calendar-current-date"],
                AFTER: styles$1["mini-after-date"],
            },
        },
    });
    var formatDate = day.format("YY MM D").substring(6);
    return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [mode === MINI_MODE && (jsxRuntime.jsx("div", __assign({ className: statusVariant({
                    calendarType: getStatusCalendarType(day, currentDate),
                    monthType: getStatusMonthType(currentDate, day),
                    dateType: getStatusDateType(day),
                }) }, (((mode === MINI_MODE && day.isSame(today, "D")) ||
                day.isBefore(today, "D")) && {
                onClick: selectDayHandler === null || selectDayHandler === void 0 ? void 0 : selectDayHandler(day),
            }), { children: jsxRuntime.jsx("span", { className: statusDayVariant({
                        dayType: getStatusDayType(day),
                        seletedDayType: day.isSame(selectedDate, "day")
                            ? SELECTED_DAY
                            : null,
                    }), children: formatDate }) }))), mode === BIG_MODE && (jsxRuntime.jsx("div", { className: clsx(calendarVariant({
                    monthType: getCalendarMonthType(day, currentDate),
                    dateType: getCalendarDateType(day),
                })), children: jsxRuntime.jsxs("p", { children: [" ", formatDate] }) }))] }));
};

var css_248z = "/* 달력 row를 감싸는 전체 body*/\n\n.cell-module_calendar-body__pEBSo {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  width: 100%;\n}\n\n/*\n    달력 한 줄의 css\n    */\n.cell-module_calendar-row__GGDX8 {\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  gap: 1rem;\n  width: 100%;\n}\n";
var styles = {"calendar-body":"cell-module_calendar-body__pEBSo","calendar-row":"cell-module_calendar-row__GGDX8"};
styleInject(css_248z);

var Cell = function (_a) {
    var mode = _a.mode, page = _a.page;
    /**
     * 캘린더에 사용되는 state입니다.
     */
    var currentDate = useCalendarState(function (state) { return state.currentDate; });
    // monthStart가 속한 주의 시작 주
    var startDay = currentDate.startOf("month").startOf("week");
    // monthStart가 속한 마지막 주
    var endDay = currentDate.endOf("month").endOf("week");
    /**
     * Sales Page에서 사용하는 state
     */
    var selectDayHandler = useSelectDay().selectDayHandler;
    //   const holidays = useHolidayState((state) => state.holidays);
    //   const { clickShowDataOfDateHandler } = useDataHandler();
    //   const holiday = holidays[currentDate.format("YYYY")];
    /**
     * 다른 페이지에서 호출 되는 공간 입니다. 아래에서 hook으로 써주면 아리가또우
     */
    var row = [];
    var days = [];
    var day = startDay;
    while (day <= endDay) {
        for (var i = 0; i < 7; i++) {
            var itemKey = day.format(FORMAT_CELL_DATE_TYPE);
            // const holidayDate = holiday?.filter((date) => date.date === itemKey);
            days.push(jsxRuntime.jsx(CellItem, __assign({ page: page, mode: mode, day: day }, (mode === MINI_MODE && { selectDayHandler: selectDayHandler })), itemKey));
            day = day.add(1, "day");
        }
        row.push(jsxRuntime.jsx("div", { className: styles["calendar-row"], children: days }, days[0].key));
        days = [];
    }
    return jsxRuntime.jsx("div", { className: styles["calendar-body"], children: row });
};

var Calendar = function (_a) {
    var _b, _c, _d;
    var mode = _a.mode; _a.children; _a.page;
    var calendarClasses = clsx((_b = {},
        _b[styles$6["mini-calendar"]] = mode === MINI_MODE,
        _b[styles$6["big-calendar"]] = mode === BIG_MODE,
        _b));
    var headerWrapperClasses = clsx((_c = {},
        _c[styles$6["mini-calendar-header-wrapper"]] = mode === MINI_MODE,
        _c));
    var bodyWrapperClasses = clsx((_d = {},
        _d[styles$6["big-body-wrapper"]] = mode === BIG_MODE,
        _d));
    return (jsxRuntime.jsxs("div", { className: calendarClasses, children: [jsxRuntime.jsx("div", { className: headerWrapperClasses, children: jsxRuntime.jsx(Header, { mode: mode }) }), jsxRuntime.jsxs("div", { className: bodyWrapperClasses, children: [jsxRuntime.jsx(Days, { mode: mode }), jsxRuntime.jsx(Cell, { mode: mode })] })] }));
};

exports.Calendar = Calendar;
exports.resetCurrentDate = resetCurrentDate;
exports.resetSelectedDate = resetSelectedDate;
exports.setCalendarCurrentDate = setCalendarCurrentDate;
exports.setSelectedDate = setSelectedDate;
exports.useCalendar = useCalendar;
exports.useDayjs = useDayjs;
exports.useSelectDay = useSelectDay;
