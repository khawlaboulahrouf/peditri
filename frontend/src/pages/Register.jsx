import { useState } from "react";
import axios from "axios";

function Register(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handlesubmit = async (e) => {
        e.preve,tDefault();

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

    return(
        <div>
            <h2>Créer un compte</h2>

            <form onSubmit={handlesubmit}>
                <div>
                    <label>Nom</label>
                    <input 
                      type="text"
                      value={name}
                      onchange={(e) => setName(e.target.value)}
                    />
                </div>

                   <div>
                    <label>Email</label>
                    <input 
                      type="text"
                      value={email}
                      onchange={(e) => setEmail(e.target.value)}
                    />
                </div>

                   <div>
                    <label>Password</label>
                    <input 
                      type="text"
                      value={password}
                      onchange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit">S'inscrire</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
}

export default Register;
