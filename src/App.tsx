import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Calendar from "./calendar/Calendar";
import { BIG_MODE, MINI_MODE } from "./calendar/calendarType/calendarType";

function App() {
  const AppClass = {
    width: "100%",
    display: "grid",
    placeContent: "center",
    alignContent: "center",
    height: "100vh",
  };

  return (
    <div style={AppClass}>
      <div>
        <button type="button">오늘</button>
        <Calendar mode={MINI_MODE} />
      </div>
      <div style={{ flexDirection: "column" }}>
        <Calendar mode={BIG_MODE} />
      </div>
    </div>
  );
}

export default App;
