import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Triage() {
    const { enfantId} = useParams();
    const [triage, setTriage] = useState(null);
    const [question , setQuestion] = useState(null);
    const [message , setMessage] = useState("");
    const [resultat, setResultat] = useState(null);

    const token = localStorage.getItem("token");
    const commencerTriage = async () => {
        try{ 
            const response = await axios.post(
                `http://127.0.0.1:8000/api/enfants/${enfantId}/triages`,
                {},
                {
                    headers: {
                        Authorization:`Bearer ${token}`,
                        Accept: "application/json",
                    },
                }
            );

            setTriage(response.data.triage);
            setQuestion(response.data.question);
        }catch(error) {
            setMessage("Erreur lors du démarrage du triage");
        }
    };

    const repondre = async(label) => {
        try{
            const response = await axios.post(
                `http://127.0.0.1:8000/api/triages/${triage.id}/responses`,
                {
                    question_id: question.id,
                    label: label,
                },
                {
                    headers:{
                        Authorization: `Bearer ${token}`,
                        Accept:"application /json",
                    },
                }
            );

            setQuestion(response.data.next_question);
            if(response.data.resultat) {
                setResultat(response.data.resultat);
            }
        }catch(error) {
            setMessage("Erreur lors de l'enregistrement de la réponse")
        }
    };

    return (
        <div>
            <h1>Triage</h1>

            {!triage && (
                <button onClick={commencerTriage}>
                    Démarrer le questionnaire
                </button>
            )}

            {question && (
                <div>
                    <h2>{question.titre}</h2>

                    <button onClick={()=> repondre("Oui")}>
                        Oui
                    </button>
                    <button onClick={() => repondre("Non")}>
                        Non
                    </button>
                </div>
            )}

            {resultat &&(
                <div>
                    <h2>Résultat du triage</h2>
                    <h3>{resultat}</h3>
                </div>
            )}

            {message && <p>{message}</p>}
        </div>
    );
}

export default Triage;