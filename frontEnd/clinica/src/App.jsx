import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/home/HomePage";
import Citas from "./pages/citas/Citas";
import Header from "./components/Header";
import Profesional from "./pages/profesionales/Profesional";
import LoginForm from "./components/LoginForm";
import { AuthProvider } from "./context/authContext";
import ActivateAccount from "./components/ActivateAccount";
import SignUpForm from "./components/SignUpForm";
import ReSendMail from "./components/ReSendMail";
import AccountCreated from "./components/AccountCreated";
import CrearMedico from "./pages/create/CrearMedico";
import RedireccionLogin from "./components/RedireccionLogin";
import CambiarContrasena from "./components/CambiarContrasena";
import CrearPasswordMedico from "./components/CrearPasswordMedico";


function App() {
  return (
    <>
      <AuthProvider>
        <Header></Header>
        <NavBar></NavBar>
        <main className="p-4 flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/citas" element={<Citas />} />
            <Route path="/profesionales" element={<Profesional/>} />
            <Route path="/login" element={<LoginForm/>} />
            <Route path="/signup" element={<SignUpForm/>} />
            <Route path="auth/activate/:uid/:token" element={<ActivateAccount/>} />
            <Route path="/resendmail" element={<ReSendMail/>} />
            <Route path="/accountcreated" element={<AccountCreated/>} />
            <Route path="/crearmedico" element={<CrearMedico/>} />
            <Route path="/redireccionlogin" element={<RedireccionLogin/>} />
            <Route path="/cambiarcontrasena" element={<CambiarContrasena/>} />
            <Route path="/crearpassmedico" element={<CrearPasswordMedico/>} />
          </Routes>
        </main>
      </AuthProvider>
      
    </>
  );
}

export default App;
