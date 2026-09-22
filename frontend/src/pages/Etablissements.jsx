import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../styles/etablissements.css";

function Etablissements() {
    const [etablissements, setEtablissements] = useState([]);
    const [searchParams] = useSearchParams();

    const type = searchParams.get("type");
    const token = localStorage.getItem("token");

    useEffect(() => {
        const getEtablissements = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/etablissements?type=${type}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: "application/json",
                        },
                    }
                );

                setEtablissements(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        getEtablissements();
    }, [type, token]);

   return (
    <>
        <Navbar />

        <div className="etablissements-page">
            <div className="etablissements-container">

                <h1 className="etablissements-title">
                    {type === "pediatre"
                        ? "Pédiatres"
                        : "Services d'urgence"}
                </h1>

                {etablissements.map((etablissement) => (
                    <div
                        className="etablissement-card"
                        key={etablissement.id}
                    >
                        <h2>{etablissement.nom}</h2>

                        <p>
                            📍 {etablissement.adresse}
                        </p>

                        <p>
                            🏙️ {etablissement.ville}
                        </p>

                        <p className="etablissement-phone">
                            📞 {etablissement.telephone}
                        </p>
                    </div>
                ))}

            </div>
        </div>
    </>
);
}

export default Etablissements;