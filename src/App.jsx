import "./App.css";
import CustomTimer from "./Components/CustomTimer";
import CountdownTimer from "./Components/CountdownTimer";
import RestTimer from "./Components/RestTimer";
import Breathe from "./Components/Breathe";
import Todo from "./Components/ToDo";
import Stats from "./Components/Stats";
import Settings from "./Components/Settings";
import SignUp from "./Components/SignUp";
import LogIn from "./Components/LogIn";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route path="/" element={<CountdownTimer />} />
      <Route path="/customtimer" element={<CustomTimer />} />
      <Route path="/rest" element={<RestTimer />} />
      <Route path="/breathe" element={<Breathe />} />
      <Route path="/todo" element={<Todo />} />
      <Route path="/stats" element={<Stats />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/LogIn" element={<LogIn />} />
    </Routes>
  );
}

export default App;
