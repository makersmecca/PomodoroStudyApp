import CustomTimer from "./Components/CustomTimer";
import CountdownTimer from "./Components/CountdownTimer";
import RestTimer from "./Components/RestTimer";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route path="/" element={<CountdownTimer />} />
      <Route path="/customtimer" element={<CustomTimer />} />
      <Route path="/rest" element={<RestTimer />} />
    </Routes>
  );
}

export default App;
