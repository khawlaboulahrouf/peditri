import axios from "axios";

function Logout() {
  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.removeItem("token");

      alert(response.data.message);
    } catch (error) {
      alert("Erreur lors de la déconnexion");
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Se déconnecter</button>
    </div>
  );
}

export default Logout;