import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";


const Header = () => {
  const { user } = useAuth()
  return (
    <header className="bg-blue-900 text-blue-100 p-4 items-center flex justify-between">
      <div>
        <button>{user ? `Bienvenido, ${user.nombres}` : ""}</button>
      </div>
      <div>
        <Link to="/profesionales">Profesionales de la Salud</Link>
      </div>
    </header>
  );
};

export default Header;
