import { Calendar } from "./calendar";

function App() {
  return (
    <div>
      <div>
        <button type="button">오늘</button>
        <Calendar mode={"MINI_MODE"} />
      </div>
      <div>
        <Calendar mode={"BIG_MODE"} />
      </div>
    </div>
  );
}

export default App;
