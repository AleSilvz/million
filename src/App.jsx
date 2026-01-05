import { Route, Routes } from "react-router";
import Home from "./pages/home";
import Goals from "./pages/goals";

function App() {
  return (
    <Routes >
      <Route path="/" element={<Home />} />
      <Route path="/goals" element={<Goals />} />
    </Routes>
  );
}

export default App;
