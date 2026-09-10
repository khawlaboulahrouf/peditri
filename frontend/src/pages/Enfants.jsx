import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/enfants.css";

function Enfants() {
  const [prenom, setPrenom] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  const [enfants, setEnfants] = useState([]);
  const [message, setMessage] = useState("");

  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

  const getEnfants = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/enfants",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      setEnfants(response.data.enfants);
    } catch (error) {
      setMessage("Erreur lors du chargement des enfants");
    }
  };

  useEffect(() => {
    getEnfants();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        const response = await axios.put(
          `http://127.0.0.1:8000/api/enfants/${editId}`,
          {
            prenom,
            date_naissance: dateNaissance,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        setMessage(response.data.message);
        setEditId(null);
      } else {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/enfants",
          {
            prenom,
            date_naissance: dateNaissance,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        setMessage(response.data.message);
      }

      setPrenom("");
      setDateNaissance("");

      getEnfants();
    } catch (error) {
      setMessage("Une erreur est survenue");
    }
  };

  const handleEdit = (enfant) => {
    setEditId(enfant.id);
    setPrenom(enfant.prenom);
    setDateNaissance(enfant.date_naissance);
  };

  const handleDelete = async (id) => {
    const confirmation = window.confirm(
      "Voulez-vous vraiment supprimer ce profil ?"
    );

    if (!confirmation) return;

    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/enfants/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      setMessage(response.data.message);

      getEnfants();
    } catch (error) {
      setMessage("Erreur lors de la suppression");
    }
  };

  const cancelEdit = () => {
    setEditId(null);
    setPrenom("");
    setDateNaissance("");
  };

  return (
    <div className="enfants-page">
      <div className="enfants-container">
        <h1>Mes enfants</h1>

        <div className="enfant-form-card">
          <h2>
            {editId ? "Modifier le profil" : "Ajouter un enfant"}
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Prénom</label>
              <input
                type="text"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                placeholder="Prénom de l'enfant"
              />
            </div>

            <div className="form-group">
              <label>Date de naissance</label>
              <input
                type="date"
                value={dateNaissance}
                onChange={(e) => setDateNaissance(e.target.value)}
              />
            </div>

            <button type="submit" className="btn-primary">
              {editId ? "Enregistrer" : "Ajouter"}
            </button>

            {editId && (
              <button
                type="button"
                className="btn-cancel"
                onClick={cancelEdit}
              >
                Annuler
              </button>
            )}
          </form>

          {message && <p className="message">{message}</p>}
        </div>

        <div className="liste-section">
          <h2>Liste des enfants</h2>

          {enfants.length === 0 ? (
            <p>Aucun enfant enregistré.</p>
          ) : (
            <div className="enfants-grid">
              {enfants.map((enfant) => (
                <div className="enfant-card" key={enfant.id}>
                  <h3>{enfant.prenom}</h3>

                  <p>
                    Date de naissance :
                    <br />
                    {enfant.date_naissance}
                  </p>

                  <div className="actions">
                    <button
                      className="btn-edit"
                      onClick={() => handleEdit(enfant)}
                    >
                      Modifier
                    </button>

                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(enfant.id)}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Enfants;