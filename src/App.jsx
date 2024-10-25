import CustomTimer from "./Components/CustomTimer";
import CountdownTimer from "./Components/CountdownTimer";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route path="/" element={<CountdownTimer />} />
      <Route path="/customtimer" element={<CustomTimer />} />
    </Routes>
  );
}

export default App;
