import { useParams } from "react-router-dom";

function Triage() {
    const { enfantId} = useParams();

    return (
        <div>
            <h1>Triage</h1>
            <p>Enfant sélectionné : {enfantId}</p>
        </div>
    );
}

export default Triage;