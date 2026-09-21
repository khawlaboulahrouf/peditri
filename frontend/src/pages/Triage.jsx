import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../styles/triage.css";

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
  <div className="triage-page">
    <div className="triage-card">

      <h1>Triage pédiatrique</h1>

      {!triage && (
        <button
          className="btn-oui"
          onClick={commencerTriage}
        >
          Démarrer le questionnaire
        </button>
      )}

      {question && (
        <div>
          <p className="question-number">
            Question {question.order}
          </p>

          <h2 className="question-title">
            {question.titre}
          </h2>

          <div className="triage-actions">
            <button
              className="btn-oui"
              onClick={() => repondre("Oui")}
            >
              Oui
            </button>

            <button
              className="btn-non"
              onClick={() => repondre("Non")}
            >
              Non
            </button>
          </div>
        </div>
      )}

      {resultat && (
        <div className="resultat-card">
          <h2>Résultat du triage</h2>

          <p className={`resultat resultat-${resultat}`}>
            {resultat}
          </p>

          {resultat === "home" && (
            <p className="resultat-message">
              Une surveillance à domicile est recommandée.
            </p>
          )}

          {resultat === "consultation" && (
            <p className="resultat-message">
              Une consultation médicale est recommandée.
            </p>
          )}

          {resultat === "urgence" && (
            <p className="resultat-message">
              Une prise en charge urgente est recommandée.
            </p>
          )}
        </div>
      )}

      {message && <p>{message}</p>}

    </div>
  </div>
);
}

export default Triage;