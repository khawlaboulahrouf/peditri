import { useState } from "react";
import axios from "axios";
import "../styles/auth.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      
      navigate("/logout");
      
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Email ou mot de passe incorrect");
    }
  };

return (
  <div className="auth-page">
    <div className="auth-card">
      <h2>Connexion</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre email"
          />
        </div>

        <div>
          <label>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Votre mot de passe"
          />
        </div>

        <button type="submit">Se connecter</button>
      </form>

      <p className="auth-link">
  Vous n'avez pas de compte ? <Link to="/register">Créer un compte</Link>
</p>

      {message && <p className="auth-message">{message}</p>}
    </div>
  </div>
);
}

export default Login;