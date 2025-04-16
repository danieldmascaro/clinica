import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";



const ReSendMail = () => {
    const location = useLocation();
    const { formData } = location.state || {};
    const [ message, setMessage] = useState('Espere, por favor...')
    const navigate = useNavigate();
    
    useEffect(() => {
      const SendMail = async () => {
        try {
          const response = await fetch("http://localhost:8000/auth/users/resend_activation/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ email: formData.email }),
          });
  
          if (response.status === 400) {
            setMessage("La cuenta ya se encuentra activada o el correo es inválido.");
            setTimeout(() => navigate("/login"), 3000);
          } else if (response.ok) {
            setMessage("Correo de activación enviado con éxito!");
            setTimeout(() => navigate("/login"), 3000);
          } else {
            setMessage("Ocurrió un error inesperado.");
          }
        } catch (error) {
          console.error("Error en la solicitud", error);
          setMessage("Ocurrió un error inesperado.");
        }
      };
  
      if (formData?.email) {
        SendMail();
      } else {
        setMessage("No se proporcionó un correo válido.");
        setTimeout(() => navigate("/login"), 3000);
      }
    }, [formData, navigate]);
    return(
        <div className="flex items-center justify-center">
          <div className="bg-blue-800">
            {message}
          </div>
        </div>
    )
    
    
}

export default ReSendMail