import { useNavigate } from "react-router-dom";
import "../styles/admin.css";


function AdminDashboard() {
    const navigate = useNavigate();

    return (
    <div className="admin-page">
        <div className="admin-container">
            <h1 className="admin-title">Espace Administrateur</h1>

            <div className="admin-cards">
                <button
                    className="admin-card"
                    onClick={() => navigate("/admin/questions")}
                >
                    Gestion des questions
                </button>

                <button
                    className="admin-card"
                    onClick={() => navigate("/admin/etablissements")}
                >
                    Gestion des établissements
                </button>
            </div>
        </div>
    </div>
);
}

export default AdminDashboard;