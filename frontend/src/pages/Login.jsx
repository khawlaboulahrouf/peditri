import { useState } from "react";
import axios from "axios";

function Login() {
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

      setMessage(response.data.message);
    } catch (error) {
      setMessage("Email ou mot de passe incorrect");
    }
  };

  return (
    <div>
      <h2>Connexion</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Se connecter</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;