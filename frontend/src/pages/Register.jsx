import { useState } from "react";
import axios from "axios";
import "../styles/auth.css";

function Register(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handlesubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post(
                "http://127.0.0.1:8000/api/register",
                {
                    name,
                    email,
                    password,
                }
            );

            setMessage(response.data.message);

            setName("");
            setEmail("");
            setPassword("");
        }catch(error){
            setMessage("erreur lors de l'inscription");
        }
    };

    return (
  <div className="auth-page">
    <div className="auth-card">
      <h2>Créer un compte</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Votre nom"
          />
        </div>

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

        <button type="submit">S'inscrire</button>
      </form>

      {message && <p className="auth-message">{message}</p>}
    </div>
  </div>
);
}

export default Register;
