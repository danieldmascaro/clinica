import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ActivateAccount = () => {
    const { uid, token } = useParams();
    const navigate = useNavigate();
    const [ message, setMessage ] = useState("Activando cuenta...")

    useEffect(() => {
        const activateUser = async () => {
          try {
            const response = await fetch("http://127.0.0.1:8000/auth/users/activation/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ uid, token }),
            });
    
            if (response.status === 204) {
              setMessage("¡Cuenta activada con éxito! Redirigiendo al login...");
              setTimeout(() => navigate("/login"), 3000);
            } else if (response.status === 403) {
              setMessage("La cuenta ya fue activada previamente.");
            } else {
              setMessage("Error al activar la cuenta. El enlace puede ser inválido o haber expirado.");
            }
          } catch (error) {
            console.error("Error al activar la cuenta:", error);
            setMessage("Ocurrió un error inesperado al activar la cuenta.");
          }
        };
    
        activateUser();
      }, [uid, token, navigate]);
      
      return (<div className="flex justify-center items-center h-full w-full">
        <h1>{message}</h1>
      </div>
      );
}
export default ActivateAccount;
