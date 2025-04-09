import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/home/HomePage";
import Citas from "./pages/citas/Citas";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Profesional from "./pages/profesionales/Profesional";
import LoginForm from "./components/LoginForm";
import { AuthProvider } from "./context/authContext";

function App() {
  return (
    <>
      <AuthProvider>
        <Header></Header>
        <NavBar></NavBar>
        <main className="bg-[rgb(15,46,132)] p-4 min-h-149">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/citas" element={<Citas />} />
            <Route path="/profesionales" element={<Profesional/>} />
            <Route path="/login" element={<LoginForm/>} />
          </Routes>
        </main>
        <Footer />
      </AuthProvider>
      
    </>
  );
}

export default App;
