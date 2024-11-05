import "./App.css";
import CustomTimer from "./Components/CustomTimer";
import CountdownTimer from "./Components/CountdownTimer";
import RestTimer from "./Components/RestTimer";
import Breathe from "./Components/Breathe";
import Todo from "./Components/ToDo";
import Stats from "./Components/Stats";
import Settings from "./Components/Settings";
import UserAuthentication from "./Components/UserAuthentication";
import { Route, Routes } from "react-router-dom";
import { UserProvider } from "./Components/UserContext";
import ForgotPassword from "./Components/ForgotPassword";
function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<CountdownTimer />} />
        <Route path="/customtimer" element={<CustomTimer />} />
        <Route path="/rest" element={<RestTimer />} />
        <Route path="/breathe" element={<Breathe />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/SignUp" element={<UserAuthentication />} />
        <Route path="/LogIn" element={<UserAuthentication />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
