import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";


const Header = () => {
  const { user } = useAuth()
  return (
    <header className="bg-white shadow-md text-blue-700 p-4 grid grid-cols-3">

        

      <div>
        <h1 className="text-2xl font-bold">{user ? `Bienvenido, ${user.nombres}` : ""}</h1>
      </div>
      <div className="flex items-center flex-col">
        <h1 className="text-4xl font-extrabold">Clínica SaludVita</h1>
        <h1>Preocupados por tu bienestar</h1>
      </div>
      <div className="flex justify-end">
        <Link to="/login" 
          state={{ loginType: 'admin' }} className="hover:text-blue-400">Profesionales de la Salud</Link>
      </div>

        
        
    </header>
  );
};

export default Header;
