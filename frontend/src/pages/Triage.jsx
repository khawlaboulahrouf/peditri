import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../styles/triage.css";
import Navbar from "../components/Navbar";

function Triage() {
  const { enfantId } = useParams();
  const navigate = useNavigate();
  const [triage, setTriage] = useState(null);
  const [question, setQuestion] = useState(null);
  const [message, setMessage] = useState("");
  const [resultat, setResultat] = useState(null);

  const token = localStorage.getItem("token");
  const commencerTriage = async () => {
    setResultat(null);
    setQuestion(null);
    setMessage("");
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/enfants/${enfantId}/triages`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        },
      );

      setTriage(response.data.triage);
      setQuestion(response.data.question);
    } catch (error) {
      setMessage("Erreur lors du démarrage du triage");
    }
  };

  const repondre = async (label) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/triages/${triage.id}/responses`,
        {
          question_id: question.id,
          label: label,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        },
      );
      console.log(response.data);

      setQuestion(response.data.next_question);
      if (response.data.next_question === null && response.data.resultat) {
        setResultat(response.data.resultat);
      }
    } catch (error) {
      setMessage("Erreur lors de l'enregistrement de la réponse");
    }
  };

  return (
    <>
      <Navbar />
      <div className="triage-page">
        <div className="triage-card">
          <h1>Triage pédiatrique</h1>

          {!triage && (
            <button className="btn-oui" onClick={commencerTriage}>
              Démarrer le questionnaire
            </button>
          )}

          {question && (
            <div>
              <p className="question-number">Question {question.order} sur 6</p>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${(question.order / 6) * 100}%` }}
                ></div>
              </div>

              <h2 className="question-title">{question.titre}</h2>

              <div className="triage-actions">
                <button className="btn-oui" onClick={() => repondre("Oui")}>
                  Oui
                </button>

                <button className="btn-non" onClick={() => repondre("Non")}>
                  Non
                </button>
              </div>
            </div>
          )}

          {resultat && (
            <div className="resultat-card">
              <h2>Résultat du triage</h2>

              <p className={`resultat resultat-${resultat}`}>{resultat}</p>

              {resultat === "home" && (
                <p className="resultat-message">
                  Une surveillance à domicile est recommandée.
                </p>
              )}

              {resultat === "consultation" && (
                <>
                  <p className="resultat-message">
                    Une consultation médicale est recommandée.
                  </p>

                  <button
                    className="btn-oui"
                    onClick={() => navigate("/etablissements?type=pediatre")}
                  >
                    Voir les pédiatres
                  </button>
                </>
              )}

              {resultat === "urgence" && (
                <>
                  <p className="resultat-message">
                    Une prise en charge urgente est recommandée.
                  </p>

                  <button
                    className="btn-oui"
                    onClick={() => navigate("/etablissements?type=urgence")}
                  >
                    Voir les urgences
                  </button>
                </>
              )}
            </div>
          )}

          {message && <p>{message}</p>}
        </div>
      </div>
    </>
  );
}

export default Triage;
