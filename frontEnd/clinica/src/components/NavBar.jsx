import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";


const NavBar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isProfesionalRoute = location.pathname.startsWith('/profesionales');

  const handleLogout = () => {
    logout(); 
    navigate('/');
  };

  return (
    <nav className="flex justify-around bg-blue-950 text-blue-100 text-xl">
      {!isProfesionalRoute ? (
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
          <Link to="/citas" className="hover:text-blue-400">Editar Base de Datos</Link>
          <Link to="/crearmedico" className="hover:text-blue-400">Crear cuentas de médico</Link>
          <Link to="/login" className="hover:text-blue-400">Editar contenido</Link>
        </>
      )}
      
    </nav>
  );
};

export default NavBar;
