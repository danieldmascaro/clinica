import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";

const RedireccionLogin = () => {
    const { tipoUsuario } = useAuth()
    if (tipoUsuario === "admin") {
        return <Navigate to="/profesionales" state={{ autorizacion: "admin"}}></Navigate>
    } else if (tipoUsuario === "paciente") {
        return <Navigate to="/" state={{ autorizacion: "paciente"}}></Navigate>
    } else if (tipoUsuario === "medico") {
        return <Navigate to="/crearmedico" state={{ autorizacion: "medico"}}></Navigate>
    } else {
        return <h1>Error inesperado.</h1>
    }
}

export default RedireccionLogin;