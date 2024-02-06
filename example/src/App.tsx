import Calendar from "./calendar/Calendar";
import { BIG_MODE, MINI_MODE } from "./calendar/calendarType/calendarType";

function App() {
  return (
    <div>
      <div>
        <button type="button">오늘</button>
        <Calendar mode={MINI_MODE} />
      </div>
      <div>
        <Calendar mode={BIG_MODE} />
      </div>
    </div>
  );
}

export default App;
