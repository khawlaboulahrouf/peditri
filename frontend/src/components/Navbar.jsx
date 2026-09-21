import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/navbar.css";

function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const logout = async () => {
        try {
            await axios.post(
                "http://127.0.0.1:8000/api/logout",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                }
            );
        }catch (error) {
            console.log(error);
        }

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login" , {replace: true});
    };

    return (
        <nav className="navbar">
      <h2 className="navbar-logo">PédiTri</h2>

      <div className="navbar-actions">
        <button onClick={() => navigate("/enfants")}>
          Mes enfants
        </button>

        <button onClick={logout}>
          Déconnexion
        </button>
      </div>
    </nav>
    )
}
export default Navbar;