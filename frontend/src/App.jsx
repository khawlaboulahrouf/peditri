import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Enfants from "./pages/Enfants";
import Triage from "./pages/Triage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/enfants" element={<ProtectedRoute>
          <Enfants/>
        </ProtectedRoute>} />
        
        <Route path="/triage/:enfantId" element={<ProtectedRoute>
          <Triage/>
        </ProtectedRoute>}/>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;