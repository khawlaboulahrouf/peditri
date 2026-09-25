import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/admin.css";


function AdminEtablissements() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [etablissements, setEtablissements] = useState([]);

    const [nom, setNom] = useState("");
    const [type, setType] = useState("pediatre");
    const [adresse, setAdresse] = useState("");
    const [telephone, setTelephone] = useState("");
    const [ville, setVille] = useState("");
    const [editId, setEditId] = useState(null);

    const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
    };

    const getEtablissements = async () => {
        const response = await axios.get(
            "http://127.0.0.1:8000/api/admin/etablissements",
            { headers }
        );

        setEtablissements(response.data);
    };

    useEffect(() => {
        getEtablissements();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            nom,
            type,
            adresse,
            telephone,
            ville,
        };

        if (editId) {
            await axios.put(
                `http://127.0.0.1:8000/api/admin/etablissements/${editId}`,
                data,
                { headers }
            );
        } else {
            await axios.post(
                "http://127.0.0.1:8000/api/admin/etablissements",
                data,
                { headers }
            );
        }

        setNom("");
        setType("pediatre");
        setAdresse("");
        setTelephone("");
        setVille("");
        setEditId(null);

        getEtablissements();
    };

    const handleEdit = (etablissement) => {
        setNom(etablissement.nom);
        setType(etablissement.type);
        setAdresse(etablissement.adresse);
        setTelephone(etablissement.telephone || "");
        setVille(etablissement.ville);
        setEditId(etablissement.id);
    };

    const handleDelete = async (id) => {
        await axios.delete(
            `http://127.0.0.1:8000/api/admin/etablissements/${id}`,
            { headers }
        );

        getEtablissements();
    };

   return (
    <div className="admin-page">
        <div className="admin-container">

            <button
                className="admin-btn admin-btn-secondary"
                onClick={() => navigate("/admin")}
            >
                ← Retour
            </button>

            <h1 className="admin-title">
                Gestion des établissements
            </h1>

            <form className="admin-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nom"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    required
                />

                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <option value="pediatre">Pédiatre</option>
                    <option value="urgence">Urgence</option>
                </select>

                <input
                    type="text"
                    placeholder="Adresse"
                    value={adresse}
                    onChange={(e) => setAdresse(e.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="Téléphone"
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Ville"
                    value={ville}
                    onChange={(e) => setVille(e.target.value)}
                    required
                />

                <button
                    className="admin-btn admin-btn-primary"
                    type="submit"
                >
                    {editId ? "Modifier" : "Ajouter"}
                </button>
            </form>

            {etablissements.map((etablissement) => (
                <div className="admin-item" key={etablissement.id}>
                    <h3>{etablissement.nom}</h3>

                    <p>Type : {etablissement.type}</p>
                    <p>Adresse : {etablissement.adresse}</p>
                    <p>Ville : {etablissement.ville}</p>
                    <p>
                        Téléphone : {etablissement.telephone || "Non renseigné"}
                    </p>

                    <button
                        className="admin-btn admin-btn-primary"
                        onClick={() => handleEdit(etablissement)}
                    >
                        Modifier
                    </button>

                    <button
                        className="admin-btn admin-btn-delete"
                        onClick={() => handleDelete(etablissement.id)}
                    >
                        Supprimer
                    </button>
                </div>
            ))}
        </div>
    </div>
);
}

export default AdminEtablissements;