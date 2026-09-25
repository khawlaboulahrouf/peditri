import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Enfants from "./pages/Enfants";
import Triage from "./pages/Triage";
import ProtectedRoute from "./components/ProtectedRoute";
import Etablissements from "./pages/Etablissements";
import AdminDashboard from "./pages/AdminDashboard";
import AdminQuestions from "./pages/AdminQuestions";
import AdminEtablissements from "./pages/AdminEtablissements";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/enfants" element={<ProtectedRoute><Enfants /></ProtectedRoute>}/>
        <Route path="/triage/:enfantId" element={<ProtectedRoute> <Triage /></ProtectedRoute>}/>
        <Route path="/etablissements" element={<ProtectedRoute><Etablissements /></ProtectedRoute>}/>
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>}/>
        <Route path="/admin/questions" element={<AdminRoute><AdminQuestions /></AdminRoute>}/>
        <Route path="/admin/etablissements" element={<AdminRoute><AdminEtablissements /></AdminRoute>}/>
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
