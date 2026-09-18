import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Enfants from "./pages/Enfants";
import Triage from "./pages/Triage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/enfants" element={<Enfants />} />
        <Route path="/triage/:enfantId" element={<Triage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;