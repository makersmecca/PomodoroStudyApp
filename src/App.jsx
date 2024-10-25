import CustomTimer from "./Components/CustomTimer";
import CountdownTimer from "./Components/CountdownTimer";
import RestTimer from "./Components/RestTimer";
import Breathe from "./Components/Breathe";
import Todo from "./Components/ToDo";

import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route path="/" element={<CountdownTimer />} />
      <Route path="/customtimer" element={<CustomTimer />} />
      <Route path="/rest" element={<RestTimer />} />
      <Route path="/breathe" element={<Breathe />} />
      <Route path="/todo" element={<Todo />} />
    </Routes>
  );
}

export default App;
