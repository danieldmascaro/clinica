import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { CgProfile } from "react-icons/cg";
import { GiMedicalPack } from "react-icons/gi";
import { motion } from "framer-motion";

const Header = () => {
  const { user } = useAuth();
  return (
    <header className="bg-white shadow-md text-blue-700 p-4 grid sm:grid-cols-3 text-center">
      <div className="sm:hidden flex justify-between">
        <h1 className="inline-flex font-bold">
          {user && `Bienvenido, ${user.nombres}`}
          {user && (
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="ml-2 mt-1"
            >
              <Link
                to="/perfil"
                className="text-center text-blue-700 hover:text-blue-900 rounded-full bg-blue-100 hover:bg-blue-100 transition"
              >
                <CgProfile />
              </Link>
            </motion.div>
          )}
        </h1>
        <div>
          <Link
            to="/login"
            state={{ loginType: "admin" }}
            className="hover:text-blue-400"
          >
            <GiMedicalPack></GiMedicalPack>
          </Link>
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-rows">
        {user && (
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/perfil"
              className="flex gap-1 text-blue-700 hover:text-blue-900 p-3 mr-5 rounded-full bg-blue-100 hover:bg-blue-100 transition"
            >
              <CgProfile />
            </Link>
          </motion.div>
        )}
        <h1 className="text-2xl font-bold">
          {user && `Bienvenido, ${user.nombres}`}
        </h1>
      </div>

      <div className="flex items-center flex-col">
        <h1 className="text-4xl font-extrabold">Clínica SaludVita</h1>
        <h1>Preocupados por tu bienestar</h1>
      </div>
      <div className="hidden sm:flex justify-end text-3xl font-bold">
        <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}>
          <Link
            to="/login"
            state={{ loginType: "admin" }}
            className="hover:text-blue-400"
          >
            <GiMedicalPack></GiMedicalPack>
          </Link>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
