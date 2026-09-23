import { useEffect , useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/admin.css";

function AdminQuestions() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [questions, setQuestions] = useState([]);
    const [titre, setTitre] = useState("");
    const [groupeAge, setGroupeAge] = useState("0-2");
    const [order, setOrder] = useState ("");
    const [editId, setEditId] = useState(null);

    const header = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
    };
    const getQuestions = async () => {
        const response = await axios.get(
            "http://127.0.0.1:8000/api/admin/questions",
            { headers }
        );
        setQuestions(response.data);
    };
    useEffect(() => {
        getQuestions();
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            titre,
            groupe_age: groupeAge,
            order: Number(order),
        };

        if (editId) {
            await axios.put(
                "http://127.0.0.1:8000/api/admin/questions",
                data,
                { headers }
            );
        }else {
            await axios.post(
                "http://127.0.0.1:8000/api/admin/questions",
                data,
                { headers }
            );
        }

            setTitre("");
            setGroupeAge("0-2");
            setOrder("");
            setEditId(null);

            setQuestions();
        };
        const handleEdit = (question) => {
            setTitre(question.titre);
            setGroupeAge(question.groupe_age);
            setOrder(question.order);
            setEditId(question.id);
        };

        const handleDelete = async (id) => {
            await axios.delete(
                `http://127.0.0.1:8000/api/admin/questions/${id}`,
                { headers }
            );

            getQuestions();
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

            <h1 className="admin-title">Gestion des questions</h1>

            <form className="admin-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Question"
                    value={titre}
                    onChange={(e) => setTitre(e.target.value)}
                    required
                />

                <select
                    value={groupeAge}
                    onChange={(e) => setGroupeAge(e.target.value)}
                >
                    <option value="0-2">0-2 ans</option>
                    <option value="3-5">3-5 ans</option>
                    <option value="6-12">6-12 ans</option>
                </select>

                <input
                    type="number"
                    placeholder="Ordre"
                    value={order}
                    onChange={(e) => setOrder(e.target.value)}
                    required
                />

                <button
                    className="admin-btn admin-btn-primary"
                    type="submit"
                >
                    {editId ? "Modifier" : "Ajouter"}
                </button>
            </form>

            {questions.map((question) => (
                <div className="admin-item" key={question.id}>
                    <p>
                        <strong>{question.order}.</strong>{" "}
                        {question.titre}
                    </p>

                    <p>Groupe d'âge : {question.groupe_age} ans</p>

                    <button
                        className="admin-btn admin-btn-primary"
                        onClick={() => handleEdit(question)}
                    >
                        Modifier
                    </button>

                    <button
                        className="admin-btn admin-btn-delete"
                        onClick={() => handleDelete(question.id)}
                    >
                        Supprimer
                    </button>
                </div>
            ))}
        </div>
    </div>
);
}

export default AdminQuestions;
    