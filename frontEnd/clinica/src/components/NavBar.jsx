import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";


const NavBar = () => {
  const { user, logout, tipoUsuario } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    navigate('/');
  };

  return (
    <nav className="flex justify-around text-center text-blue-700 bg-blue-100 
    border-t border-b border-blue-200 py-2 font-bold">
      {tipoUsuario === "admin" ? (
        <>
          <Link to="/" className=" hover:text-blue-400 ">Home</Link>
          <Link to="/citas" className="hover:text-blue-400">Editar Base de Datos</Link>
          <Link to="/crearmedico" className="hover:text-blue-400">Crear cuentas de médico</Link>
          <Link to="/login" className="hover:text-blue-400">Editar contenido</Link>
          <span className="hover:text-blue-400" onClick={handleLogout}>Cerrar sesión</span>          
        </>
      ) : tipoUsuario === "paciente" ? (
        <>
          <Link to="/" className=" hover:text-blue-400 ">Home</Link>
          <Link to="/citas" className="hover:text-blue-400">Citas</Link>
          {!user ? <Link to="/login" className="hover:text-blue-400">Iniciar sesión</Link> :
          <span className="hover:text-blue-400" onClick={handleLogout}>Cerrar sesión</span>
          
          }
        </>

      ) : (
        <>
          <Link to="/" className=" hover:text-blue-400 ">Home</Link>
          <Link to="/citas" className="hover:text-blue-400">Citas</Link>
          {!user ? <Link to="/login" className="hover:text-blue-400">Iniciar sesión</Link> :
          <span className="hover:text-blue-400" onClick={handleLogout}>Cerrar sesión</span>
          }
        </>
      )}
    </nav>
  );
};

export default NavBar;
